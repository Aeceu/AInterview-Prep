import {
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
} from "sequelize";
import { sequelize } from "../config/database";
import { Question } from "./Question";

type QuizSessionAttributes = {
  id: number;
  userId: number;
  score?: number;
  tags: string;
  difficulty: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
};

type QuizSessionCreationAttributes = Optional<
  QuizSessionAttributes,
  "id" | "score" | "createdAt" | "updatedAt"
>;

export class QuizSession
  extends Model<QuizSessionAttributes, QuizSessionCreationAttributes>
  implements QuizSessionAttributes
{
  declare id: number;
  declare userId: number;
  declare score?: number;
  declare tags: string;
  declare difficulty: string;
  declare count: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare questions?: Question[];
  declare getQuestions: HasManyGetAssociationsMixin<Question>;
}

QuizSession.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    score: { type: DataTypes.INTEGER },
    tags: { type: DataTypes.STRING },
    difficulty: { type: DataTypes.STRING },
    count: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "QuizSession",
    tableName: "QuizSessions",
    timestamps: true,
  },
);
