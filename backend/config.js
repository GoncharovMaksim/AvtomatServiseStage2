import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  dbPath: process.env.DB_PATH || "./database/products.db",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
