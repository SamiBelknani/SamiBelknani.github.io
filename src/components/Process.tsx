import { motion } from 'framer-motion'
import { Code2, FlaskConical, PenTool, Rocket, Search } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const ICONS = [Search, PenTool, Code2, FlaskConical, Rocket]

export function Process() {
  const { t } = useI18n()
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="container-x">
        <SectionHeader id="process-title" eyebrow={t.process.eyebrow} title={t.process.title} subtitle={t.process.subtitle} center />
        <motion.ol variants={stagger(0.12)} {...inView} className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
          {/* ligne de liaison (grand écran) */}
          <div
            aria-hidden
            className="absolute inset-x-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-2/60 to-transparent lg:block"
          />
          {/* ligne de liaison (mobile) */}
          <div aria-hidden className="absolute start-8 top-4 bottom-4 w-px bg-gradient-to-b from-primary-2/60 via-accent/40 to-transparent lg:hidden" />
          {t.process.steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.li key={step.title} variants={fadeUp} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-line-strong bg-card-solid shadow-[0_10px_30px_-12px_var(--glow)]">
                  <Icon size={24} className="text-accent" aria-hidden />
                  <span
                    className="absolute -end-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary-2 to-cyan-500 text-[11px] font-bold text-white"
                    dir="ltr"
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="pt-1 lg:pt-4">
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
