Performance Guidelines (2025)

- Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.10, TTFB ≤ 0.6s.
- RSC-first: keep client components minimal; avoid unnecessary hydration.
- Images: Use next/image with correct sizing; hero image gets fetchPriority="high" and priority.
- Fonts: Use next/font with subset and display swap; avoid layout shift.
- Resource Hints: speculationrules linked via public/speculation-rules.json. Preconnects for GA/GTM only when enabled.
- Caching: Prefer ISR or revalidateTag where applicable; immutable static assets under /_next/static.
- Protocols: Prefer HTTP/3 at hosting layer; enable Brotli and zstd.

Budgets

- See .lighthouserc.json for CI budgets. Treat as guardrails; adjust with justification.

Verification

- Run: npm run build && npx lhci autorun
- Check: Playwright traces, devtools Performance panel, and Core Web Vitals in field (Chrome UX Report, GA4 Web Vitals if instrumented).

