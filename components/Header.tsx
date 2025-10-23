"use client"

import { CalendarDays, Mail, Menu, Moon, Phone, Sparkles, Sun, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

import { siteConfig } from '@/lib/config/site'
import { useI18n } from '@/lib/i18n/client'

const navLinks = (siteConfig.navLinks || []).filter((item) => {
  const maybe = item as { enabled?: boolean }
  return maybe.enabled !== false
})

const primaryPhoneHref = `tel:${siteConfig.contact.phonePrimary.replace(/[^\d+]/g, '')}`
const primaryEmailHref = `mailto:${siteConfig.contact.email}`

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const { t } = useI18n()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const resolvedTheme = theme === 'system' ? systemTheme : theme
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href !== '/' && pathname.startsWith(`${href}/`)) return true
    return false
  }

  const themeLabel = t('header.toggle_theme')
  const requestLabel = t('header.request_proposal')
  const languageLabel = t('header.language')
  const callLabel = t('header.call_us')

  return (
    <header
      className="critical-header sticky top-0 z-50 border-b border-border/40 bg-background/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      role="banner"
    >
      <div className="critical-header-top hidden border-b border-border/40 bg-background/95 backdrop-blur-lg md:block">
        <div className="critical-header-top-inner mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 text-xs font-semibold text-muted sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-foreground/70">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
              <span className="hidden lg:inline">{siteConfig.brand.tagline}</span>
              <span className="lg:hidden">Established {siteConfig.brand.founded}</span>
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-border/60 lg:inline" />
            <a
              href={primaryPhoneHref}
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden />
              {siteConfig.contact.phonePrimary}
            </a>
            <a
              href={primaryEmailHref}
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 text-accent" aria-hidden />
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher ariaLabel={languageLabel} />
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-accent via-accent-600 to-accent-700 px-4 py-2 text-[0.7rem] font-semibold text-white shadow-sm transition hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:inline-flex"
            >
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              <span>{requestLabel}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="critical-header-inner mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link
          href="/"
          className="critical-logo group relative flex shrink-0 items-center gap-3 rounded-xl px-2 py-1.5 transition-all hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-sm transition-transform group-hover:scale-105 sm:h-14 sm:w-14">
            <Image
              src="/web_logo3.jpg"
              alt="Alexander & Troy Tours Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-base font-bold leading-tight text-foreground lg:text-lg">
              Alexander & Troy Tours
            </span>
            <span className="text-xs text-foreground/60">Receptive Services</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active
                    ? 'text-foreground'
                    : 'text-foreground/70 hover:bg-accent/5 hover:text-foreground'
                  }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent" aria-hidden />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label={themeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-surface/70 transition hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={toggleTheme}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" aria-hidden />
            ) : (
              <Moon className="h-5 w-5" aria-hidden />
            )}
            <span className="sr-only">{themeLabel}</span>
          </button>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-600 to-accent-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CalendarDays className="relative z-10 h-4 w-4" aria-hidden />
            <span className="relative z-10">{requestLabel}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={primaryPhoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-surface/70 transition hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden />
            <span className="sr-only">{callLabel}</span>
          </a>
          <button
            type="button"
            aria-label={themeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-surface/70 transition hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={toggleTheme}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" aria-hidden />
            ) : (
              <Moon className="h-5 w-5" aria-hidden />
            )}
            <span className="sr-only">{themeLabel}</span>
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-surface/70 transition hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav aria-label="Mobile navigation" className="border-t border-border/40 bg-background/95 px-4 pb-6 pt-4 shadow-lg backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <LanguageSwitcher className="text-[0.75rem]" ariaLabel={languageLabel} />
            <a
              href={primaryPhoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden />
              <span>{callLabel}</span>
            </a>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active
                      ? 'bg-accent/10 text-accent shadow-sm'
                      : 'text-foreground/80 hover:bg-accent/5 hover:text-foreground'
                    }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />}
                  {link.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-6 space-y-3 border-t border-border/40 pt-5">
            <Link
              href="/contact"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent via-accent-600 to-accent-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CalendarDays className="relative z-10 h-5 w-5" aria-hidden />
              <span className="relative z-10">{requestLabel}</span>
            </Link>
            <a
              href={primaryEmailHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
