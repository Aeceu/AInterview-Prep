import { Op } from "sequelize";
import { User } from "../models";
import { CreateUserParams } from "../types/user.types";
import { AppError, ConflictError } from "../utils/error";

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async (newUser: CreateUserParams) => {
  try {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: newUser.email,
          },
        ],
      },
    });

    if (userExists) {
      throw new ConflictError("User already registered!");
    }

    const user = await User.create({
      ...newUser,
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
