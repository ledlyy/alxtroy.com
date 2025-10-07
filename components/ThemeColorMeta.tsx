"use client"
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const LIGHT_THEME_COLOR = '#ffffff'
const DARK_THEME_COLOR = '#0f131f'

export function ThemeColorMeta() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const el = document.querySelector('meta[name="theme-color"]')
    const resolved = (theme === 'system' ? systemTheme : theme) || 'light'
    const color = resolved === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR

    if (el) {
      el.setAttribute('content', color)
      return
    }

    const m = document.createElement('meta')
    m.name = 'theme-color'
    m.content = color
    document.head.appendChild(m)
  }, [theme, systemTheme])

  return null
}
