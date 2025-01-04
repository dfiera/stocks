import MarketSentiment from './MarketSentiment.tsx';
import MarketMovers from './MarketMovers.tsx';
import Watchlist from './Watchlist.tsx'
import MarketTrends from './MarketTrends.tsx';
import SectorPerformance from './SectorPerformance.tsx';

export default function Markets() {
  return (
    <>
      <div className="grid grid-cols-[1fr,auto,1.1fr] grid-rows-[auto,auto,1fr] gap-4 h-full">
        <MarketSentiment />
        <MarketMovers />
        <Watchlist />
        <MarketTrends />
        <SectorPerformance />
      </div>
    </>
  )
}
