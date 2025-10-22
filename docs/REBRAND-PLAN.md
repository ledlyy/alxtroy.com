# Alexander & Troy Tours — Rebrand Plan

## Current State Snapshot
- Next.js 15 App Router + React 19, Tailwind 3.4, shadcn stack; bilingual shell (en/tr) but event-centric content.
- Global theming tied to `styles/theme.css` navy/gold palette, tokens referenced in Tailwind via custom CSS vars.
- Legacy assets & copy: Karibu/Turkish Jewellery event logos, participants catalog, event metadata, contact emails.
- Marketing surface: `/` (event landing), `/registration`, `/catalog`, `/contact`, `/privacy`, `/terms`, `/cookies`, `/faq`, `/careers`, `/pricing`, `/sponsors`, `/venue`, `/services`. Content folder holds MDX for events/blog, participants dataset, RSS/sitemap in place.
- Tooling: Vitest, Playwright, axe, Lighthouse CLI, GA4 hooks, service worker, cookie banner, search index, sitemap/rss/OG image placeholder.

## Rebrand Objectives
- Replace legacy event experience with Alexander & Troy Tours corporate site (Home, About, Services, MICE + subpages, Destinations, Gallery, References, Blog, Contact) using provided briefs.
- Deliver white/near-white design system with logo secondary accent (now sourced from `public/logo/mark.svg`).
- Preserve App Router/i18n readiness; ensure TypeScript strict, lint clean; achieve Lighthouse ≥95/95/95/98.
- Stand up modern SEO/a11y baseline: structured metadata, JSON-LD (Organization, Website, Breadcrumb, Services, Destinations, Articles), refreshed sitemap/robots/humans, consent-ready analytics, validated forms.

## Workstreams & Approach
1. **Design System Refresh**
   - Generate CSS design tokens (`--bg`, `--fg`, `--accent`, etc.), Tailwind theme extensions, shadcn theme alignment.
   - Update typography (fluid scale, system/variable font), spacing rhythm, focus states, motion-safe animations.
   - Replace favicons/app icons/OG generator with new branding.
2. **Information Architecture & Content**
   - Remove event-specific routes/components (participants, registration) and migrate to page clusters matching spec.
   - Author new copy from briefs (SEO-optimized, inclusive tone) and populate structured content (`/content` or equivalent).
   - Build reusable sections (hero, service cards, destination grid, testimonials/gallery) supporting MDX/JSON content.
3. **Forms, Integrations, Analytics**
   - Rebuild contact form with server action + SMTP relay (env-driven) + spam defense (honeypot + Turnstile/ReCAPTCHA v3 hook).
   - Configure GA4 with Consent Mode v2; expand event tracking (outbound_click, lead, contact_submit).
   - Implement cookie banner (CMP toggles) aligned with consent states.
4. **SEO / Performance Hardening**
   - Rework Next Metadata API usage, canonical + alternate locales, robots directives, sitemap/hreflang, humans.txt.
   - Add JSON-LD schemas (Organization, Website/Sitelinks, BreadcrumbList, Service, FAQ, Destination/Place, Blog Article).
   - Build dynamic OG image generator (Satori) with new brand visuals; ensure image optimization, caching headers, ISR where applicable.
5. **Quality & Tooling**
   - Update lint/type/test suites; expand Vitest coverage for key components and Playwright flows (nav, forms, a11y checks).
   - Run axe/Lighthouse regression; document results in TEST_REPORT/Lighthouse CI config.
   - Sweep for dead code/assets via knip/depcheck/ts-prune; clean env vars, lockfiles, docs. Harden security headers, add DX files (.editorconfig, .nvmrc, etc.).

## Risks & Dependencies
- **Logo asset supplied**: `public/logo/mark.svg` defines the accent gradient for the system.
- **Content volume**: Destinations + MICE subpages require structured data modeling to avoid monolithic pages.
- **Analytics credentials**: GA4 / SMTP / CAPTCHA env secrets must be provided for production (mock locally).
- **Legacy routes**: Need careful redirects / sitemap updates to avoid SEO regressions when removing event pages.
- **Timeline**: Full rewrite touches most app routes; ensure incremental commits and regression tests after each major module.

## Checklist
- [x] Extract/confirm accent color and create DESIGN_TOKENS.md.
- [x] Replace global styles, Tailwind config, shadcn theme with white + accent system.
- [x] Rebuild navigation, header/footer, hero sections with new brand voice.
- [ ] Author required pages (Home, About, Services, MICE + subpages, Destinations + detail template, Gallery, References, Blog, Contact) using structured content.
- [ ] Implement contact form server action with SMTP + spam protection + consent-aware analytics events.
- [ ] Refresh SEO stack (Metadata API, JSON-LD, OG generator, sitemap/robots/humans, hreflang) and add SEO_REPORT.md.
- [ ] Add/testing coverage: Vitest unit tests, Playwright + axe audits, Lighthouse baseline in TEST_REPORT.md.
- [ ] Remove legacy assets/routes/content; update docs + MIGRATION_NOTES.md.
