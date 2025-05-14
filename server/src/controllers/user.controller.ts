import { NextFunction, Request, Response } from "express";
import { createUser, loginUser, refreshToken } from "../services/user.service";

// create user
export const handleRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const newUser = await createUser(data);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

// login user
export const handleLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const { accessToken, refreshToken, userExists } = await loginUser(data);

    console.log(accessToken, refreshToken, userExists);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User authenticated!",
      accessToken: accessToken,
      user: userExists,
    });
  } catch (error) {
    console.error("❌ Login error caught:", error);
    next(error);
  }
};

// refresh
export const handleRefreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await refreshToken(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// update user

// delete user

// get user

// get all users
