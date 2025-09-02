# MergeSensei - Руководство по деплою

Это руководство описывает процесс деплоя приложения MergeSensei на сервер.

## Варианты деплоя

### 1. Автоматический деплой через bash скрипт (рекомендуется)

#### Предварительные требования на сервере:
- Ubuntu 20.04+ или CentOS 8+
- Node.js 18+
- Git
- Nginx
- PM2 (устанавливается автоматически)
- Certbot для SSL (опционально)

#### Настройка:

1. **Подключитесь к серверу:**
```bash
ssh root@82.146.36.8
```

2. **Клонируйте репозиторий на сервер:**
```bash
cd /var/www
git clone https://github.com/yourusername/mergesensei.git
cd mergesensei
```

3. **Настройте переменные в скрипте `deploy.sh` (уже настроено):**
```bash
SERVER_USER="root"                    # Пользователь сервера
SERVER_HOST="82.146.36.8"            # IP вашего сервера
SERVER_PATH="/var/www/mergesensei"   # Путь на сервере
GIT_REPO="https://github.com/yourusername/mergesensei.git"
```

4. **Создайте файл `.env.production`:**
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./data/mergesensei.db
SESSION_SECRET=your-super-secret-session-key-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

5. **Настройте SSH доступ (если деплой с локальной машины):**
```bash
# Создайте SSH ключ
ssh-keygen -t rsa -b 4096 -C "deploy@82.146.36.8"

# Скопируйте ключ на сервер
ssh-copy-id root@82.146.36.8
```

6. **Запустите деплой:**
```bash
chmod +x deploy.sh
./deploy.sh deploy
```

#### Команды скрипта:
- `./deploy.sh deploy` - Полный деплой
- `./deploy.sh backup` - Создание резервной копии
- `./deploy.sh restart` - Перезапуск приложения
- `./deploy.sh logs` - Просмотр логов
- `./deploy.sh status` - Проверка статуса
- `./deploy.sh rollback` - Откат к предыдущей версии
- `./deploy.sh nginx-reload` - Перезагрузка Nginx
- `./deploy.sh cleanup` - Очистка старых резервных копий

### 2. Деплой без Git репозитория (для локальной разработки)

Если у вас нет Git репозитория или вы хотите деплоить локальную версию проекта, используйте скрипт `deploy-no-git.sh`.

#### Предварительные требования:
- rsync (для синхронизации файлов)
- SSH доступ к серверу

#### Настройка:

1. **Убедитесь, что у вас есть rsync:**
```bash
# Ubuntu/Debian
sudo apt install rsync

# macOS
brew install rsync

# Windows (через WSL или Git Bash)
# rsync обычно уже установлен
```

2. **Создайте файл `.env.production` в корне проекта:**
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./data/mergesensei.db
SESSION_SECRET=your-super-secret-session-key-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

3. **Запустите деплой:**
```bash
chmod +x deploy-no-git.sh
./deploy-no-git.sh deploy
```

#### Команды скрипта без Git:
- `./deploy-no-git.sh deploy` - Полный деплой
- `./deploy-no-git.sh sync` - Только синхронизация кода
- `./deploy-no-git.sh backup` - Создание резервной копии
- `./deploy-no-git.sh restart` - Перезапуск приложения
- `./deploy-no-git.sh logs` - Просмотр логов
- `./deploy-no-git.sh status` - Проверка статуса
- `./deploy-no-git.sh rollback` - Откат к предыдущей версии
- `./deploy-no-git.sh nginx-reload` - Перезагрузка Nginx
- `./deploy-no-git.sh cleanup` - Очистка старых резервных копий

#### Что синхронизируется:
- Весь исходный код проекта
- Конфигурационные файлы
- Package.json и package-lock.json

#### Что НЕ синхронизируется:
- `node_modules/` (устанавливается на сервере)
- `.git/` (если есть)
- `dist/` (собирается на сервере)
- `.env*` файлы (копируются отдельно)
- Логи и временные файлы
- База данных и резервные копии

### 3. Деплой через Docker

#### Предварительные требования:
- Docker
- Docker Compose

#### Настройка:

1. **Создайте файл `.env`:**
```bash
SESSION_SECRET=your-super-secret-session-key-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

2. **Создайте SSL сертификаты (для production):**
```bash
mkdir ssl
# Поместите ваши SSL сертификаты в папку ssl/
# cert.pem и key.pem
```

3. **Запустите приложение:**
```bash
docker-compose up -d
```

## Структура деплоя на сервере

```
/var/www/                           # Базовая директория для всех проектов
├── mergesensei/                    # Ваш проект
│   ├── dist/                       # Собранное приложение
│   ├── data/                       # База данных SQLite
│   ├── logs/                       # Логи приложения
│   ├── ecosystem.config.js         # Конфигурация PM2
│   ├── .env                        # Переменные окружения
│   └── package.json
├── project1/                       # Другие проекты
├── project2/
└── ...

/var/backups/                       # Резервные копии
├── mergesensei/
│   ├── backup-20241201-143022/
│   └── backup-20241201-143156/
├── project1/
└── project2/
```

## Доступ к приложению

После успешного деплоя ваше приложение будет доступно по адресу:
- **HTTP:** http://mergesensei.82.146.36.8
- **HTTPS:** https://mergesensei.82.146.36.8 (после настройки SSL)

## Мониторинг и логи

### PM2 команды:
```bash
pm2 status              # Статус процессов
pm2 logs mergesensei    # Логи приложения
pm2 restart mergesensei # Перезапуск
pm2 stop mergesensei    # Остановка
```

### Логи Nginx:
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Логи приложения:
```bash
tail -f /var/www/mergesensei/logs/combined.log
```

## Обновление приложения

### Автоматическое обновление (с Git):
```bash
./deploy.sh deploy
```

### Автоматическое обновление (без Git):
```bash
./deploy-no-git.sh deploy
```

### Ручное обновление:
```bash
cd /var/www/mergesensei
# Если с Git:
git pull origin main
# Если без Git - загрузите файлы вручную
npm ci --production
npm run build
pm2 restart mergesensei
```

## Безопасность

### Firewall (UFW):
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### SSL сертификаты:
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата для поддомена
sudo certbot --nginx -d mergesensei.82.146.36.8
```

### Переменные окружения:
- Никогда не коммитьте `.env` файлы
- Используйте сильные секреты
- Регулярно обновляйте ключи

## Troubleshooting

### Приложение не запускается:
```bash
# Проверьте логи
pm2 logs mergesensei

# Проверьте статус
pm2 status

# Проверьте переменные окружения
cat .env
```

### Nginx ошибки:
```bash
# Проверьте конфигурацию
sudo nginx -t

# Перезапустите Nginx
sudo systemctl reload nginx

# Проверьте логи
sudo tail -f /var/log/nginx/error.log
```

### Проблемы с базой данных:
```bash
# Проверьте права доступа
ls -la data/

# Примените миграции
npm run db:push

# Проверьте размер базы
du -h data/mergesensei.db
```

## Производительность

### Оптимизация Node.js:
```bash
# В ecosystem.config.js
instances: 'max'           # Использовать все CPU ядра
max_memory_restart: '1G'  # Перезапуск при превышении памяти
```

### Оптимизация Nginx:
- Gzip сжатие включено
- Кэширование статических файлов
- HTTP/2 поддержка

### Мониторинг:
```bash
# Установка мониторинга
npm install -g pm2-server-monit

# Запуск мониторинга
pm2-server-monit
```

## Резервное копирование

### Автоматическое резервное копирование:
```bash
# Добавьте в crontab
0 2 * * * /var/www/mergesensei/deploy.sh backup
# или для версии без Git:
0 2 * * * /var/www/mergesensei/deploy-no-git.sh backup
```

### Ручное резервное копирование:
```bash
./deploy.sh backup
# или
./deploy-no-git.sh backup
```

### Восстановление:
```bash
./deploy.sh rollback
# или
./deploy-no-git.sh rollback
```

## Поддержка

При возникновении проблем:
1. Проверьте логи приложения и Nginx
2. Убедитесь, что все переменные окружения настроены
3. Проверьте права доступа к файлам
4. Убедитесь, что порты не заблокированы firewall

## Полезные ссылки

- [PM2 документация](https://pm2.keymetrics.io/docs/)
- [Nginx документация](https://nginx.org/en/docs/)
- [Docker документация](https://docs.docker.com/)
- [Let's Encrypt](https://letsencrypt.org/docs/)
