"use client"

import { Loader2, Globe } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { useI18n } from '@/lib/i18n/client'
import type { Locale } from '@/lib/i18n/dictionaries'

const LOCALE_OPTIONS: Array<{ value: Locale; label: string; title: string }> = [
    { value: 'en', label: 'EN', title: 'English' },
    { value: 'tr', label: 'TR', title: 'Turkish' },
]

type LanguageSwitcherProps = {
    className?: string
    ariaLabel?: string
}

function buildCookieValue(locale: Locale) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2).toUTCString()
    const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
    return `hl=${locale}; path=/; expires=${expires}; SameSite=Lax${secureFlag}`
}

export function LanguageSwitcher({ className = '', ariaLabel = 'Select language' }: LanguageSwitcherProps) {
    const { locale } = useI18n()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [pendingLocale, setPendingLocale] = useState<Locale | null>(null)

    const canAnimate = useMemo(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

    useEffect(() => {
        if (pendingLocale && pendingLocale === locale) {
            setPendingLocale(null)
        }
    }, [locale, pendingLocale])

    const handleClick = (target: Locale) => {
        if (target === locale || pendingLocale === target) return

        setPendingLocale(target)

        if (typeof document !== 'undefined') {
            document.cookie = buildCookieValue(target)
        }

        const params = new URLSearchParams(searchParams.toString())
        if (target === 'en') {
            params.delete('hl')
        } else {
            params.set('hl', target)
        }
        const query = params.toString()

        router.replace(`${pathname}${query ? `?${query}` : ''}`)
        if (canAnimate) {
            window.requestAnimationFrame(() => {
                router.refresh()
            })
        } else {
            router.refresh()
        }
    }

    return (
        <div
            className={`flex items-center gap-1 rounded-full border border-border/60 bg-background/90 px-2 py-1 text-xs font-semibold text-muted shadow-sm backdrop-blur-sm ${className}`.trim()}
            role="radiogroup"
            aria-label={ariaLabel}
        >
            <Globe className="h-3.5 w-3.5 text-accent" aria-hidden />
            {LOCALE_OPTIONS.map((option) => {
                const active = option.value === locale
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        className={`rounded-full px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active
                            ? 'bg-accent/10 text-accent shadow-sm'
                            : pendingLocale === option.value
                                ? 'text-muted/60'
                                : 'text-foreground/70 hover:text-foreground'
                            }`}
                        onClick={() => handleClick(option.value)}
                        title={option.title}
                        disabled={pendingLocale !== null}
                    >
                        {option.label}
                    </button>
                )
            })}
            {pendingLocale && <Loader2 className="ml-1 h-3 w-3 animate-spin text-muted" aria-hidden />}
        </div>
    )
}
