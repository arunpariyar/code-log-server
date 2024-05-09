import { Request, Response } from 'express';
import prisma from '../db';

const createNewFeedback = async (req: Request, res: Response) => {
  try {
    const { title, category, detail } = req.body;
    if (!(title && category && detail)) {
      return res.status(400).send('please provide all details properly');
    }
    const newFeedback = await prisma.feedback.create({ data: req.body });
    res.send(newFeedback);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const allFeedbacks = await prisma.feedback.findMany();
    res.send(allFeedbacks);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const deleteOneFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedFeedback = await prisma.feedback.delete({
      where: {
        id,
      },
    });

    if (deletedFeedback) {
      res.send({ message: `feedback with id: ${id} deleted` });
    }
  } catch (error) {
    res.status(500);
    res.send({ message: "Item doesn't exist" });
  }
};

export { createNewFeedback, getAllFeedbacks, deleteOneFeedback };
