import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {marketMoversQueryOptions, marketTrendsQueryOptions} from '../api/queries.ts';
import { Link } from '@tanstack/react-router';
import {RiFundsLine, RiBtcLine, RiExchangeLine, RiArrowUpSFill, RiArrowDownSFill} from '@remixicon/react';
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

type Tab = 'indices' | 'currencies' | 'crypto';

const tabCategories = {
  indices: 'indices',
  currencies: 'currencies',
  crypto: 'crypto'
};

function MarketTrendsTable({ tab, data }) {
  return (
    <TableRoot className="overflow-y-auto h-72">
      <Table className="border-b-0">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Name</TableHeaderCell>
            {
              tab === tabCategories.indices && <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Country</TableHeaderCell>
            }
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Price</TableHeaderCell>
            <TableHeaderCell className="sticky top-0 dark:bg-[#090E1A]">Change</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.symbol}-${item.name}`}>
              <TableCell>
                {item.prettySymbol ? item.prettySymbol : item.name}
              </TableCell>
              {
                item.country && (
                  <TableCell>
                    {item.country.name}
                  </TableCell>
                )
              }
              <TableCell>{item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={item.priceChange > 0 ? 'success' : 'error'}
                >
                  {
                    item.priceChange > 0
                      ? <RiArrowUpSFill className="-ml-0.5 size-4" aria-hidden={true} />
                      : <RiArrowDownSFill className="-ml-0.5 size-4" aria-hidden={true} />
                  }
                  {Math.abs(item.priceChange).toFixed(2)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  )
}

export default function MarketTrends() {
  const [tab, setTab] = useState<Tab>(tabCategories.indices);
  const { data } = useSuspenseQuery(marketTrendsQueryOptions(tab));

  return (
    <>
      <Card className="col-span-1 dark:text-white max-h-[25rem]">
        <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}>
          <TabsList className="grid w-full grid-cols-3" variant="solid">
            <TabsTrigger value={tabCategories.indices} className="gap-1.5">
              <RiFundsLine className="size-4" aria-hidden />
              Indices
            </TabsTrigger>
            <TabsTrigger value={tabCategories.currencies} className="gap-1.5">
              <RiExchangeLine className="size-4" aria-hidden />
              Currencies
            </TabsTrigger>
            <TabsTrigger value={tabCategories.crypto} className="gap-1.5">
              <RiBtcLine className="size-4" aria-hidden />
              Crypto
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value={tab}>
              <MarketTrendsTable tab={tab} data={data} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </>
  )
}
