"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const CONSENT_STORAGE_KEY = 'alxtroy-consent'

export type ConsentModeValue = 'granted' | 'denied'

export type ConsentPreferences = {
  adStorage: ConsentModeValue
  analyticsStorage: ConsentModeValue
  adUserData: ConsentModeValue
  adPersonalization: ConsentModeValue
}

export type ConsentStatus = 'pending' | 'granted' | 'denied' | 'custom'

export type ConsentState = {
  status: ConsentStatus
  preferences: ConsentPreferences
  updatedAt: number | null
}

const defaultGrant = (process.env.NEXT_PUBLIC_CONSENT_DEFAULT || 'denied').toLowerCase() === 'granted'

const defaultPreferences: ConsentPreferences = {
  adStorage: defaultGrant ? 'granted' : 'denied',
  analyticsStorage: defaultGrant ? 'granted' : 'denied',
  adUserData: defaultGrant ? 'granted' : 'denied',
  adPersonalization: defaultGrant ? 'granted' : 'denied',
}

const defaultConsentState: ConsentState = {
  status: defaultGrant ? 'granted' : 'pending',
  preferences: defaultPreferences,
  updatedAt: defaultGrant ? Date.now() : null,
}

type ConsentContextValue = {
  consent: ConsentState
  updateConsent: (next: ConsentPreferences, status?: ConsentStatus) => void
  resetConsent: () => void
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined)

type ConsentProviderProps = {
  children: ReactNode
}

function readStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return defaultConsentState
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return defaultConsentState
    const parsed = JSON.parse(raw) as ConsentState
    if (!parsed || !parsed.preferences) return defaultConsentState
    return parsed
  } catch {
    return defaultConsentState
  }
}

function persistConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage failures
  }
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState>(() => defaultConsentState)

  useEffect(() => {
    const stored = readStoredConsent()
    setConsent(stored)
  }, [])

  const updateConsent = useCallback((next: ConsentPreferences, status?: ConsentStatus) => {
    setConsent(() => {
      const nextState: ConsentState = {
        status: status ?? 'custom',
        preferences: next,
        updatedAt: Date.now(),
      }
      persistConsent(nextState)
      return nextState
    })
  }, [])

  const resetConsent = useCallback(() => {
    const initial: ConsentState = {
      status: 'pending',
      preferences: {
        adStorage: 'denied',
        analyticsStorage: 'denied',
        adUserData: 'denied',
        adPersonalization: 'denied',
      },
      updatedAt: null,
    }
    persistConsent(initial)
    setConsent(initial)
  }, [])

  const value = useMemo<ConsentContextValue>(() => ({ consent, updateConsent, resetConsent }), [consent, updateConsent, resetConsent])

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return ctx
}
