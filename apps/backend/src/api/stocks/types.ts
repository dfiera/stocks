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
  meta: MetaObject;
  values: OHLCPrice[]
}

export interface CompanyProfile {
  symbol: string;
  companyName: string;
  description: string;
  currency: string;
  mktCap: number;
  volAvg: number;
  beta: number;
  exchangeShortName: string;
  industry: string;
  website: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
}

export interface Quote {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changesPercentage: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  avgVolume: number;
  pe: number;
  marketCap: number;
  eps: number;
}
