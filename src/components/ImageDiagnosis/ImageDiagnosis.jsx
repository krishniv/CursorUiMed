import React, { useState } from 'react';
import './ImageDiagnosis.css';

const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Backend server base URL
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Reset previous diagnosis
    setDiagnosis(null);
    setError(null);
    setIsProcessing(true);
    
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Get authentication token from localStorage if available (but don't require it)
    const user = JSON.parse(localStorage.getItem('medicalAssistantUser') || '{}');
    const authToken = user.token || '';
    
    // Prepare the form data for upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Include token in request if available
    if (authToken) {
      formData.append('token', authToken);
    }
    
    // Set up headers - include auth token only if it exists
    const headers = {};
    
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    try {
      // Make the API call to your backend
      const response = await fetch(`${BACKEND_URL}/img/upload`, {
        method: 'POST',
        body: formData,
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Image upload response:', data);
      
      // Extract the description from file_info
      if (data && data.file_info && data.file_info.description) {
        setDiagnosis(data.file_info.description);
      } else {
        setError('The analysis was completed but no diagnostic details were returned.');
        console.error('Unexpected response format:', data);
      }
      
    } catch (err) {
      console.error('Error processing image:', err);
      setError(err.message || 'Failed to process the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <h2>Image Diagnosis</h2>
      
      {!selectedImage ? (
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-button">
            Choose Image
          </label>
          <p className="upload-hint">Upload a medical image for AI analysis</p>
        </div>
      ) : (
        <div className="diagnosis-content">
          <div className="image-preview-section">
            <h3>Image Preview</h3>
            <img src={selectedImage} alt="Preview" className="image-preview" />
            <button 
              onClick={() => {
                setSelectedImage(null); 
                setDiagnosis(null);
                setIsProcessing(false);
                setError(null);
              }}
              className="new-image-btn"
            >
              Upload New Image
            </button>
          </div>
          
          <div className="diagnosis-result-section">
            <h3>Analysis Results</h3>
            
            {isProcessing ? (
              <div className="processing-indicator">
                <div className="loading-spinner"></div>
                <p>Processing image, please wait...</p>
              </div>
            ) : error ? (
              <div className="diagnosis-error">
                <p>{error}</p>
              </div>
            ) : diagnosis ? (
              <div className="diagnosis-text">
                <div className="diagnosis-summary">
                  <h4>AI Assessment</h4>
                  <p>{diagnosis}</p>
                </div>
                <div className="diagnosis-disclaimer">
                  <p>Note: This analysis is provided for informational purposes only and should not replace professional medical advice.</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDiagnosis; 