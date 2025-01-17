import type {
  LoginCredentials,
  MarketMovers,
  NewsArticle,
  PriceChart,
  Quote,
  SearchResult,
  Watchlist
} from '../types.ts';

// Auth

export const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/status', {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const register = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const logout = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }
  } catch (error) {
    console.error((error as Error).message);
  }
};

// Search
export const fetchFilteredSymbols = async ({ queryKey }: { queryKey: [string, { search: string }] }): Promise<SearchResult[]> => {
  const [_key, { search }] = queryKey;

  try {
    const params = new URLSearchParams();

    if (search) {
      params.append('search', search);
    }

    const queryParams = search ? `?${params}` : '';

    const response = await fetch(`http://localhost:3000/api/symbols${queryParams}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Error fetching filtered symbols: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};

// Market data

export const fetchMarketMovers = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<MarketMovers[]> => {
  const [_key, __key, category] = queryKey;

  try {
    const response = await fetch(`http://localhost:3000/api/markets/${category}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Error fetching market movers: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};

export const fetchMarketTrends = async ({ queryKey }: { queryKey: [string, string, string] }) => {
  const [_key, __key, category] = queryKey;

  try {
    const response = await fetch(`http://localhost:3000/api/markets/${category}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Error fetching market trends: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};

export const fetchSectorPerformance = async (): Promise<{ sector: string; changePercentage: number }[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/markets/sector-performance', {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Error fetching sector performance: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};

export const fetchMarketSentiment = async (): Promise<{
  marketSentiment: { rating: string; score: number };
  marketNews: {
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
  }[]
}> => {
  try {
    const response = await fetch('http://localhost:3000/api/markets/market-sentiment', {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Error fetching market sentiment: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error((error as Error).message);

    return {
      rating: 'neutral',
      score: 0
    };
  }
};

export const fetchScreenerData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/screener', {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const fetchStockInfo = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_key, symbol] = queryKey;
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/profile`, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}

export const fetchStockQuote = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<Quote> => {
  const [_key, __key, symbol] = queryKey;

  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/quote`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);

    return {};
  }
};

export const fetchPriceChart = async ({ queryKey }: { queryKey: [string, string] }): Promise<PriceChart> => {
  const [_key, symbol] = queryKey;

  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/prices`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);

    return {
      meta: null,
      values: []
    };
  }
};

export const fetchStockNews = async ({ queryKey }: { queryKey: [string, string] }): Promise<NewsArticle[]> => {
  const [_key, symbol] = queryKey;
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/news`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};

export const fetchWatchlists = async (): Promise<Watchlist[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/watchlists`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user watchlists. Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);

    return [];
  }
};
