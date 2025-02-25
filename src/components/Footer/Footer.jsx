import React from 'react';
import './Footer.css';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-text">
            © 2024 MedAI Assistant
          </div>
          <div className="medical-disclaimer">
            For information only. Not for medical advice.
          </div>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="https://twitter.com/medai" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" /> Twitter
            </a>
            <a href="https://linkedin.com/company/medai" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" /> LinkedIn
            </a>
            <a href="https://github.com/krizniv" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" /> Krizniv
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 