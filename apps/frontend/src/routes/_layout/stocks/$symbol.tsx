import { createFileRoute } from '@tanstack/react-router';
import {
  stockQueryOptions,
  quoteQueryOptions,
  priceChartQueryOptions,
  stockNewsQueryOptions,
} from '../../../api/queries.ts';
import Stock from '../../../components/Stock.tsx';

export const Route = createFileRoute('/_layout/stocks/$symbol')({
  beforeLoad: () => {
    return {
      stockQueryOptions,
      quoteQueryOptions,
      priceChartQueryOptions,
      stockNewsQueryOptions,
    };
  },
  loader: ({
    context: {
      queryClient,
      stockQueryOptions,
      quoteQueryOptions,
      priceChartQueryOptions,
      stockNewsQueryOptions,
    },
    params: { symbol },
  }) => {
    queryClient.ensureQueryData(stockQueryOptions(symbol));
    queryClient.ensureQueryData(quoteQueryOptions(symbol));
    queryClient.ensureQueryData(priceChartQueryOptions(symbol));
    queryClient.ensureQueryData(stockNewsQueryOptions(symbol));
  },
  component: StockComponent
})

function StockComponent() {
  const { symbol } = Route.useParams();

  return (
    <Stock symbol={symbol} />
  );
}
