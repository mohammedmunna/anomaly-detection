import dotenv from "dotenv";
dotenv.config();

export const config = {
  kafkaBrokers: ["localhost:9092"],
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 4000,
};
