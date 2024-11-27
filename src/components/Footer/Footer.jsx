import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__brand">
          <h2 className="footer__title">Vinilo</h2>
          <p className="footer__tagline">
            Your go-to platform for vinyl enthusiasts.
          </p>
        </div>
        <div className="footer__section footer__links">
          <h3 className="footer__subtitle">Quick Links</h3>
          <ul className="footer__list">
            <li>
              <a href="/about" className="footer__link">About Us</a>
            </li>
            <li>
              <a href="/shows" className="footer__link">Shows</a>
            </li>
          </ul>
        </div>
        <div className="footer__section footer__social">
          <h3 className="footer__subtitle">Follow Us</h3>
          <ul className="footer__social-list">
            <li>
              <a href="https://facebook.com" className="footer__social-link">Facebook</a>
            </li>
            <li>
              <a href="https://instagram.com" className="footer__social-link">Instagram</a>
            </li>
            <li>
              <a href="https://twitter.com" className="footer__social-link">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Vinilo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
