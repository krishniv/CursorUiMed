import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/', icon: '📊' },
    { title: 'Medical Quiz', path: '/quiz', icon: '📚' },
    { title: 'AI Assistant', path: '/chatbot', icon: '🤖' },
    { title: 'Image Analysis', path: '/diagnosis', icon: '🔬' },
    { title: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <h2>MedAI</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-title">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 