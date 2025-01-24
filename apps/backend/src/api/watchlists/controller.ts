import { Request, Response, NextFunction } from 'express';
import * as watchlistsService from './service.ts';

export const createWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const name = req.body.name;
    const description = req.body.description;

    const watchlist = await watchlistsService.createWatchlist(userId, { name, description });

    res.status(201).json(watchlist);
  } catch (error) {
    next(error);
  }
};

export const getWatchlists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const watchlists = await watchlistsService.getWatchlists(userId);

    res.status(200).json(watchlists);
  } catch (error) {
    next(error);
  }
};

export const addSymbolToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const watchlistId = req.params.id;
    const symbol = req.body.symbol;

    const data = await watchlistsService.addSymbol(watchlistId, symbol);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteSymbol = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const watchlistId = req.params.id;
    const symbol = req.params.symbol;

    await watchlistsService.deleteSymbol(watchlistId, symbol);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

