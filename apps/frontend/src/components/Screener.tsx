import { startTransition, useEffect, useState } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { screenerQueryOptions } from '../api/queries.ts';
import type { Filter } from '../types.ts';
import { Button } from './Button.tsx';
import { Card } from './Card.tsx';
import { Input } from './Input.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow
} from './Table.tsx';
import FilterStocks from './Filter.tsx';

type AttributeType = 'string' | 'number';

export interface FilterAttribute {
  value: string;
  label: string;
  type: AttributeType;
}

const PAGE_SIZE = 12;
const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export interface FilterCondition {
  value: string;
  label: string;
  supportedTypes: AttributeType[];
}

const attributes: FilterAttribute[] = [
  { value: 'exchange_short_name', label: 'Exchange', type: 'string' },
  { value: 'sector', label: 'Sector', type: 'string' },
  { value: 'price', label: 'Price', type: 'number' },
  { value: 'volume', label: 'Volume', type: 'number' },
  { value: 'market_cap', label: 'Market Cap', type: 'number' },
  { value: 'dividend_yield', label: 'Dividend Yield', type: 'number' },
  { value: 'beta', label: 'Beta', type: 'number' }
];

const conditions: FilterCondition[] = [
  { value: 'ct', label: 'Contains', supportedTypes: ['string'] },
  { value: 'nct', label: 'Not contains', supportedTypes: ['string'] },
  { value: 'gte', label: 'Is greater than or equal to', supportedTypes: ['number'] },
  { value: 'lt', label: 'Is less than', supportedTypes: ['number'] }
];

export default function Screener() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filter[]>([]);

  const queryClient = useQueryClient();
  const { data: queryData } = useSuspenseQuery(screenerQueryOptions({ filters, search, page, pageSize: PAGE_SIZE }));

  const { data, totalCount, pageCount } = queryData;
  const hasMoreData = page < pageCount;
  const isTableEmpty = data.length === 0;

  const startIndex = nf.format((page - 1) * PAGE_SIZE + 1);
  const endIndex = nf.format(Math.min(page * PAGE_SIZE, totalCount));

  // Prefetch the next page
  useEffect(() => {
    if (hasMoreData) {
      queryClient.prefetchQuery(screenerQueryOptions({ filters, search, page: page + 1, pageSize: PAGE_SIZE }));
    }
  }, [page, queryClient]);

  const handleApplyFilters = (filters: Filter[]) => {
    setFilters(filters);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <FilterStocks
          attributes={attributes}
          conditions={conditions}
          onApply={handleApplyFilters}
        />
        <Input
          className="sm:max-w-xs"
          placeholder="Search by symbol or name"
          id="search"
          name="search"
          type="search"
          value={search}
          onChange={(event) => {
            startTransition(() => {
              setSearch(event.target.value);
            });
          }}
        />
      </div>
      <Card className="overflow-hidden">
        <TableRoot>
          <Table className="w-full border-b-0 min-w-[56rem]">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="whitespace-nowrap">Symbol</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap">Name</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap">Country</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap">Exchange</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap">Sector</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap text-right">Price</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap text-right">Volume</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap text-right">Market Cap</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap text-right">Dividend Yield</TableHeaderCell>
                <TableHeaderCell className="whitespace-nowrap text-right">Beta</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTableEmpty ? (
                <TableRow>
                  <TableCell colSpan={10} className="p-0 pt-6 text-center">
                    <span>No results.</span>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="dark:hover:bg-gray-900/60">
                    <TableCell className="whitespace-nowrap">
                      <Link to="/stocks/$symbol" params={{symbol: item.symbol}} className="dark:text-blue-500">
                        {item.symbol}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.country || '-'}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.exchangeShortName}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.sector || '-'}</TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums text-right">{nf.format(item.price)}</TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums text-right">
                      {nf.format(item.volume)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums text-right">
                      {nf.format(item.marketCap)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums text-right">{nf.format(item.lastAnnualDividend)}</TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums text-right">{nf.format(item.beta)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableRoot>
      </Card>
      <div className="flex items-center justify-between">
        <p className="text-sm tabular-nums text-gray-500 dark:text-gray-500">
          Showing{' '}
          <span className="text-gray-900 dark:text-gray-50 font-semibold">
            {isTableEmpty ? '0' : startIndex}
          </span>{' '}
          -{' '}
          <span className="text-gray-900 dark:text-gray-50 font-semibold">
            {endIndex}
          </span>{' '}
          of{' '}
          <span className="text-gray-900 dark:text-gray-50 font-semibold">
            {nf.format(totalCount)}
          </span>
        </p>
        <div className="flex items-center gap-x-6">
          <p className="hidden text-sm tabular-nums dark:text-gray-500 sm:block">
            Page{' '}
            <span className="text-gray-900 dark:text-gray-50 font-semibold">
              {isTableEmpty ? '0' : nf.format(page)}
            </span>{' '}
            of{' '}
            <span className="text-gray-900 dark:text-gray-50 font-semibold">
              {nf.format(pageCount)}
            </span>
          </p>
          <div className="flex items-center gap-x-1.5">
            <Button
              onClick={() => {
                startTransition(() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                });
              }}
              disabled={page === 1}
              variant="secondary"
              className="p-1.5 font-semibold aspect-square sm:aspect-auto sm:min-w-24 sm:px-3 sm:py-2"
            >
              <RiArrowLeftSLine className="size-4 shrink-0 sm:hidden" aria-hidden />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              onClick={() => {
                startTransition(() => {
                  setPage((prev) => hasMoreData ? prev + 1 : prev);
                });
              }}
              disabled={!hasMoreData}
              variant="secondary"
              className="p-1.5 font-semibold aspect-square sm:aspect-auto sm:min-w-24 sm:px-3 sm:py-2"
            >
              <span className="hidden sm:inline">Next</span>
              <RiArrowRightSLine className="size-4 shrink-0 sm:hidden" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
