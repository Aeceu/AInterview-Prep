import { DataTypes, Model, Optional } from "sequelize";
import { Question } from "./Question";
import { QuizSession } from "./QuizSession";
import { sequelize } from "../config/database";

type QuizAnswerAttributes = {
  id: number;
  quizSessionId: number;
  questionId: number;
  selected: string;
  createdAt: Date;
  updatedAt: Date;
};

type QuizAnswerCreationAttributes = Optional<
  QuizAnswerAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class QuizAnswer
  extends Model<QuizAnswerAttributes, QuizAnswerCreationAttributes>
  implements QuizAnswerAttributes
{
  declare id: number;
  declare quizSessionId: number;
  declare questionId: number;
  declare selected: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

QuizAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quizSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: QuizSession, key: "id" },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Question, key: "id" },
    },
    selected: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "QuizAnswer",
    tableName: "QuizAnswers",
    timestamps: true,
  },
);
