import { motion } from 'framer-motion'
import { useI18n } from '../i18n/context'
import { whatsappLink } from '../lib/contact'
import { WhatsAppIcon } from './ui/BrandIcons'

/** Bouton WhatsApp flottant (en bas à droite, à gauche en arabe). */
export function FloatingWhatsApp() {
  const { t } = useI18n()
  return (
    <motion.a
      href={whatsappLink(t.ui.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.ui.whatsapp} (${t.ui.newTab})`}
      title={t.ui.whatsapp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed end-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] sm:end-7 sm:bottom-7"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25 [animation-duration:2.6s]" />
      <WhatsAppIcon size={28} className="relative" />
      <span className="pointer-events-none absolute end-full me-3 hidden rounded-lg bg-card-solid px-3 py-1.5 text-sm font-medium whitespace-nowrap text-fg opacity-0 shadow-lg ring-1 ring-line transition-opacity group-hover:opacity-100 sm:block">
        {t.ui.whatsapp}
      </span>
    </motion.a>
  )
}
