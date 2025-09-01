# 🐳 Docker конфигурация MergeSensei

Эта папка содержит Docker файлы для контейнеризации MergeSensei.

## 📋 Содержимое

### 🔧 Файлы
- **`docker-compose.yml`** - Docker Compose конфигурация
- **`Dockerfile`** - Docker образ для приложения

## 🚀 Как использовать

### Запуск через Docker Compose
```bash
cd docker
docker-compose up -d
```

### Сборка образа
```bash
cd docker
docker build -t mergesensei .
```

### Запуск контейнера
```bash
docker run -p 3000:3000 mergesensei
```

## 🌐 Порты

- **3000** - Основное приложение
- **80** - Nginx (если настроен)

## 📝 Примечания

- Docker конфигурация создана как альтернатива прямому деплою
- В production используется прямое развертывание на сервере
- Docker полезен для разработки и тестирования
