import { Request, Response } from 'express';
import prisma from '../db';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, username } = req.body;

    const result = await prisma.user.create({
      data: {
        name,
        email,
        username,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const userController = { createUser };

export default userController;
