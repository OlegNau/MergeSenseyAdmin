#!/bin/bash

# MergeSensei Deployment Script для деплоя без Git репозитория
# Этот скрипт автоматизирует процесс деплоя приложения на сервер

set -e  # Остановить выполнение при ошибке

# Конфигурация
PROJECT_NAME="mergesensei"
SERVER_USER="root"
SERVER_HOST="82.146.36.8"
SERVER_BASE_PATH="/var/www"                    # Базовая директория для всех проектов
SERVER_PATH="$SERVER_BASE_PATH/$PROJECT_NAME"  # Путь к конкретному проекту
BACKUP_BASE_PATH="/var/backups"                # Базовая директория для резервных копий
BACKUP_PATH="$BACKUP_BASE_PATH/$PROJECT_NAME"
LOCAL_PROJECT_PATH="."                         # Путь к локальному проекту (текущая директория)

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции логирования
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка зависимостей
check_dependencies() {
    log_info "Проверка зависимостей..."
    
    if ! command -v rsync &> /dev/null; then
        log_error "rsync не установлен. Установите: sudo apt install rsync"
        exit 1
    fi
    
    if ! command -v ssh &> /dev/null; then
        log_error "SSH клиент не установлен"
        exit 1
    fi
    
    log_success "Все зависимости установлены"
}

# Проверка существующих проектов на сервере
check_existing_projects() {
    log_info "Проверка существующих проектов на сервере..."
    
    ssh $SERVER_USER@$SERVER_HOST "ls -la $SERVER_BASE_PATH/" || {
        log_warning "Базовая директория $SERVER_BASE_PATH не существует, создаю..."
        ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_BASE_PATH"
    }
    
    # Показываем существующие проекты
    log_info "Существующие проекты на сервере:"
    ssh $SERVER_USER@$SERVER_HOST "ls -la $SERVER_BASE_PATH/"
}

# Создание резервной копии
create_backup() {
    log_info "Создание резервной копии..."
    
    if ssh $SERVER_USER@$SERVER_HOST "[ -d $SERVER_PATH ]"; then
        BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
        ssh $SERVER_USER@$SERVER_HOST "mkdir -p $BACKUP_PATH && cp -r $SERVER_PATH $BACKUP_PATH/$BACKUP_NAME"
        log_success "Резервная копия создана: $BACKUP_NAME"
        
        # Очистка старых резервных копий (оставляем последние 5)
        ssh $SERVER_USER@$SERVER_HOST "cd $BACKUP_PATH && ls -t | tail -n +6 | xargs -r rm -rf"
        log_info "Старые резервные копии очищены"
    else
        log_warning "Директория проекта не найдена, резервная копия не создана"
    fi
}

# Синхронизация кода с сервером
sync_code() {
    log_info "Синхронизация кода с сервером..."
    
    # Создание директории на сервере если не существует
    ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH"
    
    # Синхронизация кода (исключая node_modules, .git, dist)
    /usr/bin/rsync -avz --progress \
        --exclude 'node_modules/' \
        --exclude '.git/' \
        --exclude 'dist/' \
        --exclude '.env*' \
        --exclude '*.log' \
        --exclude 'data/' \
        --exclude 'backups/' \
        --exclude '.DS_Store' \
        --exclude 'Thumbs.db' \
        $LOCAL_PROJECT_PATH/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
    
    log_success "Код синхронизирован с сервером"
}

# Установка зависимостей
install_dependencies() {
    log_info "Установка зависимостей..."
    
    ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm ci --production"
    log_success "Зависимости установлены"
}

# Сборка проекта
build_project() {
    log_info "Сборка проекта..."
    
    ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm run build"
    log_success "Проект собран"
}

# Настройка базы данных
setup_database() {
    log_info "Настройка базы данных..."
    
    # Создание директории для базы данных
    ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH/data"
    
    # Применение миграций
    ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && npm run db:push"
    log_success "База данных настроена"
}

# Настройка переменных окружения
setup_environment() {
    log_info "Настройка переменных окружения..."
    
    if [ ! -f .env.production ]; then
        log_warning "Файл .env.production не найден, создаю шаблон..."
        cat > .env.production << EOF
# Production Environment Variables
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./data/mergesensei.db
SESSION_SECRET=your-super-secret-session-key-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
EOF
        log_info "Создан файл .env.production. Пожалуйста, настройте переменные и запустите деплой снова."
        exit 1
    fi
    
    # Копирование .env файла на сервер
    scp .env.production $SERVER_USER@$SERVER_HOST:$SERVER_PATH/.env
    log_success "Переменные окружения настроены"
}

# Настройка PM2 для управления процессами
setup_pm2() {
    log_info "Настройка PM2..."
    
    # Проверка установки PM2
    if ! ssh $SERVER_USER@$SERVER_HOST "command -v pm2 &> /dev/null"; then
        ssh $SERVER_USER@$SERVER_HOST "npm install -g pm2"
    fi
    
    # Создание конфигурации PM2 с уникальным именем
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
    min_uptime: '10s',
    cwd: '$SERVER_PATH'
  }]
}
EOF"
    
    # Создание директории для логов
    ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH/logs"
    
    log_success "PM2 настроен"
}

# Настройка Nginx для мультипроектной среды
setup_nginx() {
    log_info "Настройка Nginx для мультипроектной среды..."
    
    # Создание уникальной конфигурации Nginx для проекта
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
    
    # Health check
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}"
    
    # Создание конфигурации Nginx
    ssh $SERVER_USER@$SERVER_HOST "echo '$NGINX_CONFIG' | tee /etc/nginx/sites-available/$PROJECT_NAME"
    
    # Активация сайта
    ssh $SERVER_USER@$SERVER_HOST "ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/"
    
    # Проверка и перезагрузка Nginx
    ssh $SERVER_USER@$SERVER_HOST "nginx -t && systemctl reload nginx"
    
    log_success "Nginx настроен для $PROJECT_NAME.$SERVER_HOST"
}

# Настройка SSL с Let's Encrypt для поддомена
setup_ssl() {
    log_info "Настройка SSL для поддомена..."
    
    if ! ssh $SERVER_USER@$SERVER_HOST "command -v certbot &> /dev/null"; then
        log_warning "Certbot не установлен. SSL не настроен."
        return
    fi
    
    # Получение SSL сертификата для поддомена
    ssh $SERVER_USER@$SERVER_HOST "certbot --nginx -d $PROJECT_NAME.$SERVER_HOST --non-interactive --agree-tos --email admin@$SERVER_HOST"
    log_success "SSL настроен для $PROJECT_NAME.$SERVER_HOST"
}

# Запуск приложения
start_application() {
    log_info "Запуск приложения..."
    
    # Остановка существующего процесса если есть
    ssh $SERVER_USER@$SERVER_HOST "pm2 stop $PROJECT_NAME 2>/dev/null || true"
    ssh $SERVER_USER@$SERVER_HOST "pm2 delete $PROJECT_NAME 2>/dev/null || true"
    
    # Запуск нового процесса
    ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && pm2 start ecosystem.config.js"
    ssh $SERVER_USER@$SERVER_HOST "pm2 save"
    
    # Настройка автозапуска PM2
    ssh $SERVER_USER@$SERVER_HOST "pm2 startup | tail -1 | cut -d ' ' -f 3- | bash"
    
    log_success "Приложение запущено"
}

# Проверка статуса
check_status() {
    log_info "Проверка статуса приложения..."
    
    ssh $SERVER_USER@$SERVER_HOST "pm2 status"
    ssh $SERVER_USER@$SERVER_HOST "curl -s http://localhost:3000/health || echo 'Приложение не отвечает'"
    
    log_success "Проверка завершена"
}

# Показ информации о проекте
show_project_info() {
    log_info "Информация о проекте $PROJECT_NAME:"
    echo "  - URL: http://$PROJECT_NAME.$SERVER_HOST"
    echo "  - Путь на сервере: $SERVER_PATH"
    echo "  - PM2 процесс: $PROJECT_NAME"
    echo "  - Порт: 3000"
    echo "  - База данных: $SERVER_PATH/data/mergesensei.db"
}

# Основная функция деплоя
main() {
    log_info "Начинаем деплой MergeSensei без Git репозитория..."
    
    check_dependencies
    check_existing_projects
    create_backup
    sync_code
    install_dependencies
    build_project
    setup_database
    setup_environment
    setup_pm2
    setup_nginx
    setup_ssl
    start_application
    check_status
    show_project_info
    
    log_success "Деплой завершен успешно!"
    log_info "Приложение доступно по адресу: https://$PROJECT_NAME.$SERVER_HOST"
}

# Обработка аргументов командной строки
case "${1:-}" in
    "deploy")
        main
        ;;
    "sync")
        sync_code
        ;;
    "backup")
        create_backup
        ;;
    "restart")
        ssh $SERVER_USER@$SERVER_HOST "pm2 restart $PROJECT_NAME"
        log_success "Приложение перезапущено"
        ;;
    "logs")
        ssh $SERVER_USER@$SERVER_HOST "pm2 logs $PROJECT_NAME"
        ;;
    "status")
        check_status
        ;;
    "rollback")
        log_info "Откат к предыдущей версии..."
        ssh $SERVER_USER@$SERVER_HOST "cd $BACKUP_PATH && ls -t | head -2 | tail -1 | xargs -I {} cp -r {} $SERVER_PATH"
        ssh $SERVER_USER@$SERVER_HOST "pm2 restart $PROJECT_NAME"
        log_success "Откат завершен"
        ;;
    "nginx-reload")
        log_info "Перезагрузка Nginx..."
        ssh $SERVER_USER@$SERVER_HOST "nginx -t && systemctl reload nginx"
        log_success "Nginx перезагружен"
        ;;
    "cleanup")
        log_info "Очистка старых резервных копий..."
        ssh $SERVER_USER@$SERVER_HOST "cd $BACKUP_PATH && ls -t | tail -n +6 | xargs -r rm -rf"
        log_success "Очистка завершена"
        ;;
    *)
        echo "Использование: $0 {deploy|sync|backup|restart|logs|status|rollback|nginx-reload|cleanup}"
        echo ""
        echo "Команды:"
        echo "  deploy        - Полный деплой приложения"
        echo "  sync          - Синхронизация кода с сервером"
        echo "  backup        - Создание резервной копии"
        echo "  restart       - Перезапуск приложения"
        echo "  logs          - Просмотр логов"
        echo "  status        - Проверка статуса"
        echo "  rollback      - Откат к предыдущей версии"
        echo "  nginx-reload  - Перезагрузка Nginx"
        echo "  cleanup       - Очистка старых резервных копий"
        exit 1
        ;;
esac
