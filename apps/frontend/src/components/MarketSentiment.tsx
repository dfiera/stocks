import { useSuspenseQuery } from '@tanstack/react-query';
import { marketSentimentQueryOptions } from '../api/queries.ts';
import { cx } from '../lib/utils.ts';
import { Card } from './Card.tsx';
import LinkDecorator from './LinkDecorator.tsx';

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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
};

export default function MarketSentiment() {
  const { data } = useSuspenseQuery(marketSentimentQueryOptions);
  const { marketSentiment, marketNews } = data;
  const { rating } = marketSentiment;

  const latestNewsArticle = marketNews[Math.floor(Math.random() * marketNews.length)];
  const [textColour, bgColour] = getSentimentColour(marketSentiment.rating);
  const sentiment = `${rating}${rating === MARKET_SENTIMENT.neutral ? ' sentiment' : ''}`;

  return (
    <>
      <Card className="h-full overflow-hidden">
        <div className="h-full flex flex-col justify-between relative z-10 text-gray-900 dark:text-gray-50">
          <div>
            <h1 className={cx(
              "text-2xl font-bold first-letter:capitalize leading-none tracking-tight",
              `${textColour}`
            )}>
              {sentiment}
            </h1>
            <h2 className="mt-0.5 text-base font-medium tracking-tight">
              is driving the US market
            </h2>
          </div>
          <div className="lg:pb-8">
            <p className="mt-10 text-sm font-medium text-neutral-500 dark:text-neutral-500">
              What you need to know today
            </p>
            <a href={latestNewsArticle.url} className="inline-block mt-1.5 text-sm font-medium dark:hover:text-neutral-200 group transition-all ease-in-out duration-200">
              {truncateText(latestNewsArticle.title, 85)}
              <LinkDecorator />
            </a>
          </div>
        </div>
        <div
          className={`pointer-events-none absolute inset-0 z-0 h-[75%] w-[75%] -translate-x-[15%] -translate-y-[40%] rounded-full blur-3xl ${bgColour}`}
        />
      </Card>
    </>
  );
}
