import { queryOptions } from '@tanstack/react-query'
import {
  fetchScreenerData,
  fetchStockData,
  fetchTickerData
} from './lib/data.ts'

export const screenerQueryOptions = queryOptions({
  queryKey: ['screener'],
  queryFn: () => fetchScreenerData()
})

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', { symbol }],
  queryFn: () => fetchStockData(symbol)
})

export const tickerQueryOptions = (ticker: string) => queryOptions({
  queryKey: ['ticker', { ticker }],
  queryFn: () => fetchTickerData(ticker)
})
