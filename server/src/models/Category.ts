import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type CategoryAttributes = {
  id: number;
  title: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
};

type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  "id" | "updatedAt" | "createdAt"
>;

export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  declare id: number;
  declare title: string;
  declare tags: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
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
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
  },
);
