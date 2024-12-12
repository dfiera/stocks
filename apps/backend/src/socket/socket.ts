import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { redisClient } from '../redis/redis.ts';
import logger from '../utils/logger.ts';
import { createSubscriptionManager } from './services/subscriptionManager.ts';
import { createDataIngestor } from './services/dataIngestor.ts';
import { createDataEmitter } from './services/dataEmitter.ts';

export const setupSocketIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  const subscriptionManager = createSubscriptionManager(redisClient);
  const dataIngestor = createDataIngestor(redisClient, subscriptionManager);
  const dataEmitter = createDataEmitter(io, redisClient);

  dataIngestor.startPolling();
  dataEmitter.initialise();

  io.on('connection', (socket) => {
    logger.info(`socket ${socket.id} connected`);

    socket.on('subscribe', async (symbols: string[]) => {
      try {
        await subscriptionManager.addSubscription(socket.id, symbols);
        socket.emit('subscribed', symbols);
        logger.info(`client ${socket.id} subscribed to ${symbols}`);
      } catch (error) {
        if (error instanceof Error) {
          socket.emit('error', { message: 'Subscription failed', error: error.message });
        }
      }
    });

    socket.on('unsubscribe', async (symbols: string[]) => {
      try {
        await subscriptionManager.removeSubscription(socket.id, symbols);
        socket.emit('unsubscribed', symbols);
        logger.info(`client ${socket.id} unsubscribed from ${symbols}`);
      } catch (error) {
        if (error instanceof Error) {
          socket.emit('error', { message: 'Unsubscribe failed', error: error.message });
        }
      }
    });

    socket.on('disconnect', async (reason) => {
      logger.info(`socket ${socket.id} disconnected due to ${reason}`);
      await subscriptionManager.removeAllSubscriptions(socket.id);
    });
  });
};
