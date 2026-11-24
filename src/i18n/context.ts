import { createContext, useContext } from 'react'
import type { Lang, Localized } from '../config/types'
import type { Dict } from './fr'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'ع' },
]

export interface I18nValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dict
  setLang: (lang: Lang) => void
  /** Choisit la bonne langue d'un texte de configuration traduit. */
  l: (text: Localized) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>')
  return ctx
}
