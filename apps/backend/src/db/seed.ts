import sql from './index.ts';

const createUsersTable = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `;
};

const createSymbolsTable = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS symbols (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      symbol VARCHAR(20) NOT NULL,
      name VARCHAR(200) NOT NULL,
      exchange VARCHAR(40),
      exchange_short_name VARCHAR(30) NOT NULL,
      type VARCHAR(50) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_symbol_exchange_name UNIQUE (symbol, name, exchange_short_name)
    )
  `;
};

const createWatchlistsTable = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS watchlists (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_user_watchlist_name UNIQUE (user_id, name)
    )
  `;
};

const createWatchlistSymbolsTable = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
      CREATE TABLE IF NOT EXISTS watchlist_symbols (
      watchlist_id UUID NOT NULL REFERENCES watchlists(id) ON DELETE CASCADE,
      symbol_id UUID NOT NULL REFERENCES symbols(id) ON DELETE CASCADE,
      added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (watchlist_id, symbol_id)
    )
  `;
};

export const seedDB = async () => {
  try {
    await sql.begin(async () => {
      await createUsersTable();
      await createSymbolsTable();
      await createWatchlistsTable();
      await createWatchlistSymbolsTable();
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
