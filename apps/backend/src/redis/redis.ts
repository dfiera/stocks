import { Redis } from 'ioredis';
import { RedisStore } from 'connect-redis';

export const REDIS_STORE_PREFIX = 'session:';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: REDIS_STORE_PREFIX
});
