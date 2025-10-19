export const errorHandler = (err, req, res, next) => {
  console.error("Ошибка:", err);

  // Ошибки валидации
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Ошибка валидации",
      message: err.message,
      details: err.details || [],
    });
  }

  // Ошибки базы данных
  if (err.code === "SQLITE_CONSTRAINT") {
    return res.status(400).json({
      error: "Ошибка базы данных",
      message: "Нарушение ограничений базы данных",
    });
  }

  // Ошибки синтаксиса JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Ошибка парсинга JSON",
      message: "Неверный формат JSON",
    });
  }

  // Ошибки маршрутизации
  if (err.status === 404) {
    return res.status(404).json({
      error: "Ресурс не найден",
      message: "Запрашиваемый ресурс не существует",
    });
  }

  // Внутренние ошибки сервера
  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Что-то пошло не так",
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Маршрут не найден",
    message: `Маршрут ${req.method} ${req.originalUrl} не существует`,
  });
};
