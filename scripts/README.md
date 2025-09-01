# 📜 Вспомогательные скрипты MergeSensei

Эта папка содержит вспомогательные скрипты для настройки и обслуживания MergeSensei.

## 📋 Содержимое

### 🔧 Скрипты
- **`setup-nginx.sh`** - Настройка Nginx на production сервере

## 🚀 Как использовать

### Настройка Nginx
```bash
# Копируем скрипт на сервер
scp scripts/setup-nginx.sh root@your-server:/var/www/mergesensei/

# Запускаем на сервере
ssh root@your-server "cd /var/www/mergesensei && chmod +x setup-nginx.sh && ./setup-nginx.sh"
```

## 📝 Примечания

- Все скрипты предназначены для выполнения на production сервере
- Требуют root доступ
- Выполняют автоматическую настройку компонентов
- Включают проверки и валидацию
