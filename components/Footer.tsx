import Link from 'next/link'

import { siteConfig } from '@/lib/config/site'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'MICE', href: '/mice' },
  { label: 'Events', href: '/events' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'References', href: '/references' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Receptive Services Portfolio', href: '/services' },
  { label: 'MICE', href: '/mice' },
]

const socialLinks = [
  { label: 'Website', href: siteConfig.url },
  { label: 'Google Maps', href: siteConfig.socialLinks.google },
  { label: 'Facebook', href: siteConfig.socialLinks.facebook },
  { label: 'Twitter', href: siteConfig.socialLinks.twitter },
  { label: 'Instagram', href: siteConfig.socialLinks.instagram },
  { label: 'LinkedIn', href: siteConfig.socialLinks.linkedin },
  { label: 'Pinterest', href: siteConfig.socialLinks.pinterest },
  { label: 'Vimeo', href: siteConfig.socialLinks.vimeo },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/80 bg-background/95">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4">
        <section className="space-y-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            {siteConfig.name}
          </Link>
          <p className="text-sm leading-relaxed text-muted">
            Destination management partners across the United States, Latin America and the Mediterranean. Tailored programmes for leisure, incentives and corporate events since 1999.
          </p>
          <div className="space-y-1 text-sm text-muted">
            <p>{siteConfig.contact.address}</p>
            <p>
              <a href={`tel:${siteConfig.contact.phonePrimary}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                {siteConfig.contact.phonePrimary}
              </a>
              <span className="mx-2 text-muted">/</span>
              <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="font-medium text-foreground underline-offset-4 hover:underline">
                {siteConfig.contact.phoneSecondary}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-accent underline-offset-4 hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Navigate</h2>
          <ul className="space-y-2 text-sm text-muted">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Services</h2>
          <ul className="space-y-2 text-sm text-muted">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Connect</h2>
          <ul className="space-y-2 text-sm text-muted">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-border/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/privacy" className="transition hover:text-accent">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition hover:text-accent">
              Terms of use
            </Link>
            <Link href="/cookies" className="transition hover:text-accent">
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
