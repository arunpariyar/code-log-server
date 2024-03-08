import express, { Express, Request, Response } from 'express';

import morgan from 'morgan';
import { config } from 'dotenv';

import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';

config();

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());

app.use('/api/signup', userRouter);
app.use('/api/login', authRouter);

export default app;
