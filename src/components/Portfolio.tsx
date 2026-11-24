import { AnimatePresence, motion } from 'framer-motion'
import { Check, Code2, ExternalLink, ImageIcon, Images, Lock, PlayCircle, RadioTower, ShoppingCart, Stethoscope, Users, UtensilsCrossed } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projects, type CoverIcon, type Project, type ProjectCategory } from '../config/projects'
import { useI18n } from '../i18n/context'
import { EASE } from '../lib/motion'
import { GitHubIcon } from './ui/BrandIcons'
import { Lightbox } from './ui/Lightbox'
import { SectionHeader } from './ui/SectionHeader'

type Filter = 'all' | ProjectCategory
const FILTERS: Filter[] = ['all', 'web', 'mobile', 'desktop', 'ai']

const COVER_ICONS: Record<CoverIcon, typeof Code2> = {
  cart: ShoppingCart,
  tooth: Stethoscope,
  signal: RadioTower,
  users: Users,
  utensils: UtensilsCrossed,
  code: Code2,
}

export function Portfolio() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  // n'afficher que les filtres qui contiennent au moins un projet
  const filters = useMemo(() => FILTERS.filter((f) => f === 'all' || projects.some((p) => p.categories.includes(f))), [])
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader id="portfolio-title" eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
          <div role="group" aria-label={t.portfolio.eyebrow} className="glass mb-12 flex w-fit max-w-full shrink-0 gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] md:mb-16">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`relative shrink-0 cursor-pointer rounded-full px-3 py-2 text-sm sm:px-4 font-semibold transition-colors ${
                  filter === f ? 'text-white' : 'text-muted hover:text-fg'
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-primary-2 to-cyan-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t.portfolio.filters[f]}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featured={filter === 'all' && i === 0} />
            ))}
          </AnimatePresence>
        </motion.ul>
        {visible.length === 0 && <p className="text-muted">{t.portfolio.empty}</p>}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const { t, l } = useI18n()
  const [zoom, setZoom] = useState<number | null>(null)
  const gallery = (p.gallery ?? []).map((g) => ({ src: g.src, caption: l(g.caption) }))
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.07 }}
      className={`card card-hover group flex flex-col overflow-hidden ${featured ? 'md:col-span-2 md:grid md:grid-cols-[1.05fr_1fr]' : ''}`}
    >
      <ProjectCover project={p} featured={featured} onOpen={gallery.length ? () => setZoom(0) : undefined} galleryLabel={t.portfolio.gallery} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{p.title}</h3>
          {p.year && (
            <span className="shrink-0 text-xs font-semibold text-muted" dir="ltr">
              {p.year}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{l(p.context)}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{l(p.description)}</p>
        <ul className="mt-4 space-y-2">
          {p.highlights.map((h) => (
            <li key={h.fr} className="flex gap-2 text-sm leading-snug text-fg-2">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              {l(h)}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.map((tech) => (
            <li key={tech} className="chip text-xs" dir="ltr">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {p.demo &&
            (p.demo.startsWith('#') ? (
              <a href={p.demo} className="btn btn-primary min-h-10 px-4 text-sm">
                <PlayCircle size={16} aria-hidden />
                {t.portfolio.demo}
              </a>
            ) : (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-10 px-4 text-sm">
                <ExternalLink size={16} aria-hidden />
                {t.portfolio.demo}
                <span className="sr-only">({t.ui.newTab})</span>
              </a>
            ))}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-10 px-4 text-sm">
              <GitHubIcon size={16} />
              {t.portfolio.code}
              <span className="sr-only">({t.ui.newTab})</span>
            </a>
          )}
          {gallery.length > 0 && (
            <button type="button" onClick={() => setZoom(0)} className="btn btn-ghost min-h-10 px-4 text-sm">
              <Images size={16} aria-hidden />
              {t.portfolio.gallery}
              <span className="text-xs text-muted" dir="ltr">
                ({gallery.length})
              </span>
            </button>
          )}
          {!p.github && p.privateCode && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <Lock size={14} aria-hidden />
              {t.portfolio.privateCode}
            </span>
          )}
        </div>
      </div>
      {gallery.length > 0 && (
        <Lightbox
          images={gallery}
          index={zoom}
          onClose={() => setZoom(null)}
          onChange={setZoom}
          labels={{ close: t.portfolio.close, previous: t.portfolio.previous, next: t.portfolio.next }}
        />
      )}
    </motion.li>
  )
}

function ProjectCover(props: { project: Project; featured?: boolean; onOpen?: () => void; galleryLabel: string }) {
  const { project: p, featured = false, onOpen, galleryLabel } = props
  const { t } = useI18n()
  const Icon = COVER_ICONS[p.cover.icon]
  if (p.image) {
    const img = (
      <img
        src={p.image}
        alt={p.title}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] ${
          featured ? 'md:aspect-[16/10] md:h-auto md:rounded-xl md:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] md:ring-1 md:ring-white/10' : ''
        }`}
      />
    )
    // carte mise en avant : capture entière encadrée (sans rognage) sur un fond dégradé
    const box = `relative block aspect-[16/10] w-full overflow-hidden border-b border-line bg-bg-soft ${
      featured ? 'md:flex md:aspect-auto md:h-full md:min-h-80 md:items-center md:border-e md:border-b-0 md:p-6 md:[background:linear-gradient(135deg,#1d4ed8,#0891b2)]' : ''
    }`
    return onOpen ? (
      <button type="button" onClick={onOpen} aria-label={`${galleryLabel} — ${p.title}`} className={`${box} cursor-zoom-in`}>
        {img}
        <span className="absolute end-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <Images size={12} aria-hidden />
          {galleryLabel}
        </span>
      </button>
    ) : (
      <div className={box}>{img}</div>
    )
  }
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden border-b border-line ${featured ? 'md:aspect-auto md:min-h-80 md:border-e md:border-b-0' : ''}`}
      style={{ background: `linear-gradient(135deg, ${p.cover.from}, ${p.cover.to})` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 20%, transparent 75%)',
        }}
      />
      {/* fenêtre d'application stylisée */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-6 bottom-0 rounded-t-xl border border-white/25 bg-white/10 backdrop-blur-sm transition-transform duration-700 group-hover:-translate-y-1.5"
      >
        <div className="flex gap-1.5 border-b border-white/20 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className={`grid grid-cols-[1fr_2fr] gap-3 p-4 ${featured ? 'md:h-[calc(100%-2.25rem)] md:items-center' : ''}`}>
          <div className="space-y-2">
            <div className="h-2 rounded bg-white/35" />
            <div className="h-2 w-4/5 rounded bg-white/20" />
            <div className="h-2 w-3/5 rounded bg-white/20" />
          </div>
          <div className="grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-white shadow-[0_0_40px_rgba(255,255,255,.35)] ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-110">
              <Icon size={32} strokeWidth={1.6} />
            </span>
          </div>
        </div>
      </div>
      <span className="absolute end-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
        <ImageIcon size={12} aria-hidden />
        {t.portfolio.screenshotSoon}
      </span>
    </div>
  )
}
