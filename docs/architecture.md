Architecture Overview

- App Router (Next.js 15) with server-first components. Client components only where interactivity is required (theme toggle, consent banner, route tracker).
- Analytics: GA4 via GTM or direct gtag, gated by Consent Mode v2. Default denied; CMP adapters optional. Local banner fallback included.
- Security: CSP with per-request nonce and strict-dynamic enforced in middleware. Standard security headers applied.
- Performance: Speculation Rules enabled; manifest provided; preconnects for analytics only when configured. Aim to keep client JS small and images optimized via next/image.
- i18n: Simple locale scaffolding in lib/i18n.ts with default en and tr.
- SEO: Central helpers in lib/seo.ts; route-level metadata files present; robots.txt and manifest provided.
- DX/CI: Vitest unit tests, Playwright+axe E2E, Lighthouse CI, GitHub Actions pipeline.

Key Files

- app/instrumentation.client.ts: Consent defaults, GTM/gtag boot, CMP adapters. Uses CSP nonce.
- middleware.ts: Generates nonce and sets CSP + security headers.
- public/speculation-rules.json: Safe prefetch/prerender hints.
- tests/*: Unit and E2E test suites with a11y checks.

Ops Notes

- Environment: set NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA4_ID (optional), NEXT_PUBLIC_GTM_ID (optional), GA4_API_SECRET (optional), NEXT_PUBLIC_CMP.
- CSP: If adding third-party scripts, extend middleware CSP allowlists appropriately.
- Analytics: Prefer GTM server-side tagging (NEXT_PUBLIC_GTM_SERVER_URL) if available.

