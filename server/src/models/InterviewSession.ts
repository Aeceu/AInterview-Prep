import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type InterviewsessionAttributes = {
  id: number;
  userId: number;
  categoryId: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
};

type InterviewSessionCreationAttributes = Optional<
  InterviewsessionAttributes,
  "id" | "updatedAt" | "createdAt"
>;

export class InterviewSession extends Model<
  InterviewsessionAttributes,
  InterviewSessionCreationAttributes
> {
  declare id: number;
  declare userId: number;
  declare categoryId: number;
  declare score: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

InterviewSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
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
    modelName: "InterviewSession",
    tableName: "InterviewSessions",
    timestamps: true,
  },
);
