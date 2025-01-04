import type { WatchlistSymbol } from '../types.ts';
import { Card } from './Card.tsx';
import { SparkAreaChart } from './SparkChart.tsx';

export default function WatchlistSymbol({ data }: { data: WatchlistSymbol }) {
  const { symbol, name, quote, priceChart } = data;
  const { price, changePercentage } = quote;

  return (
    <Card className="flex items-center justify-between px-4 py-3.5 mb-2 last:mb-0">
      <div className="flex flex-col items-start grow">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {symbol}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {name}
        </span>
      </div>
      <SparkAreaChart
        data={priceChart.values}
        index="datetime"
        categories={['close']}
        colors={['emerald']}
        autoMinValue={true}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex flex-col items-center ml-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {price.toFixed(2)}
        </span>
        <span className="text-xs rounded bg-emerald-500 px-2 py-1 font-medium text-white">
          {changePercentage > 0 ? '+' : ''}{changePercentage.toFixed(2)}%
        </span>
      </div>
    </Card>
  )
}
