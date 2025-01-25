import { redisClient } from '../../redis/redis.ts';
import type { MarketContext, MarketMovers } from './types.ts';

type MarketSentiment = 'extreme greed' | 'greed' | 'neutral' | 'fear' | 'extreme fear';

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
};

interface MarketMoversAPIResponse {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
}

const fetchMarketGainers = async (): Promise<MarketMovers[]> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/stock_market/gainers?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch market top gainers from API: ${response.statusText}`);
    }

    const data = await response.json() as MarketMoversAPIResponse[];

    return data.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: item.change,
      changePercentage: item.changesPercentage
    }));
  } catch (error) {
    throw error;
  }
};

const fetchMarketLosers = async (): Promise<MarketMovers[]> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/stock_market/losers?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch market top losers from API: ${response.statusText}`);
    }

    const data = await response.json() as MarketMoversAPIResponse[];

    return data.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: item.change,
      changePercentage: item.changesPercentage
    }));
  } catch (error) {
    throw error;
  }
};

const fetchMarketMostActive = async (): Promise<MarketMovers[]> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/stock_market/actives?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch market most active from API: ${response.statusText}`);
    }

    const data = await response.json() as MarketMoversAPIResponse[];

    return data.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: item.change,
      changePercentage: item.changesPercentage
    }));
  } catch (error) {
    throw error;
  }
};

const fetchSectorPerformance = async (): Promise<{ sector: string; changePercentage: number }[]> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/sector-performance?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch sector performance from API: ${response.statusText}`);
    }

    const data = await response.json() as { sector: string; changesPercentage: string }[];

    return data.map((item) => ({
      sector: item.sector,
      changePercentage: parseFloat(item.changesPercentage)
    }));
  } catch (error) {
    throw error;
  }
};

interface MarketNewsArticle {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
}

const fetchLatestMarketNews = async (): Promise<MarketNewsArticle[]> => {
  try {
    const response = await fetch(`${process.env.AV_API_URL}/query?function=NEWS_SENTIMENT&topics=economy_monetary&apikey=${process.env.AV_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch latest market news from API: ${response.statusText}`);
    }

    const json = await response.json() as { items: string; feed: MarketNewsArticle[] };

    return json.feed;
  } catch (error) {
    throw error;
  }
}

const fetchMarketSentiment = async ({ userAgent }: MarketContext): Promise<{ rating: MarketSentiment; score: number }> => {
  try {
    const response = await fetch(`${process.env.MARKETS_DATA_API_URL}/index/fearandgreed/current`, {
      headers: {
        'User-Agent': userAgent
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch market sentiment from API: ${response.statusText}`);
    }

    const json = await response.json() as { score: number; rating: MarketSentiment; timestamp: string; previous_close: number };

    return {
      rating: json.rating,
      score: json.score
    }
  } catch (error) {
    throw error;
  }
};

const fetchMarketIndices = async ({ userAgent }: MarketContext): Promise<MarketIndex[]> => {
  try {
    const regions = REGIONS.join(',');
    const date = getFormattedDate();

    const response = await fetch(`${process.env.MARKETS_DATA_API_URL}/markets/world/regions/${regions}/${date}`, {
      headers: {
        'User-Agent': userAgent
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch market indices from API: ${response.statusText}`);
    }

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
  } catch (error) {
    throw error;
  }
};

const fetchCurrencies = async ({ userAgent }: MarketContext): Promise<CurrencyRate[]> => {
  try {
    const response = await fetch(`${process.env.MARKETS_DATA_API_URL}/markets/currency/summary`, {
      headers: {
        'User-Agent': userAgent
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch currencies from API: ${response.statusText}`);
    }

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
  } catch (error) {
    throw error;
  }
};

const fetchCryptocurrencies = async ({ userAgent }: MarketContext): Promise<CurrencyRate[]> => {
  try {
    const response = await fetch(`${process.env.MARKETS_DATA_API_URL}/markets/crypto/summary`, {
      headers: {
        'User-Agent': userAgent
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cryptocurrencies from API: ${response.statusText}`);
    }

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
  } catch (error) {
    throw error;
  }
};

export const getTopGainers = async (): Promise<MarketMovers[]> => {
  try {
    const cacheKey = 'markets:topGainers';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fetchMarketGainers();

    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 86400);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTopLosers = async (): Promise<MarketMovers[]> => {
  try {
    const cacheKey = 'markets:topLosers';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fetchMarketLosers();

    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 86400);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getMostActive = async (): Promise<MarketMovers[]> => {
  try {
    const cacheKey = 'markets:mostActive';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fetchMarketMostActive();

    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 86400);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSectorPerformance = async (): Promise<{ sector: string; changePercentage: number }[]> => {
  try {
    const cacheKey = 'markets:sectorPerformance';

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fetchSectorPerformance();

    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 86400);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getMarketSentiment = async (context: MarketContext) => {
  const [marketSentiment, marketNews] = await Promise.all([fetchMarketSentiment(context), fetchLatestMarketNews()]);

  return {
    marketSentiment,
    marketNews
  };
};

export const getMarketIndices = async (context: MarketContext) => {
  return await fetchMarketIndices(context);
};

export const getCurrencies = async (context: MarketContext) => {
  return await fetchCurrencies(context);
};

export const getCryptocurrencies = async (context: MarketContext) => {
  return await fetchCryptocurrencies(context);
};
