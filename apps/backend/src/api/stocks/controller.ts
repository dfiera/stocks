import { Request, Response, NextFunction } from 'express';
import * as stocksService from './service.ts';

export const getStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getStock(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
