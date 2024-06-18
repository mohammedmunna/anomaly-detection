import mongoose from "mongoose";
import { config } from "./config/config";
import app from "./app";
import "./kafka/kafkaConsumer";

if (!config.mongoUri) {
  console.log("MongoDB URI is not defined in the configuration.");
  process.exit(1);
}

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
