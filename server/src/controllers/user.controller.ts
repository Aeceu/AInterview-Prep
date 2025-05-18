import { NextFunction, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

export const handleTestAI = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate ${data.count} questions with multiple choice based on the given topic. Return this in a JSON format.
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
      Topic: ${data.topics || "Sample Topic"},
      Difficulty: ${data.difficulty || "easy"}
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

export const LoginSuccess = async (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Login successfully",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};
