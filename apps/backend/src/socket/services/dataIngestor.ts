import { Redis } from 'ioredis';
import logger from '../../utils/logger.ts';
import { createSubscriptionManager } from './subscriptionManager.ts';
import {symbol} from 'zod';

type SubscriptionManager = ReturnType<typeof createSubscriptionManager>;

interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

const POLL_INTERVAL = process.env.POLL_INTERVAL || 5000;

export const createDataIngestor = (redis: Redis, subscriptionManager: SubscriptionManager) => {
  let pollingInterval: NodeJS.Timeout;

  const fetchQuote = async (symbol: string) => {
    try {
      const url = `${process.env.STOCK_API_URL}/quote?symbol=${symbol}`;
      const response = await fetch(url, {
        headers: {
          'X-Finnhub-Token': process.env.FINNHUB_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json() as Quote;

      return [
        symbol,
        data
      ];
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching quote for ${symbol}: ${error.message}`);
      }
    }
  };

  const fetchAndStoreData = async (symbols: string[]) => {
    try {
      const promises = symbols.map(symbol => fetchQuote(symbol)) as Promise<[string, Quote]>[];
      const quotes = await Promise.all(promises);

      const pipeline = redis.pipeline();

      quotes.forEach(([symbol, quote]) => {
        pipeline.set(`stock:quote:${symbol}`, JSON.stringify(quote));
        pipeline.publish('quoteUpdate', JSON.stringify({ symbol, quote }));
      });

      await pipeline.exec();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error storing quote for ${symbol}: ${error.message}`);
      }
    }
  };

  const startPolling = async () => {
    pollingInterval = setInterval(async () => {
      const activeSymbols = await subscriptionManager.getActiveSymbols();

      if (activeSymbols.length > 0) {
        await fetchAndStoreData(activeSymbols);
      }
    }, POLL_INTERVAL);
  };

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
  };

  return {
    startPolling,
    stopPolling,
    fetchAndStoreData
  };
};
