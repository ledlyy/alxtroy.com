# 🔐 GitHub OAuth App Kurulum Rehberi

Bu rehberi takip ederek admin paneli için GitHub OAuth ayarlarını yapacaksınız.

## 📋 Adım 1: GitHub OAuth App Oluşturma

### 1.1. GitHub Developer Settings'e Git
```
https://github.com/settings/developers
```

Veya:
1. GitHub'da sağ üst köşedeki profil fotoğrafına tıkla
2. **Settings** → **Developer settings** → **OAuth Apps**

### 1.2. "New OAuth App" Butonuna Tıkla

### 1.3. Form Bilgilerini Doldur:

```
Application name: AlexTroy Admin Panel (Local)
Homepage URL: http://localhost:3000
Application description: Admin panel for Alexander & Troy Tours website
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

⚠️ **ÖNEMLİ:** Callback URL'i tam olarak bu şekilde yazın!

### 1.4. "Register application" Butonuna Tıkla

### 1.5. Credentials'ı Kopyala

Uygulama oluşturulduktan sonra:

1. **Client ID** görünecek → KOPYALA
2. **"Generate a new client secret"** butonuna tıkla
3. **Client Secret** görünecek → HEMEN KOPYALA (bir daha göremezsiniz!)

---

## 📋 Adım 2: GitHub Personal Access Token Oluşturma

### 2.1. GitHub Tokens Sayfasına Git
```
https://github.com/settings/tokens
```

### 2.2. "Generate new token" → "Generate new token (classic)" Seç

### 2.3. Token Bilgilerini Doldur:

```
Note: AlexTroy Admin Panel - Repository Access
Expiration: 90 days
```

### 2.4. Scopes (İzinler) Seç:

**MUTLAKA ŞU İZİNLERİ SEÇİN:**
- ☑️ **repo** (Full control of private repositories)
  - ☑️ repo:status
  - ☑️ repo_deployment
  - ☑️ public_repo
  - ☑️ repo:invite
  - ☑️ security_events
- ☑️ **read:user** (Read ALL user profile data)
- ☑️ **user:email** (Access user email addresses)

### 2.5. "Generate token" Butonuna Tıkla

### 2.6. Token'ı HEMEN Kopyala
⚠️ **ÖNEMLİ:** Bu token'ı bir daha göremezsiniz! Hemen kopyalayıp güvenli bir yere kaydedin.

---

## 📋 Adım 3: .env.local Dosyasını Güncelleme

Terminal'de şu komutu çalıştır:

```bash
cd /Users/ibrahimyasin/Desktop/alxtroy.com
nano .env.local
```

Veya VS Code'da `.env.local` dosyasını aç ve şu satırları güncelle:

```bash
# GitHub OAuth for Admin Panel
GITHUB_ID=buraya_kopyaladigin_client_id_yi_yapistir
GITHUB_SECRET=buraya_kopyaladigin_client_secret_i_yapistir
GITHUB_TOKEN=buraya_kopyaladigin_personal_access_token_i_yapistir
```

### Örnek (gerçek değerlerle):
```bash
GITHUB_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
GITHUB_TOKEN=ghp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8
```

**Kaydet ve çık** (nano'da: Ctrl+X → Y → Enter)

---

## 📋 Adım 4: GitHub 2FA Aktif Etme (Zorunlu!)

### 4.1. GitHub Security Settings'e Git
```
https://github.com/settings/security
```

### 4.2. "Two-factor authentication" Bölümüne Git

Eğer zaten aktif değilse:

1. **"Enable two-factor authentication"** butonuna tıkla
2. **Authenticator app** seçeneğini seç (önerilen)
3. QR kodu Google Authenticator / Authy / 1Password ile tara
4. Doğrulama kodunu gir
5. **Recovery codes'ları indir ve güvenli sakla!**

---

## 📋 Adım 5: Repository Collaborator Erişimi Kontrol

### 5.1. Repository Settings'e Git
```
https://github.com/ledlyy/alxtroy.com/settings/access
```

### 5.2. Collaborators Listesini Kontrol Et

Eğer `ledlyy` kullanıcısı listede yoksa:

1. **"Add people"** butonuna tıkla
2. `ledlyy` kullanıcı adını gir
3. **"Write"** veya **"Admin"** rolünü seç
4. Davet gönder

---

## ✅ Adım 6: Test Etme

### 6.1. Development Server'ı Başlat

```bash
cd /Users/ibrahimyasin/Desktop/alxtroy.com
npm run dev
```

### 6.2. Admin Login Sayfasına Git

```
http://localhost:3000/admin/login
```

(Eğer 3000 portu doluysa, server hangi portu kullandığını söyleyecektir, örn: 3003)

### 6.3. "Sign in with GitHub" Butonuna Tıkla

### 6.4. GitHub Authorization Sayfası Açılacak

- İzin isteyecek
- **"Authorize"** butonuna tıkla
- 2FA kodu iste rse gir

### 6.5. Dashboard'a Yönlendirilmelisin!

Başarıyla giriş yaptıysan:
```
http://localhost:3000/admin/dashboard
```

---

## 🚨 Sorun Giderme

### ❌ "AccessDenied" Hatası

**Sebep:**
- GitHub username `ADMIN_GITHUB_USERS` listesinde değil
- 2FA aktif değil
- Repository collaborator değilsin

**Çözüm:**
1. `.env.local` dosyasında `ADMIN_GITHUB_USERS=ledlyy` olduğundan emin ol
2. GitHub 2FA aktif olmalı
3. Repository'de collaborator olmalısın

### ❌ "Callback URL Mismatch" Hatası

**Sebep:** GitHub OAuth App'deki callback URL yanlış

**Çözüm:**
1. GitHub OAuth App ayarlarına git
2. Callback URL'i kontrol et: `http://localhost:3000/api/auth/callback/github`
3. Tam olarak bu şekilde olmalı (sondaki `/` olmadan)

### ❌ "Invalid Client" Hatası

**Sebep:** `GITHUB_ID` veya `GITHUB_SECRET` yanlış

**Çözüm:**
1. `.env.local` dosyasını kontrol et
2. GitHub OAuth App'den credentials'ı tekrar kopyala
3. Boşluk veya fazladan karakter olmadığından emin ol

### ❌ "Insufficient Permissions" Hatası

**Sebep:** GitHub Token'ın `repo` izni yok

**Çözüm:**
1. Yeni token oluştur
2. **repo** scope'unu mutlaka seç
3. `.env.local`'i güncelle

---

## 📝 Kontrol Listesi

Tamamlamadan önce kontrol et:

- [ ] GitHub OAuth App oluşturuldu
- [ ] Client ID kopyalandı
- [ ] Client Secret kopyalandı (ve güvenli saklandı)
- [ ] Personal Access Token oluşturuldu
- [ ] Token'da `repo`, `read:user`, `user:email` izinleri var
- [ ] `.env.local` dosyası güncellendi
- [ ] GitHub 2FA aktif
- [ ] Repository collaborator'ı olarak eklendin
- [ ] Server başlatıldı (`npm run dev`)
- [ ] Login sayfası açılıyor
- [ ] GitHub OAuth çalışıyor
- [ ] Dashboard'a erişebildin

---

## 🎉 Başarılı!

Eğer dashboard'a eriştiysen, artık admin paneli tam olarak çalışıyor demektir!

**Dashboard'da görebilecekler in:**
- Total Actions
- Success Rate
- 24-hour Activity
- Active Admins
- Recent Activity Feed
- Security Insights

---

## 🔐 Güvenlik Notları

### ⚠️ SAKLA:
- Client Secret
- Personal Access Token
- Recovery Codes

### ❌ YAPMA:
- `.env.local` dosyasını Git'e commit etme
- Token'ları paylaşma
- 2FA'yı devre dışı bırakma
- Public repo'larda credentials bırakma

### ✅ YAP:
- Token'ı 90 günde bir yenile
- Recovery codes'ları güvenli sakla
- Düzenli olarak audit logs'ları kontrol et
- Güçlü parola kullan

---

**Kurulum Tamamlandı! 🚀**

Sorularınız için: `ADMIN_PANEL_STATUS.md` dosyasına bakın.
