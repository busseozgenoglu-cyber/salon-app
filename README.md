# Salon Yönetim Uygulaması

Güzellik salonu yönetimi için masaüstü uygulaması. Randevular, müşteriler, ayarlar ve Instagram kampanya özellikleri.

## Proje Yapısı

```
salon-app/
├── start.sh          # Hızlı başlatma scripti
├── main.js           # Electron ana dosya
├── package.json      # Bağımlılıklar ve scriptler
├── backend/
│   ├── server.js     # API sunucusu (Express)
│   └── data/         # Veriler (settings, customers, appointments)
├── src/
│   ├── App.js        # Ana uygulama
│   ├── api.js       # API çağrıları
│   └── components/   # Randevular, Müşteriler, Ayarlar, Instagram Kampanya
└── public/
    └── index.html
```

## Kurulum

```bash
npm install
```

## Çalıştırma

**Yöntem 1 - start.sh ile (Linux/Mac):**
```bash
chmod +x start.sh
./start.sh
```

**Yöntem 2 - npm ile:**
```bash
npm start
```

**Önemli:** Randevu sistemi backend sunucusuna bağlıdır. `npm start` veya `./start.sh` kullandığınızda backend otomatik başlar. Sadece `npm run react-start` veya `electron .` çalıştırırsanız randevular çalışmaz - backend'i ayrıca başlatın:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Uygulama
npm run electron-dev
```

Bu komut:
1. Backend API sunucusunu (port 3001) başlatır
2. React uygulamasını (port 3000) başlatır
3. Electron masaüstü penceresini açar

## Özellikler

- **Dashboard:** Özet istatistikler
- **Randevular:** Randevu ekleme, düzenleme, silme
- **Müşteriler:** Müşteri bilgileri yönetimi
- **Ayarlar:** Salon bilgileri (ad, adres, telefon, Instagram vb.)
- **Instagram Kampanya:** Tüm Instagram müşterilerinize görsel mesaj gönderme

## Instagram Kampanya

1. "Instagram Kişileri" bölümünden "+ Kişi Ekle" ile müşterilerinizi ekleyin
2. Kampanya görseli seçin (JPG, PNG, GIF)
3. İsteğe bağlı mesaj yazın
4. "Tüm Kişilere Gönder" ile kampanyayı başlatın

**Not:** Gerçek Instagram API entegrasyonu için Meta Developer hesabı ve Instagram Business hesabı gerekir. Şu an kampanya verileri yerel olarak işlenir.

## Veri Depolama

Tüm veriler `backend/data/` klasöründe JSON dosyalarında saklanır:
- `settings.json` - Salon ayarları
- `customers.json` - Müşteriler
- `appointments.json` - Randevular
- `instagram_contacts.json` - Instagram kampanya kişileri
