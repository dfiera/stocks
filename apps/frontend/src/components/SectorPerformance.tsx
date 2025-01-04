import { useSuspenseQuery } from '@tanstack/react-query';
import { sectorPerformanceQueryOptions } from '../api/queries.ts';
import { cx } from '../lib/utils.ts';
import { Card } from './Card.tsx';

export default function SectorPerformance() {
  const { data } = useSuspenseQuery(sectorPerformanceQueryOptions);

  return (
    <>
      <Card className="col-span-1 dark:text-white max-h-[25rem]">
        <h3 className="text-lg font-semibold leading-none tracking-tight pb-6">Sector Performance</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {
            data.map((item) => (
              <div
                key={item.sector}
                className="flex w-full flex-row justify-between items-center text-sm"
              >
                <span className="font-medium overflow-hidden text-ellipsis hover:overflow-visible">{item.sector}</span>
                <span
                  className={cx(
                    "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right",
                    item.changePercentage > 0
                      ? "bg-gradient-to-l from-emerald-300 text-emerald-800 dark:from-emerald-950/90 dark:text-emerald-400"
                      : "bg-gradient-to-l from-red-300 text-red-800 dark:from-red-950/90 dark:text-red-400"
                  )}
                >
                  {(item.changePercentage > 0) ? '+' : ''}{item.changePercentage.toFixed(2)}%
                </span>
              </div>
            ))
          }
        </div>
      </Card>
    </>
  )
}
