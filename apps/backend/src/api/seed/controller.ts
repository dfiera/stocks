import { Request, Response, NextFunction } from 'express';
import { seedDB } from '../../db/seed.ts';

export const createDBTables = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await seedDB();

    res.status(200).send('Database tables created successfully.');
  } catch (error) {
    next(error);
  }
};

