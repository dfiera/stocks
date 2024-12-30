import type { MarketMovers } from './types.ts';
import * as stubs from './stubs.ts';

type MarketSentiment = 'extreme greed' | 'greed' | 'neutral' | 'fear' | 'extreme fear';

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

const fetchSectorPerformance = async (): Promise<{ sector: string; changePercentage: number }[]> => {
  // const response = await fetch(`https://financialmodelingprep.com/api/v3/sector-performance?apikey=${process.env.FMP_API_KEY}`);
  // const sectorPerformance = await response.json() as { sector: string; changesPercentage: string }[];

  return stubs.sectorPerformance.map((value) => ({
    sector: value.sector,
    changePercentage: parseFloat(value.changesPercentage)
  }));
};

const fetchMarketSentiment = async (): Promise<{ rating: MarketSentiment; score: number }> => {
  const today = new Date();
  const date = [
    today.getFullYear(),
    ('0' + (today.getMonth() + 1)).slice(-2),
    ('0' + today.getDate()).slice(-2)
  ].join('-');

  const response = await fetch(`https://production.dataviz.cnn.io/index/fearandgreed/graphdata/${date}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  });
  const data = await response.json() as { fear_and_greed: { score: number; rating: MarketSentiment } };

  return {
    rating: data.fear_and_greed.rating,
    score: data.fear_and_greed.score
  }
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

export const getSectorPerformance = async () => {
  return await fetchSectorPerformance();
};

export const getMarketSentiment = async () => {
  return await fetchMarketSentiment();
};
