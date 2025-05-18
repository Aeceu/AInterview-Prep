import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type UserAttributes = {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "updatedAt" | "createdAt"
>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare profileImage?: string;
  declare role: "admin" | "user";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
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
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  },
);
