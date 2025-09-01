# SQLite Setup для MergeSensei

## Обзор

Проект MergeSensei теперь использует SQLite как основную базу данных вместо PostgreSQL. SQLite - это встроенная, серверная база данных, которая идеально подходит для разработки и небольших проектов.

## Преимущества SQLite

- **Простота**: Не требует установки отдельного сервера БД
- **Портативность**: База данных хранится в одном файле
- **Производительность**: Отличная производительность для небольших и средних нагрузок
- **Надежность**: ACID-совместимость и проверенная временем стабильность

## Структура базы данных

### Основные таблицы

1. **users** - Пользователи системы
2. **projects** - Проекты
3. **pipelines** - Пайплайны автоматизации
4. **execution_logs** - Логи выполнения пайплайнов
5. **analytics** - Метрики и аналитика

### Схема данных

```sql
-- Пользователи
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Проекты
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at INTEGER
);

-- Пайплайны
CREATE TABLE pipelines (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  agents TEXT NOT NULL DEFAULT '[]',
  trigger TEXT NOT NULL,
  last_run INTEGER,
  created_at INTEGER
);

-- Логи выполнения
CREATE TABLE execution_logs (
  id TEXT PRIMARY KEY,
  pipeline_id TEXT NOT NULL REFERENCES pipelines(id),
  project_id TEXT NOT NULL REFERENCES projects(id),
  status TEXT NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  duration INTEGER,
  input TEXT NOT NULL,
  output TEXT,
  error TEXT,
  agent TEXT NOT NULL,
  trigger TEXT NOT NULL,
  environment TEXT NOT NULL DEFAULT 'development',
  version TEXT NOT NULL DEFAULT '1.0.0',
  created_at INTEGER,
  updated_at INTEGER
);

-- Аналитика
CREATE TABLE analytics (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  pipeline_id TEXT REFERENCES pipelines(id),
  metric_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT,
  tags TEXT NOT NULL DEFAULT '{}',
  timestamp INTEGER NOT NULL,
  period TEXT NOT NULL,
  metadata TEXT
);
```

## Установка и настройка

### 1. Установка зависимостей

```bash
npm install better-sqlite3 drizzle-orm
npm install --save-dev @types/better-sqlite3
```

### 2. Конфигурация

Файл `drizzle.config.ts` настроен для работы с SQLite:

```typescript
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "./data/mergesensei.db",
  },
});
```

### 3. Переменные окружения

```bash
# Опционально: путь к файлу базы данных
DATABASE_URL=./data/mergesensei.db
```

## Использование

### Подключение к базе данных

```typescript
import { db } from './server/db';

// База данных автоматически подключается при запуске сервера
// и выполняет миграции
```

### Примеры CRUD операций

```typescript
import { db } from './server/db';
import { users, projects } from '../../shared/schema';
import { eq } from 'drizzle-orm';

// Создание пользователя
const newUser = await db.insert(users).values({
  username: 'john_doe',
  password: 'hashed_password'
});

// Получение пользователя
const user = await db.select().from(users).where(eq(users.username, 'john_doe'));

// Создание проекта
const newProject = await db.insert(projects).values({
  name: 'My Project',
  description: 'Project description'
});
```

### Работа с JSON полями

Поскольку SQLite не поддерживает нативные JSON типы, мы используем TEXT поля с JSON строками:

```typescript
// Сохранение JSON данных
const logData = {
  pipelineId: 'pipeline-123',
  projectId: 'project-456',
  input: { key: 'value', number: 42 },
  agents: ['agent1', 'agent2']
};

await db.insert(executionLogs).values({
  ...logData,
  input: JSON.stringify(logData.input),
  agents: JSON.stringify(logData.agents)
});

// Чтение JSON данных
const logs = await db.select().from(executionLogs);
const parsedLogs = logs.map(log => ({
  ...log,
  input: JSON.parse(log.input),
  agents: JSON.parse(log.agents)
}));
```

## Миграции

### Генерация миграций

```bash
npm run db:push
```

### Структура папки migrations

```
migrations/
├── 0000_initial.sql
├── 0001_add_execution_logs.sql
└── 0002_add_analytics.sql
```

## Мониторинг и обслуживание

### Размер базы данных

```bash
# Проверка размера файла базы данных
ls -lh data/mergesensei.db
```

### Резервное копирование

```bash
# Простое резервное копирование
cp data/mergesensei.db data/mergesensei.backup.db

# Сжатое резервное копирование
sqlite3 data/mergesensei.db ".backup 'data/mergesensei.backup.db'"
```

### Оптимизация

```sql
-- Анализ и оптимизация базы данных
ANALYZE;
VACUUM;

-- Проверка целостности
PRAGMA integrity_check;
```

## Отладка

### Включение SQL логирования

```typescript
// В server/db.ts
const sqlite = new Database(dbPath, { 
  verbose: console.log // Логирует все SQL запросы
});
```

### Проверка схемы

```bash
# Просмотр структуры таблиц
sqlite3 data/mergesensei.db ".schema"

# Просмотр данных
sqlite3 data/mergesensei.db "SELECT * FROM users LIMIT 5;"
```

## Производительность

### Индексы

Автоматически создаются индексы для:
- `users.username` (UNIQUE)
- `execution_logs.created_at`
- `execution_logs.project_id`
- `execution_logs.pipeline_id`
- `analytics.timestamp`

### Рекомендации

1. **Размер базы**: SQLite отлично работает до ~100GB данных
2. **Конкурентность**: Лучше всего для чтения, запись блокирует всю БД
3. **Транзакции**: Используйте транзакции для множественных операций

## Переход с PostgreSQL

Если в будущем понадобится перейти на PostgreSQL:

1. Обновите `drizzle.config.ts`
2. Измените импорты в `shared/schema.ts` с `sqlite-core` на `pg-core`
3. Обновите типы данных (например, `integer` на `timestamp`)
4. Выполните миграцию данных

## Поддержка

При возникновении проблем:

1. Проверьте логи сервера
2. Убедитесь, что папка `data/` существует
3. Проверьте права доступа к файлу базы данных
4. Убедитесь, что все миграции выполнены успешно
