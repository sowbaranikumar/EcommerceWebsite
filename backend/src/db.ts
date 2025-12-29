import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "./models/User.js";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
  models: [User],
  logging: false,
});

export default sequelize;
