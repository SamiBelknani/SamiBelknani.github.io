import { motion } from 'framer-motion'
import { LANGS, useI18n } from '../i18n/context'

export function LanguageSwitcher({ idPrefix = 'lang' }: { idPrefix?: string }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="relative inline-flex h-10 w-fit items-center rounded-full border border-line-strong bg-card p-1"
      dir="ltr"
    >
      {LANGS.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.label}
            className={`relative z-10 h-8 min-w-9 cursor-pointer rounded-full px-2.5 text-xs font-semibold transition-colors ${
              active ? 'text-white' : 'text-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary-2 to-cyan-600"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="sr-only">{l.label}</span>
            <span aria-hidden>{l.short}</span>
          </button>
        )
      })}
    </div>
  )
}
