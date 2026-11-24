import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

/** Révélation au défilement : une seule fois, un peu avant que l'élément soit entièrement visible. */
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } } as const
