# 🚀 Hızlı Başlangıç: Log Sistemi

## ✅ Kurulum Tamamlandı!

Log sistemi başarıyla kuruldu ve şu anda çalışıyor. İşte yapmanız gerekenler:

## 1️⃣ Otomatik Commit'i Aktifleştir (Önemli!)

```bash
npm run logs:setup
```

Bu komut size birkaç soru soracak. **En iyi seçenek: "1" (Her saat)**

## 2️⃣ Test Et

```bash
# Logları manuel commit et
npm run logs:commit

# Development sunucusunu çalıştır
npm run dev

# Tarayıcıda birkaç sayfa aç, ardından logları kontrol et
npm run logs:view
```

## 3️⃣ Logları İzle

```bash
# Tüm loglar (info, warn, error)
npm run logs:view

# Sadece hatalar
npm run logs:errors

# Manuel olarak
tail -f logs/app-$(date +%Y-%m-%d).log
```

## 📝 Nasıl Çalışıyor?

1. **Middleware otomatik logluyor**: Her HTTP isteği otomatik olarak loglanıyor
2. **Günlük dosyalar**: Her gün için ayrı log dosyası oluşuyor
3. **Otomatik commit**: Cron job her saat logları GitHub'a commit ediyor
4. **30 gün saklama**: Eski loglar otomatik siliniyor

## 🎯 Kodunuzda Logger Kullanımı

```typescript
import { logEvent, logError } from '@/lib/logger'

// Başarılı işlem
logEvent('contact_form_submitted', {
  email: 'user@example.com',
  success: true
})

// Hata
logError(new Error('API failed'), {
  endpoint: '/api/contact',
  method: 'POST'
})
```

## 📚 Detaylı Dokümantasyon

Tüm detaylar için: `docs/LOGGING_SYSTEM.md`

## 🔧 Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run logs:commit` | Logları manual GitHub'a commit et |
| `npm run logs:setup` | Otomatik commit'i kur (cron) |
| `npm run logs:view` | Bugünkü logları izle |
| `npm run logs:errors` | Bugünkü hataları izle |

## ⚡ Hızlı Sorun Giderme

### Loglar oluşmuyor mu?
```bash
ls -la logs/
npm run dev  # Development'ı başlat
```

### Cron çalışmıyor mu?
```bash
crontab -l  # Cron job'ları listele
cat logs/cron.log  # Cron loglarını kontrol et
```

### Git push başarısız mı?
```bash
git remote -v  # Remote'u kontrol et
ssh -T git@github.com  # SSH bağlantısını test et
```

## 🎉 Hazırsınız!

Sistem çalışıyor! Şimdi yapmanız gereken:

1. ✅ `npm run logs:setup` ile cron'u kur
2. ✅ Uygulamanızı kullanın
3. ✅ Loglar otomatik olarak GitHub'a commit edilecek

---

**Sonraki adım**: Database entegre ettiğinizde, log sistemini database işlemleri için de kullanabilirsiniz!
