import { motion } from 'framer-motion'
import { AppWindow, Globe, LifeBuoy, PenTool, Smartphone } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const ICONS = [Globe, Smartphone, AppWindow, PenTool, LifeBuoy]
/** 3 cartes puis 2 cartes plus larges sur grand écran. */
const SPANS = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export function Services() {
  const { t } = useI18n()
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-bg-soft/60">
      <div className="container-x">
        <SectionHeader id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
        <motion.ul variants={stagger(0.08)} {...inView} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.li
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`card card-hover group overflow-hidden p-7 ${SPANS[i] ?? 'lg:col-span-2'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-primary-2/0 blur-3xl transition-colors duration-500 group-hover:bg-primary-2/25"
                />
                <div className="flex items-start justify-between">
                  <span className="icon-tile">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted/70" dir="ltr">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
