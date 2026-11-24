import { motion } from 'framer-motion'
import { ArrowRight, Globe, Mail, MapPin, Monitor, Phone, Smartphone, Sparkles } from 'lucide-react'
import { profile } from '../config/profile'
import { useI18n } from '../i18n/context'
import { EASE, fadeUp, stagger } from '../lib/motion'

export function Hero() {
  const { t, l } = useI18n()
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex items-center overflow-hidden pt-28 pb-20 md:pt-36 lg:min-h-[100svh] lg:pt-28 lg:pb-16">
      {/* décor */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary-2/25 blur-[120px] rtl:translate-x-1/2" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -end-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-cyan-400/15 blur-[110px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="min-w-0">
          <motion.p variants={fadeUp} className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 ps-2 pe-4 text-sm font-medium text-fg-2">
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero.badge}
          </motion.p>

          <motion.h1 variants={fadeUp} id="hero-title" className="font-display mt-7 font-semibold tracking-tight">
            <span className="block text-lg font-medium text-muted md:text-xl">{t.hero.hello}</span>
            <span className="mt-2 block text-[2.6rem] leading-[1.15] text-balance sm:text-6xl lg:text-[4.4rem]">
              <span className="block">{l(profile.name.first)}</span>
              <span className="grad-text block pb-1">{l(profile.name.last)}</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-base font-semibold text-fg-2 md:text-lg">
            {l(profile.title)}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-[1.05rem]">
            {t.hero.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn btn-primary">
              {t.hero.ctaPrimary}
              <ArrowRight size={18} aria-hidden className="rtl:rotate-180" />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="#denticab"
            className="group mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 py-1.5 ps-1.5 pe-4 text-sm font-medium text-fg-2 transition-colors hover:border-accent/60 hover:text-fg"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary-2 to-cyan-500 text-white">
              <Sparkles size={14} aria-hidden />
            </span>
            <span className="truncate">{t.denticab.teaser}</span>
            <ArrowRight size={15} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </motion.a>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                <Mail size={16} aria-hidden className="text-accent" />
                <span dir="ltr">{profile.email}</span>
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phones[0].value}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                <Phone size={16} aria-hidden className="text-accent" />
                <span dir="ltr">{profile.phones[0].display}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden className="text-accent" />
              {l(profile.location)}
            </li>
          </motion.ul>
        </motion.div>

        <Portrait />
      </div>
    </section>
  )
}

function Portrait() {
  const { t } = useI18n()
  const chips = [
    { icon: Globe, label: t.hero.chipWeb, cls: 'top-[8%] -start-2 sm:-start-6', delay: 0.5 },
    { icon: Smartphone, label: t.hero.chipMobile, cls: 'top-[42%] -end-3 sm:-end-8', delay: 0.65 },
    { icon: Monitor, label: t.hero.chipDesktop, cls: 'bottom-[6%] start-2 sm:start-0', delay: 0.8 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px]"
    >
      {/* anneau dégradé animé */}
      <div
        aria-hidden
        className="animate-spin-slow absolute inset-0 rounded-full p-[2px] opacity-90"
        style={{ background: 'conic-gradient(from 0deg, var(--primary-2), var(--accent), transparent 40%, var(--primary-2) 70%, var(--accent))' }}
      >
        <div className="h-full w-full rounded-full bg-bg" />
      </div>
      <div aria-hidden className="absolute inset-6 rounded-full bg-gradient-to-br from-primary-2/30 to-cyan-400/20 blur-2xl" />

      <div className="absolute inset-3 overflow-hidden rounded-full border border-line-strong bg-card-solid">
        {profile.photo ? (
          <img src={profile.photo} alt={t.hero.photoAlt} className="h-full w-full object-cover" width={760} height={760} fetchPriority="high" />
        ) : (
          <div role="img" aria-label={t.hero.photoAlt} className="relative grid h-full w-full place-items-center">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--primary-2)_35%,transparent),transparent_60%)]" />
            <span className="font-display grad-text relative text-[6.5rem] leading-none font-bold tracking-tighter sm:text-[8rem]" dir="ltr">
              {profile.initials}
            </span>
          </div>
        )}
      </div>

      {chips.map(({ icon: Icon, label, cls, delay }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.6, ease: EASE }}
          className={`absolute ${cls}`}
        >
          <div className="glass animate-float flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold shadow-lg shadow-black/10" style={{ animationDelay: `${i * 1.2}s` }}>
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary-2 to-cyan-500 text-white">
              <Icon size={15} aria-hidden />
            </span>
            {label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
