import { cx } from '../lib/utils.ts';
import MarketSentiment from './MarketSentiment.tsx';
import MarketMovers from './MarketMovers.tsx';
import WatchlistRoot from './Watchlist/WatchlistRoot.tsx';
import MarketTrends from './MarketTrends.tsx';
import SectorPerformance from './SectorPerformance.tsx';

export default function Markets() {
  return (
    <div className={cx(
      "grid grid-cols-1 gap-6",
      "lg:grid-cols-4 lg:gap-3",
      "xl:grid-cols-[1fr,1fr,1fr] xl:grid-rows-[auto,auto,1fr]"
    )}>
      <div className={cx(
        "col-span-1 max-h-52",
        "lg:max-h-none",
        "xl:max-h-52"
      )}>
        <MarketSentiment />
      </div>

      <div className={cx(
        "col-span-1",
        "lg:col-span-3",
        "xl:col-span-2 xl:row-span-2"
      )}>
        <MarketMovers />
      </div>

      <div className={cx(
        "col-span-1",
        "lg:col-span-2",
        "xl:col-span-1 xl:row-span-2"
      )}>
        <WatchlistRoot />
      </div>

      <div className={cx(
        "col-span-1",
        "lg:col-span-2",
        "xl:col-span-1 xl:min-w-[34rem]"
      )}>
        <MarketTrends />
      </div>

      <div className={cx(
        "col-span-1",
        "lg:col-span-4",
        "xl:col-span-1"
      )}>
        <SectorPerformance />
      </div>
    </div>
  );
}
