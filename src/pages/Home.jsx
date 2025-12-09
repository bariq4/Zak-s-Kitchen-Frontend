import { useEffect } from 'react'
import Slideshow from '../components/Slideshow'
import ReservationSection from '../components/ReservationSection'
import OurStory from '../components/OurStory'
import Gallery from '../components/Gallery'

function Home() {
  useEffect(() => {
    // Handle fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in')

    function handleScroll() {
      fadeElements.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 50) {
          section.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Run on page load

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Slideshow />
      <ReservationSection />
      <OurStory />
      <Gallery />
    </>
  )
}

export default Home
