import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import redis from '../redis/index.ts';
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

  const subscriptionManager = createSubscriptionManager(redis);
  const dataIngestor = createDataIngestor(redis, subscriptionManager);
  const dataEmitter = createDataEmitter(io, redis);

  dataIngestor.startPolling();
  dataEmitter.initialise();

  io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`);

    socket.on('subscribe', async (symbols: string[]) => {
      try {
        await subscriptionManager.addSubscription(socket.id, symbols);
        socket.emit('subscribed', symbols);
        console.log(`client ${socket.id} subscribed to ${symbols}`);
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
        console.log(`client ${socket.id} unsubscribed from ${symbols}`);
      } catch (error) {
        if (error instanceof Error) {
          socket.emit('error', { message: 'Unsubscribe failed', error: error.message });
        }
      }
    });

    socket.on('disconnect', async (reason) => {
      console.log(`socket ${socket.id} disconnected due to ${reason}`);
      await subscriptionManager.removeAllSubscriptions(socket.id);
    });
  });
};
