import { User } from "./User";
import { QuizSession } from "./QuizSession";
import { Question } from "./Question";
import { Choice } from "./Choice";
import { QuizAnswer } from "./QuizAnswers";

// Question has many Choices
Question.hasMany(Choice, {
  foreignKey: "questionId",
  as: "choices",
  onDelete: "CASCADE",
});
Choice.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

// QuizSession has many Questions
QuizSession.hasMany(Question, {
  foreignKey: "quizSessionId",
  as: "questions",
});
Question.belongsTo(QuizSession, {
  foreignKey: "quizSessionId",
  as: "quizSession",
});

// QuizSessions has many QuizAnswer
QuizSession.hasMany(QuizAnswer, { foreignKey: "quizSessionId", as: "answers" });
QuizAnswer.belongsTo(QuizSession, {
  foreignKey: "quizSessionId",
  as: "quizSession",
});

// Question has many  QuizAnswers
Question.hasMany(QuizAnswer, {
  foreignKey: "questionId",
  as: "questionAnswers",
});
QuizAnswer.belongsTo(Question, { foreignKey: "questionId", as: "question" });

// User has many QuizSessions
User.hasMany(QuizSession, {
  foreignKey: "userId",
  as: "quizSessions",
});
QuizSession.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Question, Choice, QuizSession, QuizAnswer };
