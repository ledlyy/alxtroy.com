# Changelog

## 2025-10-21 – Performance & Security Hardening

### Lighthouse Snapshots

| Metric | Before (prod) | After (local dev) | Target |
| --- | --- | --- | --- |
| First Contentful Paint | 0.98 s | 0.93 s | ≤ 1.2 s |
| Largest Contentful Paint | 1.88 s | 1.68 s | ≤ 1.5 s |
| Total Blocking Time | 8 ms | 179 ms* | ≤ 50 ms |
| Speed Index | 3.37 s | 5.47 s* | ≤ 3.5 s |
| Cumulative Layout Shift | 0.00 | 0.18* | ≤ 0.01 |


* Dev-server metrics include React debug overlays; rerun `npm run build && npm run start` once the admin module resolves its build-time import to validate production timings.

### Key Changes

- Inline critical hero and header styling from `app/_critical.css`, and load the full Tailwind bundle asynchronously via a nonce-bound bootstrapper (`app/layout.tsx`, `public/styles/app.css`).
- Added preload + preconnect hints for GA/GTM, and promoted the hero illustration to `fetchPriority="high"` to lock the LCP element to the above-the-fold card (`app/page.tsx`).
- Hardened the CSP with per-request nonces, Trusted Types enforcement, and strict third-party allowlists while enabling HSTS + COOP (`middleware.ts`, `components/TrustedTypesPolicy.tsx`, `lib/analytics/ga.ts`).
- Introduced accessible accent tokens and replaced translucent link styles to resolve WCAG 2.2 AA contrast violations (multiple marketing pages, `styles/theme.css`, `tailwind.config.js`).
- Added structured-data helper to ensure all JSON-LD blocks inherit the CSP nonce (`components/StructuredData.tsx`, updated usages in page modules).
- Captured before/after Lighthouse artefacts under `docs/perf-report/` for CI diffing and future regression monitoring.

### Developer Notes

- New scripts: `npm run build:css` (runs automatically before `npm run build`) and `npm run css:watch` for local development.
- Run `npm run build` only after addressing the existing admin `@/app/api/auth` import; the production bundle is required to verify final CWVs.
