import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, TriangleAlert } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { contactEndpoint, profile } from '../config/profile'
import { useI18n } from '../i18n/context'
import { LIMITS, clean, mailtoLink, sendToEndpoint, validate, whatsappLink, type ContactField, type ContactPayload, type ErrorKey } from '../lib/contact'
import { fadeUp, inView, stagger } from '../lib/motion'
import { WhatsAppIcon } from './ui/BrandIcons'
import { SectionHeader } from './ui/SectionHeader'

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'mailto'
const EMPTY: ContactPayload = { name: '', email: '', projectType: '', budget: '', message: '' }

export function Contact() {
  const { t, l } = useI18n()
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <SectionHeader id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div variants={stagger(0.1)} {...inView} className="card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          {/* panneau coordonnées */}
          <motion.aside variants={fadeUp} className="relative isolate overflow-hidden p-8 text-white md:p-10">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(150deg,#0b1a3d_0%,#0d2f6b_45%,#0e7490_100%)]" />
            <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-40" viewBox="0 0 400 500" preserveAspectRatio="none">
              <path d="M-20 380 C 80 300, 160 470, 260 360 S 420 260, 440 300 L 440 520 L -20 520 Z" fill="rgba(34,211,238,.25)" />
              <path d="M-20 430 C 90 360, 190 520, 300 420 S 430 360, 440 380 L 440 520 L -20 520 Z" fill="rgba(47,107,255,.35)" />
            </svg>
            <div aria-hidden className="absolute -top-24 -end-24 -z-10 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl" />

            <h3 className="font-display text-2xl font-semibold">{t.contact.infoTitle}</h3>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              {t.contact.availability}
            </p>

            <ul className="mt-9 space-y-5">
              <InfoRow icon={<Mail size={18} />} label={t.contact.email}>
                <a href={`mailto:${profile.email}`} className="break-all hover:underline" dir="ltr">
                  {profile.email}
                </a>
              </InfoRow>
              <InfoRow icon={<Phone size={18} />} label={t.contact.phone}>
                <span className="flex flex-col gap-1">
                  {profile.phones.map((p) => (
                    <a key={p.value} href={`tel:${p.value}`} className="hover:underline" dir="ltr">
                      {p.display}
                    </a>
                  ))}
                </span>
              </InfoRow>
              <InfoRow icon={<WhatsAppIcon size={18} />} label={t.contact.whatsapp}>
                <a href={whatsappLink(t.ui.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="hover:underline" dir="ltr">
                  {profile.phones.find((p) => p.whatsapp)?.display}
                  <span className="sr-only"> ({t.ui.newTab})</span>
                </a>
              </InfoRow>
              <InfoRow icon={<MapPin size={18} />} label={t.contact.location}>
                {l(profile.location)}
              </InfoRow>
            </ul>

            {/* ingénieur ayant collaboré à la réalisation du site */}
            <div className="mt-9 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15">
              <p className="text-xs font-medium tracking-wide text-white/60 uppercase rtl:tracking-normal">{t.contact.collabTitle}</p>
              <p className="font-display mt-1.5 text-lg font-semibold">{profile.collaborator.name}</p>
              <p className="text-sm text-white/70">{l(profile.collaborator.role)}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-sm">
                <a href={`mailto:${profile.collaborator.email}`} className="inline-flex items-center gap-2 break-all hover:underline" dir="ltr">
                  <Mail size={15} aria-hidden className="shrink-0 text-cyan-300" />
                  {profile.collaborator.email}
                </a>
                <a href={`tel:${profile.collaborator.phone.value}`} className="inline-flex items-center gap-2 hover:underline" dir="ltr">
                  <Phone size={15} aria-hidden className="shrink-0 text-cyan-300" />
                  {profile.collaborator.phone.display}
                </a>
              </div>
            </div>
          </motion.aside>

          <motion.div variants={fadeUp} className="p-6 sm:p-8 md:p-10">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-white/60 uppercase rtl:tracking-normal">{label}</p>
        <div className="mt-0.5 font-medium">{children}</div>
      </div>
    </li>
  )
}

function ContactForm() {
  const { t } = useI18n()
  const uid = useId()
  const [data, setData] = useState<ContactPayload>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<ContactField, ErrorKey>>>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const hasEndpoint = contactEndpoint.length > 0

  const set = (field: ContactField, value: string) => {
    const next = { ...data, [field]: value }
    setData(next)
    if (touched[field]) setErrors(validate(next))
    if (status === 'failed' || status === 'sent' || status === 'mailto') setStatus('idle')
  }
  const blur = (field: ContactField) => {
    setTouched((s) => ({ ...s, [field]: true }))
    setErrors(validate(data))
  }

  const mailto = () => {
    const type = data.projectType ? t.contact.projectTypes[data.projectType as keyof typeof t.contact.projectTypes] : ''
    const budget = data.budget ? t.contact.budgets[data.budget as keyof typeof t.contact.budgets] : t.contact.budgetPh
    return mailtoLink(`${t.contact.mailSubject} · ${clean(data.name)}`, [
      clean(data.message),
      '',
      '—',
      `${t.contact.name} : ${clean(data.name)}`,
      `${t.contact.emailField} : ${clean(data.email)}`,
      `${t.contact.projectType} : ${type}`,
      `${t.contact.budget} : ${budget}`,
    ])
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(data)
    setErrors(found)
    setTouched({ name: true, email: true, projectType: true, message: true })
    if (Object.keys(found).length) {
      const first = (['name', 'email', 'projectType', 'message'] as ContactField[]).find((f) => found[f])
      if (first) document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    if (honeypot) {
      // robot : on simule un envoi réussi sans rien transmettre
      setStatus('sent')
      return
    }
    if (!hasEndpoint) {
      window.location.href = mailto()
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      await sendToEndpoint(data)
      setStatus('sent')
      setData(EMPTY)
      setTouched({})
    } catch {
      setStatus('failed')
    }
  }

  const err = (f: ContactField) => (touched[f] && errors[f] ? t.contact.errors[errors[f]] : '')
  const fieldProps = (f: ContactField) => ({
    id: `${uid}-${f}`,
    name: f,
    value: data[f],
    'aria-invalid': err(f) ? true : undefined,
    'aria-describedby': err(f) ? `${uid}-${f}-error` : undefined,
    onBlur: () => blur(f),
  })

  return (
    <form noValidate onSubmit={submit} aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="font-display text-2xl font-semibold">
        {t.contact.formTitle}
      </h3>
      {!hasEndpoint && <p className="mt-2 text-sm text-muted">{t.contact.mailtoNotice}</p>}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label={t.contact.name} htmlFor={`${uid}-name`} error={err('name')} errorId={`${uid}-name-error`} required>
          <input
            {...fieldProps('name')}
            className="field"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name + 20}
            placeholder={t.contact.namePh}
            onChange={(e) => set('name', e.target.value)}
            required
          />
        </Field>
        <Field label={t.contact.emailField} htmlFor={`${uid}-email`} error={err('email')} errorId={`${uid}-email-error`} required>
          <input
            {...fieldProps('email')}
            className="field"
            type="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            maxLength={LIMITS.email}
            placeholder={t.contact.emailPh}
            onChange={(e) => set('email', e.target.value)}
            required
          />
        </Field>
        <Field label={t.contact.projectType} htmlFor={`${uid}-projectType`} error={err('projectType')} errorId={`${uid}-projectType-error`} required>
          <select {...fieldProps('projectType')} className="field cursor-pointer" onChange={(e) => set('projectType', e.target.value)} required>
            <option value="" disabled>
              {t.contact.projectTypePh}
            </option>
            {Object.entries(t.contact.projectTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.contact.budget} hint={t.contact.optional} htmlFor={`${uid}-budget`}>
          <select {...fieldProps('budget')} className="field cursor-pointer" onChange={(e) => set('budget', e.target.value)}>
            <option value="">{t.contact.budgetPh}</option>
            {Object.entries(t.contact.budgets).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label={t.contact.message} htmlFor={`${uid}-message`} error={err('message')} errorId={`${uid}-message-error`} required>
            <textarea
              {...fieldProps('message')}
              className="field"
              rows={6}
              maxLength={LIMITS.message + 50}
              placeholder={t.contact.messagePh}
              onChange={(e) => set('message', e.target.value)}
              required
            />
          </Field>
        </div>
      </div>

      {/* champ piège pour les robots, invisible pour les visiteurs */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{t.contact.privacy}</p>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? <Loader2 size={18} className="animate-spin" aria-hidden /> : hasEndpoint ? <Send size={18} aria-hidden className="rtl:-scale-x-100" /> : <Mail size={18} aria-hidden />}
          {status === 'sending' ? t.contact.sending : hasEndpoint ? t.contact.send : t.contact.sendMail}
        </button>
      </div>

      <div aria-live="polite" className="mt-5 min-h-0">
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <Notice key="sent" tone="ok" icon={<CheckCircle2 size={18} />}>
              {t.contact.success}
            </Notice>
          )}
          {status === 'mailto' && (
            <Notice key="mailto" tone="ok" icon={<Mail size={18} />}>
              {t.contact.mailtoDone}{' '}
              <a href={`mailto:${profile.email}`} className="font-semibold underline" dir="ltr">
                {profile.email}
              </a>
            </Notice>
          )}
          {status === 'failed' && (
            <Notice key="failed" tone="error" icon={<TriangleAlert size={18} />}>
              {t.contact.failure}{' '}
              <a href={mailto()} className="font-semibold underline">
                {t.contact.sendMail}
              </a>
            </Notice>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function Field(props: { label: string; htmlFor: string; children: ReactNode; error?: string; errorId?: string; required?: boolean; hint?: string }) {
  const { label, htmlFor, children, error, errorId, required, hint } = props
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-1.5 text-sm font-medium text-fg-2">
        {label}
        {required && (
          <span aria-hidden className="text-accent">
            *
          </span>
        )}
        {hint && <span className="text-xs font-normal text-muted">({hint})</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs font-medium text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Notice({ tone, icon, children }: { tone: 'ok' | 'error'; icon: ReactNode; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${
        tone === 'ok' ? 'border-emerald-500/30 bg-emerald-500/10 text-fg' : 'border-rose-500/30 bg-rose-500/10 text-fg'
      }`}
    >
      <span aria-hidden className={tone === 'ok' ? 'text-emerald-500' : 'text-rose-500'}>
        {icon}
      </span>
      <p>{children}</p>
    </motion.div>
  )
}
