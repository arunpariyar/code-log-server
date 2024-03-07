import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import morgan from 'morgan';
import { config } from 'dotenv';

config();

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());

app.use('/api/users', userRouter);

export default app;
