import React from 'react';
import Card from '../components/Cards/Card';

const Home = () => {
  const cards = [
    {
      title: 'Medical Quiz',
      description: 'Test your medical knowledge with our comprehensive quiz system. Perfect for medical students and professionals.',
      icon: '📚',
      link: '/quiz',
      buttonText: 'Start Quiz'
    },
    {
      title: 'AI Medical Assistant',
      description: 'Get instant medical insights and information through our AI-powered chatbot assistant.',
      icon: '🤖',
      link: '/chatbot',
      buttonText: 'Start Chat'
    },
    {
      title: 'Image Analysis',
      description: 'Upload medical images for AI-powered analysis and preliminary diagnosis suggestions.',
      icon: '🔬',
      link: '/diagnosis',
      buttonText: 'Upload Image'
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Medical Assistant</h1>
      <p className="home-subtitle">Select a service to begin your medical analysis</p>
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Home; 