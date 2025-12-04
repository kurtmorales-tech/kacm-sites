import './index.css'
import ThreeWorld from './components/ThreeWorld'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  return (
    <>
      <Loader />
      <ThreeWorld />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Work />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
