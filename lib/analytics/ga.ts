const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

export type ConsentModeValue = 'granted' | 'denied'

export type ConsentModePreferences = {
  adStorage: ConsentModeValue
  analyticsStorage: ConsentModeValue
  adUserData: ConsentModeValue
  adPersonalization: ConsentModeValue
}

type GtagFn = (type: string, ...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
  }
}

let isInitialized = false
let currentConsent: ConsentModePreferences | null = null

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function toConsentPayload(preferences: ConsentModePreferences) {
  return {
    ad_storage: preferences.adStorage,
    analytics_storage: preferences.analyticsStorage,
    ad_user_data: preferences.adUserData,
    ad_personalization: preferences.adPersonalization,
  }
}

function ensureDataLayer() {
  if (!isBrowser()) return
  if (!window.dataLayer) {
    window.dataLayer = []
  }
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
  }
}

function getCspNonce(): string | undefined {
  if (!isBrowser()) return undefined
  const doc = document.documentElement
  if (!doc) return undefined
  return doc.dataset.cspNonce || doc.getAttribute('data-csp-nonce') || undefined
}

function loadScript() {
  if (!isBrowser() || isInitialized || !MEASUREMENT_ID) return
  ensureDataLayer()
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  script.async = true
  const nonce = getCspNonce()
  if (nonce) {
    script.nonce = nonce
  }
  script.referrerPolicy = 'strict-origin-when-cross-origin'
  document.head.appendChild(script)
  isInitialized = true
  window.gtag?.('js', new Date())
  window.gtag?.('config', MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  })
}

function applyConsent(preferences: ConsentModePreferences) {
  if (!isBrowser() || !window.gtag) return
  window.gtag('consent', 'update', toConsentPayload(preferences))
}

function shouldLoadAnalytics(preferences: ConsentModePreferences): boolean {
  return (
    preferences.analyticsStorage === 'granted' ||
    preferences.adStorage === 'granted' ||
    preferences.adPersonalization === 'granted' ||
    preferences.adUserData === 'granted'
  )
}

export function configureAnalytics(preferences: ConsentModePreferences) {
  currentConsent = preferences
  if (!isBrowser() || !MEASUREMENT_ID) return
  if (shouldLoadAnalytics(preferences)) {
    loadScript()
    applyConsent(preferences)
  } else if (isInitialized) {
    applyConsent(preferences)
  }
}

function analyticsAllowed(): boolean {
  if (!isBrowser() || !MEASUREMENT_ID || !currentConsent) return false
  return currentConsent.analyticsStorage === 'granted'
}

function sendEvent(name: string, params: Record<string, unknown> = {}) {
  if (!analyticsAllowed()) return
  window.gtag?.('event', name, params)
}

export function trackPageView(path: string, params: Record<string, unknown> = {}) {
  if (!analyticsAllowed()) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    ...params,
  })
}

export function trackOutbound(url: string) {
  sendEvent('outbound_click', { destination: url })
}

export function trackLead(metadata: Record<string, unknown> = {}) {
  sendEvent('generate_lead', metadata)
}

export function trackContact(metadata: Record<string, unknown> = {}) {
  sendEvent('contact_submit', metadata)
}
