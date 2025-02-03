import {
  RiAddFill,
  RiLineChartLine,
  RiSearchLine
} from '@remixicon/react';
import { useWatchlist } from '../../hooks/useWatchlist.ts';
import { SymbolDetails, useSymbolDetails } from '../SymbolDetails.tsx';
import { Card } from '../Card.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '../Select.tsx';
import { Button } from '../Button.tsx';
import WatchlistActions from './WatchlistActions.tsx';
import SymbolSearch from '../SymbolSearch.tsx';
import CreateWatchlist from './CreateWatchlist.tsx';
import WatchlistSymbol from './WatchlistSymbol.tsx';

const EmptyWatchlist = () => {
  return (
    <div className="mt-4 h-[30rem] overflow-auto">
      <div className="flex h-full items-center justify-center text-gray-500">
        <div className="text-center">
          <RiLineChartLine className="mx-auto h-7 w-7" aria-hidden />
          <p className="mt-2 text-md font-semibold text-white">
            No Symbols
          </p>
          <p className="mt-1 text-sm font-medium">
            Add symbols to see price quotes.
          </p>
          <Button variant="primary" className="mt-6 inline-flex items-center gap-1.5 font-semibold">
            <RiAddFill className="-ml-1 size-5 shrink-0" aria-hidden />
            Add Symbol
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Watchlist() {
  const {
    watchlists,
    selectedWatchlist,
    watchlistSymbols,
    setWatchlistId,
    toggleSymbolAction,
    createWatchlist
  } = useWatchlist();
  const { isOpen, symbol, openSymbolDetails, onOpenChange } = useSymbolDetails();

  return (
    <Card className="h-full p-4 overflow-hidden">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Select value={selectedWatchlist?.id} onValueChange={setWatchlistId}>
            <SelectTrigger
              className="w-fit font-semibold hover:bg-gray-100 dark:bg-transparent dark:border-transparent dark:hover:bg-gray-800/80">
              <SelectValue placeholder="Select a watchlist" aria-label={selectedWatchlist?.name} />
            </SelectTrigger>
            <SelectContent className="min-w-52">
              <SelectGroup>
                <SelectGroupLabel>Watchlists</SelectGroupLabel>
                {
                  watchlists.map((watchlist) => (
                    <SelectItem key={watchlist.id} value={watchlist.id}>
                      {watchlist.name}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
              <SelectSeparator />
              <CreateWatchlist onCreate={createWatchlist} />
            </SelectContent>
          </Select>
          <WatchlistActions />
        </div>
        <SymbolSearch
          variant="watchlist"
          trigger={
            <Button>
              <RiSearchLine className="size-4 shrink-0 fill-gray-500 group-hover:dark:fill-gray-400" aria-hidden />
              <span className="text-sm text-gray-500 group-hover:dark:text-gray-400">
                Search
              </span>
            </Button>
          }
          selectedSymbols={watchlistSymbols}
          onToggleSymbol={toggleSymbolAction}
        />
      </div>
      <div className="mt-4 h-[30rem] overflow-auto">
        {selectedWatchlist?.symbols.length === 0 ? (
          <EmptyWatchlist />
        ) : (
          selectedWatchlist?.symbols.map((symbol) => (
            <WatchlistSymbol
              key={symbol.symbol}
              data={symbol}
              onClick={() => openSymbolDetails(symbol.symbol)}
            />
          ))
        )}
      </div>
      <SymbolDetails
        open={isOpen}
        symbol={symbol}
        onOpenChange={onOpenChange}
      />
    </Card>
  );
}
