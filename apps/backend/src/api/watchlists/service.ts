import { addSymbolToWatchlist, createWatchlistForUser, getUserWatchlists } from '../../db/queries.ts';
import { Watchlist } from './types.ts';
import * as stocksService from '../stocks/service.ts';
import { PriceChart, Quote } from '../stocks/types.ts';

const fetchPriceDataForWatchlist = async (watchlist: Watchlist): Promise<Watchlist> => {
  const promises: Promise<[Quote, PriceChart]>[] = watchlist.symbols
    .filter((symbol): symbol is string => typeof symbol === 'string')
    .map((symbol) => {
      const quotePromise = stocksService.getQuote(symbol as string);
      const priceChartPromise = stocksService.getPriceChart(symbol as string, { interval: '5min', outputSize: '78' });

      return Promise.all([quotePromise, priceChartPromise]);
    });
  const data = await Promise.all(promises);

  return {
    ...watchlist,
    symbols: data.map(([quote, priceChart]) => ({
      ...quote,
      priceChart
    }))
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
