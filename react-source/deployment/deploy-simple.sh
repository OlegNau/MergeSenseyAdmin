#!/bin/bash

# Простой скрипт деплоя MergeSensei через scp
# Для случаев, когда rsync недоступен

set -e

# Конфигурация
PROJECT_NAME="mergesensei"
SERVER_USER="root"
SERVER_HOST="82.146.36.8"
SERVER_PATH="/var/www/mergesensei"

# Цвета
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}[INFO]${NC} Начинаем простой деплой MergeSensei..."

# Создание директории на сервере
echo -e "${BLUE}[INFO]${NC} Создание директории на сервере..."
ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH"

# Копирование основных файлов
echo -e "${BLUE}[INFO]${NC} Копирование файлов проекта..."

# Копируем package.json и package-lock.json
scp package*.json $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Копируем исходный код
scp -r client/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp -r server/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp -r shared/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Копируем конфигурационные файлы
scp tsconfig.json $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp vite.config.ts $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp tailwind.config.ts $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp postcss.config.js $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
scp drizzle.config.ts $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Копируем .env файл
if [ -f .env.production ]; then
    scp .env.production $SERVER_USER@$SERVER_HOST:$SERVER_PATH/.env
    echo -e "${GREEN}[SUCCESS]${NC} .env файл скопирован"
else
    echo -e "${BLUE}[WARNING]${NC} .env.production не найден, создайте его вручную"
fi

# Установка зависимостей на сервере
echo -e "${BLUE}[INFO]${NC} Установка зависимостей на сервере..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm ci --production"

# Сборка проекта
echo -e "${BLUE}[INFO]${NC} Сборка проекта..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm run build"

# Создание директорий для данных и логов
echo -e "${BLUE}[INFO]${NC} Создание необходимых директорий..."
ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH/data $SERVER_PATH/logs"

# Настройка базы данных
echo -e "${BLUE}[INFO]${NC} Настройка базы данных..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm run db:push"

# Установка и настройка PM2
echo -e "${BLUE}[INFO]${NC} Настройка PM2..."
if ! ssh $SERVER_USER@$SERVER_HOST "command -v pm2 &> /dev/null"; then
    ssh $SERVER_USER@$SERVER_HOST "npm install -g pm2"
fi

# Создание конфигурации PM2
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: '$PROJECT_NAME',
    script: 'dist/index.js',
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
EOF"

# Остановка существующего процесса если есть
ssh $SERVER_USER@$SERVER_HOST "pm2 stop $PROJECT_NAME 2>/dev/null || true"
ssh $SERVER_USER@$SERVER_HOST "pm2 delete $PROJECT_NAME 2>/dev/null || true"

# Запуск приложения
echo -e "${BLUE}[INFO]${NC} Запуск приложения..."
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && pm2 start ecosystem.config.js"
ssh $SERVER_USER@$SERVER_HOST "pm2 save"

# Настройка автозапуска PM2
ssh $SERVER_USER@$SERVER_HOST "pm2 startup | tail -1 | cut -d ' ' -f 3- | bash"

# Настройка Nginx
echo -e "${BLUE}[INFO]${NC} Настройка Nginx..."
NGINX_CONFIG="
server {
    listen 80;
    server_name $PROJECT_NAME.$SERVER_HOST;
    
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
}"

ssh $SERVER_USER@$SERVER_HOST "echo '$NGINX_CONFIG' | tee /etc/nginx/sites-available/$PROJECT_NAME"
ssh $SERVER_USER@$SERVER_HOST "ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/"
ssh $SERVER_USER@$SERVER_HOST "nginx -t && systemctl reload nginx"

# Проверка статуса
echo -e "${BLUE}[INFO]${NC} Проверка статуса..."
ssh $SERVER_USER@$SERVER_HOST "pm2 status"

echo -e "${GREEN}[SUCCESS]${NC} Деплой завершен!"
echo -e "${BLUE}[INFO]${NC} Приложение доступно по адресу: http://$PROJECT_NAME.$SERVER_HOST"
echo -e "${BLUE}[INFO]${NC} Путь на сервере: $SERVER_PATH"
echo -e "${BLUE}[INFO]${NC} PM2 процесс: $PROJECT_NAME"
