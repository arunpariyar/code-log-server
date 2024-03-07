import { Request, Response } from 'express';
import prisma from '../db';
import bcrypt from 'bcrypt';
import { fullUser } from '../interface/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!result) {
      console.log('got here');
      const hashPassword = await bcrypt.hash(password, 10);
      const result: fullUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      res.status(200).json(result);
    } else {
      res.status(501).json({
        error: true,
        message: 'email address already exists',
      });
    }
  } catch (error) {
    res.end({ error: true, message: error });
  }
};

const userController = { createUser };

export default userController;
