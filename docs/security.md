Security & Compliance

Headers

- CSP: Set in middleware.ts with per-request nonce and strict-dynamic. Allows GTM/GA only.
- Referrer-Policy: strict-origin-when-cross-origin
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY (or use frame-ancestors in CSP)
- Permissions-Policy: conservative defaults

CSP Usage

- Use next/script with the provided nonce (via useCSPNonce). Avoid inline scripts/styles without nonce.
- If adding third-party scripts, expand script-src/connect-src/img-src as needed, and prefer SRI where feasible.

Trusted Types

- "require-trusted-types-for 'script'" is enabled. Adopt Trusted Types policies where using dangerous sinks.

Cookies & APIs

- Mark cookies Secure, HttpOnly, SameSite=Lax or Strict. Apply CSRF on mutations and rate limit APIs.

Rollback

- To temporarily relax CSP, you may disable middleware or remove the CSP line. Prefer targeted allowance instead.

