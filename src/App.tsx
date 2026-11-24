import { MotionConfig } from 'framer-motion'
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

export default function App() {
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
