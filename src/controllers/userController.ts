import prisma from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Name, email and password are required',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        error: false,
        token,
        data: {
          user: newUser,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error });
  }
};

const userController = { createUser };

export default userController;
