import { Op } from "sequelize";
import { User } from "../models";
import { CreateUserParams, LoginUserParams } from "../types/user.types";
import {
  AppError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";

export const createUser = async (newUser: CreateUserParams) => {
  try {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: newUser.email,
          },
          {
            name: newUser.name,
          },
        ],
      },
    });

    if (userExists) {
      throw new ConflictError("User already registered!");
    }

    const hashPass = await bcrypt.hash(newUser.password, 12);
    const user = await User.create({
      ...newUser,
      password: hashPass,
      role: "user",
    });

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to create new user: ${error}`);
  }
};

export const loginUser = async (user: LoginUserParams) => {
  try {
    const userExists = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (!userExists) {
      throw new ConflictError("User does not exists!");
    }

    const accessToken = jwt.sign(
      { id: userExists.id },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { id: userExists.id },
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      {
        expiresIn: "7d",
      },
    );

    await User.update(
      {
        refreshToken,
      },
      {
        where: {
          id: userExists.id,
        },
      },
    );
    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to login user: ${error}`);
  }
};

export const refreshToken = async (req: Request) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    throw new NotFoundError("Token not found!");
  }

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: {
      refreshToken,
    },
  });

  if (!foundUser) {
    throw new NotFoundError("User not found!");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      (err: any, decoded: any) => {
        if (err || foundUser.id !== decoded.id) {
          return reject(new UnauthorizedError("You are NOT allowed!"));
        }

        const accessToken = jwt.sign(
          { id: String(foundUser.id) },
          process.env.ACCESS_TOKEN_PRIVATE_KEY!,
          {
            expiresIn: "15m",
          },
        );

        resolve({ user: foundUser, accessToken });
      },
    );
  });
};
