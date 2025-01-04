import { useEffect } from 'react';
import { useParams, useRouteContext } from '@tanstack/react-router';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useQuoteSubscription } from '../hooks/useQuoteSubscription.ts';
import type { Quote, CompanyOverview, NewsArticle } from '../types.ts';
import { Card } from './Card.tsx';
import { AreaChart } from './AreaChart.tsx';

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

export default function Stock() {
  const { symbol } = useParams({ from: '/_layout/stocks/$symbol' });
  const {
    stockQueryOptions,
    quoteQueryOptions,
    priceChartQueryOptions,
    stockNewsQueryOptions
  } = useRouteContext({ from: '/_layout/stocks/$symbol' });
  const [
    { data: stockData },
    { data: quote },
    { data: priceChart },
    { data: newsArticles }
  ] =  useSuspenseQueries({
    queries: [
      stockQueryOptions(symbol),
      quoteQueryOptions(symbol),
      priceChartQueryOptions(symbol),
      stockNewsQueryOptions(symbol)
    ]
  });
  const {
    isConnected,
    subscribe
  } = useQuoteSubscription();

  useEffect(() => {
    if (isConnected) {
      subscribe([symbol]);
    }
  }, [isConnected, symbol]);

  return (
    <>
      <Card className="dark:text-white p-16">
        <div className="w-11/12 mx-auto">
          <div className="dark:text-gray-500 mb-4">
            <div className="space-x-1">
              <span className="text-xl font-bold dark:text-white">{stockData.symbol}</span>
              <span className="font-semibold">·</span>
              <span>{stockData.companyName}</span>
              <span className="font-semibold">·</span>
              <span>{stockData.exchange}</span>
            </div>
            <div className="space-x-1">
              <span className="font-semibold text-nowrap space-x-1">
                <span className="text-xl font-bold dark:text-white">
                  {quote.price.toFixed(2)}
                </span>
                <span className="text-emerald-500">
                  {quote.change > 0 ? '+' : ''}{quote.change.toFixed(2)} {`(${quote.price > 0 ? '+' : ''}${quote.changePercentage.toFixed(2)}%)`}
                </span>
              </span>
            </div>
            {/*<div className="md:space-x-1 font-semibold break-words">*/}
            {/*  <span className="text-nowrap space-x-1">*/}
            {/*    <span>*/}
            {/*      Pre-Market: $171.34*/}
            {/*    </span>*/}
            {/*    <span className="text-red-500">*/}
            {/*      -1.23 (-0.4%)*/}
            {/*    </span>*/}
            {/*  </span>*/}
            {/*  <span className="hidden md:inline">·</span>*/}
            {/*  <span className="text-nowrap space-x-1">*/}
            {/*    <span>*/}
            {/*      Post-Market: $171.34*/}
            {/*    </span>*/}
            {/*    <span className="text-red-500">*/}
            {/*      -1.23 (-0.4%)*/}
            {/*    </span>*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
          <AreaChart
            data={priceChart.values}
            index="datetime"
            categories={['close']}
            colors={['emerald']}
            valueFormatter={(number: number) =>
              `$${Intl.NumberFormat('us', { maximumFractionDigits: 2 }).format(number)}`
            }
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            showLegend={false}
            autoMinValue={true}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 dark:text-gray-500">
            {
              symbolInfo.map((item) => (
                <div key={id++} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="dark:text-white">{quote[item.value as keyof Quote]?.toLocaleString() || stockData[item.value as keyof CompanyOverview]?.toLocaleString()}</span>
                </div>
              ))
            }
          </div>
          <Card className="flex gap-6 text-sm mt-6 p-10">
            <p className="w-9/12 text-pretty">
              {stockData.description}
            </p>
            <div className="text-gray-500">
              <div>
                Sector: <span className="text-white">{stockData.sector}</span>
              </div>
              <div>
                Industry: <span className="text-white">{stockData.industry}</span>
              </div>
              <div>
                Country: <span className="text-white">{stockData.country}</span>
              </div>
              <div>
                Employees: <span className="text-white">{stockData.employees}</span>
              </div>
              <div>
                Website:
                {' '}
                <a
                  className="text-blue-600 hover:underline dark:text-blue-500"
                  href={`${stockData.website}`}
                >
                  {stockData.website.slice(8)}
                </a>
              </div>
            </div>
          </Card>
          <h1 className="text-3xl font-bold dark:text-white mt-6 mb-4">
            Company News
          </h1>
          <Card className="grid grid-cols-2 gap-2 p-0 border-none">
            {
              newsArticles.map((article: NewsArticle) => (
                <Card key={article.id} className="p-8">
                  <span className="font-thin">{article.publisher.name}</span>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-bold w-4/5">{article.title}</p>
                    <img
                      src={article.imageUrl}
                      width="128px"
                      height="128px"
                      alt={article.description}
                    />
                  </div>
                  <div className="flex text-gray-500 space-x-2">
                    <span>{article.publishedUtc}</span>
                    <span className="font-bold">·</span>
                    <span>{article.author}</span>
                  </div>
                </Card>
              ))
            }
          </Card>
        </div>
      </Card>
    </>
  )
}
