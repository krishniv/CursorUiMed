import React, { useState } from 'react';
import './ImageDiagnosis.css';

const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Reset previous diagnosis
      setDiagnosis(null);
      setIsProcessing(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // Simulate diagnosis processing
        setTimeout(() => {
          setDiagnosis('This is a sample diagnosis result. In a real application, this would be the result from your AI model. The analysis would include potential conditions identified in the image, confidence scores, and recommended next steps for the patient or healthcare provider.');
          setIsProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
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