#!/bin/bash
# Salon App - Kesin Kurulum Scripti
# Bu scripti salon-app klasöründe çalıştırın

set -e

echo "=========================================="
echo "  Salon App - Kesin Kurulum"
echo "=========================================="
echo ""

# Mevcut dizin kontrolü - Vite projesi mi?
if [ ! -f "package.json" ] || [ ! -f "vite.config.js" ]; then
  echo "HATA: Bu script salon-app ana klasöründe çalıştırılmalı!"
  echo "vite.config.js bulunamadı - YANLIŞ KLASÖR!"
  echo ""
  echo "güzellik/frontend KULLANMAYIN. Doğru adımlar:"
  echo "1. https://github.com/busseozgenoglu-cyber/salon-app/archive/refs/heads/main.zip indir"
  echo "2. ZIP'i aç, salon-app-main klasörüne gir"
  echo "3. Bu scripti orada çalıştır: ./kur.sh"
  exit 1
fi

# Webpack projesi mi kontrol et (eski proje)
if [ -d "node_modules/react-scripts" ] || [ -d "node_modules/html-webpack-plugin" ]; then
  echo "UYARI: react-scripts veya html-webpack-plugin bulundu!"
  echo "Bu ESKİ proje. node_modules siliniyor..."
  rm -rf node_modules package-lock.json
fi

echo "[1/4] Eski node_modules temizleniyor..."
rm -rf node_modules package-lock.json

echo "[2/4] npm cache temizleniyor..."
npm cache clean --force 2>/dev/null || true

echo "[3/4] Bağımlılıklar yükleniyor..."
npm install

echo "[4/4] Doğrulama..."
node dogrula.js

echo ""
echo "Uygulama başlatılıyor (Vite + Backend)..."
echo "Tarayıcıda aç: http://localhost:3000"
echo ""
npm run web
