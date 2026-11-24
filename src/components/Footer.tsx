import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../config/profile'
import { SECTION_IDS } from '../config/sections'
import { useI18n } from '../i18n/context'
import { FacebookIcon, GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { Logo } from './ui/Logo'

const SOCIALS = [
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
] as const
const YEAR = new Date().getFullYear()
const collab = profile.collaborator

export function Footer() {
  const { t, l } = useI18n()
  const socials = SOCIALS.filter((s) => profile.socials[s.key])
  return (
    <footer className="relative border-t border-line bg-bg-soft/60">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-2/60 to-transparent" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-3 font-semibold">{l(profile.name.full)}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-2" aria-label={t.footer.followTitle}>
              {socials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a
                    href={profile.socials[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (${t.ui.newTab})`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="text-sm font-semibold tracking-wide text-fg uppercase rtl:tracking-normal">{t.footer.navTitle}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted transition-colors hover:text-fg">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-fg uppercase rtl:tracking-normal">{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                <Mail size={15} aria-hidden className="text-accent" />
                <span dir="ltr">{profile.email}</span>
              </a>
            </li>
            {profile.phones.map((p) => (
              <li key={p.value}>
                <a href={`tel:${p.value}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                  <Phone size={15} aria-hidden className="text-accent" />
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-2">
              <MapPin size={15} aria-hidden className="text-accent" />
              {l(profile.location)}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center gap-2.5 pt-6 pb-40 text-center text-xs leading-relaxed text-muted sm:pb-8">
          <p>
            © <span dir="ltr">{YEAR}</span> {l(profile.name.full)}. {t.footer.rights}
          </p>
          <p className="flex flex-col items-center gap-1 sm:block">
            <span>
              {t.footer.madeBy}{' '}
              <a
                href="#contact"
                title={t.footer.madeByTitle}
                className="font-display ms-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-2 to-cyan-600 px-3 py-1 text-xs font-bold tracking-wider text-white shadow-[0_6px_18px_-6px_var(--glow)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_var(--glow)]"
                dir="ltr"
              >
                MSB
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </span>{' '}
            <span>
              {t.footer.with} <span className="font-semibold text-fg-2">{collab.name}</span>, {l(collab.role)}
            </span>
            <span className="mx-1.5 hidden opacity-50 sm:inline">·</span>
            <span>
              <a href={`mailto:${collab.email}`} className="transition-colors hover:text-fg" dir="ltr">
                {collab.email}
              </a>
              <span className="mx-1.5 opacity-50">·</span>
              <a href={`tel:${collab.phone.value}`} className="whitespace-nowrap transition-colors hover:text-fg" dir="ltr">
                {collab.phone.display}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
