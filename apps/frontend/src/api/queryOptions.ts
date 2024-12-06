import { queryOptions } from '@tanstack/react-query';
import {
  fetchScreenerData,
  fetchStockInfo,
  fetchStockQuote,
  fetchPriceChart,
  fetchStockNews
} from './data.ts';

export const screenerQueryOptions = queryOptions({
  queryKey: ['screener'],
  queryFn: fetchScreenerData,
  refetchOnWindowFocus: false
});

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', symbol],
  queryFn: fetchStockInfo,
  refetchOnWindowFocus: false
});

export const quoteQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', 'quote', symbol],
  queryFn: fetchStockQuote,
  refetchOnWindowFocus: false
});

export const priceChartQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['priceChart', symbol],
  queryFn: fetchPriceChart,
  refetchOnWindowFocus: false
});

export const stockNewsQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['news', symbol],
  queryFn: fetchStockNews,
  refetchOnWindowFocus: false
});
