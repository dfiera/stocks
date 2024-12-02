import { createFileRoute } from '@tanstack/react-router';
import {
  stockQueryOptions,
  priceChartQueryOptions,
  stockNewsQueryOptions
} from '../../api/queryOptions.ts';
import Stock from '../../components/Stock.tsx';

export const Route = createFileRoute('/stocks/$symbol')({
  beforeLoad: () => {
    return {
      stockQueryOptions,
      priceChartQueryOptions,
      stockNewsQueryOptions
    }
  },
  loader: ({
    context: {
      queryClient,
      stockQueryOptions,
      priceChartQueryOptions,
      stockNewsQueryOptions
    },
    params: { symbol }
  }) => {
    queryClient.prefetchQuery(stockQueryOptions(symbol));
    queryClient.prefetchQuery(priceChartQueryOptions(symbol));
    queryClient.prefetchQuery(stockNewsQueryOptions(symbol));
  },
  component: Stock
});
