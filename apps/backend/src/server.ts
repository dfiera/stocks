import { createServer } from 'node:http';
import app from './app.ts';
import { setupSocketIO } from './socket/socket.ts';

import sql from './db/index.ts';
import { redisClient } from './redis/redis.ts';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

const gracefulShutdown = async () => {
  console.log('Shutting down the server...');

  try {
    await sql.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection', error);
  }

  try {
    await redisClient.quit();
    console.log('Redis connection closed');
  } catch (error) {
    console.error('Error closing Redis connection', error);
  }

  server.close(() => {
    console.log('Server shut down successfully');
    process.exit(0);
  });
};

setupSocketIO(server);

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
