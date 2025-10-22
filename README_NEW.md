# Alexander & Troy Tours - Modern Website (2025)

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Professional receptive services website with modern 2025 design, B2B events section, and secure admin panel.

## ✨ Features

### 🎨 2025 Design System
- **Fluid Typography**: Responsive text scaling using CSS clamp()
- **Glassmorphism**: Modern glass effects with backdrop blur
- **WCAG AAA Compliant**: Superior accessibility (7:1+ contrast)
- **Dark Mode**: Fully optimized light and dark themes
- **Micro-Interactions**: Smooth animations and hover effects
- **Mobile-First**: Responsive design for all devices

### 🎪 B2B Events Section
- Event showcase with full details
- Exhibitor directory with 13+ companies
- Real-time statistics
- PDF brochures and company websites
- Mobile-responsive cards

### 🔐 Secure Admin Panel
- **GitHub OAuth 2.0** with mandatory 2FA
- **Direct GitHub Integration** for content management
- **Comprehensive Audit Logging**
- **Rate Limiting** (100 req/15min)
- **CSRF Protection**
- **Session Management** (2-hour expiration)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18+ (but < 21)
- npm or yarn
- GitHub account with 2FA enabled

### Installation

#### Option 1: Automatic Setup (Recommended)

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```cmd
setup.bat
```

#### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Install admin panel dependencies
npm install next-auth @octokit/rest
npm install --save-dev @types/next-auth

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# (See docs/INSTALLATION_GUIDE.md for details)

# Start development server
npm run dev
```

### Quick Test

```bash
# Start dev server
npm run dev

# Open browser
open http://localhost:3000

# Visit admin panel
open http://localhost:3000/admin/login
```

## 📦 Project Structure

```
alxtroy.com/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   │   ├── login/          # Login page
│   │   └── dashboard/      # Dashboard
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   └── admin/          # Admin API endpoints
│   ├── events/             # B2B Events page (NEW)
│   └── ...                 # Other pages
├── components/             # React components
├── lib/                    # Utilities and libraries
│   ├── admin/             # Admin functionality
│   │   ├── github.ts      # GitHub API integration
│   │   └── audit.ts       # Audit logging
│   └── config/            # Configuration files
├── styles/                # Global styles
│   ├── globals.css        # Utility classes
│   └── theme.css          # Design tokens
├── docs/                  # Documentation
│   ├── INSTALLATION_GUIDE.md
│   ├── ADMIN_PANEL_GUIDE.md
│   ├── DESIGN_2025_IMPROVEMENTS.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   ├── QUICK_REFERENCE.md
│   └── MODERNIZATION_SUMMARY.md
├── setup.sh              # Unix setup script
├── setup.bat             # Windows setup script
└── .env.local.example    # Environment template
```

## 🔧 Environment Variables

Create `.env.local` with these variables:

```env
# Required for Admin Panel
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GITHUB_ID=your-oauth-app-id
GITHUB_SECRET=your-oauth-secret
GITHUB_REPO=ledlyy/alxtroy.com
GITHUB_TOKEN=your-personal-access-token
ADMIN_GITHUB_USERS=username1,username2
```

See `.env.local.example` for complete configuration.

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Installation Guide](docs/INSTALLATION_GUIDE.md) | Step-by-step setup instructions |
| [Admin Panel Guide](docs/ADMIN_PANEL_GUIDE.md) | Complete admin panel documentation |
| [Design Improvements](docs/DESIGN_2025_IMPROVEMENTS.md) | 2025 design system details |
| [Implementation Checklist](docs/IMPLEMENTATION_CHECKLIST.md) | Detailed setup checklist |
| [Quick Reference](docs/QUICK_REFERENCE.md) | Quick commands and tips |
| [Summary](docs/MODERNIZATION_SUMMARY.md) | Project overview |

## 🎯 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with modern design |
| About | `/about` | Company information |
| Services | `/services` | Service offerings |
| Events | `/events` | **NEW** B2B events showcase |
| Destinations | `/destinations` | Travel destinations |
| Contact | `/contact` | Contact form |
| Admin Login | `/admin/login` | Secure admin access |
| Dashboard | `/admin/dashboard` | Admin control panel |

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run typecheck    # Check TypeScript types
npm test             # Run tests
```

## 🔐 Security Features

- ✅ GitHub OAuth with 2FA enforcement
- ✅ Repository access verification
- ✅ Comprehensive audit logging
- ✅ Rate limiting (100 req/15min)
- ✅ CSRF protection
- ✅ Secure session management
- ✅ HTTPS required in production
- ✅ Content Security Policy (CSP)

## 🎨 Design System

### Color Palette

```css
/* Light Theme */
--accent: #A38555        /* Brand gold */
--bg: #ffffff            /* Background */
--fg: #111827            /* Foreground */

/* Dark Theme */
--accent: #D2B180        /* Lighter gold */
--bg: #090a0f            /* Deep dark */
--fg: #f8fafc            /* Light foreground */
```

### Typography

```css
/* Fluid scaling with clamp() */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem)
```

### Utility Classes

```css
.glass-card          /* Glassmorphism effect */
.card-hover          /* Lift animation on hover */
.btn-primary         /* Primary button style */
.btn-secondary       /* Secondary button style */
.gradient-text       /* Gradient text effect */
```

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ iOS Safari 15+

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

See [Installation Guide](docs/INSTALLATION_GUIDE.md) for detailed deployment instructions.

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module 'next-auth'"**
```bash
npm install next-auth @octokit/rest
```

**"Access Denied" on login**
- Verify user is in `ADMIN_GITHUB_USERS`
- Ensure 2FA is enabled on GitHub
- Check repository access

**Build errors**
```bash
rm -rf .next node_modules/.cache
npm install
npm run build
```

See [Installation Guide](docs/INSTALLATION_GUIDE.md) for more solutions.

## 📊 Performance

- ⚡ **Lighthouse Score**: 90+ in all categories
- ⚡ **First Contentful Paint**: < 1.5s
- ⚡ **Time to Interactive**: < 3.5s
- ⚡ **Largest Contentful Paint**: < 2.5s

## 🤝 Contributing

This is a private project for Alexander & Troy Tours. For authorized contributors:

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm test`
4. Submit a pull request

## 📞 Support

- **Email**: operations@alxtroy.com
- **GitHub Issues**: https://github.com/ledlyy/alxtroy.com/issues
- **Documentation**: See `docs/` directory

## 📄 License

© 2025 Alexander & Troy Tours. All rights reserved.

## 🎉 What's New in 2.0.0

- ✨ Complete 2025 design system
- ✨ B2B Events section with exhibitor directory
- ✨ Secure admin panel with GitHub OAuth
- ✨ Comprehensive audit logging
- ✨ WCAG AAA accessibility compliance
- ✨ Enhanced dark mode
- ✨ Fluid typography and micro-interactions
- ✨ Glassmorphism effects
- ✨ Complete documentation suite

## 🗺️ Roadmap

### Phase 1 (Completed) ✅
- Modern design system
- B2B events page
- Admin panel foundation
- GitHub integration

### Phase 2 (Planned) 🔄
- Content editor with live preview
- File upload system
- Advanced event management
- Email notifications

### Phase 3 (Future) 📋
- Multi-language support
- Advanced analytics
- Customer portal
- API for third-party integrations

---

**Version**: 2.0.0  
**Last Updated**: October 13, 2025  
**Made with ❤️ by Alexander & Troy Tours**

---

## Quick Links

- 📚 [Complete Installation Guide](docs/INSTALLATION_GUIDE.md)
- 🔐 [Admin Panel Guide](docs/ADMIN_PANEL_GUIDE.md)
- 🎨 [Design System](docs/DESIGN_2025_IMPROVEMENTS.md)
- ✅ [Implementation Checklist](docs/IMPLEMENTATION_CHECKLIST.md)
- ⚡ [Quick Reference](docs/QUICK_REFERENCE.md)

**Ready to get started?** Run `./setup.sh` or `setup.bat` to begin!
