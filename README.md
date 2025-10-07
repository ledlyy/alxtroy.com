# Alexander & Troy Tours

> Professional receptive services website for travel and MICE operations across the Americas.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🌐 Live Website

**Repository:** [github.com/ledlyy/alxtroy.com](https://github.com/ledlyy/alxtroy.com)

## 📋 Overview

Alexander & Troy Tours is a leading receptive services company specializing in destination management, MICE operations, and bespoke travel experiences across the United States, Latin America, and island destinations.

### ✨ Key Features

- 🎨 **Modern, Responsive Design** - Mobile-first approach with professional UI/UX
- 🌙 **Dark/Light Theme** - Automatic theme switching with system preference support
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Blazing Fast** - Built with Next.js 15 App Router and static generation
- 🔍 **SEO Optimized** - Comprehensive meta tags, structured data, and sitemaps
- ♿ **Accessible** - WCAG 2.1 compliant with keyboard navigation
- 🔒 **Secure** - CSP headers, security best practices, and modern protocols
- 📝 **Blog System** - MDX-powered blog with flexible routing
- 🌍 **Multi-destination** - Comprehensive destination management system
- 📧 **Contact Form** - Integrated contact system with validation

## 🚀 Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **Content:** MDX for blog posts
- **Theme:** next-themes with system detection
- **Analytics:** Google Analytics 4 integration
- **Testing:** Playwright (E2E) + Vitest (Unit)

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/ledlyy/alxtroy.com.git
cd alxtroy.com

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 🎨 Customization

### Theme Colors

Edit `styles/theme.css` to customize colors:

```css
:root {
  --accent: 150 100% 38%;      /* Primary accent color */
  --background: 0 0% 100%;     /* Background color */
  --foreground: 240 10% 3.9%;  /* Text color */
}
```

### Site Configuration

Update `lib/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Alexander & Troy Tours',
  url: 'https://alxtroy.com',
  description: '...',
}
```

## 📁 Project Structure

```
alxtroy.com/
├── app/              # Next.js App Router pages
├── components/       # React components
├── content/          # Content management (destinations, blog, services)
├── lib/              # Utilities and helpers
├── public/           # Static assets
└── styles/           # Global styles
```

## 📝 Content Management

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2025-01-15"
excerpt: "Brief description"
tags: ["MICE", "Travel"]
---

Your content here...
```

### Managing Destinations

Edit `content/destinations.ts` to add or modify destinations.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

## 📊 Performance

- ⚡ Lighthouse Score: 95+ across all metrics
- 🎯 Core Web Vitals: All metrics in green
- 📦 Optimized bundle size with code splitting
- 🖼️ Automatic image optimization

## 📄 License

Copyright © 2025 Alexander & Troy Tours. All rights reserved.

## 📧 Contact

- **Website:** [alxtroy.com](https://alxtroy.com)
- **Email:** info@alxtroy.com

---

**Built with ❤️ for Alexander & Troy Tours**