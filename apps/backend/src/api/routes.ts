import { Router } from 'express';
import authenticate from '../middleware/authenticate.ts';
import * as authController from './auth/controller.ts';
import * as screenerController from './screener/controller.ts';
import * as stocksController from './stocks/controller.ts';

const router = Router();

router.get('/auth/status', authController.getAuthStatus);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticate, authController.logout);
router.get('/watchlist');
router.get('/screener', screenerController.getScreener);
router.get('/stocks/:symbol/profile', authenticate, stocksController.getCompanyProfile);
router.get('/stocks/:symbol/quote', stocksController.getQuote);
router.get('/stocks/:symbol/prices', stocksController.getPriceChart);
router.get('/stocks/:symbol/news', stocksController.getCompanyNews);

export default router;
