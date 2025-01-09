import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { watchlistQueryOptions } from '../api/queries.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './Select.tsx';
import AddStock from './AddStock.tsx';
import { Card } from './Card.tsx';
import WatchlistSymbol from './WatchlistSymbol.tsx';

export default function Watchlist() {
  const { data: watchlists } = useSuspenseQuery(watchlistQueryOptions);
  const defaultWatchlist = watchlists[0].id;
  const [watchlistId, setWatchlistId] = useState(defaultWatchlist);

  const selectedWatchlist = watchlists.find((watchlist) => watchlist.id === watchlistId);

  return (
    <>
      <Card className="col-span-1 row-span-2 overflow-scroll p-4">
        <div className="flex items-center justify-between mb-3">
          <Select value={watchlistId} onValueChange={(value) => setWatchlistId(value)}>
            <SelectTrigger
              className="h-10 mx-auto font-bold border-none focus:outline-none hover:bg-gray-100 hover:dark:bg-gray-900">
              <SelectValue placeholder="Watchlist" aria-label={selectedWatchlist?.name}/>
            </SelectTrigger>
            <SelectContent>
              {
                watchlists.map((watchlist) => (
                  <SelectItem key={watchlist.id} value={watchlist.id}>
                    {watchlist.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <AddStock/>
        </div>
        {
          selectedWatchlist?.symbols.map((symbol) => (
            <WatchlistSymbol key={symbol.symbol} data={symbol}/>
          ))
        }
      </Card>
    </>
  )
}
