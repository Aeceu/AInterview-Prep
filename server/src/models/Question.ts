import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type QuestionAttributes = {
  id: number;
  text: string;
  correctAnswer: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

type QuestionCreationAttributes = Optional<
  QuestionAttributes,
  "id" | "updatedAt" | "createdAt"
>;

export class Question extends Model<
  QuestionAttributes,
  QuestionCreationAttributes
> {
  declare id: number;
  declare text: string;
  declare correctAnswer: string;
  declare categoryId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
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
    modelName: "Question",
    tableName: "Questions",
    timestamps: true,
  },
);
