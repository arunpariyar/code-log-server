import express, { Router } from 'express';
import userController from '../controllers/userController';

const router: Router = express.Router();

router.route('/').post(userController.createUser);

export default router;
