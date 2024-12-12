import { Request, Response, NextFunction } from 'express';
import { redisClient, REDIS_STORE_PREFIX } from '../redis/redis.ts';
import logger from '../utils/logger.ts';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.session.id;

    if (!sessionId) {
      return res.status(401).json({ error: 'No session found' });
    }

    const session = await redisClient.get(`${REDIS_STORE_PREFIX}${sessionId}`);

    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    const sessionData = JSON.parse(session);

    if (!sessionData.user) {
      return res.status(401).json({ error: 'Invalid session data' });
    }

    req.user = sessionData.user;

    next();
  } catch (error) {
    logger.error(`Authentication error: ${error}`);
    next(error);
  }
};

export default authenticate;
