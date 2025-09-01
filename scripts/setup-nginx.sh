#!/bin/bash

# Настройка Nginx для MergeSensei

echo "🌐 Настройка Nginx для mergesensei.dev1853.ru..."

# Создаем конфигурацию Nginx
cat > /etc/nginx/sites-available/mergesensei << 'EOF'
server {
    listen 80;
    server_name mergesensei.dev1853.ru;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /static/ {
        alias /var/www/mergesensei/dist/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
EOF

echo "✅ Конфигурация Nginx создана"

# Активируем сайт
ln -sf /etc/nginx/sites-available/mergesensei /etc/nginx/sites-enabled/

echo "✅ Сайт активирован"

# Проверяем конфигурацию
if nginx -t; then
    echo "✅ Конфигурация Nginx корректна"
    
    # Перезагружаем Nginx
    systemctl reload nginx
    echo "✅ Nginx перезагружен"
    
    echo ""
    echo "🎉 Настройка Nginx завершена!"
    echo "📱 Приложение доступно по адресу: http://mergesensei.dev1853.ru"
else
    echo "❌ Ошибка в конфигурации Nginx"
    exit 1
fi
