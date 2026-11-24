import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { useTheme } from '../theme/context'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const label = theme === 'dark' ? t.nav.toLight : t.nav.toDark
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid h-10 w-10 cursor-pointer place-items-center overflow-hidden rounded-full border border-line-strong bg-card text-fg transition-colors hover:border-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -18, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 18, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
