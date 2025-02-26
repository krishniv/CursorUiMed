import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your medical assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      // Sample responses - in a real app, this would come from your AI backend
      const botResponses = [
        "I understand your concern. Based on the symptoms you've described, it could be several conditions. It's best to consult with a healthcare professional for a proper diagnosis.",
        "That's a good question about medication. Always follow your doctor's prescribed dosage, and contact them if you experience any side effects.",
        "Regular exercise and a balanced diet are important parts of maintaining good health. Aim for at least 150 minutes of moderate activity per week.",
        "Sleep is essential for health. Adults typically need 7-9 hours per night. If you're having trouble sleeping, try maintaining a regular sleep schedule and avoiding screens before bed.",
        "Staying hydrated is important. The general recommendation is about 8 glasses of water per day, but individual needs vary based on activity level and climate."
      ];
      
      // Select a random response
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setIsTyping(false);
      setMessages([...newMessages, { text: randomResponse, sender: 'bot' }]);
    }, 1500);
  };

  return (
    <div className="chatgpt-container">
      <div className="chatgpt-header">
        <h2>Medical Assistant</h2>
      </div>
      
      <div className="chatgpt-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chatgpt-message-group ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
              <p className="message-text">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chatgpt-message-group bot">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatgpt-input-container">
        <form onSubmit={handleSendMessage} className="chatgpt-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message Medical Assistant..."
            className="chatgpt-input"
          />
          <button 
            type="submit" 
            className="chatgpt-send-button"
            disabled={!inputMessage.trim()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
        <div className="chatgpt-footer">
          <p>Medical Assistant may produce inaccurate information. Consult healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 