import { createServer } from 'node:http';
import app from './app.ts';
import { setupSocketIO } from './socket/socket.ts';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
