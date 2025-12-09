const galleryItems = [
  { img: '/static/images/butterchicken.webp', title: 'Butter Chicken' },
  { img: '/static/images/chickenmandi.webp', title: 'Chicken Mandi' },
  { img: '/static/images/paneerbuttermasala.webp', title: 'Paneer Butter Masala' },
  { img: '/static/images/spices.webp', title: 'The Authentic Spices' },
  { img: '/static/images/lassi.webp', title: 'Lassi' },
  { img: '/static/images/samosa.webp', title: 'Samosas' }
]

function Gallery() {
  return (
    <>
      <section id="gallery" className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <span className="cursive-text">Our Gallery</span>
            <h2>A Visual Feast</h2>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div key={index} className="gallery-item">
                <img src={item.img} alt={item.title} />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section1">
        <div className="gallery-container">
          <div className="gallery-header">
            <h3>Ambience</h3>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div key={index} className="gallery-item">
                <img src={item.img} alt={item.title} />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Gallery
