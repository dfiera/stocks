import type { PriceChart, Quote } from '../stocks/types.ts';

export type WatchlistSymbol = Quote & { priceChart: PriceChart };

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  symbols: (string | WatchlistSymbol)[];
}
