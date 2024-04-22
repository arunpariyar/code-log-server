import express, { Router } from 'express';
import { createNewFeedback } from '../controllers/feedbackController';

const router: Router = express.Router();

router.route('/').post(createNewFeedback);

export default router;
