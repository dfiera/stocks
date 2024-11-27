import { createFileRoute } from '@tanstack/react-router';
import { screenerQueryOptions } from '../api/queryOptions.ts';
import Screener from '../components/Screener.tsx';

export const Route = createFileRoute('/screener')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(screenerQueryOptions);
  },
  component: Screener
});
