import { TimeSeries, CompanyProfile, Quote } from './types.ts';

const fetchTimeSeries = async (symbol: string) => {
  const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&order=asc&outputsize=390&apikey=${process.env.TD_API_KEY}`);

  return await response.json() as TimeSeries;
};

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMP_API_KEY}`);
  const data =  await response.json() as CompanyProfile[];

  return data[0] as CompanyProfile;
};

const fetchQuote = async (symbol: string): Promise<Quote> => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.FMP_API_KEY}`);
  const data = await response.json() as Quote[];

  return data[0] as Quote;
};

const fetchStockNews = async (symbol: string) => {
  const response = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&order=desc&limit=10&sort=published_utc&apiKey=${process.env.POLYGON_API_KEY}`);
  return await response.json();
};

export const getStock = async (symbol: string) => {
  const [companyProfile, quote, stockNews] = await Promise.all([
    fetchCompanyProfile(symbol),
    fetchQuote(symbol),
    fetchStockNews(symbol)
  ]);

  return {
    overview: {
      symbol: companyProfile.symbol,
      name: companyProfile.companyName,
      exchange: companyProfile.exchangeShortName,
      currency: companyProfile.currency,
      description: companyProfile.description,
      sector: companyProfile.sector,
      industry: companyProfile.industry,
      country: companyProfile.country,
      employees: companyProfile.fullTimeEmployees,
      website: companyProfile.website,
      marketCap: companyProfile.mktCap,
      avgVolume: companyProfile.volAvg,
      beta: companyProfile.beta
    },
    quote: {
      symbol: quote.symbol,
      name: quote.name,
      exchange: quote.exchange,
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
    }
  };
};
