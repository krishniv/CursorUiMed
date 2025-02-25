import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <h1>Medical Assistant Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
          <div className="profile-container">
            <button 
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img 
                src="https://via.placeholder.com/40" 
                alt="Profile" 
                className="profile-image"
              />
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <hr />
                <Link to="/logout" className="dropdown-item logout">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 