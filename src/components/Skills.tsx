import { motion } from 'framer-motion'
import { BrainCircuit, Database, LayoutTemplate, Server, Smartphone, Wrench } from 'lucide-react'
import { skills, type SkillIcon } from '../config/skills'
import { useI18n } from '../i18n/context'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeader } from './ui/SectionHeader'

const ICONS: Record<SkillIcon, typeof Server> = {
  layout: LayoutTemplate,
  server: Server,
  smartphone: Smartphone,
  database: Database,
  wrench: Wrench,
  brain: BrainCircuit,
}

export function Skills() {
  const { t, l } = useI18n()
  return (
    <section id="skills" aria-labelledby="skills-title" className="section bg-bg-soft/60">
      <div className="container-x">
        <SectionHeader id="skills-title" eyebrow={t.skills.eyebrow} title={t.skills.title} subtitle={t.skills.subtitle} />
        <motion.ul variants={stagger(0.07)} {...inView} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = ICONS[group.icon]
            return (
              <motion.li key={group.id} variants={fadeUp} className="card card-hover p-6">
                <div className="flex items-center gap-3">
                  <span className="icon-tile h-11 w-11">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{l(group.title)}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip" dir="ltr">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
