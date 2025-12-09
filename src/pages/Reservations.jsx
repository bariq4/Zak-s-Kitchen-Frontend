import { useState, useEffect } from 'react'

function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
  })

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dateInput = document.getElementById('date')
    if (dateInput) {
      dateInput.min = today
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Reservation submitted:', formData)
    alert('Reservation Sent! We have received your booking.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: ''
    })
  }

  return (
    <section className="reservation">
      <div className="reservation-container">
        <div className="image-section">
          <img src="/static/images/reservation1.webp" alt="Restaurant Interior" />
        </div>
        <div className="booking-section">
          <div className="booking-header">
            <span className="cursive-text">Book a Table</span>
            <h1>Make Reservation</h1>
          </div>
          <form className="elegant-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <div>
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="guests">Person</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Person</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6+ People</option>
                </select>
              </div>
            </div>
            <button type="submit" className="reservation-btn">Make a Reservation</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Reservations
