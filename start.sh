#!/bin/bash
# Salon Uygulaması Başlatıcı

echo "Salon Uygulaması başlatılıyor..."

# Bağımlılıklar yüklü mü kontrol et
if [ ! -d "node_modules" ]; then
  echo "Bağımlılıklar yükleniyor..."
  npm install
fi

echo "NOT: Backend (port 3001) ve React (port 3000) birlikte başlatılıyor."
echo "Randevuların çalışması için backend sunucusunun açık olması gerekir."
echo ""

# Uygulamayı başlat (backend + React + Electron)
npm start
