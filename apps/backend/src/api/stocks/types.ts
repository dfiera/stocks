export interface Symbol {
  symbol: string;
  name: string;
  exchange: string;
  exchangeShortName: string;
  type: string;
}

export interface CandlestickMetadata {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
}

export interface CandlestickChart {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface PriceChart {
  meta: CandlestickMetadata;
  values: CandlestickChart[]
}

export interface CompanyProfile {
  symbol: string;
  companyName: string;
  exchange: string;
  currency: string;
  description: string;
  sector: string;
  industry: string;
  country: string;
  employees: string;
  website: string;
  beta: number;
  dividendYield: number;
}

export interface Quote {
  price: number;
  change: number;
  changePercentage: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface DetailedQuote extends Quote {
  yearHigh: number;
  yearLow: number;
  volume: number;
  avgVolume: number;
  pe: number;
  marketCap: number;
  eps: number;
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
