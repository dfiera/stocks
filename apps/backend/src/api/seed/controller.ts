import { Request, Response, NextFunction } from 'express';
import { seedDB } from '../../db/seed.ts';
import * as stocksService from '../stocks/service.ts';

export const seedDatabase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await seedDB();

    await stocksService.storeSymbolsInDB();

    res.status(200).json('Database tables created successfully.');
  } catch (error) {
    next(error);
  }
};
