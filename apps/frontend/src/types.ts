export interface CompanyOverview {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  description: string;
  sector: string;
  industry: string;
  country: string;
  employees: string;
  website: string;
  marketCap: number;
  avgVolume: number;
  beta: number;
}

export interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercentage: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface ExtendedQuote extends Quote {
  symbol: string;
  name: string;
  exchange: string;
  yearHigh: number;
  yearLow: number;
  volume: number;
  avgVolume: number;
  pe: number;
  marketCap: number;
  eps: number;
}

export interface MarketMoversItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

export interface MarketTrendsItem {
  symbol: string;
  prettySymbol: string;
  name: string;
  price: number;
  priceChange: number;
  country?: {
    name: string;
  }
}

export interface StockScreener {
  id: string;
  symbol: string;
  name: string;
  country: string;
  exchangeShortName: string;
  sector: string;
  industry: string;
  price: number;
  volume: number;
  marketCap: number;
  lastAnnualDividend: number;
  beta: number;
  isEtf: boolean;
  isFund: boolean;
}

export interface NewsArticle {
  id: string;
  publisher: {
    name: string;
  };
  title: string;
  author: string;
  publishedUtc: string;
  articleUrl: string;
  imageUrl: string;
  description: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Watchlist

export interface MetaObject {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
}

export interface OHLCPrice {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface PriceChart {
  meta: MetaObject | null;
  values: OHLCPrice[]
}

export interface Symbol {
  symbol: string;
  name: string;
}

export interface WatchlistSymbol extends Symbol {
  quote: Quote;
  priceChart: PriceChart;
}

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  symbols: WatchlistSymbol[];
}

export interface Filter {
  id: number;
  attribute: string;
  condition: string;
  value: string;
}

export interface SearchResult {
  id: string;
  symbol: string;
  name: string;
  exchangeShortName: string;
}
