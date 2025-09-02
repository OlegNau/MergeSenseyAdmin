# 🚀 MergeSensei - Intelligent Pipeline Management System

MergeSensei - это интеллектуальная система управления пайплайнами, построенная на современном стеке технологий.

## 🏗️ Архитектура

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Drizzle ORM
- **Database**: SQLite
- **Deployment**: PM2 + Nginx + Let's Encrypt SSL

## 📁 Структура проекта

```
MergeSensei/
├── 📚 docs/                    # Документация
│   ├── DEPLOYMENT_SUCCESS.md   # Отчет об успешном деплое
│   ├── ISSUES_RESOLVED.md      # Решенные проблемы
│   ├── DEPLOYMENT.md           # Инструкции по деплою
│   └── README.md               # Документация папки
├── 🚀 deployment/              # Скрипты деплоя
│   ├── deploy-no-git.sh       # Деплой без Git
│   ├── deploy-simple.sh       # Упрощенный деплой
│   ├── start-server.sh        # Запуск сервера
│   └── README.md               # Документация папки
├── 🐳 docker/                  # Docker конфигурация
│   ├── docker-compose.yml     # Docker Compose
│   ├── Dockerfile             # Docker образ
│   └── README.md               # Документация папки
├── 🌐 nginx/                   # Nginx конфигурации
│   ├── nginx-https.conf       # HTTPS конфигурация
│   ├── nginx-mergesensei.conf # Доменная конфигурация
│   ├── nginx.conf             # Основная конфигурация
│   └── README.md               # Документация папки
├── 📜 scripts/                 # Вспомогательные скрипты
│   ├── setup-nginx.sh         # Настройка Nginx
│   └── README.md               # Документация папки
├── 💻 client/                  # Frontend приложение
│   ├── src/                    # Исходный код
│   ├── public/                 # Статические файлы
│   └── index.html              # Главная страница
├── 🔧 server/                  # Backend приложение
│   ├── index.ts                # Основной сервер
│   ├── production.ts           # Production сервер
│   ├── routes.ts               # API маршруты
│   └── db.ts                   # База данных
├── 🔗 shared/                  # Общие схемы
│   └── schema.ts               # Drizzle схемы
├── 📊 data/                    # База данных
├── 🗄️ migrations/              # Миграции БД
└── 📦 package.json             # Зависимости проекта
```

## 🚀 Быстрый старт

### Разработка
```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка
npm run build
```

### Деплой
```bash
# Сборка проекта
npm run build

# Деплой на сервер (см. docs/DEPLOYMENT.md)
cd deployment
./deploy-no-git.sh deploy
```

## 🌐 Production

**URL**: https://mergesensei.dev1853.ru

**Статус**: ✅ Работает с HTTPS, SSL сертификатом и автоматическим перенаправлением

## 📚 Документация

- **Деплой**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Решенные проблемы**: [docs/ISSUES_RESOLVED.md](docs/ISSUES_RESOLVED.md)
- **Успешный деплой**: [docs/DEPLOYMENT_SUCCESS.md](docs/DEPLOYMENT_SUCCESS.md)

## 🔧 Технологии

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: SQLite
- **Deployment**: PM2, Nginx, Let's Encrypt
- **Build Tools**: Vite, esbuild

## 📝 Лицензия

MIT License

## 🤝 Поддержка

При возникновении проблем обращайтесь к документации в папке `docs/` или создавайте issue в репозитории.
