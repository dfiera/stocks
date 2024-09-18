import { Card } from './Card.tsx'
import { AreaChart } from './AreaChart.tsx'
import type { Stock, Quote, CompanyOverview } from '../types.ts';

let id = 0

const symbolInfo = [
  {
    value: 'open',
    label: 'Open'
  },
  {
    value: 'volume',
    label: 'Volume'
  },
  {
    value: 'yearHigh',
    label: '52W High'
  },
  {
    value: 'yield',
    label: 'Yield'
  },
  {
    value: 'high',
    label: 'High'
  },
  {
    value: 'pe',
    label: 'P/E'
  },
  {
    value: 'yearLow',
    label: '52W Low'
  },
  {
    value: 'beta',
    label: 'Beta'
  },
  {
    value: 'low',
    label: 'Low'
  },
  {
    value: 'marketCap',
    label: 'Market Cap'
  },
  {
    value: 'avgVolume',
    label: 'Avg Volume'
  },
  {
    value: 'eps',
    label: 'EPS'
  }
]

export default function Stock({ data }: { data: Stock }) {
  const { overview, quote } = data

  return (
    <>
      <Card className="dark:text-white p-16">
        <div className="w-11/12 mx-auto">
          <div className="dark:text-gray-500 mb-4">
            <div className="space-x-1">
              <span className="text-xl font-bold dark:text-white">{overview.symbol}</span>
              <span className="font-semibold">·</span>
              <span>{overview.name}</span>
              <span className="font-semibold">·</span>
              <span>{overview.exchange}</span>
            </div>
            <div className="space-x-1">
              <span className="font-semibold text-nowrap space-x-1">
                <span className="text-xl font-bold dark:text-white">
                  {quote.price}
                </span>
                <span className="text-emerald-500">
                  {quote.change > 0 ? '+' : '-'}{quote.change} {`(${quote.price > 0 ? '+' : '-'}${quote.changePercentage}%)`}
                </span>
              </span>
            </div>
            <div className="md:space-x-1 font-semibold break-words">
              <span className="text-nowrap space-x-1">
                <span>
                  Pre-Market: $171.34
                </span>
                <span className="text-red-500">
                  -1.23 (-0.4%)
                </span>
              </span>
              <span className="hidden md:inline">·</span>
              <span className="text-nowrap space-x-1">
                <span>
                  Post-Market: $171.34
                </span>
                <span className="text-red-500">
                  -1.23 (-0.4%)
                </span>
              </span>
            </div>
          </div>
          <AreaChart
            data={data}
            index="date"
            categories={['revenue']}
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            colors={['emerald']}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 dark:text-gray-500">
            {
              symbolInfo.map((item) => (
                <div key={id++} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="dark:text-white">{quote[item.value as keyof Quote] || overview[item.value as keyof CompanyOverview]}</span>
                </div>
              ))
            }
          </div>
          <Card className="flex gap-6 text-sm mt-6 p-10">
            <p className="w-9/12 text-pretty">
              {overview.description}
            </p>
            <div className="text-gray-500">
              <div>
                Sector: <span className="text-white">{overview.sector}</span>
              </div>
              <div>
                Industry: <span className="text-white">{overview.industry}</span>
              </div>
              <div>
                Country: <span className="text-white">{overview.country}</span>
              </div>
              <div>
                Employees: <span className="text-white">{overview.employees}</span>
              </div>
              <div>
                Website:
                {' '}
                <a
                  className="text-blue-600 hover:underline dark:text-blue-500"
                  href={`${overview.website}`}
                >
                  {overview.website.slice(8)}
                </a>
              </div>
            </div>
          </Card>
          <h1 className="text-3xl font-bold dark:text-white mt-6 mb-4">
            Company News
          </h1>
          <Card className="grid grid-cols-2 gap-2 p-0 border-none">
            <Card className="p-8">
              <span className="font-thin">Reuters</span>
              <div className="flex items-center gap-4 mb-2">
                <p className="font-bold w-4/5">Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola</p>
                <img
                  src="/vite.svg"
                  width="64px"
                  height="64px"
                  alt="Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola"
                />
              </div>
              <div className="flex text-gray-500 space-x-2">
                <span>14 Sep 2024</span>
                <span className="font-bold">·</span>
                <span>John Doe</span>
              </div>
            </Card>
            <Card className="p-8">
              <span className="font-thin">Reuters</span>
              <div className="flex items-center gap-4 mb-2">
                <p className="font-bold w-4/5">Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola</p>
                <img
                  src="/vite.svg"
                  width="64px"
                  height="64px"
                  alt="Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola"
                />
              </div>
              <div className="flex text-gray-500 space-x-2">
                <span>14 Sep 2024</span>
                <span className="font-bold">·</span>
                <span>John Doe</span>
              </div>
            </Card>
            <Card className="p-8">
              <span className="font-thin">Reuters</span>
              <div className="flex items-center gap-4 mb-2">
                <p className="font-bold w-4/5">Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola</p>
                <img
                  src="/vite.svg"
                  width="64px"
                  height="64px"
                  alt="Prediction: This Stock Will Become Warren Buffett's Next Coca-Cola"
                />
              </div>
              <div className="flex text-gray-500 space-x-2">
                <span>14 Sep 2024</span>
                <span className="font-bold">·</span>
                <span>John Doe</span>
              </div>
            </Card>
          </Card>
        </div>
      </Card>
    </>
  )
}