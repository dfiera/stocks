import { useSuspenseQuery } from '@tanstack/react-query';
import { RiArrowDownSFill, RiArrowUpSFill } from '@remixicon/react';
import { sectorPerformanceQueryOptions } from '../api/queries.ts';
import { Card } from './Card.tsx';
import { Badge } from './Badge.tsx';

export default function SectorPerformance() {
  const { data } = useSuspenseQuery(sectorPerformanceQueryOptions);

  return (
    <>
      <Card className="text-gray-900 dark:text-gray-50 h-full">
        <h3 className="text-lg font-semibold leading-none tracking-tight pb-6">Sector Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
        {data.map((item) => (
          <div
            key={item.sector}
            className="flex justify-between items-center text-sm tabular-nums"
          >
            <span className="font-medium line-clamp-2 hover:overflow-visible">{item.sector}</span>
            <Badge
              variant={item.changePercentage > 0 ? 'success' : 'error'}
              className="min-w-fit gap-0 ring-0"
            >
              {item.changePercentage > 0
                ? <RiArrowUpSFill className="-ml-1 size-4 shrink-0" aria-hidden />
                : <RiArrowDownSFill className="-ml-1 size-4 shrink-0" aria-hidden />
              }
              {Math.abs(item.changePercentage).toFixed(1)}%
            </Badge>
          </div>
        ))}
        </div>
      </Card>
    </>
  );
}
