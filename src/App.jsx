import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`app ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <div className="content-wrapper">
          <Header onMenuClick={toggleSidebar} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/diagnosis" element={<ImageDiagnosis />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App; 