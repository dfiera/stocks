import { startTransition, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiArrowUpSFill,
  RiArrowUpSLine,
  RiBarChartFill
} from '@remixicon/react';
import { marketMoversQueryOptions } from '../api/queries.ts';
import { numberFormatter } from '../lib/utils.ts';
import type { MarketMoversItem } from '../types.ts';
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

interface MarketMoversTableProps {
  data: MarketMoversItem[];
}

type Tab = 'gainers' | 'losers' | 'actives';

const TAB_CATEGORIES = {
  GAINERS: 'gainers',
  LOSERS: 'losers',
  ACTIVES: 'actives'
} as const;

const TAB_DATA = [
  {
    value: TAB_CATEGORIES.ACTIVES,
    label: 'Most Active',
    icon: RiBarChartFill
  },
  {
    value: TAB_CATEGORIES.GAINERS,
    label: 'Top Gainers',
    icon: RiArrowUpSLine
  },
  {
    value: TAB_CATEGORIES.LOSERS,
    label: 'Top Losers',
    icon: RiArrowDownSLine
  }
] as const;

function MarketMoversTable({ data }: MarketMoversTableProps) {
  return (
    <TableRoot className="overflow-y-auto h-72">
      <Table className="border-b-0 w-full table-auto">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Symbol</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Name</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A] text-right">Price</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A] text-right">Change</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">% Change</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.symbol}-${item.name}`}>
              <TableCell>
                <Link to="/stocks/$symbol" params={{ symbol: item.symbol }} className="text-gray-900 dark:text-gray-50">
                  {item.symbol}
                </Link>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="tabular-nums text-right">{numberFormatter.format(item.price)}</TableCell>
              <TableCell className="tabular-nums text-right">
                <span className={`${(item.change > 0) ? 'dark:text-emerald-400' : 'dark:text-red-400'}`}>
                  {(item.change > 0) ? '+' : ''}{numberFormatter.format(item.change)}
                </span>
              </TableCell>
              <TableCell className="tabular-nums">
                <Badge
                  variant={item.changePercentage > 0 ? 'success' : 'error'}
                  className="min-w-fit gap-0"
                >
                  {item.changePercentage > 0
                    ? <RiArrowUpSFill className="-ml-1 size-4 shrink-0" aria-hidden />
                    : <RiArrowDownSFill className="-ml-1 size-4 shrink-0" aria-hidden />
                  }
                  {numberFormatter.format(Math.abs(item.changePercentage))}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}

export default function MarketMovers() {
  const [tab, setTab] = useState<Tab>(TAB_CATEGORIES.ACTIVES);
  const { data } = useSuspenseQuery(marketMoversQueryOptions(tab));

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setTab(value as Tab);
    });
  };

  return (
    <>
      <Card className="text-gray-900 dark:text-gray-50">
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
            <MarketMoversTable data={data} />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
