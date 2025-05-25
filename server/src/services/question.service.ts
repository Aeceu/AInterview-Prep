import { Choice, Question, QuizAnswer, QuizSession } from "../models";
import {
  GenerateQuestionParams,
  SaveQuestionsParams,
} from "../types/questions.type";
import { AppError, ConflictError } from "../utils/error";
import { GoogleGenAI } from "@google/genai";

export const handleGenerateQuestion = async (data: GenerateQuestionParams) => {
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
    if (!generatedText) {
      throw new ConflictError("Failed to generate questions!");
    }
    const parsed = JSON.parse(generatedText);
    return parsed;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to generate questions: ${error}`);
  }
};

export const handleSaveQuestions = async (data: SaveQuestionsParams) => {
  try {
    const quizSession = await QuizSession.create(
      {
        userId: data.userId,
        tags: data.tags,
        difficulty: data.difficulty,
        count: data.count,
        score: data.score,
        questions: data.questions.map((q) => ({
          question: q.question,
          correct: q.correct,
          choices: q.choices.map((c) => ({
            letter: c.letter,
            text: c.text,
          })),
        })),
      } as any,
      {
        include: [
          {
            model: Question,
            as: "questions",
            include: [{ model: Choice, as: "choices" }],
          },
        ],
      },
    );

    const questionRecords = await quizSession.getQuestions({
      include: [{ model: Choice, as: "choices" }],
    });

    const quizAnswers = questionRecords.map((question, index) => ({
      quizSessionId: quizSession.id,
      questionId: question.id,
      selected: data.answers[index],
    }));

    await QuizAnswer.bulkCreate(quizAnswers);

    return quizSession;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to save questions: ${error}`);
  }
};

export const handleFetchQuestions = async (userId: string) => {
  try {
    const sessions = await QuizSession.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Question,
          as: "questions",
          include: [
            { model: Choice, as: "choices" },
            {
              model: QuizAnswer,
              as: "questionAnswers",
              attributes: ["id", "selected", "quizSessionId", "questionId"],
            },
          ],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [
          { model: Question, as: "questions" },
          { model: Choice, as: "choices" },
          "letter",
          "ASC",
        ],
      ],
    });
    return sessions;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error(`Failed to fetch questions: ${error}`);
  }
};
