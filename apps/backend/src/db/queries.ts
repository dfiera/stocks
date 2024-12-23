import type { RowList } from 'postgres';
import sql from './index.ts';
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
      symbols s ON ws.symbol = s.symbol
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
  const rows = await sql`
    INSERT INTO watchlist_symbols(watchlist_id, symbol)
    VALUES (${watchlistId}, ${symbol})
    RETURNING symbol
  `;

  return rows[0];
};
