import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuthenticated, user, onLogout, onLoginClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Medical Assistant Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <button className="notification-btn">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
              <div className="profile-container">
                <div className="user-welcome">
                  Welcome, {user.username}!
                </div>
                <button 
                  className="logout-button"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button onClick={onLoginClick} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 