export const fetchScreenerData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/screener');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}

export const fetchStockInfo = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_key, symbol] = queryKey;
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/info`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}

export const fetchPriceChart = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_key, symbol] = queryKey;
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/prices`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}

export const fetchStockNews = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_key, symbol] = queryKey;
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/news`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}
