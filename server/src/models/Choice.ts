import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { Question } from "./Question";

type ChoiceAttributes = {
  id: number;
  letter: string;
  text: string;
  questionId: number;
  createdAt: Date;
};

type ChoiceCreationAttributes = Optional<ChoiceAttributes, "id" | "createdAt">;

export class Choice
  extends Model<ChoiceAttributes, ChoiceCreationAttributes>
  implements ChoiceAttributes
{
  declare id: number;
  declare letter: string;
  declare text: string;
  declare questionId: number;
  declare readonly createdAt: Date;
}

Choice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Choice",
    tableName: "Choices",
    timestamps: true,
  },
);
