export const fetchScreenerData = async () => {
  const response = await fetch('http://localhost:3000/api/screener')
  return await response.json()
}

export const fetchStockInfo = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/info`)
  return await response.json()
}

export const fetchPriceChart = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/prices`)
  return await response.json()
}

export const fetchStockNews = async (symbol: string) => {
  const response = await fetch(`http://localhost:3000/api/stocks/${symbol}/news`)
  return await response.json()
}
