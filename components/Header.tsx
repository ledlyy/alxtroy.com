"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

import { siteConfig } from '@/lib/config/site'

const navLinks = (siteConfig.navLinks || []).filter((item) => {
  const maybe = item as { enabled?: boolean }
  return maybe.enabled !== false
})

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href !== '/' && pathname.startsWith(`${href}/`)) return true
    return false
  }

  return (
    <header
      className="critical-header sticky top-0 z-50 border-b border-border/40 bg-background/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      role="banner"
    >
      <div className="critical-header-inner mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Logo */}
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
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-bold leading-tight text-foreground lg:text-lg">
              Alexander & Troy Tours
            </span>
            <span className="text-muted-foreground text-xs">Receptive Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive(link.href)
                  ? 'text-accent'
                  : 'text-foreground/70 hover:text-foreground'
                }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-surface/50 transition-all hover:border-accent/30 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <span className="sr-only">Toggle theme</span>
            {resolvedTheme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7" />
              </svg>
            )}
          </button>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-600 to-accent-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="relative z-10">Contact Us</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-surface/50 transition-all hover:border-accent/30 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {resolvedTheme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7" />
              </svg>
            )}
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-surface/50 transition-all hover:border-accent/30 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-nav"
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav aria-label="Mobile" className="border-t border-border/40 bg-surface/30 px-4 py-6 backdrop-blur-sm">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive(link.href)
                    ? 'bg-accent/10 text-accent shadow-sm'
                    : 'text-foreground/80 hover:bg-accent/5 hover:text-foreground'
                  }`}
              >
                {isActive(link.href) && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-border/40 pt-6">
            <Link
              href="/contact"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent via-accent-600 to-accent-700 px-6 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <svg className="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="relative z-10">Contact Us</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
