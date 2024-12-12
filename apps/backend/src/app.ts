import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { redisStore } from './redis/redis.ts';
import routes from './api/routes.ts';
import loggerMiddleware from './middleware/logger.ts';
import sessionRefresh from './middleware/sessionRefresh.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true
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
