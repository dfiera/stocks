import { useQueryClient } from '@tanstack/react-query';
import {
  priceChartQueryOptions,
  quoteQueryOptions,
  stockNewsQueryOptions,
  stockQueryOptions
} from '../api/queries.ts';

export const usePrefetchSymbolData = () => {
  const queryClient = useQueryClient();

  const prefetchSymbolData = async (symbol: string) => {
    await Promise.all([
      queryClient.prefetchQuery(stockQueryOptions(symbol)),
      queryClient.prefetchQuery(quoteQueryOptions(symbol)),
      queryClient.prefetchQuery(priceChartQueryOptions(symbol)),
      queryClient.prefetchQuery(stockNewsQueryOptions(symbol))
    ]);
  };

  return prefetchSymbolData;
};
