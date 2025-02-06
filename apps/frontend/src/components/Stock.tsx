import { useEffect } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  priceChartQueryOptions,
  quoteQueryOptions,
  stockNewsQueryOptions,
  stockQueryOptions
} from '../api/queries.ts';
import { useQuoteSubscription } from '../hooks/useQuoteSubscription.ts';
import type { Quote, CompanyOverview, NewsArticle } from '../types.ts';
import { cx } from '../lib/utils.ts';
import { Card } from './Card.tsx';
import { AreaChart } from './AreaChart.tsx';
import ReadMore from './ReadMore.tsx';

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
    value: 'dividendYieldd',
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

export default function Stock({ symbol }: { symbol: string }) {
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
      <Card className="text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8 xl:p-16 min-h-screen">
        <div className="w-full max-w-7xl mx-auto">

          <div className="dark:text-gray-500 mb-4">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">{stockData.symbol}</span>
              <span className="font-semibold">·</span>
              <span className="text-sm sm:text-base font-medium">{stockData.companyName}</span>
              <span className="font-semibold">·</span>
              <span className="text-sm sm:text-base font-medium">{stockData.exchange}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-gray-900 dark:text-gray-50">
            <span className="text-lg sm:text-xl font-bold">
              {quote.price.toFixed(2)}
            </span>
              <span className={cx(
                'text-sm sm:text-base font-medium',
                `${(quote.change > 0) ? 'dark:text-emerald-400' : 'dark:text-red-400'}`
              )}>
              {quote.change > 0 ? '+' : ''}{quote.change.toFixed(2)} {`(${quote.changePercentage > 0 ? '+' : ''}${quote.changePercentage.toFixed(2)}%)`}
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
            colors={[`${quote.change > 0 ? 'emerald' : 'red'}`]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat('us', {maximumFractionDigits: 2}).format(number)}`
            }
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            showLegend={false}
            autoMinValue={true}
            className="h-64 sm:h-80 lg:h-96"
          />

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-sm sm:text-base font-medium text-gray-900 dark:text-gray-50">
            {symbolInfo.map((item) => (
              <div key={id++} className="flex justify-between">
                <span className="dark:text-gray-500">{item.label}</span>
                <span
                  className="">{quote[item.value as keyof Quote]?.toLocaleString() || stockData[item.value as keyof CompanyOverview]?.toLocaleString() || '-'}</span>
              </div>
            ))}
          </div>

          <Card className="relative mt-8 sm:mt-12 py-8 sm:py-12 min-h-max overflow-hidden">
            <div
              className="absolute z-0 h-full w-full bg-gradient-to-t from-neutral-50 via-neutral-200 to-neutral-50 blur-3xl transition-all duration-500 dark:from-gray-950 dark:via-slate-800/70 dark:to-gray-950"
            />
            <div
              className="z-10 flex flex-col lg:flex-row justify-center gap-6 sm:gap-8"
            >
              <div className="z-10 max-w-2xl text-pretty font-medium text-sm">
                <ReadMore text={stockData.description ?? ''} maxLength={500}/>
              </div>
              <div className="z-10 min-w-fit text-pretty font-medium text-sm text-gray-500">
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
            </div>
          </Card>

          <div className="mt-8 sm:mt-16 grid grid-cols-1 xl:grid-cols-2 gap-4">
            {newsArticles.map((article: NewsArticle) => (
              <Card key={article.id} className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transition-shadow p-0">
                <div className="md:flex h-full">
                  <div className="h-48 md:shrink-0 md:h-auto md:w-48">
                    <img
                      src={article.imageUrl}
                      className="h-full w-full object-cover will-change-transform"
                      alt={article.description}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="tracking-wide text-xs text-slate-500 font-medium">{article.publisher.name}</div>
                    <p className="mt-2 text-sm text-gray-900 dark:text-gray-50 font-semibold line-clamp-3">{article.title}</p>
                    <div className="mt-2 space-x-1 text-xs text-slate-500 font-medium">
                      <span>{article.publishedUtc}</span>
                      <span className="font-bold">·</span>
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
