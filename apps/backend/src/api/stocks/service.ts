import { redisClient } from '../../redis/redis.ts';
import { storeSymbols, getFilteredSymbolRows } from '../../db/queries.ts';
import logger from '../../utils/logger.ts';
import type {
  CompanyProfile,
  DetailedQuote,
  NewsArticle,
  PriceChart,
  Quote,
  Symbol
} from './types.ts';

const fetchAvailableSymbols = async (): Promise<Symbol[]> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/stock/list?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch available symbols: ${response.statusText}`);
    }

    return await response.json() as Symbol[];
  } catch (error) {
    throw error;
  }
};

interface CompanyProfileAPIResponse {
  symbol: string;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  companyName: string;
  currency: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
}

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/profile/${symbol}?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Could not fetch company profile for ${symbol}: ${response.statusText}`);
    }

    const data =  await response.json() as CompanyProfileAPIResponse[];
    const companyProfile = data[0];

    return {
      symbol: companyProfile.symbol,
      companyName: companyProfile.companyName,
      exchange: companyProfile.exchangeShortName,
      currency: companyProfile.currency,
      description: companyProfile.description,
      sector: companyProfile.sector,
      industry: companyProfile.industry,
      country: companyProfile.country,
      employees: companyProfile.fullTimeEmployees,
      website: companyProfile.website,
      beta: companyProfile.beta,
      dividendYield: companyProfile.lastDiv
    };
  } catch (error) {
    throw error;
  }
};

interface DetailedQuoteApiResponse {
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

const fetchDelayedQuote = async (symbol: string): Promise<DetailedQuote> => {
  try {
    const response = await fetch(`${process.env.FMP_API_URL}/quote/${symbol}?apikey=${process.env.FMP_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch delayed quote for ${symbol}: ${response.statusText}`);
    }

    const data = await response.json() as DetailedQuoteApiResponse[];
    const quote = data[0];

    return {
      price: quote.price,
      change: quote.change,
      changePercentage: quote.changesPercentage,
      open: quote.open,
      high: quote.dayHigh,
      low: quote.dayLow,
      previousClose: quote.previousClose,
      yearHigh: quote.yearHigh,
      yearLow: quote.yearLow,
      volume: quote.volume,
      avgVolume: quote.avgVolume,
      pe: quote.pe,
      marketCap: quote.marketCap,
      eps: quote.eps
    };
  } catch (error) {
    throw error;
  }
};

interface SimpleQuoteAPIResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

const fetchRealtimeQuote = async (symbol: string): Promise<Quote> => {
  try {
    const response = await fetch(`${process.env.FINNHUB_API_URL}/quote?symbol=${symbol}`, {
      headers: {
        'X-Finnhub-Token': process.env.FINNHUB_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch real-time quote for ${symbol}: ${response.statusText}`);
    }

    const data = await response.json() as SimpleQuoteAPIResponse;

    return {
      price: data.c,
      change: data.d,
      changePercentage: data.dp,
      open: data.o,
      high: data.h,
      low: data.l,
      previousClose: data.pc
    };
  } catch (error) {
    throw error;
  }
};

const fetchPriceChart = async (symbol: string, { interval = '1min', outputSize = '390' }: { interval?: string; outputSize?: string }): Promise<PriceChart> => {
  try {
    const response = await fetch(`${process.env.TD_API_URL}/time_series?symbol=${symbol}&interval=${interval}&order=asc&outputsize=${outputSize}&apikey=${process.env.TD_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch price chart for ${symbol}: ${response.statusText}`);
    }

    return await response.json() as PriceChart;
  } catch (error) {
    throw error;
  }
};

interface NewsArticleAPIResponse {
  id: string;
  publisher: {
    name: string;
  };
  title: string;
  author: string;
  published_utc: string;
  article_url: string;
  image_url: string;
  description: string;
}

const getRelativeTime = (utcDate: Date) => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - utcDate.getTime();
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInHours >= 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
}

const fetchCompanyNews = async (symbol: string): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(`${process.env.POLYGON_API_URL}/reference/news?ticker=${symbol}&order=desc&limit=10&sort=published_utc&apiKey=${process.env.POLYGON_API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news for ${symbol}: ${response.statusText}`);
    }

    const data = await response.json() as { results: NewsArticleAPIResponse[], status: string, count: number, next_url: string };
    const { results: newsArticles } = data;

    return newsArticles.map((newsArticle) => {
      return {
        id: newsArticle.id,
        publisher: {
          name: newsArticle.publisher.name
        },
        title: newsArticle.title,
        author: newsArticle.author,
        publishedUtc: getRelativeTime(new Date(newsArticle.published_utc)),
        articleUrl: newsArticle.article_url,
        imageUrl: newsArticle.image_url,
        description: newsArticle.description
      };
    });
  } catch (error) {
    throw error;
  }
};

export const storeSymbolsInDB = async () => {
  const symbols = await fetchAvailableSymbols();
  const availableSymbols = symbols
    .reduce<Symbol[]>((result, symbol) => {
      if (symbol.name && symbol.exchangeShortName) {
        result.push({
          symbol: symbol.symbol,
          name: symbol.name,
          exchange: symbol.exchange,
          exchangeShortName: symbol.exchangeShortName,
          type: symbol.type
        });
      }

      return result;
    }, []);

  await storeSymbols(availableSymbols);
};

export const getFilteredSymbols = async (search: string, limit: number) => {
  return await getFilteredSymbolRows(search, limit);
};

export const getCompanyProfile = async (symbol: string) => {
  const [companyProfile, quote] = await Promise.all([
    fetchCompanyProfile(symbol),
    fetchDelayedQuote(symbol)
  ]);

  return {
    ...companyProfile,
    ...quote
  };
};

export const getRealtimeQuote = async (symbol: string): Promise<Quote> => {
  return await fetchRealtimeQuote(symbol);
};

export const getPriceChart = async (symbol: string, options?: { interval?: string; outputSize?: string }) => {
  try {
    const cacheKey = `symbol:${symbol}:${options?.interval}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fetchPriceChart(symbol, options || {});

    await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 60);

    return data;
  } catch (error) {
    logger.error('stocks:service:getPriceChart:error', error);
    throw error;
  }
};

export const getCompanyNews = async (symbol: string) => {
  return await fetchCompanyNews(symbol);
};
