
export const fetchScreenerData = async () => {
  const response = await fetch('http://localhost:3000/screener')
  return await response.json()
}

export const fetchStockData = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/overview/${symbol}`)
  return await response.json()
}

export const fetchTickerData = async (ticker: string) => {
  const response = await fetch(`http://localhost:3000/tickers/${ticker}`)
  return await response.json()
}
