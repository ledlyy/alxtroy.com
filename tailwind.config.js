const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--bg-elev) / <alpha-value>)',
        foreground: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        primary: 'rgb(var(--accent) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--accent-fg) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-fg) / <alpha-value>)',
        link: 'rgb(var(--link) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      textColor: {
        DEFAULT: 'rgb(var(--fg) / <alpha-value>)',
      },
      borderColor: {
        DEFAULT: 'rgb(var(--border) / <alpha-value>)',
      },
      ringColor: {
        DEFAULT: 'var(--ring)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      borderRadius: {
        none: '0',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'calc(var(--radius-lg) + 0.25rem)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
