import { Router } from 'express';
import { seedDatabase } from './seed/controller.ts';
import authenticate from '../middleware/authenticate.ts';
import * as authController from './auth/controller.ts';
import * as marketsController from './markets/controller.ts';
import * as stocksController from './stocks/controller.ts';
import * as watchlistsController from './watchlists/controller.ts';
import * as screenerController from './screener/controller.ts';

const router = Router();

router.get('/seed', seedDatabase);

router.get('/symbols', stocksController.getSymbols);

router.get('/auth/status', authController.getAuthStatus);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticate, authController.logout);

router.get('/markets/market-sentiment', marketsController.getMarketSentiment);
router.get('/markets/gainers', marketsController.getTopGainers);
router.get('/markets/losers', marketsController.getTopLosers);
router.get('/markets/actives', marketsController.getMostActive);
router.get('/markets/indices', marketsController.getMarketIndices);
router.get('/markets/currencies', marketsController.getCurrencies);
router.get('/markets/crypto', marketsController.getCryptocurrencies);
router.get('/markets/sector-performance', marketsController.getSectorPerformance);

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
router.delete('/watchlists/:id/symbols/:symbol', authenticate, watchlistsController.deleteSymbol);

router.post('/screener', screenerController.filterScreener);

export default router;
