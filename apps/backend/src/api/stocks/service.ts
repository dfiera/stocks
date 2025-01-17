import type {
  CompanyProfile,
  DetailedQuote,
  NewsArticle,
  PriceChart,
  Quote,
  Symbol
} from './types.ts';
import { storeSymbols, getFilteredSymbolRows } from '../../db/queries.ts';

interface CompanyProfileAPIResponse {
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

interface QuoteAPIResponse {
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

interface SimpleQuoteAPIResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

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

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMP_API_KEY}`);
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
    beta: companyProfile.beta
  };
};

const fetchDetailedQuote = async (symbol: string): Promise<DetailedQuote> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.FMP_API_KEY}`);
  const data = await response.json() as QuoteAPIResponse[];
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
};

const fetchPriceChart = async (symbol: string, { interval = '1min', outputSize = '390' }: { interval?: string; outputSize?: string }): Promise<PriceChart> => {
  const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&date=today&interval=${interval}&order=asc&outputsize=${outputSize}&apikey=${process.env.TD_API_KEY}`);

  return await response.json() as PriceChart;
};

const fetchCompanyNews = async (symbol: string): Promise<NewsArticle[]> => {
  const response = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&order=desc&limit=10&sort=published_utc&apiKey=${process.env.POLYGON_API_KEY}`);
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
      publishedUtc: newsArticle.published_utc,
      articleUrl: newsArticle.article_url,
      imageUrl: newsArticle.image_url,
      description: newsArticle.description
    };
  });
};

const fetchAvailableSymbols = async (): Promise<Symbol[]> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.FMP_API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch available symbols: ${response.statusText}`);
  }

  return await response.json() as Symbol[];
};

export const getCompanyProfile = async (symbol: string) => {
  const [companyProfile, quote] = await Promise.all([
    fetchCompanyProfile(symbol),
    fetchDetailedQuote(symbol)
  ]);

  return {
    ...companyProfile,
    ...quote
  };
};

export const getQuote = async (symbol: string): Promise<Quote> => {
  const url = `${process.env.STOCK_API_URL}/quote?symbol=${symbol}`;
  const response = await fetch(url, {
    headers: {
      'X-Finnhub-Token': process.env.FINNHUB_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
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
};

export const getPriceChart = async (symbol: string, options?: { interval?: string; outputSize?: string }) => {
  return await fetchPriceChart(symbol, options || {});
};

export const getCompanyNews = async (symbol: string) => {
  return await fetchCompanyNews(symbol);
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
