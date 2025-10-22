# Accessibility Fixes

## Contrast Enhancements

- Added an accessible accent ramp (`--accent-700` … `--accent-400`) in `styles/theme.css` and exposed them via Tailwind tokens (`text-accent-700`, `text-accent-600`, etc.).
- Replaced semi-transparent accent text (`text-accent/80`) across marketing pages with the high-contrast `text-accent-700` token:
  - `app/services/page.tsx`
  - `app/mice/page.tsx`
  - `app/destinations/page.tsx`
  - `app/destinations/[slug]/page.tsx`
  - `app/about/page.tsx`
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/references/page.tsx`
  - `app/search/page.tsx`
- Updated generated CSS (`public/styles/app.css`) to deliver the new tokens asynchronously while preserving branding.

## Supportive Changes

- Added critical hero styling (`app/_critical.css`) so above-the-fold content render legibly before non-critical CSS downloads.
- Regenerated Tailwind output via the new `npm run build:css` step to include the accent ramp and ensure utility coverage.

## Outstanding Actions

- Run an automated axe-core scan after deploying the build artefacts to confirm no regressions across admin screens (not part of this pass).
