import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
  },
);

export const syncDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect connection has been established successfully!");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
    console.log("Registered models:", Object.keys(sequelize.models));
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};
