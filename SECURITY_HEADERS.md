# Security Headers

The middleware applies the following HTTP response headers to every request:

- `Content-Security-Policy`: `default-src 'self'; base-uri 'self'; frame-ancestors 'none'; script-src 'self' 'nonce-{requestNonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'nonce-{requestNonce}'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://region1.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://images.unsplash.com https://logo.clearbit.com https://res.cloudinary.com; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; form-action 'self'; manifest-src 'self'; worker-src 'self' blob:; trusted-types app-default; require-trusted-types-for 'script'`
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload`
- `Cross-Origin-Opener-Policy`: `same-origin`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY` (automatically downgraded to `SAMEORIGIN` for `/pdfs/*` to allow first-party embeds)
- `Permissions-Policy`: `geolocation=(), camera=(), microphone=(), interest-cohort=()`

## CSP Nonce Propagation

- Each request receives a unique nonce generated in `middleware.ts` and forwarded via the `x-nonce` request header.
- Server components access the nonce through `headers().get('x-nonce')` to inline critical CSS, asynchronous style loader scripts, and JSON-LD without weakening the CSP.
- Client-side loaders (analytics bootstrap, CSS loader) read the nonce from the `data-csp-nonce` attribute on `<html>` when adding new scripts or styles.

## Trusted Types

- A default Trusted Types policy (`app-default`) is installed by `TrustedTypesPolicy.tsx` so that any future DOM sinks that require TrustedHTML can opt-in without relaxing the CSP.

## Validation Checklist

- ✅ Inline `<style>` tags are nonce-bound and critical-only.
- ✅ Asynchronous CSS is appended by a nonce-bound bootstrapper instead of using disallowed inline handlers.
- ✅ Analytics scripts inherit the nonce and enforce `referrerPolicy="strict-origin-when-cross-origin"`.
- ✅ No occurrences of `'unsafe-inline'` or `'unsafe-eval'` in the active policy.
