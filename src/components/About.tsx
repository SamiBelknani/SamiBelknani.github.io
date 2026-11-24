import { motion } from 'framer-motion'
import { Award, BookOpenText, Briefcase, GraduationCap, Languages, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { journey } from '../config/journey'
import { useI18n } from '../i18n/context'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const STRENGTH_ICONS = [Layers, ShieldCheck, Languages, BookOpenText]
const KIND_ICONS = { education: GraduationCap, experience: Briefcase, certification: Award }

export function About() {
  const { t, l } = useI18n()
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <SectionHeader id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <motion.div variants={stagger(0.1)} {...inView} className="space-y-5 text-base leading-relaxed text-fg-2 md:text-[1.05rem]">
            <motion.p variants={fadeUp}>{t.about.p1}</motion.p>
            <motion.p variants={fadeUp}>{t.about.p2}</motion.p>
            <motion.div variants={fadeUp} className="card mt-8 overflow-hidden p-6">
              <div aria-hidden className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-primary-2 to-accent" />
              <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-fg">
                <Sparkles size={18} className="text-accent" aria-hidden />
                {t.about.approachTitle}
              </h3>
              <p className="mt-3 text-muted">{t.about.approach}</p>
            </motion.div>
          </motion.div>

          <motion.ul variants={stagger(0.08)} {...inView} className="grid gap-4 sm:grid-cols-2">
            {t.about.strengths.map((s, i) => {
              const Icon = STRENGTH_ICONS[i % STRENGTH_ICONS.length]
              return (
                <motion.li key={s.title} variants={fadeUp} className="card card-hover p-6">
                  <span className="icon-tile">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-display mt-5 font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>

        <div className="mt-20">
          <motion.h3 variants={fadeUp} {...inView} className="font-display mb-8 text-2xl font-semibold">
            {t.about.journeyTitle}
          </motion.h3>
          <motion.ol variants={stagger(0.06)} {...inView} className="relative grid gap-x-10 gap-y-4 md:grid-cols-2">
            {journey.map((item) => {
              const Icon = KIND_ICONS[item.kind]
              return (
                <motion.li key={`${item.period}-${item.title.fr}`} variants={fadeUp} className="card card-hover flex gap-4 p-5">
                  <span className="icon-tile h-11 w-11">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className="text-accent" dir="ltr">
                        {item.period}
                      </span>
                      <span className="rounded-full border border-line px-2 py-0.5 text-muted">{t.about.kinds[item.kind]}</span>
                    </div>
                    <p className="mt-1.5 leading-snug font-semibold text-fg">{l(item.title)}</p>
                    <p className="mt-1 text-sm text-muted">{l(item.place)}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
