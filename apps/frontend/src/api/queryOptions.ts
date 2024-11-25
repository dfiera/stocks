import { queryOptions } from '@tanstack/react-query'
import {
  fetchScreenerData,
  fetchStockInfo,
  fetchPriceChart,
  fetchStockNews
} from './data.ts'

export const screenerQueryOptions = queryOptions({
  queryKey: ['screener'],
  queryFn: () => fetchScreenerData()
})

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', { symbol }],
  queryFn: () => fetchStockInfo(symbol)
})

export const priceChartQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['priceChart', { symbol }],
  queryFn: () => fetchPriceChart(symbol)
})

export const stockNewsQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['news', { symbol }],
  queryFn: () => fetchStockNews(symbol)
})
