import { createFileRoute } from '@tanstack/react-router';
import {
  stockQueryOptions,
  priceChartQueryOptions,
  stockNewsQueryOptions
} from '../../api/queryOptions.ts';
import Stock from '../../components/Stock.tsx';

export const Route = createFileRoute('/stocks/$symbol')({
  loader: ({ context: { queryClient }, params: { symbol } }) => {
    queryClient.ensureQueryData(stockQueryOptions(symbol));
    queryClient.ensureQueryData(priceChartQueryOptions(symbol));
    queryClient.ensureQueryData(stockNewsQueryOptions(symbol));
  },
  component: Stock
});
