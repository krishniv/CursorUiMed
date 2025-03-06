import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requestedQuestions = parseInt(queryParams.get('questions')) || 5;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend server base URL
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchQuestions(requestedQuestions);
  }, [requestedQuestions]);

  const fetchQuestions = async (numQuestions) => {
    setIsLoading(true);
    setError(null);
    
    const apiUrl = `${BACKEND_URL}/quiz/generate/${numQuestions}`;
    
    console.log(`Fetching questions from: ${apiUrl}`);
    
    try {
      // Get authentication token from localStorage
      const user = JSON.parse(localStorage.getItem('medicalAssistantUser') || '{}');
      const authToken = user.token || '';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in again.');
        }
        const errorData = await response.json().catch(() => null);
        console.error('API response error:', errorData);
        throw new Error(`Failed to fetch questions (Status: ${response.status})`);
      }
      
      const data = await response.json();
      console.log('Success:', data);
      
      // Get the questions array from the response
      const questionList = data.questions || [];
      
      if (!questionList.length) {
        throw new Error('No questions returned from the API');
      }
      
      // Transform API response to component format and properly format image URLs
      const formattedQuestions = questionList.map(questionData => {
        // Find index of correct answer in options array
        const correctIndex = questionData.options.findIndex(
          option => option === questionData.correct
        );
        
        // Create full image URL by prepending backend URL if needed
        let imageUrl = questionData.image;
        
        // If the image path doesn't start with http:// or https://, prepend the backend URL
        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
          // If image path starts with '/', use it directly, otherwise add '/'
          imageUrl = `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }
        
        console.log('Original image path:', questionData.image);
        console.log('Full image URL:', imageUrl);
        
        return {
          questionText: "What does this medical image show?",
          imageUrl: imageUrl,
          answerOptions: questionData.options.map((option, index) => ({
            answerText: option,
            isCorrect: index === correctIndex
          }))
        };
      });
      
      setQuestions(formattedQuestions);
      resetQuiz(formattedQuestions);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message || "Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetQuiz = (questionsList) => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setCorrectAnswerIndex(null);
  };

  const handleAnswerClick = (index, isCorrect) => {
    if (isAnswerSelected) return; // Prevent multiple selections
    
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
    
    // Find the index of the correct answer to highlight
    const correctIndex = questions[currentQuestion].answerOptions.findIndex(option => option.isCorrect);
    setCorrectAnswerIndex(correctIndex);
    
    // Set a timer to move to the next question
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsAnswerSelected(false);
        setCorrectAnswerIndex(null);
      } else {
        setShowScore(true);
      }
    }, 1500); // Show correct/incorrect for 1.5 seconds
  };
  
  const handleRestartQuiz = () => {
    fetchQuestions(requestedQuestions);
  };
  
  if (isLoading) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Loading quiz questions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="quiz-error">
        <p>{error}</p>
        <button className="restart-btn" onClick={() => fetchQuestions(requestedQuestions)}>
          Try Again
        </button>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="quiz-loading">
        <p>No questions available. Please try again.</p>
        <button className="restart-btn" onClick={() => fetchQuestions(requestedQuestions)}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p className="final-score">You scored {score} out of {questions.length}</p>
          <div className="score-message">
            {score === questions.length ? 
              "Perfect score! You're a medical expert!" : 
              score >= questions.length * 0.7 ? 
              "Great job! You have solid medical knowledge!" :
              score >= questions.length * 0.5 ?
              "Good effort! Keep studying medical concepts!" :
              "Keep learning! Medical knowledge takes time to develop."}
          </div>
          <button className="restart-btn" onClick={handleRestartQuiz}>
            Take Another Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-content">
          <div className="quiz-progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${((currentQuestion) / questions.length) * 100}%`}}
            ></div>
          </div>
          
          <div className="quiz-main-content">
            <div className="quiz-image-section">
              <img 
                src={questions[currentQuestion].imageUrl} 
                alt={`Medical image ${currentQuestion + 1}`} 
                className="question-image"
                onError={(e) => { 
                  console.error("Failed to load image:", questions[currentQuestion].imageUrl);
                  e.target.src = 'https://placehold.co/600x400?text=Image+Load+Error';
                }}
              />
            </div>
            
            <div className="quiz-question-section">
              <div className="question-header">
                <div className="question-count">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="score-indicator">
                  Score: {score}
                </div>
              </div>
              
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
              
              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index, answerOption.isCorrect)}
                    className={`answer-button ${
                      selectedAnswer === index 
                        ? answerOption.isCorrect 
                          ? 'correct-answer' 
                          : 'wrong-answer' 
                        : isAnswerSelected && answerOption.isCorrect
                          ? 'correct-answer'
                          : ''
                    }`}
                    disabled={isAnswerSelected}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz; 