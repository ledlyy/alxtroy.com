# Next.js 15 Universal Website Template — Developer Guide

This document explains the architecture, conventions, and extension points of the Universal SEO‑First Multi‑Purpose Website Template. It is designed for SMEs and startups to quickly launch corporate sites, blogs, event pages, restaurant menus, portfolios, and more. Entire feature sets (blog, events, menu, careers, admin) can be toggled on/off via config without deleting code.

## Key Technologies

- Next.js 15 (App Router), React 19, Server Components
- TypeScript end‑to‑end
- Tailwind CSS with design tokens and dark mode
- shadcn/ui (Radix UI) integrated with Tailwind
- MDX content with frontmatter
- SEO best practices (Open Graph, JSON‑LD, sitemap, robots)
- Internationalization (i18n) with locale subpaths
- Forms via React Hook Form + Zod (client + server validation)
- WCAG 2.2 AA accessibility practices
- Performance features: next/image, next/font, ISR, code‑splitting
- Deployment ready for Vercel/Netlify (serverless, Edge‑friendly where applicable)

---

## Project Structure

High‑level layout (folders may be added/omitted based on enabled features):

```
├── app/
│   ├── (marketing)/
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── careers/page.tsx
│   │   └── layout.tsx
│   ├── (content)/
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── menu/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── ...
│   ├── (admin)/
│   │   └── ...
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── rsvp/route.ts
│   │   └── newsletter/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui or custom Radix‑based components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── FeatureGrid.tsx
│   ├── BlogCard.tsx
│   ├── EventCard.tsx
│   ├── MenuCategory.tsx
│   └── ...
├── content/
│   ├── blog/
│   │   └── hello-world.mdx
│   ├── events/
│   │   └── 2024-01-conference.mdx
│   ├── menu/
│   │   └── menu.yaml
│   └── pages/
├── lib/
│   ├── config/site.ts
│   ├── seo.ts
│   ├── i18n.ts
│   ├── data/
│   │   ├── posts.ts
│   │   ├── events.ts
│   │   ├── menu.ts
│   │   └── forms.ts
│   ├── utils.ts
│   └── ...
├── public/
│   ├── assets/
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── styles/
│   ├── globals.css
│   ├── theme.css
│   └── tailwind.css (optional)
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

### Route Groups and Feature Toggles

- Parentheses in folder names (e.g., `app/(marketing)`) create route groups that do not affect URL paths.
- Features are gated via `siteConfig.features` (blog/events/menu/careers/admin). Disabled sections:
  - Are not linked in navigation.
  - Optionally 404/redirect when directly accessed (e.g., `if (!siteConfig.features.blog) notFound();`).

---

## The `app/` Directory

### Root

- `app/layout.tsx`: Root layout. Sets `<html lang>`, theme provider, global `<Header/>` and `<Footer/>`, default SEO, analytics.
- `app/page.tsx`: Home page composition (hero, features, teasers, newsletter). Server Component first approach.

### (marketing)

Static corporate pages such as About, Services, Pricing, Contact, Careers. Each `page.tsx` is a Server Component; layout is shared via `(marketing)/layout.tsx`.

### (content)

- Blog: `blog/page.tsx` (listing), `blog/[slug]/page.tsx` (detail), `blog/layout.tsx` (sidebar/filters).
- Events: `events/page.tsx` (listing), `events/[slug]/page.tsx` (detail), `events/layout.tsx`.
- Menu: `menu/page.tsx` (single page menu), optional `menu/layout.tsx`.

### (admin) — Optional

Protected routes for admin dashboards or previews. Controlled via `features.admin` and auth middleware/guards.

### API Route Handlers

- `api/contact/route.ts`: Contact form POST; validates with Zod, calls `lib/data/forms.submitContactForm`.
- `api/rsvp/route.ts`: RSVP POST; validates and calls `submitRsvp`.
- `api/newsletter/route.ts`: Newsletter subscribe; forwards to provider API.

All route handlers run on the server (Node/Edge depending on usage). Keep them light for Edge compatibility.

---

## The `components/` Directory

### UI Primitives (`components/ui/`)

- Tailwind‑styled, Radix‑powered components (Button, Input, Dialog, Tabs, Tooltip, etc.). Accessible by default.
- Keep keyboard/focus behavior, ARIA, and variants consistent across the site.

### Layout & Sections

- `Header.tsx`: Logo, primary nav (built from `siteConfig.navLinks`), locale switcher, theme toggle, mobile menu.
- `Footer.tsx`: Secondary nav, social icons, newsletter input, legal links; optional LocalBusiness schema.
- `Hero.tsx`, `FeatureGrid.tsx`, `Testimonials.tsx`, `BlogCard.tsx`, `EventCard.tsx`, `MenuCategory.tsx`.
- Form building blocks: `ContactForm.tsx`, `FormField.tsx` leveraging RHF + Zod.

Client components must start with `"use client"`; keep them lean and push data work to server components.

---

## The `content/` Directory

### Blog (`content/blog/*.mdx`)

- MDX files with frontmatter: `title`, `date`, `author`, `tags`, `excerpt`, `draft`, `image`, etc.
- `lib/data/posts.ts` reads, parses, and returns typed data. Use `generateStaticParams` to build all slugs.
- Render MDX inside a `prose dark:prose-invert` container for typography.

### Events (`content/events/*.mdx`)

- Frontmatter: `title`, `startDate`, `endDate?`, `location`, `description`, `image`, `registrationUrl?`.
- `lib/data/events.ts` lists/sorts upcoming/past; returns details for a slug. Optionally generate/download ICS.

### Menu (`content/menu/menu.yaml`)

- Structured categories/items. Example:

```yaml
- category: Starters
  items:
    - name: Bruschetta
      description: Grilled bread with tomatoes, garlic, olive oil.
      price: 8.5
      tags: [vegetarian]
- category: Mains
  items:
    - name: Margherita Pizza
      description: Classic pizza with tomatoes, mozzarella, basil.
      price: 15
      tags: [vegetarian]
```

- `lib/data/menu.ts` parses YAML and returns typed categories/items.

### Headless CMS Option

Swap filesystem readers in `lib/data/*` for CMS/REST/GraphQL fetchers without changing pages. Keep return shapes stable.

---

## The `lib/` Directory

### `lib/config/site.ts`

Central config for branding, URLs, features, nav, analytics:

```ts
export const siteConfig = {
  name: "YourSiteName",
  url: "https://www.yoursite.com",
  defaultLocale: "en",
  locales: ["en", "tr"],
  features: { blog: true, events: false, menu: true, careers: true, admin: false },
  metadata: {
    title: "YourSiteName – Tagline",
    description: "SEO description for the site.",
    keywords: ["Next.js 15", "Template", "Startup"],
    author: "Your Company",
    socialImage: "/assets/og-default.png",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog", enabled: true },
    { label: "Events", href: "/events", enabled: false },
    { label: "Menu", href: "/menu", enabled: true },
  ],
  contactEmail: "london@karibu.com.tr",
  socialLinks: {
    twitter: "https://twitter.com/yourcompany",
    facebook: "https://facebook.com/yourcompany",
    linkedin: "https://linkedin.com/company/yourcompany",
    instagram: "https://instagram.com/yourcompany",
  },
  analytics: {
    provider: "ga", // or "plausible" | "none"
    gaTrackingId: "G-XXXXXXX",
    plausibleDataDomain: "turkishjewelry.co.uk",
  },
} as const
```

Store secrets in environment variables, not here.

### `lib/seo.ts`

- Helpers to produce Next Metadata objects and JSON‑LD:
  - `getDefaultMeta()`, `getBlogPostMeta(post)`, `getEventMeta(event)`.
  - Organization, LocalBusiness, Article, Event, Menu schema builders.
  - Breadcrumb JSON‑LD generators.

### `lib/i18n.ts`

- Locales and translation helpers. Either a simple dictionary loader or integration with `next-intl`.
- Hreflang utilities for alternates and metadata.

### `lib/data/*`

- `posts.ts`: `getPosts()`, `getPost(slug)`, optional `getRecentPosts(n)`.
- `events.ts`: `getEvents({ upcomingOnly })`, `getEvent(slug)`, optional ICS helpers.
- `menu.ts`: `getMenu()` (YAML/JSON or CMS).
- `forms.ts`: `submitContactForm`, `submitRsvp`, `submitApplication` with provider‑switchable implementations (email, webhook, CRM). Server‑side Zod validation mirrors client.

### `lib/utils.ts`

Common helpers like `formatDate(locale)`, `slugify`, `stripMarkdown`, `isExternalUrl`.

---

## Styles & Theming

- `styles/globals.css`: `@tailwind base; @tailwind components; @tailwind utilities;` plus global tweaks.
- `styles/theme.css`: CSS custom properties for colors, radii, spacing, fonts. Light/dark tokens under `.dark`.
- `tailwind.config.js`:
  - `darkMode: "class"`
  - Extend colors using CSS variables (`rgb(var(--color-primary) / <alpha-value>)`).
  - Plugins: `@tailwindcss/typography`, `@tailwindcss/forms`.
  - `content`: `./app/**/*.{ts,tsx,mdx}`, `./components/**/*.{ts,tsx,mdx}`, `./content/**/*.{md,mdx}`.
- Theme toggling with `next-themes` in root layout.

---

## Configuration Files

- `next.config.js`:
  - Image domains, redirects/rewrites.
  - i18n config (if using Next built‑in), or manual `[locale]` segment approach.
- `tsconfig.json`: strict TS, path aliases like `@/components/*`, `@/lib/*`, `@/content/*`.
- Lint/format (optional): `.eslintrc.*`, `.prettierrc`.
- Tests (optional): unit tests for `lib/utils`, integration smoke tests for pages.

---

## Detailed Features

### Global Layout & Navigation

- Root metadata and head tags via Next Metadata API.
- `<Header/>` builds nav from `siteConfig.navLinks` filtering disabled items and handling locale paths.
- `<Footer/>` includes legal links, social, newsletter. Consider LocalBusiness schema.
- Add `<ThemeProvider attribute="class">`, optional `<SessionProvider>` if using auth.

### Homepage

- Compose sections: Hero, Features, CTA, Recent Posts (if blog), Upcoming Events (if events), Testimonials, Logos, Newsletter.
- Server render; fetch latest content via data layer with `revalidate` as appropriate.

### Marketing Pages

- Static content or driven by config/MDX. Contact page includes RHF+Zod contact form posting to `/api/contact`.
- Careers page optionally lists roles and provides an application form to `submitApplication`.

### Blog

- Listing: `getPosts()`; optional tag filter/search; pagination if needed.
- Detail: `getPost(slug)`; render MDX in `prose`; prev/next links; Article JSON‑LD.
- SEO: titles, descriptions from frontmatter; OG/Twitter; optional dynamic OG image.

### Events

- Listing: upcoming/past, sorted by date. `EventCard` for consistency.
- Detail: full description, formatted date/time, map/link, RSVP, Add to Calendar (ICS or Google link), Event JSON‑LD.

### Menu

- Single page with categories/items from YAML/JSON. Accessible markup, icons for dietary tags.
- Optional anchors per section, print styles, schema.org Menu data.

### Internationalization (i18n)

- Approach A: App Router `[locale]` segment wrapping groups; `generateStaticParams` for locales.
- Approach B: Next built‑in i18n routing (Pages‑style). App Router often prefers segment approach.
- Translations via `next-intl` or a simple dictionary. Add hreflang alternates. Handle RTL if needed.

### SEO & Metadata

- Use static `metadata` or `generateMetadata({ params })` per page.
- Open Graph and Twitter Card defaults; per‑page overrides for blog/events.
- JSON‑LD for Organization, WebSite/WebPage, Article, Event, Menu, JobPosting.
- Canonical URLs and alternates for locales.
- `next-sitemap` for `sitemap.xml` and `robots.txt` (or provide static files under `public/`).

### Forms & Data Handling

- Client: React Hook Form + Zod resolver; accessible error messaging; honeypot/captcha optional.
- Server: API routes validate with Zod; call `lib/data/forms` which fans out (email via Resend/Nodemailer, webhook, CRM). Return `{ success, message? }` consistently.
- Newsletter: minimal email field; provider integration via env.

### Authentication (Optional)

- NextAuth providers (OAuth, Credentials). Configure in `app/api/auth/[...nextauth]/route.ts`.
- Middleware or server guards for `(admin)` routes. Attach roles via JWT callbacks.

### Analytics & Consent

- `siteConfig.analytics.provider`: `ga` | `plausible` | `none`.
- Include analytics scripts conditionally after consent. Simple cookie consent banner component with accept/decline.

### Accessibility

- Semantic structure, logical heading order, labeled interactive controls.
- Focus management (modals/menus), keyboard navigation, ARIA where necessary.
- Color contrast verified in light/dark. `prefers-reduced-motion` support.
- `<html lang>` per locale. Skip‑to‑content link.

### Performance

- `next/image` with intrinsic sizes to avoid CLS; `priority` for hero.
- `next/font` (Inter, local display font) with CSS variables to avoid FOUT/FOIT.
- Server Components minimize client JS; route‑level code splitting.
- ISR: revalidate where content changes; Webhook‑driven revalidate for CMS.
- Edge runtime for pure‑fetch pages (no Node APIs).
- Lighthouse targets: Perf ≥ 90, proper preloading for LCP assets.

### Backend Integration (.NET or others)

- Replace filesystem readers in `lib/data/*` with REST/GraphQL calls to your backend, preserving types.
- Forward forms to backend endpoints; handle auth via JWT/session as needed.
- GraphQL clients/codegen can live inside `lib/` without changing page code.

---

## Setup & Usage

1) Install and run

```bash
npm install
npm run dev
```

2) Configure environment variables (examples):

```
NEXT_PUBLIC_SITE_URL=https://localhost:3000
RESEND_API_KEY=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
GA_MEASUREMENT_ID=G-XXXXXXX
PLAUSIBLE_DOMAIN=yoursite.com
NEXTAUTH_SECRET=...
GOOGLE_ID=...
GOOGLE_SECRET=...
```

3) Update `lib/config/site.ts` for branding, features, nav, analytics.

4) Add content under `content/` (MDX posts, events, menu.yaml).

5) Tweak theme in `styles/theme.css` and Tailwind tokens.

6) Verify forms by hitting `/api/contact` and `/api/rsvp` through the UI. Confirm emails/webhooks.

7) Build & deploy

```bash
npm run build
npm run start   # or deploy to Vercel/Netlify
```

---

## Feature Toggles Quick Reference

- Disable Blog: set `siteConfig.features.blog = false`; hide nav link; gate routes with `notFound()`.
- Disable Events/Menu/Careers/Admin similarly. Components/pages should guard with config checks.

---

## Authoring Content

### Blog MDX Frontmatter

```md
---
title: "Hello World"
slug: "hello-world"
date: "2025-01-15"
author: "Jane Doe"
tags: ["nextjs", "template"]
excerpt: "Kick off your new site with this guide."
image: "/assets/blog/hello-world.jpg"
draft: false
---

Your MDX content here. You can import and use components.
```

### Event MDX Frontmatter

```md
---
title: "Product Launch Day"
slug: "product-launch"
startDate: "2025-08-30T09:00:00+03:00"
endDate: "2025-08-30T17:00:00+03:00"
location: "HQ Auditorium, City"
image: "/assets/events/launch.jpg"
registrationUrl: "https://eventbrite.com/..."
---

Agenda and details...
```

---

## Extending the Template

- Add a new section (e.g., `portfolio`): replicate `app/(content)/blog` pattern with listing/detail, types, and SEO helpers.
- Add a new data provider: implement functions in `lib/data/<feature>.ts` that match existing return types.
- Add structured data: create a builder in `lib/seo.ts` and embed in `generateMetadata` or page body script tag.

---

## Deployment Notes

- Vercel/Netlify serverless friendly. Ensure any Node‑only APIs (e.g., Nodemailer) run on Node runtime routes, not Edge.
- Configure image domains in `next.config.js` if using external assets.
- Provide `robots.txt` and `sitemap.xml` (via `next-sitemap` or static under `public/`).

---

## Launch Checklist

- Update `siteConfig` (name, url, features, nav, social, analytics)
- Replace logos/OG images under `public/assets`
- Fill out content pages and MDX
- Wire email/provider keys and test forms
- Verify SEO: titles, descriptions, canonical, OG/Twitter, JSON‑LD
- Check i18n paths and hreflang if multi‑locale
- Run accessibility checks (axe) and Lighthouse

---

## Conclusion

This template balances performance, accessibility, and flexibility. Pages, components, data, and styles have clear boundaries; feature toggles and the data abstraction layer enable fast iteration and future backend integrations. Follow the patterns here to add new sections, providers, and integrations confidently.

