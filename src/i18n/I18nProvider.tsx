import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, Localized } from '../config/types'
import { ar } from './ar'
import { en } from './en'
import { I18nContext, type I18nValue } from './context'
import { fr, type Dict } from './fr'

const DICTS: Record<Lang, Dict> = { fr, en, ar }
const STORAGE_KEY = 'portfolio.lang'
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'fr' || saved === 'en' || saved === 'ar') return saved
  } catch {
    /* stockage indisponible */
  }
  return 'fr'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const t = DICTS[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* stockage indisponible */
    }
  }, [lang, dir, t])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const l = useCallback((text: Localized) => text[lang] || text.fr, [lang])
  const value = useMemo(() => ({ lang, dir, t, setLang, l }) as I18nValue, [lang, dir, t, setLang, l])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
