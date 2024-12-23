import type { PriceChart, Quote, Symbol } from '../stocks/types.ts';

export interface WatchlistSymbol extends Symbol {
  quote: Quote | null;
  priceChart: PriceChart | null;
}

export interface Watchlist<T = WatchlistSymbol> {
  id: string;
  name: string;
  description: string;
  symbols: T[];
}
