import express, { Request, Response } from 'express';

interface CompanyOverview {
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

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - needed in order to fetch data from client.
// Only allowing requests from client and GET requests for now as no other methods are implemented.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello from the server');
});

app.get('/screener', async (req: Request, res: Response) => {
  const ticker = 'AAPL'

  const fetchQuote = async (ticker: string): Promise<Quote> => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=`);
    const data = await response.json() as Quote[];

    return data[0] as Quote;
  };

  const quote = await fetchQuote(ticker);

  res.status(200).send([
    {
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
  ]);
});

app.get('/tickers/:ticker', (req: Request, res: Response) => {

});

app.get('/overview/:ticker', async (req: Request, res: Response) => {
  const ticker = req.params.ticker;

  const fetchCompanyOverview = async (ticker: string): Promise<CompanyOverview> => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=`);
    const data =  await response.json() as CompanyOverview[];

    return data[0] as CompanyOverview;
  };

  const fetchQuote = async (ticker: string): Promise<Quote> => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=`);
    const data = await response.json() as Quote[];

    return data[0] as Quote;
  };

  const [companyOverview, quote] = await Promise.all([fetchCompanyOverview(ticker), fetchQuote(ticker)]);

  res.status(200).send({
    overview: {
      symbol: companyOverview.symbol,
      name: companyOverview.companyName,
      exchange: companyOverview.exchangeShortName,
      currency: companyOverview.currency,
      description: companyOverview.description,
      sector: companyOverview.sector,
      industry: companyOverview.industry,
      country: companyOverview.country,
      employees: companyOverview.fullTimeEmployees,
      website: companyOverview.website,
      marketCap: companyOverview.mktCap,
      avgVolume: companyOverview.volAvg,
      beta: companyOverview.beta
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
  });
});

app.get('/news/:ticker', async (req: Request, res: Response) => {
  const ticker = req.params.ticker;

  const response = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&order=desc&limit=10&sort=published_utc&apiKey=`);
  const data = await response.json();

  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
