import { addSymbolToWatchlist, createWatchlistForUser, getUserWatchlists } from '../../db/queries.ts';
import type { Watchlist } from './types.ts';
import * as stocksService from '../stocks/service.ts';
import type { PriceChart, Quote, Symbol } from '../stocks/types.ts';

const fetchPriceDataForWatchlist = async (watchlist: Watchlist<Symbol>): Promise<Watchlist> => {
  const promises: Promise<[Quote, PriceChart]>[] = watchlist.symbols
    .map(({ symbol }) => {
      const quotePromise = stocksService.getQuote(symbol);
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
