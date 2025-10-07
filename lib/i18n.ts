export const locales = ['en', 'tr'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export function t(_locale: Locale, key: string): string {
  // Placeholder simple dictionary lookup implementation
  const dict: Record<string, string> = {
    'home.heroTitle': 'Welcome',
  }
  return dict[key] ?? key
}

