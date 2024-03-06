import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app: Express = express();
const port: string = process.env.PORT || '8001';

app.get('/', (req: Request, res: Response) => {
  res.end('ts-express hello');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
