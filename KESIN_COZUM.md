# KESİN ÇÖZÜM - html-webpack-plugin Hatası

## Sorun
`/Users/alen/Downloads/güzellik/frontend` klasöründeki proje **eski webpack** kullanıyor ve hata veriyor.

## Çözüm: Eski Klasörü Sil, Yeni Projeyi Kullan

### Adım 1: Eski Klasörü Tamamen Sil
```bash
rm -rf /Users/alen/Downloads/güzellik
```
Bu klasörü **artık kullanmayın**.

### Adım 2: Yeni Projeyi İndir
Tarayıcıda aç: https://github.com/busseozgenoglu-cyber/salon-app/archive/refs/heads/main.zip

İndir, ZIP'i aç.

### Adım 3: Doğru Konuma Taşı
```bash
# İndirilen salon-app-main klasörünü Desktop'a taşı
mv ~/Downloads/salon-app-main ~/Desktop/salon-app
cd ~/Desktop/salon-app
```

**ÖNEMLİ:** Klasör adı `salon-app` olmalı. `güzellik` veya `frontend` KULLANMAYIN.

### Adım 4: Kurulum ve Çalıştırma
```bash
cd ~/Desktop/salon-app
rm -rf node_modules package-lock.json
npm install
npm start
```

### Adım 5: Backend Ayrı Çalışıyorsa
Eğer sadece arayüz açılıyorsa, ayrı terminalde:
```bash
cd ~/Desktop/salon-app
npm run server
```

---

## Neden Bu Çalışır?
- Yeni proje **Vite** kullanıyor (webpack YOK)
- html-webpack-plugin YOK
- Klasör adında Türkçe karakter YOK
- Tamamen farklı, temiz bir kurulum

## Hâlâ Hata Varsa
1. Node sürümü: `node -v` → 16 veya üzeri olmalı
2. npm cache temizle: `npm cache clean --force`
3. Tekrar: `rm -rf node_modules package-lock.json && npm install && npm start`
