import { Request, Response, NextFunction } from 'express';
import * as screenerService from './service.ts';

export const getScreener = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const screenerData = await screenerService.getScreener();
    res.status(200).json(screenerData);
  } catch (error) {
    next(error);
  }
};
