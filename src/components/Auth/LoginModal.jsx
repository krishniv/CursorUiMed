import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    
    if (isRegistering && !username.trim()) {
      setError('Username is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Determine which API endpoint to use - register or token
      const endpoint = isRegistering ? '/register' : '/token';
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      console.log(`Using endpoint: ${endpoint}`);
      // Prepare request data
      const requestData = isRegistering 
        ? { username, email, password }
        : { email, password };
      
      // Make API call
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Authentication failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (isRegistering) {
        // For registration, the response should already contain the token
        console.log('Registration successful, user created:', data.username);
        
        // Extract token directly from registration response
        const token = data.access_token;
        
        if (!token) {
          throw new Error('Authentication token not found in registration response');
        }
        
        // Create the user data object with received username, email and token
        const userData = {
          username: data.username || username,
          email: data.email || email,
          token: token
        };
        
        // Store token separately for easier access in API calls
        localStorage.setItem('token', token);
        // Store user data including the token
        localStorage.setItem('medicalAssistantUser', JSON.stringify(userData));
        
        // Successfully registered and logged in
        onLogin(userData);
      } else {
        // For login, response contains just the token
        // Format: {"access_token": token_value, "token_type": "bearer"}
        const token = data.access_token;
        
        if (!token) {
          throw new Error('Authentication token not found in response');
        }
        
        // Create user data object with the token
        const userData = {
          username: email.split('@')[0],
          email: email,
          token: token
        };
        
        // Store token separately for easier access in API calls
        localStorage.setItem('token', token);
        // Store user data including the token
        localStorage.setItem('medicalAssistantUser', JSON.stringify(userData));
        
        // Successfully logged in
        onLogin(userData);
      }
      
      onClose();
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="login-modal-header">
          <div className="login-logo">🏥</div>
          <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-subtext">
            {isRegistering 
              ? 'Sign up to access premium medical features' 
              : 'Sign in to access premium medical features'}
          </p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={isRegistering}
                  disabled={isLoading}
                  placeholder="Choose a username"
                  className="icon-input"
                />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus={!isRegistering}
                disabled={isLoading}
                placeholder="your.email@example.com"
                className="icon-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder={isRegistering ? "Create a password" : "Enter your password"}
                className="icon-input"
              />
            </div>
          </div>
          
          {!isRegistering && (
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading || !email.trim() || !password || (isRegistering && !username.trim())}
          >
            {isLoading ? 
              <span className="loading-spinner-small"></span> : 
              isRegistering ? 'Create Account' : 'Sign In'
            }
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isRegistering 
              ? 'Already have an account?' 
              : 'Don\'t have an account?'} 
            <button 
              onClick={toggleMode} 
              className="toggle-auth-mode"
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 