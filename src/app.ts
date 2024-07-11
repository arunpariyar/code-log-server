import express, { Express } from 'express';
import morgan from 'morgan';

import { config } from 'dotenv';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import feedbackRouter from './routes/feedbackRoutes';

//TODO: will need to implement later for the other routes when they are created
import { protect } from './controllers/authController';

config();

const app: Express = express();

const corsConfig = {
  origin: 'https://project-code-log.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

//TODO refactor here and instead of using if habe cors url in the env file
if (process.env.NODE_ENV === 'development') {
  console.log('running in dev mode 🤡');
  app.use(morgan('tiny'));

  const corsConfig = {
    origin: ['http://localhost:4200'],
  };

  app.use(cors(corsConfig));
  console.log('dev server - cors applied 🪖');
} else {
  console.log('running in prod mode 🏭');
  app.use(cors(corsConfig));
}

app.use(express.json());

app.use('/api/signup', userRouter);
app.use('/api/login', authRouter);
app.use('/api/feedback', feedbackRouter);

export default app;
