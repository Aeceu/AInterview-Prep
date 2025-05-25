import { NextFunction, Request, Response } from "express";
import {
  handleFetchQuestions,
  handleGenerateQuestion,
  handleSaveQuestions,
} from "../services/question.service";

export const handleGenerateQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const result = await handleGenerateQuestion(data);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const handleSaveQuestionsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const result = await handleSaveQuestions(data);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const handleFetchQuestionsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const quizSessions = await handleFetchQuestions(userId);
    res.status(200).json(quizSessions);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
