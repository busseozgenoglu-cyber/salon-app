# Doğrulama - Doğru Projede misiniz?

## Adım 1: Projeyi Doğrula
```bash
cd salon-app-main   # veya indirdiğiniz klasörün adı
npm run dogrula
```

**Görmeniz gereken:**
```
✓ vite.config.js var - DOĞRU PROJE
✓ Webpack yok - Bu Vite projesi
```

**Eğer "YANLIŞ PROJE" veya "webpack" görürseniz:** Yanlış klasördesiniz. Eski güzellik projesini silin.

## Adım 2: Sadece Tarayıcıda Çalıştır (Electron olmadan)
```bash
npm run web
```

Tarayıcıda aç: http://localhost:3000

**Vite çalışıyorsa göreceksiniz:**
- Terminalde: "VITE v5.x.x ready in X ms"
- Tarayıcıda: Mor/lacivert tema ile Salon uygulaması

**Webpack hatası görürseniz:** Yanlış projede veya yanlış klasördesiniz.

## Adım 3: Tam Kurulum (Electron ile)
```bash
rm -rf node_modules package-lock.json
npm install
npm run web
```

Önce `npm run web` ile deneyin. Çalışıyorsa `npm start` ile Electron'u da başlatabilirsiniz.
