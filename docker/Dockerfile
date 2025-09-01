# Multi-stage build для оптимизации размера образа
FROM node:18-alpine AS builder

# Установка зависимостей для сборки
RUN apk add --no-cache python3 make g++

# Рабочая директория
WORKDIR /app

# Копирование package файлов
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Production образ
FROM node:18-alpine AS production

# Установка необходимых пакетов
RUN apk add --no-cache dumb-init

# Создание пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Рабочая директория
WORKDIR /app

# Копирование package файлов
COPY package*.json ./

# Установка только production зависимостей
RUN npm ci --only=production && npm cache clean --force

# Копирование собранного приложения
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/shared ./shared

# Создание необходимых директорий
RUN mkdir -p data logs && chown -R nodejs:nodejs data logs

# Переключение на пользователя nodejs
USER nodejs

# Открытие порта
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Запуск приложения
CMD ["dumb-init", "node", "dist/index.js"]
