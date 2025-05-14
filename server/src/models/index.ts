import { User } from "./User";
import { Category } from "./Category";
import { Question } from "./Question";
import { InterviewSession } from "./InterviewSession";
import { SessionQuestion } from "./SessionQuestion";

User.hasMany(InterviewSession, { foreignKey: "userId" });
InterviewSession.belongsTo(User, { foreignKey: "userId" });

Category.hasMany(InterviewSession, { foreignKey: "categoryId" });
InterviewSession.belongsTo(Category, { foreignKey: "categoryId" });

Category.hasMany(Question, { foreignKey: "categoryId" });
Question.belongsTo(Category, { foreignKey: "categoryId" });

InterviewSession.belongsToMany(Question, {
  through: SessionQuestion,
  foreignKey: "sessionId",
  otherKey: "questionId",
});

Question.belongsToMany(InterviewSession, {
  through: SessionQuestion,
  foreignKey: "questionId",
  otherKey: "sessionId",
});

InterviewSession.hasMany(SessionQuestion, { foreignKey: "sessionId" });
SessionQuestion.belongsTo(InterviewSession, { foreignKey: "sessionId" });

Question.hasMany(SessionQuestion, { foreignKey: "questionId" });
SessionQuestion.belongsTo(Question, { foreignKey: "questionId" });

export { User, Category, Question, InterviewSession, SessionQuestion };
