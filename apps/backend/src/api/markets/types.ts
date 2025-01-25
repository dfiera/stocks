export interface MarketMovers {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

export interface MarketContext {
  userAgent: string;
}
