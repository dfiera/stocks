import type {
  LoginCredentials,
  NewsArticle,
  PriceChart,
  Quote,
  Watchlist
} from '../types.ts';

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
