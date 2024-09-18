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
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercentage: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  avgVolume: number;
  pe: number;
  marketCap: number;
  eps: number;
}

export interface Stock {
  overview: CompanyOverview;
  quote: Quote;
}

export interface Screener {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
  volume: number;
  pe: number;
  marketCap: number;
  eps: number;
}
