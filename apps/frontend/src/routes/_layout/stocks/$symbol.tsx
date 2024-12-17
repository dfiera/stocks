import { createFileRoute } from '@tanstack/react-router'
import {
  stockQueryOptions,
  quoteQueryOptions,
  priceChartQueryOptions,
  stockNewsQueryOptions,
} from '../../../api/queries.ts'
import Stock from '../../../components/Stock.tsx'

export const Route = createFileRoute('/_layout/stocks/$symbol')({
  beforeLoad: () => {
    return {
      stockQueryOptions,
      quoteQueryOptions,
      priceChartQueryOptions,
      stockNewsQueryOptions,
    }
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
    queryClient.prefetchQuery(stockQueryOptions(symbol))
    queryClient.prefetchQuery(quoteQueryOptions(symbol))
    queryClient.prefetchQuery(priceChartQueryOptions(symbol))
    queryClient.prefetchQuery(stockNewsQueryOptions(symbol))
  },
  component: Stock,
})
