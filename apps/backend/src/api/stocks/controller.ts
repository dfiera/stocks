import { Request, Response, NextFunction } from 'express';
import * as stocksService from './service.ts';

export const getCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getCompanyProfile(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];

    const data = await stocksService.getQuote(symbol);

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

export const getCompanyNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const symbol = req.params['symbol'];
    const data = await stocksService.getCompanyNews(symbol);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const storeSymbolsInDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await stocksService.storeSymbolsInDB();

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};
