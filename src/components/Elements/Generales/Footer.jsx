import React from 'react'
import './../../../assets/Components/general/Footer.scss'

function Footer() {
  return (
      <footer className="footer">
                <h3 className="footer__title">CONTACTANOS</h3>
      <div className="footer__content">
        <div className="footer__links">
          <div className="footer__social">
            <a href="#facebook" className="footer__link">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#instagram" className="footer__link">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#blog" className="footer__link">
              <i className="fas fa-globe"></i> Blog
            </a>
          </div>
          <div className="footer__info">
            <p>
              <i className="fas fa-map-marker-alt"></i> Av. Niño de Rivera, Col.
              Manuel MNP, León, MX
            </p>
            <p>
              <i className="fas fa-envelope"></i> soporte@tuemail.com
            </p>
            <p>
              <i className="fas fa-phone"></i> 777-901-1600
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
