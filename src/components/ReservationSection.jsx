import { useState, useEffect, useRef } from 'react'

function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: ''
  })
  const [selectedHour, setSelectedHour] = useState('')
  const [selectedMinute, setSelectedMinute] = useState('')
  const [selectedAmPm, setSelectedAmPm] = useState('PM')
  const [showTimePicker, setShowTimePicker] = useState(false)
  const timePickerRef = useRef(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dateInput = document.getElementById('date')
    if (dateInput) {
      dateInput.min = today
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setShowTimePicker(false)
      }
    }

    if (showTimePicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTimePicker])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedHour || !selectedMinute) {
      alert('Please select a time')
      return
    }

    let hour24 = parseInt(selectedHour)
    if (selectedAmPm === 'PM' && hour24 !== 12) {
      hour24 += 12
    } else if (selectedAmPm === 'AM' && hour24 === 12) {
      hour24 = 0
    }

    const time24 = `${hour24.toString().padStart(2, '0')}:${selectedMinute}`
    
    const reservationData = {
      ...formData,
      time: time24
    }

    // Redirect to OAuth flow with reservation data
    const state = encodeURIComponent(JSON.stringify(reservationData))
    window.location.href = `/api/auth?state=${state}`
  }

  const selectHour = (hour) => {
    setSelectedHour(hour)
    updateSelectedTime(hour, selectedMinute, selectedAmPm)
  }

  const selectMinute = (minute) => {
    setSelectedMinute(minute)
    updateSelectedTime(selectedHour, minute, selectedAmPm)
  }

  const selectAmPm = (ampm) => {
    setSelectedAmPm(ampm)
    updateSelectedTime(selectedHour, selectedMinute, ampm)
  }

  const updateSelectedTime = (hour, minute, ampm) => {
    if (hour && minute) {
      document.getElementById('selected-time').value = `${hour}:${minute} ${ampm}`
    }
  }

  const hours = [3, 4, 5, 6, 7, 8, 9, 10]
  const minutes = ['00', '10', '20', '30', '40', '50']

  return (
    <section id="reservations" className="home-reservation">
      <div className="reservation-container">
        <div className="image-section">
          <img src="/static/images/reservation1.webp" alt="Restaurant Interior" />
        </div>
        <div className="booking-section">
          <div className="booking-header">
            <span className="cursive-text">Reserve Your Table</span>
            <h2></h2>
          </div>
          <form id="reservationForm" className="elegant-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <div className="time-picker-container" ref={timePickerRef}>
                  <input
                    type="text"
                    id="selected-time"
                    readOnly
                    placeholder="Select Time"
                    required
                    onClick={() => setShowTimePicker(!showTimePicker)}
                  />
                  <button
                    type="button"
                    className="clock-icon"
                    onClick={() => setShowTimePicker(!showTimePicker)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </button>
                  {showTimePicker && (
                    <div className="time-picker-dropdown" style={{display: 'block'}}>
                      <div className="time-columns">
                        <div className="time-column hours-column">
                          <div className="time-header">Hour</div>
                          <div className="time-options">
                            {hours.map(hour => (
                              <div
                                key={hour}
                                className={`time-option ${selectedHour === hour ? 'selected' : ''}`}
                                onClick={() => selectHour(hour)}
                              >
                                {hour}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="time-column minutes-column">
                          <div className="time-header">Minute</div>
                          <div className="time-options">
                            {minutes.map(minute => (
                              <div
                                key={minute}
                                className={`time-option ${selectedMinute === minute ? 'selected' : ''}`}
                                onClick={() => selectMinute(minute)}
                              >
                                {minute}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="time-column ampm-column">
                          <div className="time-header">AM/PM</div>
                          <div className="time-options">
                            <div
                              className={`time-option ${selectedAmPm === 'PM' ? 'selected' : ''}`}
                              onClick={() => selectAmPm('PM')}
                            >
                              PM
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Number of Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>
            </div>
            <button type="submit" className="reservation-btn">Book Reservation</button>
          </form>
          <div id="response"></div>
        </div>
      </div>
    </section>
  )
}

export default ReservationSection
