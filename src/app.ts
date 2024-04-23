import express, { Express, NextFunction, Request, Response } from 'express';

import morgan from 'morgan';
import { config } from 'dotenv';

import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import feedbackRouter from './routes/feedbackRoutes';

//TODO: will need to implement later for the other routes when they are created
import { protect } from './controllers/authController';

config();

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());

//for debugging purpose
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log('💀', req.headers);
//   next();
// });

app.use('/api/signup', userRouter);
app.use('/api/login', authRouter);
app.use('/api/feedback', feedbackRouter);

export default app;
