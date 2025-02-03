import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import type { Filter } from '../types.ts';
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

export const symbolsQueryOptions = (search: string) => queryOptions({
  queryKey: ['symbols', { search }],
  queryFn: api.fetchFilteredSymbols,
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: false
});

export const watchlistQueryOptions = queryOptions({
  queryKey: ['watchlist'],
  queryFn: api.fetchWatchlists,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const marketMoversQueryOptions = (category: string) => queryOptions({
  queryKey: ['market', 'movers', category],
  queryFn: api.fetchMarketMovers,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const marketTrendsQueryOptions = (category: string) => queryOptions({
  queryKey: ['market', 'trends', category],
  queryFn: api.fetchMarketTrends,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const sectorPerformanceQueryOptions = queryOptions({
  queryKey: ['market', 'sectorPerformance'],
  queryFn: api.fetchSectorPerformance,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const marketSentimentQueryOptions = queryOptions({
  queryKey: ['market', 'sentiment'],
  queryFn: api.fetchMarketSentiment,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const screenerQueryOptions = ({ filters, search, page, pageSize }: { filters: Filter[]; search: string; page: number; pageSize: number }) => queryOptions({
  queryKey: ['screener', { filters, search, page, pageSize }],
  queryFn: api.fetchFilteredScreener,
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const stockQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', symbol],
  queryFn: api.fetchStockInfo,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const quoteQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['stock', 'quote', symbol],
  queryFn: api.fetchStockQuote,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const priceChartQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['priceChart', symbol],
  queryFn: api.fetchPriceChart,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});

export const stockNewsQueryOptions = (symbol: string) => queryOptions({
  queryKey: ['news', symbol],
  queryFn: api.fetchStockNews,
  refetchOnWindowFocus: false,
  staleTime: Infinity
});
