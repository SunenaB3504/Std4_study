import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">NiaLearn</span>
          </div>
          <p className="footer-tagline">
            Making learning fun and accessible for children with learning disabilities
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/subjects">Subjects</a></li>
            <li><a href="/#">Help</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li><a href="mailto:support@nialearn.example">📧 support@nialearn.example</a></li>
            <li><a href="tel:+1234567890">📞 123-456-7890</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} NiaLearn. All rights reserved.</p>
        <p className="version">Version 1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;
