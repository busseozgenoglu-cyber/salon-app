# Salon App - Kurulum Rehberi

## Önemli: Klasör Adı

Projeyi **Türkçe karakter içermeyen** bir klasöre koyun:
- ✅ `salon-app`, `Downloads`, `Desktop`
- ❌ `güzellik`, `Güzellik Salonu`

Türkçe karakter (ü, ğ, ş, ı, ö, ç) bazı sistemlerde webpack hatasına yol açar.

## Adım 1: İndirme

1. ZIP indir: https://github.com/busseozgenoglu-cyber/salon-app/archive/refs/heads/main.zip
2. ZIP'i aç
3. `salon-app-main` klasörünü `salon-app` olarak yeniden adlandır (isteğe bağlı)
4. Bu klasöre taşı: `~/Desktop/salon-app` veya `~/Downloads/salon-app`

## Adım 2: Kurulum

Terminal aç ve:

```bash
cd ~/Desktop/salon-app   # veya indirdiğin klasör
rm -rf node_modules package-lock.json
npm install
```

## Adım 3: Çalıştırma

```bash
npm start
```

Bu komut backend + React + Electron'u birlikte başlatır.

## Hata Alırsanız

**"html-webpack-plugin" veya "Module not found" hatası:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

**"EADDRINUSE" veya port hatası:**
- Port 3000 veya 3001 kullanımda. Diğer uygulamaları kapatın veya bilgisayarı yeniden başlatın.

**Node sürümü:**
- Node.js 16 veya üzeri gerekir. Kontrol: `node -v`
