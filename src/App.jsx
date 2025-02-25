import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Quiz from './components/Quiz/Quiz';
import Chatbot from './components/Chatbot/Chatbot';
import ImageDiagnosis from './components/ImageDiagnosis/ImageDiagnosis';
import './styles/main.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  return (
    <Router>
      <div className={`app ${isSidebarOpen ? '' : 'sidebar-collapsed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <div className="content-wrapper">
          <Header onMenuClick={toggleSidebar} onThemeToggle={toggleDarkMode} isDarkMode={isDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/diagnosis" element={<ImageDiagnosis />} />
            </Routes>
          </main>
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </Router>
  );
}

export default App; 