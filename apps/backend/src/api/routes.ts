import { Router } from 'express';
import { createDBTables } from './seed/controller.ts';
import authenticate from '../middleware/authenticate.ts';
import * as authController from './auth/controller.ts';
import * as stocksController from './stocks/controller.ts';
import * as watchlistsController from './watchlists/controller.ts';
import * as screenerController from './screener/controller.ts';

const router = Router();

router.get('/seed', createDBTables);
router.get('/symbols', stocksController.storeSymbolsInDB);

router.get('/auth/status', authController.getAuthStatus);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticate, authController.logout);

router.get('/stocks/:symbol/profile', authenticate, stocksController.getCompanyProfile);
router.get('/stocks/:symbol/quote', stocksController.getQuote);
router.get('/stocks/:symbol/prices', stocksController.getPriceChart);
router.get('/stocks/:symbol/news', stocksController.getCompanyNews);

router.get('/watchlists', authenticate, watchlistsController.getWatchlists);
router.post('/watchlists', authenticate, watchlistsController.createWatchlist);
// router.get('/watchlists/:id', watchlistController);
// router.put('/watchlists/:id', watchlistController);
// router.delete('/watchlists/:id', watchlistController);
router.post('/watchlists/:id/symbols', authenticate, watchlistsController.addSymbolToWatchlist);
// router.delete('/watchlists/:id/stocks/:symbol', authenticate, watchlistController);

router.get('/screener', screenerController.getScreener);

export default router;
