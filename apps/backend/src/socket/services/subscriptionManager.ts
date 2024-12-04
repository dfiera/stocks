import { Redis } from 'ioredis';

export const createSubscriptionManager = (redis: Redis) => {
  const subscriptionKey = 'stock:subscriptions';

  const addSubscription = async (clientId: string, symbols: string[]) => {
    const pipeline = redis.pipeline();

    pipeline.sadd(`${subscriptionKey}:${clientId}`, ...symbols);

    symbols.forEach(symbol => {
      pipeline.sadd(`${subscriptionKey}:symbol:${symbol}`, clientId);
    });

    await pipeline.exec();
  };

  const removeSubscription = async (clientId: string, symbols: string[]) => {
    const pipeline = redis.pipeline();

    pipeline.srem(`${subscriptionKey}:${clientId}`, ...symbols);

    symbols.forEach(symbol => {
      pipeline.srem(`${subscriptionKey}:symbol:${symbol}`, clientId);
    });

    await pipeline.exec();
  };

  const removeAllSubscriptions = async (clientId: string) => {
    const symbols = await redis.smembers(`${subscriptionKey}:${clientId}`);

    if (symbols.length > 0) {
      await removeSubscription(clientId, symbols);
    }
  };

  const getActiveSymbols = async () => {
    const keys = await redis.keys(`${subscriptionKey}:symbol:*`);
    return keys.map(key => key.split(':')[3]);
  };

  return {
    addSubscription,
    removeSubscription,
    removeAllSubscriptions,
    getActiveSymbols
  };
}
