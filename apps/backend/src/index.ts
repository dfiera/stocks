import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello from the server');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
