import { Card } from './Card.tsx'
import AddStock from './AddStock.tsx'
import { SparkAreaChart } from './SparkChart.tsx'
import { symbols, chartData } from '../stubs'

let id = 0

export default function Portfolio() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold dark:text-white">
            Portfolio
          </h1>
          <AddStock />
        </div>
        <Card className="max-h-[25rem] overflow-scroll p-4">
          {symbols.map((symbol) => (
            <Card key={id++} className="flex items-center justify-between px-4 py-3.5 mb-2 last:mb-0">
              <div className="flex flex-col items-start grow">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {symbol.symbol}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {symbol.company}
                </span>
              </div>
              <SparkAreaChart
                data={chartData}
                categories={['Performance']}
                index={'month'}
                colors={['emerald']}
                className="h-8 w-20 sm:h-10 sm:w-36"
              />
              <div className="flex flex-col items-center ml-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  179.26
                </span>
                <span className="rounded bg-emerald-500 px-2 py-1 text-sm font-medium text-white">
                  {/* This should be Volume (shares traded) and not market cap */}
                  3.1T
                </span>
              </div>
            </Card>
          ))}
        </Card>
      </div>
    </>
  )
}
