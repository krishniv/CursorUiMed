import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Cards/Card';
import './Home.css';

const Home = ({ isAuthenticated }) => {
  const cards = [
    {
      title: 'Medical Quiz',
      description: 'Test your medical knowledge with our comprehensive quiz system.',
      icon: '📚',
      link: '/quiz',
      buttonText: 'Start Quiz',
      isQuiz: true,
      requiresAuth: false
    },
    {
      title: 'AI Medical Assistant',
      description: 'Get instant medical insights and information through our AI-powered chatbot assistant.',
      icon: '🤖',
      link: '/chatbot',
      buttonText: 'Start Chat',
      requiresAuth: true
    },
    {
      title: 'Image Analysis',
      description: 'Upload medical images for AI-powered analysis and preliminary diagnosis suggestions.',
      icon: '🔬',
      link: '/diagnosis',
      buttonText: 'Upload Image',
      requiresAuth: true
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Medical Assistant</h1>
      
      <div className="cards-container">
        {cards.map((card) => (
          <Card 
            key={card.title} 
            {...card} 
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default Home; 