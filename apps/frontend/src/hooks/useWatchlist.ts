import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { watchlistQueryOptions } from '../api/queries.ts';
import {
  useAddSymbolToWatchlist,
  useCreateWatchlist,
  useRemoveSymbolFromWatchlist
} from '../api/mutations.ts';

export const useWatchlist = () => {
  const { data: watchlists } = useSuspenseQuery(watchlistQueryOptions);

  const [watchlistId, setWatchlistId] = useState(() => watchlists[0].id);
  const selectedWatchlist = watchlists.find((watchlist) => watchlist.id === watchlistId);

  const addSymbol = useAddSymbolToWatchlist();
  const removeSymbol = useRemoveSymbolFromWatchlist();

  const toggleSymbolAction = (symbol: string) => {
    if (!selectedWatchlist) return;

    const isSymbolInWatchlist = selectedWatchlist?.symbols.some((s) => s.symbol === symbol);

    isSymbolInWatchlist
      ? removeSymbol.mutate({ watchlistId: selectedWatchlist.id, symbol })
      : addSymbol.mutate({ watchlistId: selectedWatchlist.id, symbol });
  };

  return {
    watchlists,
    selectedWatchlist,
    watchlistSymbols: selectedWatchlist?.symbols.map((symbol) => symbol.symbol) ?? [],
    setWatchlistId,
    toggleSymbolAction,
    createWatchlist: useCreateWatchlist()
  };
};
