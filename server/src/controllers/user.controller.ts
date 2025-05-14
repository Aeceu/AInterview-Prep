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
    const { accessToken, refreshToken } = await loginUser(data);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User authenticated!",
      accessToken: accessToken,
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
    console.error("❌ Login error caught:", error);
    next(error);
  }
};

// update user

// delete user

// get user

// get all users

// TEST
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

export const handleTestAI = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate 5 questions with multiple choice based on the given topic. Return this in a JSON format.
      Use this format as reference:
      [
        {
          "question": "",
          "choices": [
            { "letter": "a", "text":"" },
            { "letter": "b" ,"text":""},
            { "letter": "c" ,"text":""},
            { "letter": "d" ,"text":""}
          ],
          "correct": "a"
        }
      ]
      Topic: ${data.topic || "Sample Topic"}
      `,
    });

    let generatedText =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    generatedText = generatedText.replace(/```json\s*|```/g, "").trim();
    const parsed = JSON.parse(generatedText);

    res.status(200).json(parsed);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
