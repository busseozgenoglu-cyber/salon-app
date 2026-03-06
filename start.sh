#!/bin/bash
# Salon Uygulaması Başlatıcı

echo "Salon Uygulaması başlatılıyor..."

# Bağımlılıklar yüklü mü kontrol et
if [ ! -d "node_modules" ]; then
  echo "Bağımlılıklar yükleniyor..."
  npm install
fi

# Uygulamayı başlat (backend + React + Electron)
npm start
