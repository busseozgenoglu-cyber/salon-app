# KESİN ÇÖZÜM - html-webpack-plugin Hatası

## Sorun
Webpack/html-webpack-plugin hatası alıyorsanız **yanlış proje** veya **eski klasör** kullanıyorsunuz.

## ÇÖZÜM - Sıfırdan Başla

### Adım 1: Tüm Eski Klasörleri Sil
```bash
rm -rf ~/Downloads/güzellik
rm -rf ~/Downloads/salon-app-main
rm -rf ~/Desktop/salon-app
```
**Hepsini sil.** Temiz başlayacağız.

### Adım 2: Yeni İndir
1. Tarayıcıda aç: https://github.com/busseozgenoglu-cyber/salon-app/archive/refs/heads/main.zip
2. İndir (Downloads'a gidecek)
3. ZIP'i çift tıkla AÇ (extract)
4. `salon-app-main` klasörü oluşacak

### Adım 3: Taşı ve Gir
```bash
mv ~/Downloads/salon-app-main ~/Desktop/salon-app
cd ~/Desktop/salon-app
```

### Adım 4: Doğrula
```bash
npm run dogrula
```
**"✓ DOĞRU PROJE"** görmelisiniz. "YANLIŞ PROJE" görürseniz yanlış klasördesiniz.

### Adım 5: Kur ve Çalıştır
```bash
chmod +x kur.sh
./kur.sh
```

Bu script: temizler, kurar, **npm run web** ile başlatır (Vite, webpack değil).

### Adım 6: Tarayıcıda Aç
http://localhost:3000

**Vite çalışıyorsa:** Mor tema, Salon menüsü görürsünüz.
**Webpack hatası:** Yanlış proje - Adım 1'den tekrar.

---

## Hâlâ Aynı Hata?
1. `npm run dogrula` çalıştırın - ne diyor?
2. `ls` ile klasörde `vite.config.js` var mı kontrol edin
3. `güzellik` veya `frontend` klasöründe OLMAYIN - sadece `salon-app` veya `salon-app-main`
