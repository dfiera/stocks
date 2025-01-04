import { useSuspenseQuery } from '@tanstack/react-query';
import { marketSentimentQueryOptions } from '../api/queries.ts';
import { cx } from '../lib/utils.ts';
import { Card } from './Card.tsx';

const capitaliseFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MARKET_SENTIMENT = {
  extremeGreed: 'extreme_greed',
  greed: 'greed',
  neutral: 'neutral',
  fear: 'fear',
  extremeFear: 'extreme_fear'
};

const getSentimentColour = (sentiment: string) => {
  return sentiment === MARKET_SENTIMENT.extremeGreed || sentiment === MARKET_SENTIMENT.greed
    ? ['text-emerald-400', 'bg-emerald-900/75']
    : sentiment === MARKET_SENTIMENT.extremeFear || sentiment === MARKET_SENTIMENT.fear
        ? ['text-red-400', 'bg-red-900/75']
        : ['text-neutral-400', 'bg-neutral-700/75'];
};

export default function MarketSentiment() {
  const { data } = useSuspenseQuery(marketSentimentQueryOptions);
  const { marketSentiment, marketNews } = data;
  const { rating } = marketSentiment;
  const latestNewsArticle = marketNews[Math.floor(Math.random() * marketNews.length)];
  const [textColour, bgColour] = getSentimentColour(rating);

  return (
    <>
      <Card className="col-span-1 min-h-64 max-h-fit dark:text-white overflow-hidden">
        <div className="relative z-50">
          <h1 className={`text-2xl font-bold leading-none tracking-tight pb-2 ${textColour}`}>
            {capitaliseFirstLetter(rating)}
          </h1>
          <h2 className="text-md leading-none tracking-tight pb-8">
            is driving the US market
          </h2>
          <p className="mt-10 mb-2 text-sm font-semibold text-neutral-500 dark:text-neutral-500">
            What you need to know today
          </p>
          <a href={latestNewsArticle.url} className="font-semibold text-sm">
            {latestNewsArticle.title}
          </a>
        </div>
        <div
          className={`pointer-events-none absolute inset-0 z-0 h-[75%] w-[75%] -translate-x-[15%] -translate-y-[40%] rounded-full blur-3xl ${bgColour}`}
        />
      </Card>
    </>
  )
}
