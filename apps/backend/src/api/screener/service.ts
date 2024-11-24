type SymbolList = {
  symbol: string;
  name: string;
}[];

interface Quote {
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

const fetchSymbolList = async () => {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.FMP_API_KEY}`);

  return await response.json() as SymbolList;
};

const fetchQuote = async (symbols: string[]): Promise<Quote[]> => {
  const commaSeparatedSymbols = symbols.join(',');
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${commaSeparatedSymbols}?apikey=${process.env.FMP_API_KEY}`);
  return await response.json() as Quote[];
};

export const getScreener = async () => {
  const symbols = ['AAPL', 'MSFT'];

  const quotes = await fetchQuote(symbols);

  return quotes.map((quote) => {
    return {
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
    };
  });
};
