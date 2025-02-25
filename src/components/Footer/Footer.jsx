import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-text">
            © 2024 MedAI Assistant. All rights reserved.
          </div>
          <div className="medical-disclaimer">
            Disclaimer: This application is intended to assist medical professionals and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
          </div>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="https://twitter.com/medai" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com/company/medai" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 