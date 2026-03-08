# Güzellik Salonu Yönetim Sistemi - Detaylı Geliştirme Prompt'u

Aşağıdaki prompt'u kopyalayıp AI asistanına yapıştırabilirsiniz:

---

## PROMPT BAŞLANGIÇ

Şunları içeren **kapsamlı bir güzellik salonu yönetim programı** geliştir:

### 1. INDEX ANALİZ
- **Müşteri indeksi:** Yaş, cinsiyet, bölge, gelir grubu, harcama alışkanlıkları
- **Hizmet indeksi:** En çok talep edilen hizmetler, sezonluk trendler, fiyat performans
- **Randevu indeksi:** Yoğun günler/saatler, no-show oranları, ortalama randevu süresi
- **Gelir indeksi:** Günlük/haftalık/aylık gelir grafikleri, hizmet bazlı kârlılık
- **Stok indeksi:** Ürün tüketimi, sipariş noktası, maliyet analizi
- Tüm indeksler için filtreleme (tarih aralığı, hizmet, personel)
- Export: Excel, PDF rapor

### 2. WHATSAPP ENTEGRASYONU
- WhatsApp Business API veya resmi entegrasyon
- **Randevu hatırlatma:** Randevudan 24 saat ve 1 saat önce otomatik mesaj
- **Doğum günü mesajları:** Müşteri doğum gününde otomatik kutlama + indirim kuponu
- **Toplu mesaj:** Seçili müşteri grubuna kampanya mesajı (metin + görsel)
- **Sohbet geçmişi:** Müşteri ile tüm WhatsApp konuşmalarının kaydı
- **Şablon mesajlar:** Onaylı WhatsApp şablonları (randevu onayı, hatırlatma, teşekkür)
- Mesaj kuyruğu ve başarı/başarısız gönderim takibi

### 3. INSTAGRAM KAMPANYA
- Instagram Business API veya Meta Graph API entegrasyonu
- **Görsel kampanya:** Tüm takipçilere veya mesajlaşan müşterilere görsel + metin gönderimi
- **Hikaye kampanyası:** Hikaye paylaşımı ve etkileşim takibi
- **DM toplu gönderim:** Daha önce mesajlaşmış müşterilere toplu DM
- Kampanya planlama: Tarih/saat seçimi, hedef kitle filtresi
- Kampanya raporu: Gönderim sayısı, açılma, tıklanma oranları

### 4. MÜŞTERİ BİLGİLERİ
- **Temel bilgiler:** Ad, soyad, telefon, e-posta, doğum tarihi, adres
- **İletişim:** WhatsApp numarası, Instagram kullanıcı adı
- **Tercihler:** Favori hizmetler, alerjiler, notlar (örn: "saç boyasına alerjisi var")
- **Harcama geçmişi:** Toplam harcama, son ziyaret, ortalama sepet
- **Segmentasyon:** VIP, yeni, pasif (3 aydan uzun gelmeyen) müşteri etiketleri
- Müşteri kartı: Fotoğraf, tüm randevu geçmişi, notlar
- Arama: İsim, telefon, e-posta ile hızlı arama

### 5. RANDEVULAR
- Takvim görünümü (günlük/haftalık/aylık)
- Randevu oluşturma: Müşteri seçimi, hizmet, personel, süre, fiyat
- Çakışma kontrolü (aynı personel aynı saatte iki randevu alamaz)
- Randevu durumları: Beklemede, Onaylandı, Tamamlandı, İptal, No-Show
- Drag & drop ile randevu taşıma
- Randevu geçmişi ve istatistikler
- No-show takibi ve uyarı listesi

### 6. GÜZELLİK MUHASEBESİ
- **Gelir takibi:**
  - Hizmet satışları (saç kesimi, boyama, manikür vb.)
  - Ürün satışları (şampuan, krem vb.)
  - Paket satışları (10 seanslik cilt bakımı vb.)
  - Nakit, kredi kartı, havale ödeme tipleri
- **Gider takibi:**
  - Personel maaşları (sabit + komisyon)
  - Kira, elektrik, su, internet
  - Ürün/alet alımları
  - Vergi, sigorta
- **Kâr/zarar raporu:** Aylık, yıllık
- **KDV takibi:** Hizmet ve ürün bazında KDV hesaplama
- **Personel komisyonu:** Hizmet bazlı komisyon hesaplama (örn: %30 saç kesimi)
- **Stok muhasebesi:** Maliyet, satış fiyatı, kar marjı
- **Fatura/ödeme:** E-arşiv fatura, makbuz basımı
- Muhasebe raporları: Excel, PDF export

### 7. EK ÖZELLİKLER
- **Personel yönetimi:** Giriş/çıkış, izin, performans
- **Hizmet kataloğu:** Hizmet adı, süre, fiyat, kategori
- **Ürün stok:** Barkod, stok uyarısı, tüketim kaydı
- **Dashboard:** Günlük özet, bekleyen randevular, düşük stok uyarıları
- **Yedekleme:** Otomatik veri yedekleme (günlük)
- **Çoklu şube:** Birden fazla salon desteği (opsiyonel)
- **Mobil uyumlu:** Responsive tasarım, PWA veya mobil uygulama

### 8. TEKNİK GEREKSİNİMLER
- **Frontend:** React veya Vue (Vite ile)
- **Backend:** Node.js/Express veya Python/FastAPI
- **Veritabanı:** SQLite (basit) veya PostgreSQL (gelişmiş)
- **Auth:** Kullanıcı girişi, rol yönetimi (admin, personel, muhasebe)
- WhatsApp/Instagram için resmi API veya Twilio, Meta Business Suite entegrasyonu

### 9. GÜVENLİK VE GİZLİLİK
- KVKK uyumlu müşteri verisi saklama
- Şifreli veritabanı
- İşlem logları (kim, ne zaman, ne yaptı)

---

Bu programı adım adım geliştir. Önce temel yapıyı (veritabanı şeması, API, frontend iskelet) oluştur, sonra her modülü tek tek ekle. Her modül için ayrı test senaryoları yaz.

---

## PROMPT SONU
