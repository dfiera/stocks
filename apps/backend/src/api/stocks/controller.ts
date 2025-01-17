import { Request, Response, NextFunction } from 'express';
import * as stocksService from './service.ts';

const DEFAULT_RESULTS_LIMIT = 10;

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

export const getSymbols = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search = '', limit = `${DEFAULT_RESULTS_LIMIT}` } = req.query;
    const numberOfResults = parseInt(limit as string);
    const searchResults = await stocksService.getFilteredSymbols(search, numberOfResults);

    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};
