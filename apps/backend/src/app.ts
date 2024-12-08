import express from 'express';
import routes from './api/routes.ts';
import loggerMiddleware from './middleware/logger.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(loggerMiddleware);

app.use('/api', routes);

app.use(errorHandler);

export default app;
