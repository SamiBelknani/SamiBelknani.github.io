import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  MapPin,
  Globe,
  MessagesSquare,
  Play,
  Receipt,
  ShieldCheck,
  Smile,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { denticab } from '../config/denticab'
import { profile } from '../config/profile'
import { useI18n } from '../i18n/context'
import { prefillContact, whatsappLink } from '../lib/contact'
import { EASE, fadeUp, inView, stagger } from '../lib/motion'
import { WhatsAppIcon } from './ui/BrandIcons'

const FEATURE_ICONS = [UserRound, CalendarClock, Smile, ClipboardList, Receipt, FileText, MessagesSquare, BarChart3]

export function DentiCab() {
  const { t, l } = useI18n()
  const d = t.denticab
  const [zoom, setZoom] = useState<number | null>(null)

  const requestDemo = () => prefillContact({ projectType: 'denticab', message: d.demoMessage })

  return (
    <section id="denticab" aria-labelledby="denticab-title" className="section relative isolate overflow-hidden">
      {/* décor : halo cyan et quadrillage */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_70%_30%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%)]" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden className="absolute top-0 inset-x-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* texte */}
          <motion.div variants={stagger(0.08)} {...inView}>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{d.eyebrow}</span>
              <span className="chip border-accent/30 bg-accent/10 text-xs">
                <MapPin size={13} aria-hidden className="text-accent" />
                {d.madeIn}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} id="denticab-title" className="font-display mt-5 text-5xl font-bold tracking-tight md:text-6xl" dir="ltr">
              <span className="rtl:block rtl:text-right">
                Denti<span className="grad-text">Cab</span> Pro
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-display mt-3 text-xl font-medium text-accent italic rtl:not-italic">
              {d.slogan}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-fg-2 md:text-[1.05rem]">
              {d.lead}
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-6 space-y-2.5">
              {d.points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem] text-fg-2">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {p}
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={requestDemo} className="btn btn-primary">
                <Sparkles size={18} aria-hidden />
                {d.ctaDemo}
              </button>
              <a href={whatsappLink(d.demoMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <WhatsAppIcon size={18} className="text-[#25d366]" />
                {d.ctaWhatsapp}
                <span className="sr-only">({t.ui.newTab})</span>
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-sm text-muted">
              {d.by} <span className="font-semibold text-fg-2">{l(profile.name.full)}</span> {d.and}{' '}
              <span className="font-semibold text-fg-2">{profile.collaborator.name}</span>
            </motion.p>
          </motion.div>

          {/* vidéo dans une fenêtre d'application */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-2/35 to-cyan-400/25 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-card-solid shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5" dir="ltr">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ms-3 truncate text-xs font-medium text-muted">DentiCab Pro · {d.videoLabel}</span>
              </div>
              <DemoVideo label={d.play} />
            </div>
            {/* pastilles flottantes */}
            <FloatChip className="-top-4 end-6" icon={<Globe size={15} />} text={d.chipBooking} delay={0.4} />
            <FloatChip className="top-1/2 -start-4 hidden sm:flex" icon={<ShieldCheck size={15} />} text={d.chipSecure} delay={0.55} />
            <FloatChip className="-bottom-4 end-10" icon={<MessagesSquare size={15} />} text={d.chipChat} delay={0.7} />
          </motion.div>
        </div>

        {/* fonctionnalités */}
        <motion.h3 variants={fadeUp} {...inView} className="font-display mt-24 text-center text-2xl font-semibold md:text-3xl">
          {d.featuresTitle}
        </motion.h3>
        <motion.ul variants={stagger(0.05)} {...inView} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length]
            return (
              <motion.li key={f.title} variants={fadeUp} className="card card-hover p-5">
                <span className="icon-tile h-11 w-11">
                  <Icon size={20} aria-hidden />
                </span>
                <h4 className="font-display mt-4 font-semibold">{f.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* captures réelles */}
        <motion.div variants={stagger(0.08)} {...inView} className="mt-20">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">{d.galleryTitle}</h3>
            <p className="mt-2 text-sm text-muted">{d.galleryNote}</p>
          </motion.div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {denticab.shots.map((src, i) => (
              <motion.li key={src} variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => setZoom(i)}
                  className="card card-hover group block w-full cursor-zoom-in overflow-hidden text-start"
                >
                  <div className="aspect-video overflow-hidden border-b border-line bg-bg-soft">
                    <img
                      src={src}
                      alt={d.shots[i]}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={540}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="p-4 text-sm font-medium text-fg-2">{d.shots[i]}</p>
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {denticab.medcareUrl && (
              <a href={denticab.medcareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                {d.moreMedcare}
                <ExternalLink size={14} aria-hidden />
                <span className="sr-only">({t.ui.newTab})</span>
              </a>
            )}
            <a href={denticab.dstUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-fg hover:underline">
              {d.moreDst}
              <ExternalLink size={14} aria-hidden />
              <span className="sr-only">({t.ui.newTab})</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Lightbox index={zoom} onClose={() => setZoom(null)} onChange={setZoom} captions={d.shots} closeLabel={d.close} />
    </section>
  )
}

function FloatChip({ className, icon, text, delay }: { className: string; icon: ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className={`absolute z-10 flex ${className}`}
    >
      <div className="glass animate-float flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold shadow-lg shadow-black/20">
        <span aria-hidden className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-primary-2 to-cyan-500 text-white">
          {icon}
        </span>
        {text}
      </div>
    </motion.div>
  )
}

/** Image d'aperçu + bouton lecture ; la vidéo n'est chargée qu'au clic. */
function DemoVideo({ label }: { label: string }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <video
        src={denticab.video}
        poster={denticab.poster}
        controls
        autoPlay
        playsInline
        className="block aspect-video w-full bg-black"
      />
    )
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} aria-label={label} className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-black">
      <img src={denticab.poster} alt="" loading="lazy" decoding="async" width={1280} height={720} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <span aria-hidden className="absolute inset-0 grid place-items-center">
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white/95 text-primary-2 shadow-[0_0_0_10px_rgba(255,255,255,0.18),0_20px_40px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />
          <Play size={30} className="relative ms-1 fill-current" />
        </span>
      </span>
    </button>
  )
}

/** Agrandissement des captures, navigation clavier (Échap, flèches). */
function Lightbox(props: { index: number | null; onClose: () => void; onChange: (i: number) => void; captions: string[]; closeLabel: string }) {
  const { index, onClose, onChange, captions, closeLabel } = props
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = denticab.shots.length
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onChange, count])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={captions[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute end-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
          >
            <X size={20} aria-hidden />
          </button>
          <motion.figure
            key={index}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <img src={denticab.shots[index]} alt={captions[index]} className="w-full rounded-xl shadow-2xl" />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {captions[index]} <span className="opacity-60" dir="ltr">· {index + 1}/{count}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
