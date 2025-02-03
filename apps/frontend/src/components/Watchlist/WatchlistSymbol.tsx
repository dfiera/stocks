import type { WatchlistSymbol } from '../../types.ts';
import { Card } from '../Card.tsx';
import { SparkAreaChart } from '../SparkChart.tsx';
import { Badge } from '../Badge.tsx';

export default function WatchlistSymbol({ data, onClick }: { data: WatchlistSymbol }) {
  const { symbol, name, quote, priceChart } = data;
  const { price, changePercentage } = quote;

  return (
    <Card className="flex items-center gap-4 rounded-none border-t-0 border-x-0 px-2 py-3 mb-2 last:mb-0 last:border-b-0">
      <div
        className="flex flex-col gap-y-0.5 w-36 min-w-[9rem]"
        onClick={onClick}
      >
        <dt className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
          {symbol}
        </dt>
        <dl className="line-clamp-1 text-xs font-medium text-gray-600 dark:text-gray-400">
          {name}
        </dl>
      </div>

      <SparkAreaChart
        data={priceChart.values}
        index="datetime"
        categories={['close']}
        colors={changePercentage > 0 ? ['emerald'] : ['red']}
        autoMinValue={true}
        className="flex-1 h-10 min-w-12"
      />

      <div className="flex flex-col items-end gap-y-0.5 min-w-fit tabular-nums">
        <dd className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          {price.toFixed(2)}
        </dd>
        <dd className="font-medium">
          <Badge
            variant={changePercentage > 0 ? 'success' : 'error'}
            className="ring-0"
          >
            {changePercentage > 0 ? '+' : ''}{changePercentage.toFixed(2)}%
          </Badge>
        </dd>
      </div>
    </Card>
  )
}
