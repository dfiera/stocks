import { Request, Response, NextFunction } from 'express';
import * as screenerService from './service.ts';

export const DEFAULT_PAGE_SIZE = 12;

export const filterScreener = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filters = [], search = '', page = '1', pageSize = `${DEFAULT_PAGE_SIZE}` } = req.body;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);

    const data = await screenerService.getScreener({ filters, search, page: pageNumber, pageSize: pageSizeNumber });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
