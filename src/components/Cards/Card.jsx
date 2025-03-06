import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  icon, 
  link, 
  buttonText, 
  isQuiz = false, 
  requiresAuth = false, 
  isAuthenticated = false,
  onLoginClick
}) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const navigate = useNavigate();
  
  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumQuestions(Math.max(1, Math.min(10, value)));
  };
  
  const handleQuizStart = (e) => {
    e.preventDefault();
    navigate(`${link}?questions=${numQuestions}`);
  };
  
  const handleProtectedFeatureClick = (e) => {
    if (!isAuthenticated && requiresAuth) {
      e.preventDefault();
      // Instead of navigating, show the login modal
      onLoginClick();
    }
  };

  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      
      {isQuiz ? (
        <div className="quiz-config">
          <div className="questions-selector">
            <label htmlFor="numQuestions">Number of questions:</label>
            <input
              type="number"
              id="numQuestions"
              min="1"
              max="10"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className="question-input"
            />
            <span className="question-range">(1-10 questions)</span>
          </div>
          <button onClick={handleQuizStart} className="card-button quiz-button">
            {buttonText || 'Get Started'} →
          </button>
        </div>
      ) : (
        <Link 
          to={link} 
          className="card-button"
          onClick={handleProtectedFeatureClick}
        >
          {buttonText || 'Get Started'} →
        </Link>
      )}
    </div>
  );
};

export default Card; 