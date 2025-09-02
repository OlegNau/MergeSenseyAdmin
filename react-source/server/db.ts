import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем директорию для базы данных, если её нет
const dbDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dbDir, 'mergesensei.db');

// Создаем подключение к SQLite
const sqlite = new Database(dbPath);

// Создаем экземпляр Drizzle
export const db = drizzle(sqlite);

// Функция для выполнения миграций
export const runMigrations = async () => {
  try {
    // Путь к папке с миграциями
    const migrationsPath = path.join(__dirname, '..', 'migrations');
    
    // Выполняем миграции
    migrate(db, { migrationsFolder: migrationsPath });
    console.log('✅ SQLite migrations completed successfully');
  } catch (error) {
    console.error('❌ SQLite migration error:', error);
    throw error;
  }
};

// Функция для закрытия соединения
export const closeDatabase = () => {
  sqlite.close();
  console.log('✅ SQLite connection closed');
};

// Экспортируем raw SQLite для прямых запросов если понадобится
export { sqlite };
