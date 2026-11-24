import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { About } from './components/About'
import { BackToTop } from './components/BackToTop'
import { Contact } from './components/Contact'
import { DentiCab } from './components/DentiCab'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Skills } from './components/Skills'

/**
 * Lien direct vers une section (ex. https://samibelknani.github.io/#denticab) : le navigateur cherche la section
 * avant que la page soit affichée, on fait donc défiler jusqu'à elle une fois le contenu et les polices chargés.
 */
function useScrollToHashOnLoad() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    let timer = 0
    const raf = requestAnimationFrame(() => {
      go()
      document.fonts?.ready.then(go)
      timer = window.setTimeout(go, 700)
    })
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [])
}

export default function App() {
  useScrollToHashOnLoad()
  return (
    // reducedMotion="user" : les animations respectent le réglage « réduire les animations » du système
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <Hero />
        <About />
        <DentiCab />
        <Services />
        <Portfolio />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}
