import express, { Router } from 'express';
import {
  createNewFeedback,
  getAllFeedbacks,
} from '../controllers/feedbackController';

const router: Router = express.Router();

router.route('/').post(createNewFeedback).get(getAllFeedbacks);

export default router;
