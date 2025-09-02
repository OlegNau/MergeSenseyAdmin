# 🚀 Скрипты деплоя MergeSensei

Эта папка содержит все скрипты для развертывания MergeSensei на сервере.

## 📋 Содержимое

### 🔧 Основные скрипты
- **`deploy-no-git.sh`** - Деплой без Git репозитория (через rsync/scp)
- **`deploy-simple.sh`** - Упрощенный деплой через scp
- **`start-server.sh`** - Запуск сервера на production

### 🎯 Назначение

1. **`deploy-no-git.sh`** - Используется когда нет доступа к Git репозиторию
2. **`deploy-simple.sh`** - Альтернативный способ деплоя через scp
3. **`start-server.sh`** - Запуск приложения на сервере

## 🚀 Как использовать

### Деплой без Git
```bash
# Копируем скрипт на сервер
scp deployment/deploy-no-git.sh root@your-server:/tmp/

# Запускаем на сервере
ssh root@your-server "chmod +x /tmp/deploy-no-git.sh && /tmp/deploy-no-git.sh deploy"
```

### Запуск сервера
```bash
# Копируем скрипт запуска
scp deployment/start-server.sh root@your-server:/var/www/mergesensei/

# Запускаем
ssh root@your-server "cd /var/www/mergesensei && chmod +x start-server.sh && ./start-server.sh"
```

## ⚠️ Важные замечания

- Все скрипты предназначены для Linux/Unix систем
- Требуют root доступ на сервере
- Перед использованием настройте переменные окружения
- Проверьте пути и IP адреса в скриптах
