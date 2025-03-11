import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Quiz from './components/Quiz/Quiz'; 
import Chatbot from './components/Chatbot/Chatbot';
import ImageDiagnosis from './components/ImageDiagnosis/ImageDiagnosis';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginModal from './components/Auth/LoginModal';
import './styles/main.css';

function App() {
  // Basic state management
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Check if user was previously logged in (using localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('medicalAssistantUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Handle responsive sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Authentication functions
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('medicalAssistantUser', JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('medicalAssistantUser');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Router>
      <div className={`app ${isSidebarOpen ? '' : 'sidebar-collapsed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <div className="content-wrapper">
          <Header 
            onMenuClick={toggleSidebar} 
            onThemeToggle={toggleDarkMode} 
            isDarkMode={isDarkMode}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onLoginClick={openLoginModal}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home 
                isAuthenticated={isAuthenticated}
                onLoginClick={openLoginModal}
              />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/diagnosis" element={<ImageDiagnosis />} />
            </Routes>
          </main>
          <Footer isDarkMode={isDarkMode} />
        </div>
        
        {showLoginModal && (
          <LoginModal 
            onLogin={handleLogin} 
            onClose={closeLoginModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App; 