import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  '/static/images/samosa1.webp',
  '/static/images/chicken65biryani.webp',
  '/static/images/malaitikka.webp',
  '/static/images/kebab.webp',
  '/static/images/tandoorichicken.webp'
]

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const changeSlide = (direction) => {
    setCurrentSlide((prev) => {
      const newIndex = prev + direction
      if (newIndex < 0) return slides.length - 1
      if (newIndex >= slides.length) return 0
      return newIndex
    })
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="slideshow-container fade-in">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide fade ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}

      <div className="hero-overlay">
        <h1>Welcome to Zak's Kitchen</h1>
        <h2>Bringing heritage to your table</h2>
        <a href="#reservations" className="hero-button">Book a table</a>
      </div>

      <a className="prev" onClick={() => changeSlide(-1)}>&#10094;</a>
      <a className="next" onClick={() => changeSlide(1)}>&#10095;</a>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
