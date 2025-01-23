import { PendingQuery, Row, RowList } from 'postgres';
import sql from './index.ts';
import type { Symbol } from '../api/stocks/types.ts';
import type { Watchlist } from '../api/watchlists/types.ts';
import { StockScreener, StockScreenerAPIResponse } from '../api/screener/types.ts';
import { ScreenerOptions } from '../api/screener/types.ts';

type FilterConditions = 'ct' | 'nct' | 'gt' | 'lt' | 'gte' | 'lte';

export const findUserByEmail = async (email: string): Promise<{ id: string; email: string; password: string}> => {
  const rows = await sql`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
  `;

  return rows[0] as { id: string; email: string; password: string};
};

export const storeUserCredentials = async (email: string, password: string): Promise<string> => {
  const [user] = await sql<[{ id: string }]>`
    INSERT INTO users(email, password)
    VALUES (${email}, ${password})
    RETURNING id
  `;

  return user.id;
};

const storeSymbol = async (symbol: Symbol): Promise<void> => {
  await sql`
    INSERT INTO symbols(symbol, name, exchange, exchange_short_name, type)
    VALUES (${symbol.symbol}, ${symbol.name}, ${symbol.exchange}, ${symbol.exchangeShortName}, ${symbol.type})
  `;
};

export const storeSymbols = async (symbols: Symbol[]) => {
  try {
    await sql.begin(async () => {
      const promises = [];
      for (const symbol of symbols) {
        promises.push(storeSymbol(symbol));
      }
      await Promise.all(promises);
    });
  } catch (error) {
    throw error;
  }
};

export const isStockScreenerTableEmpty = async () => {
  const [result] = await sql`SELECT COUNT(*) FROM stock_screener`;

  return Number(result.count) === 0;
};

export const populateScreenerTable = async (stocks: StockScreenerAPIResponse[]) => {
  const storeScreenerStock = async (stock: StockScreenerAPIResponse): Promise<void> => {
    await sql`
      INSERT INTO stock_screener(symbol, name, country, exchange_short_name, sector, industry, price, volume, market_cap, last_annual_dividend, beta, is_etf, is_fund, is_actively_trading)
      VALUES (${stock.symbol}, ${stock.companyName}, ${stock.country}, ${stock.exchangeShortName}, ${stock.sector}, ${stock.industry}, ${stock.price}, ${stock.volume}, ${stock.marketCap}, ${stock.lastAnnualDividend}, ${stock.beta}, ${stock.isEtf}, ${stock.isFund}, ${stock.isActivelyTrading})
    `;
  };

  try {
    await sql.begin(async () => {
      const promises = [];
      for (const stock of stocks) {
        promises.push(storeScreenerStock(stock));
      }
      await Promise.all(promises);
    });
  } catch (error) {
    throw error;
  }
};

export const getScreenerRowsWithCount = async ({ filters, search, page, pageSize }: ScreenerOptions): Promise<[StockScreener[], number]> => {
  const conditionToSql: Record<FilterConditions, (attribute: string, value: string) => PendingQuery<Row[]>> = {
    // contains
    ct: (attribute: string, value: string) => sql`${ sql(attribute) } ILIKE ${ `%${value}%` }`,
    // not contains
    nct: (attribute: string, value: string) => sql`${ sql(attribute) } NOT ILIKE ${ `%${value}%` }`,
    // greater than
    gt: (attribute: string, value: string) => sql`${ sql(attribute) } > ${ Number(value) }`,
    // lower than
    lt: (attribute: string, value: string) => sql`${ sql(attribute) } < ${ Number(value) }`,
    // greater than or equal to
    gte: (attribute, value) => sql`${ sql(attribute) } >= ${ Number(value) }`,
    // less than or equal to
    lte: (attribute: string, value: string) => sql`${ sql(attribute) } <= ${ Number(value) }`
  };

  try {
    const conditions = filters
      .map((filter) => conditionToSql[filter.condition as FilterConditions]?.(filter.attribute, filter.value))
      .filter(Boolean);

    if (search) {
      conditions.push(sql`(name ILIKE ${ `%${search}%` } OR symbol ILIKE ${ `%${search}%` })`);
    }

    const whereClause = conditions.length > 1
      ? sql`WHERE ${conditions.reduce((prev, curr) => sql`${prev} AND ${curr}`)}`
      : sql`WHERE ${conditions}`;

    const [result] = await sql`
      SELECT
        (
          SELECT COUNT(*)
          FROM stock_screener ${
            conditions.length > 0
              ? whereClause
              : sql``
          }
        ) as total_count,
        (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'symbol', symbol,
              'name', name,
              'country', country,
              'exchangeShortName', exchange_short_name,
              'sector', sector,
              'industry', industry,
              'price', price,
              'volume', volume,
              'marketCap', market_cap,
              'lastAnnualDividend', last_annual_dividend,
              'beta', beta,
              'isEtf', is_etf,
              'isFund', is_fund
            )
          ) as rows
          FROM (
            SELECT *
            FROM stock_screener ${
              conditions.length > 0
                ? whereClause
                : sql``
            }
            ORDER BY market_cap DESC
            LIMIT ${pageSize}
            OFFSET ${(page - 1) * pageSize}
          ) sub
        ) as data
    `;

    return [
      result.data || [],
      Number(result.total_count) || 0
    ];
  } catch (error) {
    console.error('getScreenerRowsWithCount query error', error);
    throw error;
  }
};

export const createWatchlistForUser = async (userId: string, name: string, description: string) => {
  const [watchlist] = await sql<[Watchlist]>`
    INSERT INTO watchlists(user_id, name, description)
    VALUES (${userId}, ${name}, ${description})
    RETURNING id, name, description, ARRAY[]::VARCHAR[] AS symbols
  `;

  return watchlist;
};

export const getUserWatchlists = async (userId: string): Promise<Watchlist[]> => {
  const rows: RowList<Watchlist[]> = await sql`
    SELECT
      w.id,
      w.name,
      w.description,
      COALESCE(
        array_agg(
          jsonb_build_object(
            'symbol', s.symbol,
            'name', s.name
          )
        ) FILTER (WHERE s.symbol IS NOT NULL),
        ARRAY[]::JSONB[]
      ) AS symbols
    FROM
      watchlists w
    LEFT JOIN
      watchlist_symbols ws ON w.id = ws.watchlist_id
    LEFT JOIN
      symbols s ON ws.symbol_id = s.id
    WHERE
      w.user_id = ${userId}
    GROUP BY
      w.id
    ORDER BY
      w.created_at DESC
  `;

  return rows;
};

export const addSymbolToWatchlist = async (watchlistId: string, symbol: string) => {
  const symbolResult = await sql`
    SELECT id
    FROM symbols
    WHERE symbol = ${symbol}
  `;

  if (symbolResult.length === 0) {
    throw new Error(`Symbol ${symbol} not found in symbols table.`);
  }

  const symbolId = symbolResult[0].id;

  const rows = await sql`
    INSERT INTO watchlist_symbols(watchlist_id, symbol_id)
    VALUES (${watchlistId}, ${symbolId})
    RETURNING symbol_id
  `;

  return rows[0];
};

export const getFilteredSymbolRows = async (search: string, limit: number) => {
  try {
    const rows = await sql`
      SELECT
        id, symbol, name, exchange_short_name "exchangeShortName", type
      FROM symbols ${
        search !== ''
          ? sql`WHERE symbol ILIKE ${`%${search}%`} OR name ILIKE ${`%${search}%`}`
          : sql``
      }
      LIMIT ${limit}
    `;
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
