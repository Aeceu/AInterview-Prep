export type SaveQuestionsParams = {
  tags: string;
  difficulty: string;
  count: number;
  answers: string[];
  userId: number;
  score: number;
  questions: {
    question: string;
    correct: string;
    choices: {
      letter: string;
      text: string;
    }[];
  }[];
};

export type GenerateQuestionParams = {
  count: number;
  topics: string;
  difficulty: string;
};
