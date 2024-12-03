import { Router } from 'express';
import * as screenerController from './screener/controller.ts';
import * as stocksController from './stocks/controller.ts';

const router = Router();

router.get('/watchlist');
router.get('/screener', screenerController.getScreener);
router.get('/stocks/:symbol/profile', stocksController.getCompanyProfile);
router.get('/stocks/:symbol/prices', stocksController.getPriceChart);
router.get('/stocks/:symbol/news', stocksController.getCompanyNews);

export default router;
