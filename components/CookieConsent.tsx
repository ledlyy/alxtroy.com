"use client"

import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { useConsent } from '@/lib/consent/state'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type PreferenceToggle = {
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const { consent, updateConsent, resetConsent } = useConsent()
  const [showBanner, setShowBanner] = useState(consent.status === 'pending')
  const [showDialog, setShowDialog] = useState(false)
  const [preferences, setPreferences] = useState<PreferenceToggle>(() => ({
    analytics: consent.preferences.analyticsStorage === 'granted',
    marketing: consent.preferences.adStorage === 'granted',
  }))
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFocusable = useRef<HTMLElement | null>(null)
  const lastFocusable = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    setShowBanner(consent.status === 'pending')
    setPreferences({
      analytics: consent.preferences.analyticsStorage === 'granted',
      marketing: consent.preferences.adStorage === 'granted',
    })
  }, [consent])

  useEffect(() => {
    if (!showDialog) return
    const node = dialogRef.current
    if (!node) return
    const focusables = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    firstFocusable.current = focusables[0] ?? null
    lastFocusable.current = focusables[focusables.length - 1] ?? null
    firstFocusable.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setShowDialog(false)
        firstFocusable.current = null
        lastFocusable.current = null
        return
      }
      if (event.key === 'Tab' && focusables.length > 0) {
        if (event.shiftKey && document.activeElement === firstFocusable.current) {
          event.preventDefault()
          lastFocusable.current?.focus()
        } else if (!event.shiftKey && document.activeElement === lastFocusable.current) {
          event.preventDefault()
          firstFocusable.current?.focus()
        }
      }
    }

    node.addEventListener('keydown', handleKeyDown)
    return () => node.removeEventListener('keydown', handleKeyDown)
  }, [showDialog])

  const handles = useMemo(() => {
    const acceptAll = () => {
      updateConsent(
        {
          adStorage: 'granted',
          analyticsStorage: 'granted',
          adPersonalization: 'granted',
          adUserData: 'granted',
        },
        'granted',
      )
      setShowBanner(false)
      setShowDialog(false)
    }

    const rejectAll = () => {
      updateConsent(
        {
          adStorage: 'denied',
          analyticsStorage: 'denied',
          adPersonalization: 'denied',
          adUserData: 'denied',
        },
        'denied',
      )
      setShowBanner(false)
      setShowDialog(false)
    }

    const savePreferences = () => {
      updateConsent(
        {
          adStorage: preferences.marketing ? 'granted' : 'denied',
          analyticsStorage: preferences.analytics ? 'granted' : 'denied',
          adPersonalization: preferences.marketing ? 'granted' : 'denied',
          adUserData: preferences.marketing ? 'granted' : 'denied',
        },
        preferences.analytics || preferences.marketing ? 'custom' : 'denied',
      )
      setShowBanner(false)
      setShowDialog(false)
    }

    return { acceptAll, rejectAll, savePreferences }
  }, [preferences.analytics, preferences.marketing, updateConsent])

  if (!showBanner && !showDialog) {
    return null
  }

  const openDialog = () => {
    setPreferences({
      analytics: consent.preferences.analyticsStorage === 'granted',
      marketing: consent.preferences.adStorage === 'granted',
    })
    setShowDialog(true)
  }

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-0 z-[1000] flex items-end justify-center">
      {showBanner && (
        <div className="pointer-events-auto m-4 w-full max-w-3xl rounded-3xl border border-border bg-surface p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-left">
              <h2 className="text-lg font-semibold text-foreground">We value your privacy</h2>
              <p className="text-sm text-muted">
                We use cookies to understand how our site is used and to tailor experiences for meetings and travel programmes. You can accept, reject or customise your preferences at any time.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="focus-visible:ring-ring rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
                onClick={handles.rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="focus-visible:ring-ring rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
                onClick={openDialog}
              >
                Customise
              </button>
              <button
                type="button"
                className="focus-visible:ring-ring rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2"
                onClick={handles.acceptAll}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {showDialog && (
        <div className="pointer-events-auto fixed inset-0 z-[1001] flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="w-full max-w-xl rounded-3xl border border-border bg-surface p-6 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="text-xl font-semibold text-foreground">
                  Manage cookie preferences
                </h2>
                <p id={descriptionId} className="mt-1 text-sm text-muted">
                  Essential cookies remain active to deliver the site. Adjust analytics and marketing cookies below.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close preferences"
                className="focus-visible:ring-ring rounded-full border border-border bg-background p-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2"
                onClick={() => setShowDialog(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border/80 bg-background p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Strictly necessary</p>
                    <p className="text-xs text-muted">Always on to keep the site secure and functional.</p>
                  </div>
                  <span className="rounded-full bg-muted/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    Required
                  </span>
                </div>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-2xl border border-border/80 bg-background p-4">
                <span>
                  <span className="text-sm font-semibold text-foreground">Analytics</span>
                  <span className="mt-1 block text-xs text-muted">Helps us measure site performance and improve experiences.</span>
                </span>
                <input
                  type="checkbox"
                  className="focus-visible:ring-ring h-5 w-10 rounded-full border border-border bg-background focus-visible:outline-none focus-visible:ring-2"
                  checked={preferences.analytics}
                  onChange={(event) => setPreferences((prev) => ({ ...prev, analytics: event.target.checked }))}
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-2xl border border-border/80 bg-background p-4">
                <span>
                  <span className="text-sm font-semibold text-foreground">Marketing</span>
                  <span className="mt-1 block text-xs text-muted">Allows personalised offers and campaign measurement.</span>
                </span>
                <input
                  type="checkbox"
                  className="focus-visible:ring-ring h-5 w-10 rounded-full border border-border bg-background focus-visible:outline-none focus-visible:ring-2"
                  checked={preferences.marketing}
                  onChange={(event) => setPreferences((prev) => ({ ...prev, marketing: event.target.checked }))}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="focus-visible:ring-ring rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
                onClick={handles.rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="focus-visible:ring-ring rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2"
                onClick={handles.savePreferences}
              >
                Save preferences
              </button>
            </div>

            <button
              type="button"
              className="mt-4 text-xs text-muted underline-offset-4 hover:underline"
              onClick={() => resetConsent()}
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
