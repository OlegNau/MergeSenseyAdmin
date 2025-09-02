import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { runMigrations, closeDatabase } from "./db";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Логирование
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Serve static files
function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}`);
    return;
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

(async () => {
  try {
    // Запускаем миграции SQLite (пропускаем если есть проблемы)
    try {
      await runMigrations();
      console.log("Database migrations completed successfully");
    } catch (error) {
      console.warn("Database migrations failed, continuing without database:", error);
    }
    
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Server error:", err);
    });

    // В production режиме всегда используем статические файлы
    serveStatic(app);

    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen({
      port,
      host: "localhost",
    }, () => {
      console.log(`Production server running on port ${port}`);
    });

    // Обработка graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down gracefully...');
      try {
        closeDatabase();
      } catch (error) {
        console.warn("Error closing database:", error);
      }
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('Shutting down gracefully...');
      try {
        closeDatabase();
      } catch (error) {
        console.warn("Error closing database:", error);
      }
      process.exit(0);
    });

  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
})();
