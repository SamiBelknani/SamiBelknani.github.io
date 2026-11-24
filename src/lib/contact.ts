import { contactEndpoint, profile } from '../config/profile'

export interface ContactPayload {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export type ContactField = keyof ContactPayload

export const LIMITS = { name: 80, email: 160, message: 3000 } as const

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i

/** Supprime les caractères de contrôle et les espaces superflus. */
export function clean(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
}

export type ErrorKey = 'name' | 'email' | 'projectType' | 'message' | 'tooLong'

export function validate(data: ContactPayload): Partial<Record<ContactField, ErrorKey>> {
  const errors: Partial<Record<ContactField, ErrorKey>> = {}
  const name = clean(data.name)
  const email = clean(data.email)
  const message = clean(data.message)
  if (name.length < 2) errors.name = 'name'
  else if (name.length > LIMITS.name) errors.name = 'tooLong'
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = 'email'
  if (!data.projectType) errors.projectType = 'projectType'
  if (message.length < 20) errors.message = 'message'
  else if (message.length > LIMITS.message) errors.message = 'tooLong'
  return errors
}

/** Envoie le message au service configuré (VITE_CONTACT_ENDPOINT). Lève une erreur en cas d'échec. */
export async function sendToEndpoint(data: ContactPayload): Promise<void> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: clean(data.name),
        email: clean(data.email),
        projectType: data.projectType,
        budget: data.budget,
        message: clean(data.message),
        _subject: `Portfolio · ${clean(data.name)}`,
      }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } finally {
    window.clearTimeout(timer)
  }
}

/** Lien mailto prérempli (solution de secours sans service d'envoi). */
export function mailtoLink(subject: string, lines: string[]): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export const whatsappLink = (text?: string) =>
  `https://wa.me/${profile.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
