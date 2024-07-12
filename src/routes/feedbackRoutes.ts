import express, { Router } from 'express';
import {
  createNewFeedback,
  getAllFeedbacks,
  deleteOneFeedback,
  getFeedbackById,
  updateFeedback,
  upvoteFeedback,
} from '../controllers/feedbackController';

const router: Router = express.Router();

router.route('/').post(createNewFeedback).get(getAllFeedbacks);
router
  .route('/:id')
  .get(getFeedbackById)
  .delete(deleteOneFeedback)
  .patch(updateFeedback);

router.route('/upvote/:id').get(upvoteFeedback);

export default router;
