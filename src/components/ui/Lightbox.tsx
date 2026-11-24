import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export interface LightboxImage {
  src: string
  caption: string
}

interface Props {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
  labels: { close: string; previous: string; next: string }
}

/** Agrandissement d'images avec navigation (flèches, clavier : Échap, ← →). */
export function Lightbox({ images, index, onClose, onChange, labels }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length
  const rtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + (rtl ? -1 : 1) + count) % count)
      if (e.key === 'ArrowLeft') onChange((index + (rtl ? 1 : -1) + count) % count)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onChange, count, rtl])

  const nav = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20'

  return (
    <AnimatePresence>
      {index !== null && images[index] && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={images[index].caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="absolute end-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
          >
            <X size={20} aria-hidden />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label={labels.previous}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange((index - 1 + count) % count)
                }}
                className={`${nav} start-3 sm:start-6`}
              >
                <ChevronLeft size={24} aria-hidden className="rtl:rotate-180" />
              </button>
              <button
                type="button"
                aria-label={labels.next}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange((index + 1) % count)
                }}
                className={`${nav} end-3 sm:end-6`}
              >
                <ChevronRight size={24} aria-hidden className="rtl:rotate-180" />
              </button>
            </>
          )}
          <motion.figure
            key={index}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <img src={images[index].src} alt={images[index].caption} className="max-h-[78vh] w-full rounded-xl object-contain shadow-2xl" />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {images[index].caption}{' '}
              <span className="opacity-60" dir="ltr">
                · {index + 1}/{count}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
