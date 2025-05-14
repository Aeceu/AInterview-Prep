import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type SessionQuestionAttributes = {
  id: number;
  sessionId: number;
  questionId: number;
  userAnswer: string;
  isCorrect?: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type SessionQuestionCreationAttributes = Optional<
  SessionQuestionAttributes,
  "id" | "updatedAt" | "createdAt"
>;

export class SessionQuestion extends Model<
  SessionQuestionAttributes,
  SessionQuestionCreationAttributes
> {
  declare id: number;
  declare sessionId: number;
  declare questionId: number;
  declare userAnswer: string;
  declare isCorrect?: boolean;
  declare order: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SessionQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
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
    modelName: "SessionQuestion",
    tableName: "SessionQuestions",
    timestamps: true,
  },
);
