# 🌐 Nginx конфигурации MergeSensei

Эта папка содержит конфигурации Nginx для MergeSensei.

## 📋 Содержимое

### 🔧 Конфигурации
- **`nginx.conf`** - Основная конфигурация Nginx
- **`nginx-mergesensei.conf`** - Конфигурация для домена mergesensei.dev1853.ru
- **`nginx-https.conf`** - HTTPS конфигурация с SSL

## 🚀 Как использовать

### Применение конфигурации
```bash
# Копируем на сервер
scp nginx/nginx-https.conf root@your-server:/etc/nginx/sites-available/mergesensei

# Активируем
ssh root@your-server "ln -sf /etc/nginx/sites-available/mergesensei /etc/nginx/sites-enabled/"

# Проверяем и перезагружаем
ssh root@your-server "nginx -t && systemctl reload nginx"
```

## 🔒 SSL настройки

- **SSL сертификат**: Let's Encrypt
- **Протоколы**: TLSv1.2, TLSv1.3
- **HTTP/2**: включен
- **HSTS**: настроен

## 📝 Примечания

- `nginx-https.conf` - основная конфигурация для production
- Все конфигурации включают проксирование на порт 3001
- Настроено автоматическое перенаправление HTTP → HTTPS
