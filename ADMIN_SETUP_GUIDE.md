# 🚀 Admin Panel Kurulum Rehberi

Bu rehber, admin paneli kullanıma hazır hale getirmek için adım adım talimatlar içerir.

---

## 📋 Ön Gereksinimler

- ✅ GitHub hesabı (2FA aktif)
- ✅ Repository'ye collaborator erişimi
- ✅ Node.js 18+ yüklü

---

## 🔧 Kurulum Adımları

### 1️⃣ GitHub OAuth App Oluştur

#### Local Development için:

1. **GitHub'a git:**
   ```
   https://github.com/settings/developers
   ```

2. **"New OAuth App" butonuna tıkla**

3. **Bilgileri gir:**
   ```
   Application name: AlexTroy Admin (Local)
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```

4. **"Register application" butonuna tıkla**

5. **Client ID'yi kopyala** → `.env.local` dosyasına ekle

6. **"Generate a new client secret" butonuna tıkla**

7. **Client Secret'ı kopyala** → `.env.local` dosyasına ekle (bir daha göremezsin!)

#### Production için:

Aynı adımları tekrarla ama URL'leri değiştir:
```
Homepage URL: https://alxtroy.com
Authorization callback URL: https://alxtroy.com/api/auth/callback/github
```

---

### 2️⃣ GitHub Personal Access Token Oluştur

1. **GitHub'a git:**
   ```
   https://github.com/settings/tokens
   ```

2. **"Generate new token (classic)" seç**

3. **Token bilgilerini gir:**
   ```
   Note: AlexTroy Admin Panel
   Expiration: 90 days (sonra yenile)
   
   Scopes (işaretle):
   ☑ repo (Full control)
   ☑ read:user
   ☑ user:email
   ```

4. **"Generate token" butonuna tıkla**

5. **Token'ı kopyala** → `.env.local` dosyasına ekle (bir daha göremezsin!)

---

### 3️⃣ Environment Variables Ayarla

#### Local Development (.env.local):

`.env.local` dosyasını aç ve şunları güncelle:

```bash
# GitHub OAuth (1. adımdan)
GITHUB_ID=<kopyaladığın-client-id>
GITHUB_SECRET=<kopyaladığın-client-secret>

# GitHub Token (2. adımdan)
GITHUB_TOKEN=<kopyaladığın-personal-access-token>

# Admin Users (GitHub username'in)
ADMIN_GITHUB_USERS=ledlyy

# Repo bilgileri
GITHUB_REPO=ledlyy/alxtroy.com
GITHUB_BRANCH=main
```

#### Production (Vercel):

1. **Vercel Dashboard'a git:**
   ```
   https://vercel.com/ledlyys-projects/alxtroy-com/settings/environment-variables
   ```

2. **Her bir variable için "Add" butonuna tıkla:**

   ```bash
   Name: GITHUB_ID
   Value: <production-oauth-client-id>
   Environment: Production, Preview
   
   Name: GITHUB_SECRET
   Value: <production-oauth-client-secret>
   Environment: Production, Preview
   
   Name: GITHUB_TOKEN
   Value: <production-personal-access-token>
   Environment: Production, Preview
   
   Name: ADMIN_GITHUB_USERS
   Value: ledlyy,other-admin-username
   Environment: Production, Preview
   
   Name: GITHUB_REPO
   Value: ledlyy/alxtroy.com
   Environment: Production, Preview
   
   Name: ENABLE_AUDIT_LOG
   Value: true
   Environment: Production, Preview
   ```

3. **"Save" butonuna tıkla**

4. **Redeploy yap:**
   ```
   Deployments → Latest deployment → ... → Redeploy
   ```

---

### 4️⃣ GitHub 2FA Aktif Et (Zorunlu!)

Admin panel sadece 2FA aktif hesaplarla çalışır.

1. **GitHub'a git:**
   ```
   https://github.com/settings/security
   ```

2. **"Two-factor authentication" bölümünde "Enable" butonuna tıkla**

3. **Authenticator app kullan** (Google Authenticator, Authy, vs.)

4. **Recovery codes'ları kaydet** (güvenli bir yerde sakla!)

---

### 5️⃣ Repository Collaborator Erişimi

Eğer admin olacak kişi repository owner değilse:

1. **Repository Settings'e git:**
   ```
   https://github.com/ledlyy/alxtroy.com/settings/access
   ```

2. **"Add people" butonuna tıkla**

3. **GitHub username'i gir**

4. **"Write" veya "Admin" rolü ver**

5. **Davet gönder**

---

## ✅ Test Et

### Local Development:

```bash
# 1. Development server'ı başlat
npm run dev

# 2. Browser'da aç
http://localhost:3000/admin/login

# 3. "Sign in with GitHub" butonuna tıkla

# 4. GitHub'da authorize et

# 5. Admin dashboard açılmalı
http://localhost:3000/admin/dashboard
```

### Production:

```bash
# 1. URL'e git
https://alxtroy.com/admin/login

# 2. "Sign in with GitHub" butonuna tıkla

# 3. Authorize et

# 4. Dashboard görmeli
https://alxtroy.com/admin/dashboard
```

---

## 🔍 Sorun Giderme

### "AccessDenied" Hatası

**Neden:**
- GitHub username `ADMIN_GITHUB_USERS`'da yok
- 2FA aktif değil
- Repository'ye collaborator erişimin yok

**Çözüm:**
```bash
# .env.local kontrol et
cat .env.local | grep ADMIN_GITHUB_USERS

# GitHub 2FA kontrolü
https://github.com/settings/security

# Collaborator kontrolü
https://github.com/ledlyy/alxtroy.com/settings/access
```

### "NO_SECRET" Hatası

**Neden:** `NEXTAUTH_SECRET` tanımlı değil

**Çözüm:**
```bash
# Yeni secret oluştur
openssl rand -base64 32

# .env.local'e ekle
echo "NEXTAUTH_SECRET=<generated-secret>" >> .env.local
```

### OAuth Callback Hatası

**Neden:** Callback URL yanlış

**Çözüm:**
```bash
# GitHub OAuth App ayarlarını kontrol et
# Callback URL şöyle olmalı:
Local: http://localhost:3000/api/auth/callback/github
Production: https://alxtroy.com/api/auth/callback/github
```

### GitHub API Rate Limit

**Neden:** Token limiti aşıldı

**Çözüm:**
```bash
# Personal Access Token yenile
https://github.com/settings/tokens

# Yeni token ile .env.local güncelle
```

---

## 🎯 Başarı Kriterleri

Admin panel çalışıyorsa:

- ✅ GitHub OAuth login başarılı
- ✅ Dashboard açılıyor
- ✅ Recent activity görünüyor
- ✅ Stats gösteriliyor
- ✅ Logout çalışıyor

---

## 📚 Ek Kaynaklar

- **NextAuth.js Docs:** https://next-auth.js.org/
- **GitHub OAuth:** https://docs.github.com/en/developers/apps/building-oauth-apps
- **Vercel Env Vars:** https://vercel.com/docs/concepts/projects/environment-variables

---

## 🔐 Güvenlik Notları

### ❌ YAPMA:

- ❌ OAuth secrets'ı commit etme
- ❌ Personal access token'ı paylaşma
- ❌ .env.local'i git'e ekleme
- ❌ Production credentials'ı local'de kullanma

### ✅ YAP:

- ✅ Secrets'ları güvenli sakla (1Password, Bitwarden)
- ✅ Personal access token'ı düzenli yenile (90 gün)
- ✅ Audit logs'ları kontrol et
- ✅ 2FA'yı her zaman aktif tut

---

**Kurulum tamamlandı! 🎉**

Admin paneline erişmek için: `/admin/login`
