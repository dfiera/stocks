import type { MarketMovers } from './types.ts';
import * as stubs from './stubs.ts';

type MarketSentiment = 'extreme greed' | 'greed' | 'neutral' | 'fear' | 'extreme fear';
type Region = 'America' | 'Americas' | 'Europe' | 'APAC' | 'Asia-Pacific' | 'EMEA';

interface MarketsAPIResponse {
  name: string;
  symbol: string;
  current_price: number;
  prev_close_price: number;
  price_change_from_prev_close: number;
  percent_change_from_prev_close: number;
  prev_close_date: string;
  last_updated: string;
}

interface MarketIndexAPIResponse extends MarketsAPIResponse {
  country: {
    name: string;
    code: string;
    region: string;
  };
}

interface CurrencyAPIResponse extends MarketsAPIResponse {
  pretty_symbol: string;
}

interface MarketIndex {
  name: string;
  symbol: string;
  price: number;
  prevClosePrice: number;
  priceChange: number;
  percentChange: number;
  prevCloseDate: string;
  lastUpdated: string;
  country: {
    name: string;
    code: string;
    region: string;
  };
}

interface CurrencyRate {
  name: string;
  symbol: string;
  price: number;
  prevClosePrice: number;
  priceChange: number;
  percentChange: number;
  prevCloseDate: string;
  lastUpdated: string;
  prettySymbol: string;
}

interface MarketMoversAPIResponse {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
}

interface MarketNewsArticle {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
}

const REGIONS = ['Americas', 'Asia-Pacific', 'Europe'];
const FILTER_COUNTRIES = ['United States', 'Japan'];
const FILTER_REGIONS = ['Europe'];

const getFormattedDate = () => {
  const today = new Date();
  return [
    today.getFullYear(),
    ('0' + (today.getMonth() + 1)).slice(-2),
    ('0' + today.getDate()).slice(-2)
  ].join('-');
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

const fetchLatestMarketNews = async (): Promise<MarketNewsArticle[]> => {
  const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_monetary&apikey=${process.env.AV_API_KEY}`);
  const json = await response.json() as { items: string; feed: MarketNewsArticle[] };

  return json.feed;
}

const fetchMarketSentiment = async (): Promise<{ rating: MarketSentiment; score: number }> => {
  const response = await fetch('https://production.dataviz.cnn.io/index/fearandgreed/current', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  });
  const json = await response.json() as { score: number; rating: MarketSentiment; timestamp: string; previous_close: number };

  return {
    rating: json.rating,
    score: json.score
  }
};

const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  const regions = REGIONS.join(',');
  const date = getFormattedDate();

  const url = `https://production.dataviz.cnn.io/markets/world/regions/${regions}/${date}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  };

  const response = await fetch(url, { headers });
  const data = await response.json() as MarketIndexAPIResponse[];

  const results = data.reduce((results, item) => {
    const isFilteredCountry = FILTER_COUNTRIES.includes(item.country.name);
    const isFilteredRegion = FILTER_REGIONS.includes(item.country.region);

    if (isFilteredCountry || isFilteredRegion) {
      results.push({
        name: item.name,
        symbol: item.symbol,
        price: item.current_price,
        prevClosePrice: item.prev_close_price,
        priceChange: item.price_change_from_prev_close,
        percentChange: item.percent_change_from_prev_close,
        prevCloseDate: item.prev_close_date,
        lastUpdated: item.last_updated,
        country: item.country
      });
    }

    return results;
  }, [] as MarketIndex[]);

  return results.sort((a, b) => b.price - a.price);
};

const fetchCurrencies = async (): Promise<CurrencyRate[]> => {
  const response = await fetch(`https://production.dataviz.cnn.io/markets/currency/summary`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  });
  const json = await response.json() as CurrencyAPIResponse[];

  return json.map((item) => {
    return {
      name: item.name,
      symbol: item.symbol,
      price: item.current_price,
      prevClosePrice: item.prev_close_price,
      priceChange: item.price_change_from_prev_close,
      percentChange: item.percent_change_from_prev_close,
      prevCloseDate: item.prev_close_date,
      lastUpdated: item.last_updated,
      prettySymbol: item.pretty_symbol
    };
  });
};

const fetchCryptocurrencies = async (): Promise<CurrencyRate[]> => {
  const response = await fetch(`https://production.dataviz.cnn.io/markets/crypto/summary`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  });
  const json = await response.json() as CurrencyAPIResponse[];

  return json.map((item) => {
    return {
      name: item.name,
      symbol: item.symbol,
      price: item.current_price,
      prevClosePrice: item.prev_close_price,
      priceChange: item.price_change_from_prev_close,
      percentChange: item.percent_change_from_prev_close,
      prevCloseDate: item.prev_close_date,
      lastUpdated: item.last_updated,
      prettySymbol: item.pretty_symbol
    };
  });
};

export const getTopGainers = async () => {
  return await fetchMarketGainers();
};

export const getTopLosers = async () => {
  return await fetchMarketLosers();
};

export const getMostActive = async () => {
  return await fetchMarketMostActive();
};

export const getSectorPerformance = async () => {
  return await fetchSectorPerformance();
};

export const getMarketSentiment = async () => {
  // const [marketSentiment, marketNews] = await Promise.all([fetchMarketSentiment(), fetchLatestMarketNews()]);
  return {
    marketSentiment: stubs.marketSentiment,
    marketNews: stubs.marketNews
  };
};

export const getMarketIndices = async () => {
  return await fetchMarketIndices();
};

export const getCurrencies = async () => {
  return await fetchCurrencies();
};

export const getCryptocurrencies = async () => {
  return await fetchCryptocurrencies();
};
