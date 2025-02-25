import { Server } from 'socket.io';
import { Redis } from 'ioredis';
import logger from '../../utils/logger.ts';

export const createDataEmitter = (io: Server, redis: Redis) => {
  const subscriber = redis.duplicate();

  const handleMessage = async (channel: string, message: string) => {
    if (channel === 'quoteUpdate') {
      const { symbol, quote } = JSON.parse(message);
      const subscribers = await redis.smembers(`stock:subscriptions:symbol:${symbol}`);

      subscribers.forEach(clientId => {
        io.to(clientId).emit('quoteUpdate', { entity: ['stock', 'quote'], symbol, quote });
      });
    }
  };

  const initialise = () => {
    subscriber.subscribe('quoteUpdate', (err, count) => {
      if (err) {
        logger.error('Failed to subscribe:', err);
        return;
      }
      logger.info(`Subscribed to ${count} channels`);
    });

    subscriber.on('message', handleMessage);
  };

  const cleanup = () => {
    subscriber.quit();
  };

  return {
    initialise,
    cleanup
  };
};
