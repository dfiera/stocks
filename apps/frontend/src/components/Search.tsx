import { startTransition, useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { RiSearchLine } from '@remixicon/react';
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

export default function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data } = useSuspenseQuery(symbolsQueryOptions(search));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className="group gap-2"
      >
        <RiSearchLine className="size-4 fill-gray-500 group-hover:dark:fill-gray-400" aria-hidden />
        <span className="text-sm text-gray-500 group-hover:dark:text-gray-400">
          Search
        </span>
        <kbd className="hidden h-5 ml-2 items-center text-center gap-0.5 rounded border border-gray-500 group-hover:dark:border-gray-400 px-1.5 text-gray-500 group-hover:dark:text-gray-400 font-semibold sm:inline-flex">
          <kbd className="text-[13px]">⌘</kbd>
          <kbd className="text-[10px]">K</kbd>
        </kbd>
      </Button>
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
            {
              data.map((searchResult) => (
                <Link
                  key={searchResult.id}
                  to="/stocks/$symbol"
                  params={{ symbol: searchResult.symbol }}
                  onClick={() => {
                    setOpen(false);
                    setSearch('');
                  }}
                  preload={false}
                >
                  <CommandItem
                    value={`${searchResult.symbol}-${searchResult.name}-${searchResult.exchangeShortName}`}
                    className="flex-col text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-900 dark:text-gray-50 font-semibold">{searchResult.symbol}</span>
                      <span className="text-xs text-gray-500 font-medium">{searchResult.exchangeShortName}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-1">{searchResult.name}</p>
                  </CommandItem>
                </Link>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
