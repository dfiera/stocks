import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { redisStore } from './redis/redis.ts';
import routes from './api/routes.ts';
import loggerMiddleware from './middleware/logger.ts';
import sessionRefresh from './middleware/sessionRefresh.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

app.use(limiter);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(helmet());

app.use(loggerMiddleware);

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
      domain: process.env.COOKIE_DOMAIN || 'localhost'
    }
  })
);

app.use('/api', routes);

app.use(sessionRefresh);

app.use(errorHandler);

export default app;
