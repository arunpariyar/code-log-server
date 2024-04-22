import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import prisma from '../db';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

// WORKING ON THIS AT THE MOMENT
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token!: string;
  let decodedToken!: JwtPayload | string;
  //getting the token and check if it exits
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'You are not logged in ! Please login.',
    });
  }
  //verify the jwt

  if (process.env.JWT_SECRET) {
    try {
      // verification token
      decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

      //TODO: Find a way to fix this in the future
      if (typeof decodedToken === 'string') {
        throw new Error('Invalid token');
      }
      // check if the user still exits
      const freshUser = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (!freshUser) {
        return res.status(401).json({
          error: true,
          message: 'The user doesnot exit anymore',
        });
      }
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: 'You have a problem with you JWT Token',
        errorMessage: error,
      });
    }
  }

  //check if user changes password after the jwt was issued

  //finally next will be run
  next();
};

const authController = { login };

export default authController;
