#!/bin/bash

# Скрипт для запуска MergeSensei на production сервере

cd /var/www/mergesensei

echo "Starting MergeSensei production server..."

# Проверяем, что файлы существуют
if [ ! -f "dist/production.js" ]; then
    echo "Error: dist/production.js not found"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "Error: dist/public not found"
    exit 1
fi

# Устанавливаем переменные окружения
export NODE_ENV=production
export PORT=3000

# Запускаем сервер
echo "Server starting on port $PORT..."
node dist/production.js
