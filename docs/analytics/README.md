Analytics and Consent — Implementation Guide

Overview
- Stack: GA4 with Consent Mode v2, optional GTM, optional CMP adapters, and a fallback local cookie banner.
- Defaults: All consent signals denied until the user grants via CMP/banner.
- No PII: Event payloads are allowlisted and sanitized to prevent sending emails, phone numbers, or free text that could contain PII.

Key Files
- app/instrumentation.client.ts: Boots Consent Mode defaults, loads GTM/gtag based on env, attaches CMP adapters.
- components/consent/CookieBanner.tsx: Accessible fallback banner (Accept/Reject) that updates Consent Mode.
- components/analytics/RouteChangeTracker.tsx: Sends page_view on client route changes when using direct gtag.
- lib/analytics/consent.ts: Consent Mode helpers (defaults, updates, awaitConsent gate).
- lib/analytics/gtag.ts: GA4 init and event/pageview helpers with param allowlist + sanitizer.
- lib/analytics/datalayer.ts: Single-source dataLayer push helper.
- lib/analytics/cmp/adapters/*: Example adapters for Cookiebot and Usercentrics.
- app/api/analytics/collect/route.ts: Measurement Protocol fallback endpoint with allowlist and consent gate.
- lib/config/site.ts: Reads analytics and CMP provider from env.
- next.config.js: Security headers including CSP, Referrer-Policy, and Permissions-Policy.

Environment Variables
- NEXT_PUBLIC_GA4_ID=G-XXXXXXX
- NEXT_PUBLIC_GTM_ID=GTM-XXXX (optional — if set, GTM is used)
- GA4_API_SECRET=YOUR_API_SECRET (optional — for Measurement Protocol fallback)
- NEXT_PUBLIC_GTM_SERVER_URL=https://gtm.yourdomain.com (optional)
- NEXT_PUBLIC_PLAUSIBLE_DOMAIN=example.com (optional)
- NEXT_PUBLIC_CMP=cookiebot|usercentrics|osano|klaro|custom (default: custom)

Consent Mode Signals
- Managed in lib/analytics/consent.ts
- Signals set to denied by default: ad_storage, analytics_storage, ad_user_data, ad_personalization.
- CMP/banner maps categories to Google consent via updateConsentFromCMP().

How It Works
1) On first paint, instrumentation.client sets Consent Mode default (denied) and initializes dataLayer.
2) If NEXT_PUBLIC_GTM_ID present, loads GTM; else if NEXT_PUBLIC_GA4_ID present, loads gtag.
3) CMP adapter (or the fallback banner) updates consent. GA honors storage settings.
4) RouteChangeTracker sends page_view on navigation (gtag path). With GTM, configure page_view in tags.
5) Optional server fallback endpoint posts sanitized events to GA Measurement Protocol when consentGranted is true.

Data Hygiene
- gtag.ts allowlists common GA4 params and filters potential PII (email/phone patterns, long strings).
- collect/route.ts repeats allowlist sanitation server-side.
- Do not send user identifiers or free-text fields to GA.

Security Headers
- See next.config.js headers(). CSP allows GTM/GA script/connect/img. Adjust if adding other providers.

Testing
- Accept All: Use the banner to accept; verify analytics_storage=granted and hits in GA DebugView.
- Reject All: Verify no GA hits; check cookies/localStorage only hold the banner decision (no tracking IDs).
- Region defaults: To force banner, start with no stored choice; defaults are denied.
- Network tab: Confirm gtm.js or gtag.js requests; for direct gtag, page_view events fire on route changes.

Rollback
- Remove imports of ClientInstrumentation, CookieBanner, and RouteChangeTracker from app/layout.tsx.
- Delete app/instrumentation.client.ts and app/api/analytics/collect/route.ts if unused.
- Remove lib/analytics/* and components/consent/CookieBanner.tsx.
- Revert next.config.js headers if desired.

Notes
- If using a third-party CMP (Cookiebot/Usercentrics), include their script tags as instructed by the provider and keep NEXT_PUBLIC_CMP set accordingly. The adapters map their events to Consent Mode updates.
- For GTM, configure consent in the GTM admin and set up tags to respect Consent Mode.

