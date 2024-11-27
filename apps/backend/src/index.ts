import express from 'express';
import routes from './api/routes.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - needed in order to fetch data from client.
// Only allowing requests from client and GET requests for now as no other methods are implemented.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
