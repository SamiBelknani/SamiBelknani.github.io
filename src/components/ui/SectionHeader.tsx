import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../../lib/motion'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  id: string
  center?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, id, center = false }: Props) {
  return (
    <motion.header
      variants={stagger(0.1)}
      {...inView}
      className={`mb-12 max-w-2xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}
    >
      <motion.p variants={fadeUp} className="eyebrow">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        id={id}
        className="font-display mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-[2.6rem]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  )
}
