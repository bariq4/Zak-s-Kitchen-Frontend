import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p><strong>Phone:</strong> 041-102-0566</p>
          <p><strong>Email:</strong> info@zakskitchenau.com</p>
        </div>
        
        <div className="footer-section">
          <h2>Hours of Operation</h2>
          <p>Monday, Wednesday & Thursday: 4:00 PM - 9:00 PM</p>
          <p>Friday - Saturday: 3:00 PM - 10:00 PM</p>
          <p>Sunday: 3:00 PM - 9:00 PM</p>
          <p>Tuesday: Closed</p>
        </div>

        <div className="footer-section">
          <h2>Visit Us</h2>
          <p><strong>Address:</strong> 195 Howick ST, Bathurst, NSW</p>
          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280305550287!2d149.57920977612345!3d-33.417979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b1f8f0f0f0f0f0f%3A0xf0f0f0f0f0f0f0f0!2s195%20Howick%20St%2C%20Bathurst%20NSW%202795!5e0!3m2!1sen!2sau!4v1648000000000!5m2!1sen!2sau"
              width="100%" 
              height="150" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 New Zak's Kitchen | All Rights Reserved</p>
        <div className="footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <span>|</span>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/zak.s.kitchen.2025/"><img src="/static/icons/fb4.webp" alt="Facebook" /></a>
          <a href="https://www.instagram.com/zakskitchen_au/"><img src="/static/icons/in4.webp" alt="Instagram" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
