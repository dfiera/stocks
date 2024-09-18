import Portfolio from './Portfolio.tsx'
import { Card } from './Card.tsx'

export default function Markets() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Portfolio />
        <Card className="dark:text-white">Market News and Sentiment </Card>
        <Card className="dark:text-white">Top Gainers, Losers, and Most Actively Traded Tickers</Card>

        <Card className="dark:text-white col-span-3">WIP</Card>
      </div>
    </>
  )
}
