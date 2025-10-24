import { NextResponse, type NextRequest } from 'next/server'

function generateNonce() {
  // randomUUID is supported in Edge runtime and sufficient for nonce
  return crypto.randomUUID().replace(/-/g, '')
}

export function middleware(req: NextRequest) {
  const startTime = Date.now()
  const nonce = generateNonce()

  const requestHeaders = new Headers(req.headers)
  // Forward the nonce so React/Next can expose it via useCSPNonce
  requestHeaders.set('x-nonce', nonce)

  const url = new URL(req.url)

  // Note: Logging disabled in middleware (Edge Runtime limitation)
  // Log incoming request in API routes instead
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] ${req.method} ${url.pathname}`)
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } })

  // Locale persistence: if ?hl= is present, set a cookie for subsequent navigations
  const hl = url.searchParams.get('hl')
  if (hl) {
    res.cookies.set('hl', hl, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  const gtm = 'https://www.googletagmanager.com'
  const ga = 'https://www.google-analytics.com'
  // Google Maps domains for iframe embeds and potential JS API usage
  const gmaps = 'https://www.google.com https://maps.google.com'
  const gmapsApi = 'https://maps.googleapis.com https://maps.gstatic.com'

  // Allow embedding PDFs hosted under /pdfs in same-origin iframes
  const isPdf = url.pathname.startsWith('/pdfs/')

  // Strict CSP with nonce and strict-dynamic
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    `frame-ancestors ${isPdf ? "'self'" : "'none'"}`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${gtm} ${ga} ${gmapsApi}`,
    `style-src 'self' 'unsafe-inline' 'nonce-${nonce}'`,
    "font-src 'self' data:",
    `connect-src 'self' ${ga} https://region1.google-analytics.com https://stats.g.doubleclick.net ${gtm} ${gmapsApi}`,
    `img-src 'self' data: ${ga} https://region1.google-analytics.com ${gmapsApi} https://images.unsplash.com https://logo.clearbit.com https://res.cloudinary.com`,
    `frame-src 'self' ${gmaps}`,
    "object-src 'none'",
    "form-action 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
  ].join('; ')

  res.headers.set('Content-Security-Policy', csp)
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  // Let PDFs be framed on same-origin pages; deny framing elsewhere
  res.headers.set('X-Frame-Options', isPdf ? 'SAMEORIGIN' : 'DENY')
  res.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), interest-cohort=()')

  // Note: Response logging disabled (Edge Runtime limitation)
  if (process.env.NODE_ENV === 'development') {
    const duration = Date.now() - startTime
    console.log(`[Middleware] ${res.status} in ${duration}ms`)
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
}
