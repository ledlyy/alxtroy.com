export type Locale = 'en' | 'tr'

type Dict = Record<string, string>

const en: Dict = {
  'common.skip_to_content': 'Skip to content',
  'header.contact': 'Contact us',
  'header.toggle_theme': 'Toggle theme',

  'footer.navigate': 'Navigate',
  'footer.services': 'Services',
  'footer.connect': 'Connect',
  'footer.privacy': 'Privacy policy',
  'footer.terms': 'Terms of use',
  'footer.cookies': 'Cookies',
  'footer.rights': 'All rights reserved.',
}

const tr: Dict = {
  'common.skip_to_content': 'İçeriğe geç',
  'header.contact': 'Bize ulaşın',
  'header.toggle_theme': 'Temayı değiştir',

  'footer.navigate': 'Gezin',
  'footer.services': 'Hizmetler',
  'footer.connect': 'Bağlantılar',
  'footer.privacy': 'Gizlilik politikası',
  'footer.terms': 'Kullanım koşulları',
  'footer.cookies': 'Çerezler',
  'footer.rights': 'Tüm hakları saklıdır.',
}

export function getDictionary(locale: string): Dict {
  switch ((locale || 'en').toLowerCase()) {
    case 'tr':
      return tr
    default:
      return en
  }
}

export function getLocaleFromString(input?: string): Locale {
  const lc = (input || '').toLowerCase()
  return lc === 'tr' ? 'tr' : 'en'
}
