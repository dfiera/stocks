import { Request, Response, NextFunction } from 'express';
import * as stockMarketService from './service.ts';

export const getGainers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await stockMarketService.getGainers();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getLosers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const data = await stockMarketService.getLosers();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMostActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await stockMarketService.getMostActive();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
