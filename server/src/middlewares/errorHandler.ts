import { Request, Response } from "express";
import { AppError } from "../utils/error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: any,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
};
