"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { getDictionary, getLocaleFromString, type Locale } from './dictionaries'

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const prefix = `${name}=`
  const entry = document.cookie
    .split(';')
    .map((segment) => segment.trim())
    .find((segment) => segment.startsWith(prefix))
  if (!entry) return undefined
  return decodeURIComponent(entry.slice(prefix.length))
}

export function useI18n() {
  const sp = useSearchParams()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const locale: Locale = useMemo(() => {
    const q = sp.get('hl') || (mounted ? readCookie('hl') : undefined) || 'en'
    return getLocaleFromString(q)
  }, [sp, mounted])

  const dict = useMemo(() => getDictionary(locale), [locale])
  const t = (key: string) => dict[key] || key
  return { locale, t }
}
