import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SECTION_IDS, type SectionId } from '../config/sections'
import { useI18n } from '../i18n/context'
import { useActiveSection, useScrolled } from '../lib/hooks'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './ui/Logo'

const OBSERVED = [...SECTION_IDS, 'process'] as string[]

export function Navbar() {
  const { t } = useI18n()
  const scrolled = useScrolled()
  const activeRaw = useActiveSection(OBSERVED)
  const active = activeRaw === 'process' ? 'skills' : activeRaw
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1280 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  const label = (id: SectionId) => t.nav[id]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'glass border-x-0 border-t-0 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.5)]' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card-solid focus:px-4 focus:py-2"
      >
        {t.nav.skip}
      </a>
      <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Navigation principale">
        <a href="#home" className="rounded-md" aria-label="Mohamed Sami Belknani — accueil">
          <Logo />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active === id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {id === 'denticab' && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />}
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-2 to-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {label(id)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher idPrefix="nav-lang" />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line-strong bg-card text-fg xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x flex h-[calc(100svh-72px)] flex-col gap-1 overflow-y-auto py-6">
              {SECTION_IDS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                  aria-current={active === id ? 'true' : undefined}
                  className={`font-display flex items-center justify-between rounded-2xl px-4 py-3.5 text-2xl font-semibold ${
                    active === id ? 'bg-card text-fg' : 'text-fg-2'
                  }`}
                >
                  {label(id)}
                  <span className="text-sm text-muted" dir="ltr">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
              <div className="mt-6 sm:hidden">
                <LanguageSwitcher idPrefix="menu-lang" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
