export function formatDate(date: Date | string, locale = 'en') {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d)
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url)
}

