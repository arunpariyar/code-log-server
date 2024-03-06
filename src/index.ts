import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8000;

app.get('/', (req: Request, res: Response) => {
  res.end('ts-express hello');
});

app.listen(port, () => {
  console.log('Server running on port ${port}');
});
