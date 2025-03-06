import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, onLoginRequest }) => {
  if (!isAuthenticated) {
    // Instead of redirecting, trigger the login modal
    setTimeout(() => {
      onLoginRequest();
    }, 100);
    
    // Show a simple message instead of redirecting
    return (
      <div className="auth-required-message">
        <h2>Authentication Required</h2>
        <p>Please log in to access this feature.</p>
      </div>
    );
  }
  
  return children;
};

export default ProtectedRoute; 