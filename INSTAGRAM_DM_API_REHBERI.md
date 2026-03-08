# Instagram DM API - Nasıl Yapılır Rehberi

## Önemli Kısıtlamalar (Önce Bunları Bil)

| Kısıtlama | Açıklama |
|-----------|----------|
| **24 saat kuralı** | Sadece **sana mesaj atmış** kullanıcılara yanıt verebilirsin. Ve bu yanıt **ilk mesajdan sonra 24 saat içinde** olmalı. |
| **Toplu DM yasak** | Instagram politikasına göre toplu/spam DM gönderimi yasak. Sadece sohbet başlatan kullanıcılara yanıt. |
| **Template mesajlar** | 24 saat dışında sadece **onaylı şablon mesajlar** gönderebilirsin (kampanya, hatırlatma vb.). |

---

## Adım 1: Hesap ve Meta Ayarları

### 1.1 Instagram Hesabı
- Instagram hesabını **Business** veya **Creator** yap
- Ayarlar → Hesap → Profesyonel hesaba geç

### 1.2 Meta Business Suite
1. https://business.facebook.com adresine git
2. **Meta Business Suite** oluştur veya mevcut hesabı kullan
3. Instagram hesabını Business Suite'e bağla
4. Ayarlar → İşletme Varlıkları → Instagram Hesapları → Hesap Ekle

### 1.3 Facebook Uygulaması (App)
1. https://developers.facebook.com adresine git
2. **Uygulama Oluştur** → **İş** türü seç
3. Uygulama adı ver (örn: "Salon DM Yönetimi")
4. **Ürün Ekle** → **Messenger** seç
5. **Instagram** sekmesine git → Instagram hesabını bağla

---

## Adım 2: İzinler (Permissions)

### Gerekli İzinler
- `instagram_business_manage_messages` – DM gönderme/alma
- `instagram_basic` – Temel profil bilgisi
- `pages_manage_metadata` – Webhook için (mesaj bildirimi)

### İzin Alma
1. Meta for Developers → Uygulaman → **App Review**
2. **Permissions and Features** bölümünde `instagram_business_manage_messages` iste
3. **App Review** için başvur (production kullanımı için gerekli)
4. Test modunda sadece kendi hesabın ve test kullanıcılarıyla deneyebilirsin

---

## Adım 3: OAuth ile Erişim Token

### 3.1 Giriş Akışı (Instagram Login)
```
Kullanıcı → Instagram ile giriş → OAuth redirect → Access Token al
```

### 3.2 Örnek OAuth URL
```
https://api.instagram.com/oauth/authorize
  ?client_id={APP_ID}
  &redirect_uri={REDIRECT_URI}
  &scope=instagram_business_manage_messages,instagram_basic
  &response_type=code
```

### 3.3 Code ile Token Alma
```javascript
// Backend'de - code'u token'a çevir
const response = await fetch('https://api.instagram.com/oauth/access_token', {
  method: 'POST',
  body: new URLSearchParams({
    client_id: APP_ID,
    client_secret: APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code: AUTH_CODE,
  }),
});
const { access_token } = await response.json();
```

---

## Adım 4: DM Gönderme API

### 4.1 Instagram Business Account ID Al
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token={PAGE_TOKEN}
```
veya Instagram API ile:
```
GET https://graph.facebook.com/v18.0/me?fields=instagram_business_account&access_token={TOKEN}
```

### 4.2 Mesaj Gönder
**Endpoint:** `POST https://graph.facebook.com/v18.0/{ig_user_id}/messages`

**Headers:**
```
Content-Type: application/json
```

**Body (metin mesajı):**
```json
{
  "recipient": {
    "id": "INSTAGRAM_USER_PSID"
  },
  "message": {
    "text": "Merhaba! Randevunuz yarın saat 14:00'te."
  }
}
```

**Body (görsel ile):**
```json
{
  "recipient": { "id": "INSTAGRAM_USER_PSID" },
  "message": {
    "attachment": {
      "type": "image",
      "payload": {
        "url": "https://example.com/kampanya.jpg",
        "is_reusable": true
      }
    }
  }
}
```

### 4.3 PSID (Page-Scoped ID) Nedir?
- Kullanıcının senin sayfan/Instagram'ınla ilişkili benzersiz ID'si
- Sadece **sana mesaj attığında** webhook üzerinden bu ID'yi alırsın

---

## Adım 5: Webhook – Gelen Mesajları Dinleme

Kullanıcı sana mesaj attığında webhook tetiklenir. Bu sayede PSID'yi alırsın.

### 5.1 Webhook Kurulumu
1. Meta for Developers → Uygulaman → Messenger → Ayarlar
2. **Webhook** bölümünde Callback URL ve Verify token gir
3. Abone ol: `messages`, `messaging_postbacks`

### 5.2 Webhook Payload Örneği
```json
{
  "object": "instagram",
  "entry": [{
    "id": "INSTAGRAM_ACCOUNT_ID",
    "messaging": [{
      "sender": { "id": "PSID_12345" },
      "recipient": { "id": "..." },
      "message": { "text": "Merhaba" }
    }]
  }]
}
```
Buradaki `sender.id` = PSID. Bunu veritabanına kaydedip 24 saat içinde yanıt gönderebilirsin.

---

## Adım 6: 24 Saat Dışı – Template (Şablon) Mesajlar

24 saat geçtikten sonra sadece **önceden onaylanmış şablon mesajlar** gönderebilirsin.

### Örnek Şablon Türleri
- Randevu hatırlatma
- Kampanya duyurusu
- Müşteri geri bildirimi

### Şablon Gönderimi
```json
{
  "recipient": { "id": "PSID" },
  "message": {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Özel Kampanya",
          "subtitle": "%20 indirim",
          "image_url": "https://...",
          "buttons": [{
            "type": "web_url",
            "url": "https://...",
            "title": "Detay"
          }]
        ]
      }
    }
  }
}
```

**Not:** Şablonlar Meta tarafından onaylanmalı (App Review süreci).

---

## Pratik Akış Özeti

```
1. Kullanıcı Instagram'dan sana DM atar
   → Webhook tetiklenir, PSID alınır, veritabanına kaydedilir

2. 24 saat içinde:
   → Serbest metin + görsel ile yanıt gönderebilirsin

3. 24 saat sonra:
   → Sadece onaylı şablon mesajlar gönderilebilir

4. Toplu kampanya için:
   → Sadece daha önce mesajlaşmış kullanıcılara
   → Onaylı şablon kullanarak
   → Spam sayılmayacak sıklıkta
```

---

## Salon Uygulamasına Entegrasyon Fikri

1. **Webhook endpoint:** Backend'de `/webhook/instagram` – gelen mesajları dinle, PSID'leri kaydet
2. **Instagram kişileri tablosu:** PSID, kullanıcı adı, son mesaj tarihi
3. **Kampanya ekranı:** Kayıtlı kişilere şablon mesaj gönder (24 saat içindekilere serbest metin de mümkün)
4. **Otomasyon:** Yeni mesaj geldiğinde otomatik hoş geldin + randevu linki

---

## Faydalı Linkler

- [Instagram Messaging API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)
- [Send Message - Messenger Platform](https://developers.facebook.com/docs/messenger-platform/instagram/features/send-message/)
- [Meta Business Suite](https://business.facebook.com)
