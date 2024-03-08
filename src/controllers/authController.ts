import { Request, Response } from 'express';
import prisma from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'email and password are required',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (isValid === true && process.env.JWT_SECRET) {
        const token = jwt.sign(
          { id: existingUser.id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        return res.status(200).json({
          error: false,
          token,
        });
      }
    }

    res.status(401).json({
      error: true,
      message: 'Incorrect email or password',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const authController = { login };

export default authController;
