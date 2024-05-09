import express, { Router } from 'express';
import {
  createNewFeedback,
  getAllFeedbacks,
  deleteOneFeedback,
} from '../controllers/feedbackController';

const router: Router = express.Router();

router.route('/').post(createNewFeedback).get(getAllFeedbacks);
router.route('/:id').delete(deleteOneFeedback);

export default router;
