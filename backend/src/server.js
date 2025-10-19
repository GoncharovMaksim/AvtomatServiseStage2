import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import corsMiddleware from "../src/middleware/cors.js";
import {
  errorHandler,
  notFoundHandler,
} from "../src/middleware/errorHandler.js";
import productRoutes from "../src/routes/products.js";
import { config } from "../config.js";

const app = express();

// Middleware безопасности
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS
app.use(corsMiddleware);

// Логирование
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Сжатие ответов
app.use(compression());

// Парсинг JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Статические файлы (если нужно)
app.use(express.static("public"));

// API маршруты
app.use("/api/products", productRoutes);

// Главная страница API
app.get("/", (req, res) => {
  res.json({
    message: "Product Manager API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      products: "/api/products",
      categories: "/api/products/categories",
      health: "/api/health",
    },
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// Обработка 404
app.use(notFoundHandler);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📊 API доступно по адресу: http://localhost:${PORT}`);
  console.log(`🌍 Окружение: ${config.nodeEnv}`);
  console.log(`📁 База данных: ${config.dbPath}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM получен. Завершение работы сервера...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT получен. Завершение работы сервера...");
  process.exit(0);
});

export default app;
