import { createFileRoute } from '@tanstack/react-router'
import { stockQueryOptions } from '../../queryOptions.ts'
import Stock from '../../components/Stock.tsx'

export const Route = createFileRoute('/stocks/$symbol')({
  loader: ({ context: { queryClient }, params: { symbol } }) => {
    return queryClient.ensureQueryData(stockQueryOptions(symbol))
  },
  component: Stock,
})
