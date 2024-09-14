import Watchlist from './Watchlist.tsx'
import { Card } from './Card.tsx'

export default function Markets() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Watchlist />
        <Card className="dark:text-white">Top Gainers, Losers, and Most Actively Traded Tickers</Card>
        <Card className="dark:text-white">WIP</Card>
        <Card className="dark:text-white col-span-3">WIP</Card>
      </div>
    </>
  )
}
