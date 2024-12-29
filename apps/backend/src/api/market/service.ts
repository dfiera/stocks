import type { MarketMovers } from './types.ts';
import * as stubs from './stubs.ts';

interface MarketMoversAPIResponse {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
}

const fetchMarketGainers = async (): Promise<MarketMovers[]> => {
  // const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.FMP_API_KEY}`);
  //
  // const marketGainers = await response.json() as MarketMoversAPIResponse[];

  return stubs.gainers.map((value) => ({
    symbol: value.symbol,
    name: value.name,
    price: value.price,
    change: value.change,
    changePercentage: value.changesPercentage
  }));
};

const fetchMarketLosers = async (): Promise<MarketMovers[]> => {
  // const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${process.env.FMP_API_KEY}`);
  // const marketLosers = await response.json() as MarketMoversAPIResponse[];

  return stubs.losers.map((value) => ({
    symbol: value.symbol,
    name: value.name,
    price: value.price,
    change: value.change,
    changePercentage: value.changesPercentage
  }));
};

const fetchMarketMostActive = async (): Promise<MarketMovers[]> => {
  // const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${process.env.FMP_API_KEY}`);
  // const mostActive = await response.json() as MarketMoversAPIResponse[];

  return stubs.mostActive.map((value) => ({
    symbol: value.symbol,
    name: value.name,
    price: value.price,
    change: value.change,
    changePercentage: value.changesPercentage
  }));
};

export const getGainers = async () => {
  return await fetchMarketGainers();
};

export const getLosers = async () => {
  return await fetchMarketLosers();
};

export const getMostActive = async () => {
  return await fetchMarketMostActive();
};
