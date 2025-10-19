import cors from "cors";
import { config } from "../../config.js";

const corsOptions = {
  origin: (origin, callback) => {
    // Разрешаем запросы без origin (например, мобильные приложения)
    if (!origin) return callback(null, true);

    // Разрешаем запросы с фронтенда
    if (origin === config.corsOrigin) {
      return callback(null, true);
    }

    // В режиме разработки разрешаем все origin
    if (config.nodeEnv === "development") {
      return callback(null, true);
    }

    // В продакшене проверяем список разрешенных доменов
    const allowedOrigins = [
      config.corsOrigin,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Не разрешено CORS политикой"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
