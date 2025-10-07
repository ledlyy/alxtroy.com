"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { configureAnalytics, trackPageView } from '@/lib/analytics/ga'
import { useConsent } from '@/lib/consent/state'

export function AnalyticsBridge() {
  const { consent } = useConsent()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    configureAnalytics(consent.preferences)
  }, [consent.preferences])

  useEffect(() => {
    const pathWithQuery = searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname
    trackPageView(pathWithQuery)
  }, [pathname, searchParams])

  return null
}
