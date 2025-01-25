import { Request, Response, NextFunction } from 'express';
import * as marketsService from './service.ts';

export const getTopGainers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await marketsService.getTopGainers();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTopLosers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await marketsService.getTopLosers();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMostActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await marketsService.getMostActive();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getSectorPerformance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await marketsService.getSectorPerformance();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMarketSentiment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = {
      userAgent: req.headers['user-agent'] || ''
    };
    const data = await marketsService.getMarketSentiment(context);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMarketIndices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = {
      userAgent: req.headers['user-agent'] || ''
    };
    const data = await marketsService.getMarketIndices(context);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCurrencies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = {
      userAgent: req.headers['user-agent'] || ''
    };
    const data = await marketsService.getCurrencies(context);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCryptocurrencies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = {
      userAgent: req.headers['user-agent'] || ''
    };
    const data = await marketsService.getCryptocurrencies(context);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
