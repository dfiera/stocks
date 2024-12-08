import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../utils/logger.ts';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  const message = 'Something went wrong!';

  if (err instanceof z.ZodError) {
    statusCode = 400;
    const validationErrors = err
      .issues
      .map((e) =>
        ({ message: e.message }));

    if (logger) {
      logger.error({
        statusCode,
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
      });
    }

    res.status(statusCode).json({ validationErrors });
    return;
  }

  if (logger) {
    logger.error({
      statusCode,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
      url: req.url,
      method: req.method
    });
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
