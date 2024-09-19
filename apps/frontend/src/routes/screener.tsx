import { createFileRoute } from '@tanstack/react-router'
import { screenerQueryOptions } from '../queryOptions.ts'
import Screener from '../components/Screener.tsx'

export const Route = createFileRoute('/screener')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(screenerQueryOptions)
  },
  component: Screener,
})
