import React, { startTransition, useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Slot } from '@radix-ui/react-slot';
import {
  RiAddFill,
  RiCheckboxCircleFill
} from '@remixicon/react';
import { symbolsQueryOptions } from '../api/queries.ts';
import { Button } from './Button.tsx';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './CommandMenu.tsx';

type SymbolSearchProps = {
  variant?: 'global' | 'watchlist';
  trigger: React.ReactNode;
  selectedSymbols?: string[];
  onToggleSymbol?: (symbol: string) => void;
};

export default function SymbolSearch({ variant = 'global', trigger, selectedSymbols, onToggleSymbol }: SymbolSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data } = useSuspenseQuery(symbolsQueryOptions(search));

  useEffect(() => {
    if (variant !== 'global') return;

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [variant]);

  const SearchTrigger = trigger ? Slot : Button;

  return (
    <div>
      <SearchTrigger
        variant='light'
        className="w-full group gap-2 items-center justify-start"
        onClick={() => setOpen(true)}
      >
        {trigger}
      </SearchTrigger>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search by symbol or name"
          value={search}
          onValueChange={(search) => {
            startTransition(() => setSearch(search));
          }}
        />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Symbols">
            {data.map((searchResult) => (
              <CommandItem
                key={searchResult.id}
                value={`${searchResult.symbol}-${searchResult.name}-${searchResult.exchangeShortName}`}
                className="items-center gap-x-4 text-sm"
              >
                {onToggleSymbol && (
                  <Button
                    variant="ghost"
                    onClick={() => onToggleSymbol(searchResult.symbol)}
                    className="group dark:hover:bg-gray-800/80"
                  >
                    {selectedSymbols?.includes(searchResult.symbol) ? (
                      <RiCheckboxCircleFill className="size-6 shrink-0 fill-emerald-500 group-hover:fill-emerald-400" aria-hidden />
                    ) : (
                      <RiAddFill className="size-6 shrink-0 fill-blue-500 group-hover:fill-blue-400" aria-hidden />
                    )}
                  </Button>
                )}
                <Link
                  to="/stocks/$symbol"
                  params={{symbol: searchResult.symbol}}
                  onClick={() => {
                    setOpen(false);
                    setSearch('');
                  }}
                  preload={false}
                  className="w-full"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-900 dark:text-gray-50 font-semibold">{searchResult.symbol}</span>
                    <span className="text-xs text-gray-500 font-medium">{searchResult.exchangeShortName}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-1">{searchResult.name}</p>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
