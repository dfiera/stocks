import { Request, Response, NextFunction } from 'express';
import * as stocksService from './service.ts';

export const getStockInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getStockInfo(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPriceChart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getPriceChart(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getStockNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getStockNews(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// export const getStock = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const symbol = req.params['symbol'];
//     const data = await stocksService.getStock(symbol);
//
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };
