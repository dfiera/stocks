import { Request, Response, NextFunction } from 'express';
import { redisClient, REDIS_STORE_PREFIX } from '../redis/redis.ts';

const sessionRefresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    try {
      await redisClient.expire(`${REDIS_STORE_PREFIX}${req.session.id}`, 24 * 60 * 60); // 24h
    } catch (error) {
      next(error);
    }
  }
  next();
};

export default sessionRefresh;
