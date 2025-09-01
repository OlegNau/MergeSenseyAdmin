#!/bin/bash

# Финальная настройка MergeSensei на production сервере

set -e

PROJECT_NAME="mergesensei"
SERVER_PATH="/var/www/mergesensei"

echo "🚀 Настройка MergeSensei на production сервере..."

cd $SERVER_PATH

# 1. Проверяем, что все файлы на месте
echo "📁 Проверка файлов..."
if [ ! -f "dist/production.js" ]; then
    echo "❌ Error: dist/production.js не найден"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "❌ Error: dist/public не найден"
    exit 1
fi

echo "✅ Все файлы на месте"

# 2. Устанавливаем PM2 если не установлен
echo "📦 Установка PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo "✅ PM2 установлен"
else
    echo "✅ PM2 уже установлен"
fi

# 3. Создаем конфигурацию PM2
echo "⚙️ Создание конфигурации PM2..."
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'mergesensei',
    script: 'dist/production.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
EOF

echo "✅ Конфигурация PM2 создана"

# 4. Создаем директории для логов
echo "📝 Создание директорий для логов..."
mkdir -p logs
echo "✅ Директории созданы"

# 5. Останавливаем существующий процесс если есть
echo "🛑 Остановка существующих процессов..."
pm2 stop $PROJECT_NAME 2>/dev/null || true
pm2 delete $PROJECT_NAME 2>/dev/null || true
echo "✅ Процессы остановлены"

# 6. Запускаем приложение через PM2
echo "▶️ Запуск приложения..."
pm2 start ecosystem.config.cjs
pm2 save
echo "✅ Приложение запущено"

# 7. Настройка автозапуска PM2
echo "🔄 Настройка автозапуска PM2..."
pm2 startup | tail -1 | cut -d ' ' -f 3- | bash
echo "✅ Автозапуск настроен"

# 8. Настройка Nginx
echo "🌐 Настройка Nginx..."
NGINX_CONFIG="
server {
    listen 80;
    server_name $PROJECT_NAME.82.146.36.8;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    location /static/ {
        alias $SERVER_PATH/dist/public/;
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
    
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}"

echo "$NGINX_CONFIG" | tee /etc/nginx/sites-available/$PROJECT_NAME
ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
echo "✅ Конфигурация Nginx создана"

# 9. Проверяем и перезагружаем Nginx
echo "🔄 Перезагрузка Nginx..."
nginx -t && systemctl reload nginx
echo "✅ Nginx перезагружен"

# 10. Проверяем статус
echo "📊 Проверка статуса..."
pm2 status

echo ""
echo "🎉 Настройка завершена!"
echo "📱 Приложение доступно по адресу: http://$PROJECT_NAME.82.146.36.8"
echo "🔧 PM2 процесс: $PROJECT_NAME"
echo "📁 Путь на сервере: $SERVER_PATH"
echo "📝 Логи: $SERVER_PATH/logs/"
echo ""
echo "📋 Полезные команды:"
echo "  pm2 status                    - статус процессов"
echo "  pm2 logs $PROJECT_NAME        - логи приложения"
echo "  pm2 restart $PROJECT_NAME     - перезапуск"
echo "  pm2 stop $PROJECT_NAME        - остановка"
echo "  tail -f logs/combined.log     - просмотр логов в реальном времени"
