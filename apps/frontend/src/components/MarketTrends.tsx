import { startTransition, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiBtcLine,
  RiExchangeLine,
  RiFundsLine
} from '@remixicon/react';
import { marketTrendsQueryOptions } from '../api/queries.ts';
import { numberFormatter } from '../lib/utils.ts';
import type { MarketTrendsItem } from '../types.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow
} from './Table.tsx';
import { Badge } from './Badge.tsx';
import { Card } from './Card.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from './Tabs.tsx';

interface MarketTrendsTableProps {
  data: MarketTrendsItem[];
}

type Tab = 'indices' | 'currencies' | 'crypto';

const TAB_CATEGORIES = {
  INDICES: 'indices',
  CURRENCIES: 'currencies',
  CRYPTO: 'crypto'
} as const;

const TAB_DATA = [
  {
    value: TAB_CATEGORIES.INDICES,
    label: 'Indices',
    icon: RiFundsLine
  },
  {
    value: TAB_CATEGORIES.CURRENCIES,
    label: 'Currencies',
    icon: RiExchangeLine
  },
  {
    value: TAB_CATEGORIES.CRYPTO,
    label: 'Crypto',
    icon: RiBtcLine
  }
] as const;

function MarketTrendsTable({ data }: MarketTrendsTableProps) {
  const hasCountryColumn = data.some(item => item.country);

  return (
    <TableRoot className="overflow-y-auto max-h-80">
      <Table className="border-b-0 w-full table-auto">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Name</TableHeaderCell>
            {hasCountryColumn && (
              <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Country</TableHeaderCell>
            )}
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A] text-right">Price</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Change</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.symbol}-${item.name}`}>
              <TableCell className="text-gray-900 dark:text-gray-50">
                {item.prettySymbol ?? item.name}
              </TableCell>
              {hasCountryColumn && (
                <TableCell>
                  {item.country?.name}
                </TableCell>
              )}
              <TableCell className="tabular-nums text-right">
                {numberFormatter.format(item.price)}
              </TableCell>
              <TableCell className="tabular-nums">
                <Badge
                  variant={item.priceChange > 0 ? 'success' : 'error'}
                  className="min-w-fit gap-0"
                >
                  {item.priceChange > 0
                    ? <RiArrowUpSFill className="-ml-1 size-4 shrink-0" aria-hidden />
                    : <RiArrowDownSFill className="-ml-1 size-4 shrink-0" aria-hidden />
                  }
                  {numberFormatter.format(Math.abs(item.priceChange))}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}

export default function MarketTrends() {
  const [tab, setTab] = useState<Tab>(TAB_CATEGORIES.INDICES);
  const { data } = useSuspenseQuery(marketTrendsQueryOptions(tab));

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setTab(value as Tab);
    });
  };

  return (
    <>
      <Card className="text-gray-900 dark:text-gray-50 overflow-x-auto h-full">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 sm:inline-flex" variant="solid">
            {TAB_DATA.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-9 gap-1.5 px-3 py-1.5"
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab} className="mt-4">
            <MarketTrendsTable data={data} />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
