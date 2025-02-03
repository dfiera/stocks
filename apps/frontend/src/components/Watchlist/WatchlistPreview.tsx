import { Link } from '@tanstack/react-router';
import {
  RiSearchLine
} from '@remixicon/react';
import { Card } from '../Card.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../Select.tsx';
import WatchlistActions from './WatchlistActions.tsx';
import SymbolSearch from '../SymbolSearch.tsx';
import { Button } from '../Button.tsx';
import { symbols } from './stubs.ts';
import WatchlistSymbol from './WatchlistSymbol.tsx';

export default function WatchlistPreview() {
  return (
    <Card className="h-full p-4 overflow-hidden">
      <div className="blur-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Select defaultValue="default">
              <SelectTrigger className="w-fit font-semibold hover:bg-gray-100 dark:bg-transparent dark:border-transparent dark:hover:bg-gray-800/80">
                <SelectValue placeholder="Select a watchlist" />
              </SelectTrigger>
              <SelectContent className="min-w-52">
                <SelectItem value="default">
                  My Symbols
                </SelectItem>
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
          />
        </div>
        <div className="mt-4 h-[30rem] overflow-auto">
          {symbols.map((symbol) => (
            <WatchlistSymbol key={symbol.symbol} data={symbol} />
          ))}
        </div>
      </div>


      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090E1A]/90 to-[#090E1A]" />

      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#090E1A] via-[#090E1A]/95 to-[#090E1A]/80 border-t border-gray-200 dark:border-gray-900">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Watchlists
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Create an account to manage watchlists and track your favourite stocks in real-time.
            </p>
          </div>
          <div className="space-y-2">
            <Button
              className="w-full text-sm font-semibold"
              asChild
            >
              <Link to="/register">
                Create Account
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm font-semibold"
              asChild
            >
              <Link to="/login">
                Log In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
