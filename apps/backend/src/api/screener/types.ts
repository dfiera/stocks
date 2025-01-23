export interface Filter {
  id: number;
  attribute: string;
  condition: string;
  value: string;
}

export type ScreenerOptions = {
  filters: Filter[];
  search: string;
  page: number;
  pageSize: number;
}

export interface StockScreenerAPIResponse {
  symbol: string;
  companyName: string;
  country: string;
  exchange: string;
  exchangeShortName: string;
  sector: string;
  industry: string;
  price: number;
  volume: number;
  marketCap: number;
  beta: number;
  lastAnnualDividend: number;
  isEtf: boolean;
  isFund: boolean;
  isActivelyTrading: boolean;
}

export interface StockScreener {
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
  isActivelyTrading: boolean;
}
