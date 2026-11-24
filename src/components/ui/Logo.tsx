import { profile } from '../../config/profile'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display inline-flex items-baseline text-xl font-bold tracking-tight text-fg ${className}`} dir="ltr">
      {profile.initials}
      <span className="grad-text">.</span>
    </span>
  )
}
