import { queryOptions } from '@tanstack/react-query';
import * as api from './data.ts';

export const checkAuthQueryOptions = queryOptions({
  queryKey: ['isAuthenticated'],
  queryFn: api.checkAuth,
  select: (data: { authenticated: boolean }) => {
    return data.authenticated;
  },
  refetchOnWindowFocus: false,
  retry: false,
  staleTime: Infinity
});

export const screenerQueryOptions = queryOptions({
  queryKey: ['screener'],
  queryFn: api.fetchScreenerData,
  refetchOnWindowFocus: false
});

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', symbol],
  queryFn: api.fetchStockInfo,
  refetchOnWindowFocus: false
});

export const quoteQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', 'quote', symbol],
  queryFn: api.fetchStockQuote,
  refetchOnWindowFocus: false
});

export const priceChartQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['priceChart', symbol],
  queryFn: api.fetchPriceChart,
  refetchOnWindowFocus: false
});

export const stockNewsQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['news', symbol],
  queryFn: api.fetchStockNews,
  refetchOnWindowFocus: false
});
