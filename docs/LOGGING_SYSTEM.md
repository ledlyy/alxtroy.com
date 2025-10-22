# 📊 Otomatik Log Sistemi - Kurulum ve Kullanım Kılavuzu

Bu sistem, web sitenizin her yerinde (development, production, Vercel, vb.) çalışan ve logları otomatik olarak GitHub'a commit eden kapsamlı bir loglama çözümüdür.

## 🎯 Özellikler

- ✅ **Her ortamda çalışır**: Development, production, Vercel, herhangi bir hosting
- ✅ **Otomatik GitHub commit**: Loglar düzenli olarak repository'ye kaydedilir
- ✅ **Günlük rotasyon**: Loglar her gün yeni dosyalara yazılır
- ✅ **30 gün saklama**: Eski loglar otomatik temizlenir
- ✅ **Ayrı error dosyaları**: Hatalar ayrı dosyalarda tutulur
- ✅ **Request/Response loglama**: Tüm HTTP istekleri loglanır
- ✅ **Performans metrikleri**: Response süreleri kaydedilir
- ✅ **Yapılandırılabilir**: Cron schedule'ı özelleştirilebilir

## 📂 Dosya Yapısı

```
alxtroy.com/
├── lib/
│   └── logger.ts                 # Ana logger utility
├── scripts/
│   ├── commit-logs.js           # GitHub'a commit scripti
│   └── setup-cron.sh            # Cron job kurulum scripti
├── logs/
│   ├── README.md                # Log dizini dokümantasyonu
│   ├── app-2025-10-14.log      # Günlük loglar (otomatik oluşur)
│   ├── error-2025-10-14.log    # Hata logları (otomatik oluşur)
│   └── cron.log                 # Cron job logları (otomatik oluşur)
└── middleware.ts                 # Logger entegrasyonu
```

## 🚀 Kurulum

### 1. Bağımlılıklar Yüklendi ✅

```bash
npm install winston winston-daily-rotate-file simple-git --legacy-peer-deps
```

### 2. Otomatik Commit'i Aktifleştir

```bash
npm run logs:setup
```

Bu komut size soru soracak:
- Her saat başı commit mi? (önerilen)
- 6 saatte bir mi?
- 12 saatte bir mi?
- Günde bir kez mi?
- Özel bir schedule mı?

### 3. Manuel Test

```bash
npm run logs:commit
```

## 📝 Kullanım

### Logger'ı Kullanma

```typescript
import { logRequest, logResponse, logError, logEvent } from '@/lib/logger'

// HTTP isteği logla
logRequest({
  method: 'GET',
  url: '/api/contact',
  headers: headers,
  ip: '192.168.1.1'
})

// HTTP yanıtı logla
logResponse(
  { method: 'GET', url: '/api/contact' },
  { status: 200 },
  45 // ms
)

// Hata logla
logError(new Error('Database connection failed'), {
  database: 'postgres',
  operation: 'connect'
})

// Özel event logla
logEvent('form_submission', {
  formType: 'contact',
  success: true,
  email: 'user@example.com'
})
```

### Logları Görüntüleme

```bash
# Bugünkü logları canlı izle
npm run logs:view

# Bugünkü hataları canlı izle
npm run logs:errors

# Tüm logları göster
cat logs/app-*.log

# Son 100 satır
tail -n 100 logs/app-$(date +%Y-%m-%d).log

# Belirli bir pattern ara
grep "error" logs/app-*.log
```

## 🔄 Otomatik Commit Nasıl Çalışır?

1. **Cron Job**: Belirlediğiniz schedule'a göre (örn: her saat) `commit-logs.js` çalışır
2. **Log Toplama**: `logs/` dizinindeki tüm `.log` dosyalarını toplar
3. **Git Add**: Dosyaları staging area'ya ekler
4. **Git Commit**: Timestamp'li commit mesajı ile commit eder
5. **Git Push**: GitHub'a push eder

### Commit Mesajı Formatı

```
chore: update logs [2025-10-14T15:30:45.123Z]
```

## 🎛️ Yapılandırma

### Log Seviyelerini Değiştir

`.env` dosyasına ekle:

```env
LOG_LEVEL=debug  # Seçenekler: error, warn, info, debug
```

### Cron Schedule'ı Değiştir

```bash
crontab -e
```

Örnek schedule'lar:
```bash
# Her saat başı
0 * * * * cd /path/to/alxtroy.com && /usr/bin/node /path/to/alxtroy.com/scripts/commit-logs.js

# Her 30 dakikada
*/30 * * * * cd /path/to/alxtroy.com && /usr/bin/node /path/to/alxtroy.com/scripts/commit-logs.js

# Her gün saat 00:00'da
0 0 * * * cd /path/to/alxtroy.com && /usr/bin/node /path/to/alxtroy.com/scripts/commit-logs.js
```

### Saklama Süresini Değiştir

`lib/logger.ts` dosyasında:

```typescript
maxFiles: '30d', // 30 gün yerine istediğiniz süreyi yazın (örn: '60d', '90d')
```

## 🔧 İleri Seviye Kullanım

### 1. Event Loglama

```typescript
import { logEvent } from '@/lib/logger'

// Form gönderimi
logEvent('form_submission', {
  formType: 'contact',
  fields: ['name', 'email', 'message'],
  success: true
})

// Sayfa görüntüleme
logEvent('page_view', {
  path: '/about',
  referrer: document.referrer,
  userAgent: navigator.userAgent
})

// Buton tıklama
logEvent('button_click', {
  buttonId: 'download-brochure',
  location: 'services-page'
})
```

### 2. Performans Loglama

```typescript
import { logPerformance } from '@/lib/logger'

const startTime = Date.now()
// ... işlem ...
const duration = Date.now() - startTime

logPerformance('api_response_time', duration, 'ms')
```

### 3. Authentication Loglama

```typescript
import { logAuth } from '@/lib/logger'

// Login başarılı
logAuth('login', userId, true)

// Login başarısız
logAuth('login', userId, false)

// Logout
logAuth('logout', userId, true)
```

### 4. Database Loglama (Gelecekte kullanılacak)

```typescript
import { logDatabase } from '@/lib/logger'

const startTime = Date.now()
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId])
const duration = Date.now() - startTime

logDatabase('SELECT', 'users table', duration)
```

## 🐛 Sorun Giderme

### Log dosyaları oluşmuyor

```bash
# Logs dizininin varlığını kontrol et
ls -la logs/

# Logger'ı test et
node -e "require('./lib/logger').default.info('Test log')"

# Development modunda çalıştır
npm run dev
```

### Cron job çalışmıyor

```bash
# Cron job'ları listele
crontab -l

# Cron servisini kontrol et (macOS)
sudo launchctl list | grep cron

# Cron loglarını kontrol et
cat logs/cron.log

# Manuel olarak scripti çalıştır
node scripts/commit-logs.js
```

### Git push hata veriyor

```bash
# Git remote'u kontrol et
git remote -v

# SSH key'lerini kontrol et
ssh -T git@github.com

# GitHub Personal Access Token kullan
git remote set-url origin https://YOUR_TOKEN@github.com/ledlyy/alxtroy.com.git
```

### "Permission denied" hatası

```bash
# Script'lere execute yetkisi ver
chmod +x scripts/commit-logs.js
chmod +x scripts/setup-cron.sh
```

## 📊 Log Formatı

Her log entry JSON formatında:

```json
{
  "level": "info",
  "message": "HTTP Request",
  "timestamp": "2025-10-14 15:30:45",
  "metadata": {
    "type": "request",
    "method": "GET",
    "url": "/about",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
  }
}
```

## 🎭 Production'da Kullanım

### Vercel/Netlify gibi platformlarda

Bu platformlar dosya sistemi yazma izni vermez. Bunun için:

1. **GitHub Actions kullan**: Her push'ta logları toplayıp commit et
2. **External logging servisi**: Logları harici bir servise gönder (Logtail, DataDog, etc.)
3. **Database'e yaz**: Database entegre ettiğinde logları oraya yaz

### GitHub Actions ile Otomatik Commit

`.github/workflows/commit-logs.yml`:

```yaml
name: Commit Logs

on:
  schedule:
    - cron: '0 * * * *'  # Her saat
  workflow_dispatch:  # Manuel tetikleme

jobs:
  commit-logs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run logs:commit
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🔐 Güvenlik

### Hassas Bilgileri Loglama

**ASLA şunları loglamayın:**
- Şifreler
- API keys
- Credit card bilgileri
- Kişisel veriler (GDPR)

**Örnek:**

```typescript
// ❌ YANLIŞ
logEvent('login', {
  email: 'user@example.com',
  password: 'secret123'  // ASLA!
})

// ✅ DOĞRU
logEvent('login', {
  email: 'user@example.com',
  success: true
})
```

### Log Dosyalarını Temizleme

```bash
# Eski logları manuel sil
rm logs/app-2025-10-*.log

# 30 günden eski logları sil
find logs -name "*.log" -mtime +30 -delete
```

## 📞 Yardım

Sorunlarınız için:
1. Bu README'yi okuyun
2. `logs/cron.log` dosyasını kontrol edin
3. Manuel olarak `npm run logs:commit` çalıştırın
4. GitHub Issues'da sorun açın

## 🎉 Sonraki Adımlar

- [ ] Database entegrasyonu ekle
- [ ] External logging servisi entegrasyonu (opsiyonel)
- [ ] Log analiz dashboard'u (opsiyonel)
- [ ] Alert sistemi (kritik hatalar için)
- [ ] Log filtering ve arama

---

**Not**: Bu sistem şu anda aktif ve çalışıyor! Her HTTP isteği otomatik olarak loglanıyor. 🚀
