import type { RowList } from 'postgres';
import sql from './index.ts';
import type { Symbol } from '../api/stocks/types.ts';
import type { Watchlist } from '../api/watchlists/types.ts';

export const findUserByEmail = async (email: string): Promise<{ id: string; email: string; password: string}> => {
  const rows = await sql`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
  `;

  return rows[0] as { id: string; email: string; password: string};
};

export const storeUserCredentials = async (email: string, password: string) => {
  await sql`
    INSERT INTO users(email, password)
    VALUES (${email}, ${password})
  `;
};

const storeSymbol = async (symbol: Symbol): Promise<void> => {
  await sql`
      INSERT INTO symbols(symbol, name, currency, exchange, country, type)
      VALUES (${symbol.symbol}, ${symbol.name}, ${symbol.currency}, ${symbol.exchange}, ${symbol.country}, ${symbol.type})
  `;
}

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

export const createWatchlistForUser = async (userId: string, name: string, description: string) => {
  const rows = await sql`
    INSERT INTO watchlists(user_id, name, description)
    VALUES (${userId}, ${name}, ${description})
    RETURNING id, name, description, ARRAY[]::VARCHAR[] AS symbols
  `;

  return rows[0];
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
