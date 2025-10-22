# Installation & Deployment Guide

## Required Dependencies Installation

To enable the admin panel and new features, install the following dependencies:

```bash
# Core authentication and GitHub integration
npm install next-auth @octokit/rest

# Type definitions
npm install --save-dev @types/next-auth
```

## Complete Package.json Updates

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "admin:setup": "node scripts/admin-setup.js",
    "audit:export": "node scripts/export-audit-logs.js"
  }
}
```

## Environment Variables Setup

### Development (.env.local)

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# GitHub OAuth (Development)
GITHUB_ID=your-github-dev-oauth-app-id
GITHUB_SECRET=your-github-dev-oauth-app-secret

# GitHub Repository
GITHUB_REPO=ledlyy/alxtroy.com
GITHUB_BRANCH=main
GITHUB_TOKEN=your-github-personal-access-token

# Admin Users
ADMIN_GITHUB_USERS=ledlyy

# Optional Settings
SESSION_MAX_AGE=7200
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
ENABLE_AUDIT_LOG=true
AUDIT_LOG_RETENTION_DAYS=90
```

### Production (Vercel/Environment Variables)

Add these environment variables in your hosting platform:

#### Vercel
1. Go to Project Settings > Environment Variables
2. Add each variable with appropriate values
3. Set to "Production" environment

#### Other Platforms
Refer to your platform's documentation for setting environment variables.

## GitHub Configuration

### 1. Create OAuth App (Development)

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: AlxTroy Admin (Dev)
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback/github
4. Save Client ID and Secret

### 2. Create OAuth App (Production)

Repeat above steps with production URLs:
- **Homepage URL**: https://www.alxtroy.com
- **Authorization callback URL**: https://www.alxtroy.com/api/auth/callback/github

### 3. Create Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "AlxTroy Admin Access"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Set expiration: 90 days
6. Generate and copy token

### 4. Add Collaborators to Repository

1. Go to repository Settings > Collaborators
2. Add admin users with "Write" or "Admin" access
3. Ensure they enable 2FA on their GitHub accounts

## Quick Start

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ledlyy/alxtroy.com.git
cd alxtroy.com

# 2. Install dependencies
npm install

# Install admin panel dependencies
npm install next-auth @octokit/rest
npm install --save-dev @types/next-auth

# 3. Create .env.local file
cp .env.local.example .env.local

# 4. Edit .env.local with your values
nano .env.local

# 5. Generate NEXTAUTH_SECRET
openssl rand -base64 32

# 6. Start development server
npm run dev

# 7. Access the site
# Public site: http://localhost:3000
# Admin login: http://localhost:3000/admin/login
```

### Production Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Add environment variables in Vercel dashboard
# Project Settings > Environment Variables

# 5. Redeploy after adding env vars
vercel --prod
```

## Verification Checklist

After installation, verify:

- [ ] Website loads at `/`
- [ ] Admin login page accessible at `/admin/login`
- [ ] GitHub OAuth flow works
- [ ] Admin dashboard loads after login
- [ ] B2B Events page displays at `/events`
- [ ] New design system is applied
- [ ] Dark mode toggle works
- [ ] No console errors

## Testing Admin Panel

### 1. Test Authentication

```bash
# Visit admin login
open http://localhost:3000/admin/login

# Click "Sign in with GitHub"
# Complete OAuth flow
# Should redirect to /admin/dashboard
```

### 2. Test API Endpoints

```bash
# Get stats (requires authentication)
curl http://localhost:3000/api/admin/stats \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"

# Get activity
curl http://localhost:3000/api/admin/activity \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### 3. Test Content Management

1. Login to admin panel
2. Navigate to Event Management
3. Edit an event
4. Commit changes
5. Verify commit appears in GitHub

## Troubleshooting

### Issue: "Cannot find module 'next-auth'"

**Solution**:
```bash
npm install next-auth @octokit/rest
```

### Issue: "NEXTAUTH_SECRET is not defined"

**Solution**:
```bash
# Generate a secret
openssl rand -base64 32

# Add to .env.local
echo "NEXTAUTH_SECRET=generated-secret-here" >> .env.local
```

### Issue: "Access Denied" on login

**Possible Causes**:
1. User not in `ADMIN_GITHUB_USERS`
2. 2FA not enabled on GitHub
3. User doesn't have repository access

**Solution**:
1. Add username to `ADMIN_GITHUB_USERS` in .env.local
2. Enable 2FA: https://github.com/settings/security
3. Add as repository collaborator

### Issue: "Failed to commit to GitHub"

**Possible Causes**:
1. Invalid `GITHUB_TOKEN`
2. Insufficient token permissions
3. Wrong repository name

**Solution**:
1. Regenerate token with `repo` scope
2. Verify `GITHUB_REPO` format: `owner/repo`
3. Check token hasn't expired

## Database Setup (Optional)

For production, consider using a database for audit logs:

### Vercel Postgres

```bash
# Install Vercel Postgres SDK
npm install @vercel/postgres

# Add to your project
# Update lib/admin/audit.ts to use database instead of in-memory storage
```

### Supabase

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Set environment variables
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Performance Optimization

### Enable Image Optimization

Ensure `next.config.js` has proper image domains:

```javascript
module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com'], // For user avatars
  },
}
```

### Enable Caching

Add caching headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## Monitoring Setup

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Sentry Error Tracking

```bash
npm install @sentry/nextjs
```

Initialize in `sentry.client.config.ts`.

## Security Headers

Add to `middleware.ts`:

```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}
```

## Backup & Recovery

### Backup Strategy

1. **Code**: Git repository (already backed up on GitHub)
2. **Content**: All in Git repository
3. **Audit Logs**: Export regularly

```bash
# Export audit logs monthly
npm run audit:export
```

### Recovery Process

1. **Code Recovery**: Clone from GitHub
2. **Content Recovery**: Restore from Git history
3. **Audit Logs**: Restore from exports

## Support & Maintenance

### Regular Maintenance Tasks

#### Weekly
- [ ] Review audit logs
- [ ] Check for unauthorized access attempts
- [ ] Monitor error rates

#### Monthly
- [ ] Update dependencies
- [ ] Review and revoke unused tokens
- [ ] Export audit logs
- [ ] Review user access list

#### Quarterly
- [ ] Security audit
- [ ] Performance review
- [ ] User access review
- [ ] Rotate secrets

### Getting Help

- **Documentation**: `/docs` directory
- **Issues**: https://github.com/ledlyy/alxtroy.com/issues
- **Email**: operations@alxtroy.com

---

**Last Updated**: October 13, 2025
**Installation Guide Version**: 1.0.0
