import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, onLoginRequest }) => {
  const [hasTriggeredAuth, setHasTriggeredAuth] = useState(false);
  
  useEffect(() => {
    // Only trigger the login modal once when the component mounts
    // and only if the user is not authenticated
    if (!isAuthenticated && !hasTriggeredAuth) {
      onLoginRequest();
      setHasTriggeredAuth(true);
    }
  }, [isAuthenticated, onLoginRequest, hasTriggeredAuth]);

  if (!isAuthenticated) {
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