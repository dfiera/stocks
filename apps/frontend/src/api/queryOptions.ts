import { queryOptions } from '@tanstack/react-query'
import {
  fetchScreenerData,
  fetchStockData,
  fetchStockPriceChart
} from './api/data.ts'

export const screenerQueryOptions = queryOptions({
  queryKey: ['screener'],
  queryFn: () => fetchScreenerData()
})

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', { symbol }],
  queryFn: () => fetchStockData(symbol)
})

export const stockPriceChartQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['priceChart', { symbol }],
  queryFn: () => fetchStockPriceChart(symbol)
})
