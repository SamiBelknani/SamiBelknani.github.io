import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { useScrolled } from '../lib/hooks'

/** Bouton « retour en haut », visible après un défilement suffisant. */
export function BackToTop() {
  const { t } = useI18n()
  const show = useScrolled(700)
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
            document.querySelector<HTMLAnchorElement>('header a[href="#home"]')?.focus({ preventScroll: true })
          }}
          aria-label={t.ui.backToTop}
          title={t.ui.backToTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="glass fixed end-6 bottom-24 z-40 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-fg shadow-lg transition-colors hover:border-accent hover:text-accent sm:end-8 sm:bottom-28"
        >
          <ArrowUp size={18} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
