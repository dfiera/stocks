import { createFileRoute } from '@tanstack/react-router'
import { screenerQueryOptions } from '../../api/queries.ts'
import Screener from '../../components/Screener.tsx'

export const Route = createFileRoute('/_layout/screener')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(screenerQueryOptions)
  },
  component: Screener,
})
