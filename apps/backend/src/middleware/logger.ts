import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.ts';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!logger) {
    return next();
  }

  logger.info(`Request: ${req.method} ${req.url}`);

  next();
};

export default loggerMiddleware;
