import { Request, Response } from 'express';
import prisma from '../db';

//ROUTE FOR ALL FEEDBACKS
const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const allFeedbacks = await prisma.feedback.findMany();
    res.send(allFeedbacks);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
//ROUTE FOR CREATING ONE NEW FEEDBACK
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

//ROUTE TO GET FEEDBACK BY ID
const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      res.send({ message: `feedback with id: ${id} doesnot exist` });
    }
    return res.send(result);
  } catch (error) {
    res.status(204);
    console.log({ error });
  }
};

//ROUTE TO UPDATE A FEEDBACK
const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, category, detail, upvotes, status } = req.body;

    const feedbackExists = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedbackExists) {
      return res.send({ message: `feedback with id: ${id} not found` });
    }

    const updateFeedback = await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        title,
        category,
        detail,
        upvotes,
        status,
      },
    });

    res.send(updateFeedback);
  } catch (error) {
    console.log(error);
  }
};

//ROUTE TO DELETE FEEDBACK BY ID
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

//ROUTE TO UPVOTE A FEEDBACK
const upvoteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
    res.status(200).send(updatedFeedback);
  } catch (error) {
    res.status(500);
    res.send({ message: `Item with ${id} not found` });
  }
};

export {
  createNewFeedback,
  getAllFeedbacks,
  deleteOneFeedback,
  getFeedbackById,
  updateFeedback,
  upvoteFeedback,
};
