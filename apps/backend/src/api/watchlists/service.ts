import {
  addSymbolToWatchlist,
  createWatchlistForUser,
  getUserWatchlists,
  deleteSymbolFromWatchlist
} from '../../db/queries.ts';
import type { Watchlist } from './types.ts';
import type { PriceChart, Quote, Symbol } from '../stocks/types.ts';
import * as stocksService from '../stocks/service.ts';

const fetchPriceDataForWatchlist = async (watchlist: Watchlist<Symbol>): Promise<Watchlist> => {
  const promises: Promise<[Quote, PriceChart]>[] = watchlist.symbols
    .map(({ symbol }) => {
      const quotePromise = stocksService.getRealtimeQuote(symbol);
      const priceChartPromise = stocksService.getPriceChart(symbol, { interval: '5min', outputSize: '78' });

      return Promise.all([quotePromise, priceChartPromise]);
    });

  const data = await Promise.all(promises);

  return {
    ...watchlist,
    symbols: watchlist.symbols.map((symbol) => {
      const [quote, priceChart] = data.shift() || [null, null];

      return {
        ...symbol,
        quote,
        priceChart
      };
    })
  };
};

export const createWatchlist = async (userId: string, { name, description }: { name: string; description: string }) => {
  return await createWatchlistForUser(userId, name, description);
};

export const createDefaultWatchlist = async (userId: string) => {
  const name = 'My Symbols';
  const description = 'Default watchlist for tracking your favourite stocks.';

  await createWatchlistForUser(userId, name, description);
};

export const getWatchlists = async (userId: string) => {
  const watchlists = await getUserWatchlists(userId);

  if (Array.isArray(watchlists) && watchlists.length === 0) {
    return [];
  }

  return await Promise.all(
    watchlists.map((watchlist) => fetchPriceDataForWatchlist(watchlist))
  );
};

export const addSymbol = async (watchlistId: string, symbol: string) => {
  return await addSymbolToWatchlist(watchlistId, symbol);
};

export const deleteSymbol = async (watchlistId: string, symbol: string) => {
  await deleteSymbolFromWatchlist(watchlistId, symbol);
};
