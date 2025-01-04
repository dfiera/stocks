import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { marketMoversQueryOptions } from '../api/queries.ts';
import { Link } from '@tanstack/react-router';
import {RiArrowDownSFill, RiArrowDownSLine, RiArrowUpSFill, RiArrowUpSLine, RiBarChartFill} from '@remixicon/react';
import type { MarketMovers } from '../types.ts';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs.tsx';

type Tab = 'gainers' | 'losers' | 'actives';

const tabCategories = {
  gainers: 'gainers',
  losers: 'losers',
  actives: 'actives'
};

function MarketMoversTable({ data }: { data: MarketMovers[] }) {
  return (
    <TableRoot className="overflow-y-auto h-72">
      <Table className="border-b-0">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Symbol</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Name</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Price</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Change</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">% Change</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.symbol}-${item.name}`}>
              <TableCell>
                <Link to="/stocks/$symbol" params={{ symbol: item.symbol }}>
                  {item.symbol}
                </Link>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                  <span className={`${(item.change > 0) ? 'dark:text-emerald-400' : 'dark:text-red-400'}`}>
                    {(item.change > 0) ? '+' : ''}{item.change.toFixed(2)}
                  </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.changePercentage > 0 ? 'success' : 'error'}
                >
                  {
                    item.changePercentage > 0
                      ? <RiArrowUpSFill className="-ml-0.5 size-4" aria-hidden={true} />
                      : <RiArrowDownSFill className="-ml-0.5 size-4" aria-hidden={true} />
                  }
                  {Math.abs(item.changePercentage).toFixed(2)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  )
}

export default function MarketMovers() {
  const [tab, setTab] = useState<Tab>(tabCategories.actives);
  const { data } = useSuspenseQuery(marketMoversQueryOptions(tab));

  return (
    <>
      <Card className="col-span-2 row-span-2 dark:text-white max-h-[25rem]">
        <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}>
          <TabsList variant="solid">
            <TabsTrigger value={tabCategories.actives} className="gap-1.5">
              <RiBarChartFill className="size-4" aria-hidden />
              Most Active
            </TabsTrigger>
            <TabsTrigger value={tabCategories.gainers} className="gap-1.5">
              <RiArrowUpSLine aria-hidden />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value={tabCategories.losers} className="gap-1.5">
              <RiArrowDownSLine aria-hidden />
              Top Losers
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value={tab}>
              <MarketMoversTable data={data} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </>
  )
}
