import { Request, Response } from 'express';
import prisma from '../db';

const createNewFeedback = async (req: Request, res: Response) => {
  try {
    const newFeedback = await prisma.feedback.create({ data: req.body });
    console.log('👑', newFeedback);
    res.send(newFeedback);
  } catch (error) {
    res.status(500);
    console.log({ error: true, message: error });
  }
};

export { createNewFeedback };
