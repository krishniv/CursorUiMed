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
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Get authentication token from localStorage if available (but don't require it)
    const token = localStorage.getItem('token');
    
    // Set up headers - include auth token only if it exists
    const headers = {
      "Content-Type": "application/json"
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    // Send the message to the backend
    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
          message: inputMessage
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chatbot response:', data);

      // Add bot response to messages
      setIsTyping(false);
      setMessages([...newMessages, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages([...newMessages, { 
        text: error.message || "Sorry, I couldn't process your request. Please try again.", 
        sender: 'bot' 
      }]);
    }
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