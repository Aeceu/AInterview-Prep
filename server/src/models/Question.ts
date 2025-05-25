import { DataTypes, Model, Optional } from "sequelize";
import { Choice } from "./Choice";
import { sequelize } from "../config/database";
import { QuizSession } from "./QuizSession";

type QuestionAttributes = {
  id: number;
  question: string;
  correct: string;
  quizSessionId: number;
};

type QuestionCreationAttributes = Optional<QuestionAttributes, "id">;

export class Question
  extends Model<QuestionAttributes, QuestionCreationAttributes>
  implements QuestionAttributes
{
  declare id: number;
  declare question: string;
  declare correct: string;
  declare quizSessionId: number;

  declare choices?: Choice[];
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quizSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: QuizSession, key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "Questions",
    timestamps: true,
  },
);
