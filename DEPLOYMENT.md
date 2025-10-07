# Deployment Guide - Alexander & Troy Tours

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the recommended platform for Next.js applications, offering zero-configuration deployment.

#### Step 1: Prepare Environment Variables

Create these environment variables in your Vercel dashboard:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://alxtroy.com

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional - Contact Form
CONTACT_EMAIL=info@alxtroy.com
```

#### Step 2: Deploy via Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import `ledlyy/alxtroy.com` from GitHub
4. Configure settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Add environment variables
6. Click "Deploy"

#### Step 3: Domain Configuration

1. Go to Project Settings → Domains
2. Add your custom domain: `alxtroy.com`
3. Add www subdomain: `www.alxtroy.com`
4. Update DNS records as shown in Vercel
5. Wait for SSL certificate provisioning (~24 hours)

**DNS Records:**
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

#### Step 4: Post-Deployment

1. Test all routes
2. Check analytics integration
3. Verify contact form
4. Run Lighthouse audit
5. Monitor in Vercel Analytics

---

### Option 2: Netlify

#### Deploy via Git

1. Visit [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `ledlyy/alxtroy.com`
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** Leave empty
5. Add environment variables
6. Click "Deploy site"

#### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

### Option 3: AWS Amplify

#### Deploy via Console

1. Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect to GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Base directory:** Leave empty
   - **Amplify will auto-detect Next.js**
5. Add environment variables
6. Save and deploy

#### AWS Amplify Configuration

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### Option 4: Docker Deployment

#### Using Docker

1. **Create Dockerfile** (already exists):

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

2. **Build Docker image:**

```bash
docker build -t alxtroy-web .
```

3. **Run container:**

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://alxtroy.com \
  -e NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX \
  alxtroy-web
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=https://alxtroy.com
      - NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

### Option 5: Self-Hosted (VPS/Dedicated Server)

#### Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+
- Nginx
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

#### Step 2: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/ledlyy/alxtroy.com.git
cd alxtroy.com

# Install dependencies
sudo npm ci

# Build application
sudo npm run build

# Start with PM2
pm2 start npm --name "alxtroy" -- start
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/alxtroy.com`:

```nginx
upstream nextjs_upstream {
  server localhost:3000;
}

server {
  listen 80;
  listen [::]:80;
  server_name alxtroy.com www.alxtroy.com;

  # Redirect to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name alxtroy.com www.alxtroy.com;

  # SSL Configuration (Certbot will add these)
  # ssl_certificate /etc/letsencrypt/live/alxtroy.com/fullchain.pem;
  # ssl_certificate_key /etc/letsencrypt/live/alxtroy.com/privkey.pem;

  # Security Headers
  add_header X-Frame-Options "DENY" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  location / {
    proxy_pass http://nextjs_upstream;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Cache static assets
  location /_next/static {
    proxy_pass http://nextjs_upstream;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  # Cache images
  location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
    proxy_pass http://nextjs_upstream;
    add_header Cache-Control "public, max-age=31536000";
  }
}
```

Enable site and get SSL:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/alxtroy.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d alxtroy.com -d www.alxtroy.com
```

#### Step 4: Auto-Deployment with GitHub Webhooks

Create `/var/www/alxtroy.com/deploy.sh`:

```bash
#!/bin/bash
cd /var/www/alxtroy.com
git pull origin main
npm ci
npm run build
pm2 restart alxtroy
```

Make it executable:
```bash
chmod +x /var/www/alxtroy.com/deploy.sh
```

---

## 🔒 Security Checklist

Before going live:

- [ ] SSL certificate installed and working
- [ ] Environment variables set securely
- [ ] CSP headers configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers in place
- [ ] Dependencies updated
- [ ] Sensitive data not in git
- [ ] API routes protected
- [ ] CORS configured properly

---

## 📊 Post-Deployment Monitoring

### Tools to Use

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics 4**
3. **Google Search Console**
4. **Sentry** (error tracking)
5. **Lighthouse CI** (performance monitoring)

### Monitoring Checklist

- [ ] Analytics tracking working
- [ ] Error monitoring active
- [ ] Uptime monitoring configured
- [ ] Performance metrics tracked
- [ ] SEO metrics monitored

---

## 🚦 Performance Optimization

After deployment:

1. **Enable CDN** - Use Cloudflare or Vercel Edge Network
2. **Optimize Images** - Verify Next.js image optimization working
3. **Enable Caching** - Configure proper cache headers
4. **Monitor Core Web Vitals** - Keep LCP < 2.5s, FID < 100ms, CLS < 0.1
5. **Regular Audits** - Run Lighthouse weekly

---

## 📧 Domain Email Setup

For professional emails (info@alxtroy.com):

### Option 1: Google Workspace
1. Sign up at [workspace.google.com](https://workspace.google.com)
2. Verify domain ownership
3. Set up MX records
4. Create email accounts

### Option 2: Microsoft 365
1. Sign up at [microsoft.com/microsoft-365](https://www.microsoft.com/microsoft-365)
2. Verify domain
3. Configure DNS
4. Create mailboxes

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Restart dev server after changing .env
- Check Vercel/Netlify dashboard for correct values

### SSL Issues

```bash
# Renew certificate
sudo certbot renew
sudo systemctl restart nginx
```

---

## 📞 Support

For deployment issues:
- **GitHub Issues:** [github.com/ledlyy/alxtroy.com/issues](https://github.com/ledlyy/alxtroy.com/issues)
- **Email:** dev@alxtroy.com

---

**Last Updated:** 2025-01-07
