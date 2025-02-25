import React, { useState } from 'react';
import './ImageDiagnosis.css';

const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // Simulate diagnosis
        setTimeout(() => {
          setDiagnosis('This is a sample diagnosis result. In a real application, this would be the result from your AI model.');
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="diagnosis-container">
      <h2>Image Diagnosis</h2>
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
      </div>
      
      {selectedImage && (
        <div className="preview-section">
          <h3>Preview</h3>
          <img src={selectedImage} alt="Preview" className="image-preview" />
        </div>
      )}
      
      {diagnosis && (
        <div className="diagnosis-section">
          <h3>Diagnosis Result</h3>
          <p>{diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDiagnosis; 