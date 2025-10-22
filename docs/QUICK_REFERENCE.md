# Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Development
npm install                          # Install dependencies
npm run dev                         # Start dev server
npm run build                       # Build for production
npm start                          # Run production build

# Install admin dependencies
npm install next-auth @octokit/rest
```

## 🔑 Common Environment Variables

```env
# Required for Admin Panel
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand
GITHUB_ID=oauth-app-id
GITHUB_SECRET=oauth-app-secret
GITHUB_REPO=ledlyy/alxtroy.com
GITHUB_TOKEN=personal-access-token
ADMIN_GITHUB_USERS=username1,username2
```

## 📍 Important URLs

### Local Development
```
Public Site:        http://localhost:3000
Admin Login:        http://localhost:3000/admin/login
Admin Dashboard:    http://localhost:3000/admin/dashboard
Events Page:        http://localhost:3000/events
```

### Production
```
Public Site:        https://www.alxtroy.com
Admin Login:        https://www.alxtroy.com/admin/login
Admin Dashboard:    https://www.alxtroy.com/admin/dashboard
Events Page:        https://www.alxtroy.com/events
```

### GitHub URLs
```
OAuth Apps:         https://github.com/settings/developers
Personal Tokens:    https://github.com/settings/tokens
Repository:         https://github.com/ledlyy/alxtroy.com
2FA Settings:       https://github.com/settings/security
```

## 🔐 Security Quick Reference

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

### Required GitHub Scopes
- OAuth App: `read:user`, `user:email`, `repo`
- Personal Token: `repo` (full control)

### 2FA Requirements
✅ All admin users MUST have 2FA enabled on GitHub
✅ Repository collaborators need Write or Admin access
✅ Users must be listed in ADMIN_GITHUB_USERS

## 🎨 Design System Reference

### CSS Variables
```css
/* Colors */
--accent: 163 133 85        /* Brand gold */
--bg: 255 255 255          /* Background */
--fg: 17 24 39             /* Foreground */

/* Typography */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem)

/* Spacing */
--space-4: 1rem
--space-8: 2rem
--space-16: 4rem

/* Shadows */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

### Utility Classes
```css
.glass-card          /* Glassmorphism effect */
.card-hover          /* Lift on hover */
.btn-primary         /* Primary button */
.btn-secondary       /* Secondary button */
.gradient-text       /* Gradient text */
.shimmer            /* Loading animation */
.reveal             /* Fade-in animation */
```

## 📝 Common Admin Tasks

### Adding an Admin User
1. Open `.env.local`
2. Add username to `ADMIN_GITHUB_USERS`
3. Ensure user has 2FA enabled
4. Add user as repository collaborator
5. Restart server

### Updating Event Data
1. Login to admin panel
2. Navigate to Event Management (when ready)
3. Edit event details
4. Preview changes
5. Commit with descriptive message

### Viewing Audit Logs
1. Login to admin panel
2. Click "Audit Logs"
3. Filter by user, action, or date
4. Export if needed

## 🐛 Troubleshooting Quick Fixes

### "Cannot find module 'next-auth'"
```bash
npm install next-auth @octokit/rest
```

### "NEXTAUTH_SECRET is not defined"
```bash
openssl rand -base64 32
# Add output to .env.local
```

### "Access Denied" on Login
1. Check if user in ADMIN_GITHUB_USERS
2. Verify 2FA enabled on GitHub
3. Confirm repository access

### Session Expired
- Sign out and sign back in
- Sessions expire after 2 hours

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📊 Testing Commands

### Test Admin Authentication
```bash
# Visit login page
open http://localhost:3000/admin/login

# Or in browser console after login:
fetch('/api/admin/stats').then(r => r.json()).then(console.log)
```

### Check Environment Variables
```bash
# Verify file exists
cat .env.local

# Check if loaded (in Node.js)
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.NEXTAUTH_SECRET ? 'OK' : 'MISSING')"
```

## 📦 Dependency Versions

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "next-auth": "latest",
  "@octokit/rest": "latest"
}
```

## 🚨 Emergency Contacts

```
Technical Support:    operations@alxtroy.com
Security Issues:      operations@alxtroy.com (mark URGENT)
GitHub Repository:    https://github.com/ledlyy/alxtroy.com/issues
```

## 📖 Documentation Index

```
docs/
├── MODERNIZATION_SUMMARY.md        # Project overview
├── ADMIN_PANEL_GUIDE.md           # Complete admin guide
├── DESIGN_2025_IMPROVEMENTS.md    # Design system
├── INSTALLATION_GUIDE.md          # Setup instructions
├── IMPLEMENTATION_CHECKLIST.md    # Step-by-step checklist
└── QUICK_REFERENCE.md            # This file
```

## 🔄 Regular Maintenance

### Weekly Tasks
```bash
# Check audit logs (in admin panel)
# Monitor for failed logins
```

### Monthly Tasks
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Export logs
# (via admin panel)
```

### Quarterly Tasks
```bash
# Rotate secrets
openssl rand -base64 32

# Update tokens
# (GitHub settings)

# Review access
# (Update ADMIN_GITHUB_USERS)
```

## 💡 Pro Tips

1. **Use Strong Secrets**
   - Minimum 32 characters
   - Use `openssl rand -base64 32`

2. **Keep Tokens Secure**
   - Never commit to Git
   - Rotate every 90 days
   - Store in secure password manager

3. **Monitor Regularly**
   - Check audit logs weekly
   - Review failed logins
   - Export logs monthly

4. **Test Before Deploy**
   - Always test locally first
   - Run `npm run build` before deploying
   - Check console for errors

5. **Backup Strategy**
   - Code: Git repository
   - Content: In Git history
   - Logs: Export regularly

## 🎯 Success Indicators

✅ Clean `npm run build` with no errors
✅ Admin login works smoothly
✅ All pages load without errors
✅ Dark mode toggle works
✅ Animations run at 60fps
✅ Mobile responsive
✅ Lighthouse score > 90

---

**Quick Reference Version**: 1.0.0
**Last Updated**: October 13, 2025

**Need Help?** Start with `IMPLEMENTATION_CHECKLIST.md`
