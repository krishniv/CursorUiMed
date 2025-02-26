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

  // Full list of medical questions with images
  const allQuestions = [
    {
      questionText: 'What is the organ shown in this image?',
      answerOptions: [
        { answerText: 'Heart', isCorrect: true },
        { answerText: 'Kidney', isCorrect: false },
        { answerText: 'Liver', isCorrect: false },
        { answerText: 'Lung', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Heart+Anatomy',
      explanation: 'The image shows a human heart, which is a muscular organ responsible for pumping blood throughout the body.'
    },
    {
      questionText: 'Which bone is this?',
      answerOptions: [
        { answerText: 'Tibia', isCorrect: false },
        { answerText: 'Femur', isCorrect: true },
        { answerText: 'Humerus', isCorrect: false },
        { answerText: 'Radius', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Femur+Bone',
      explanation: 'This is the femur, which is the thigh bone and the longest bone in the human body.'
    },
    {
      questionText: 'What type of cell is shown in the image?',
      answerOptions: [
        { answerText: 'Red Blood Cell', isCorrect: true },
        { answerText: 'White Blood Cell', isCorrect: false },
        { answerText: 'Neuron', isCorrect: false },
        { answerText: 'Skin Cell', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Red+Blood+Cell',
      explanation: 'Red blood cells (erythrocytes) are the most common type of blood cell and are responsible for delivering oxygen throughout the body.'
    },
    {
      questionText: 'Which part of the brain is highlighted?',
      answerOptions: [
        { answerText: 'Cerebellum', isCorrect: false },
        { answerText: 'Hypothalamus', isCorrect: false },
        { answerText: 'Frontal Lobe', isCorrect: true },
        { answerText: 'Brainstem', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Frontal+Lobe',
      explanation: 'The frontal lobe is the largest lobe of the brain and is responsible for voluntary movement, expressive language, and executive functions.'
    },
    {
      questionText: 'What is the condition shown in this X-ray?',
      answerOptions: [
        { answerText: 'Osteoporosis', isCorrect: false },
        { answerText: 'Fracture', isCorrect: true },
        { answerText: 'Arthritis', isCorrect: false },
        { answerText: 'Normal bone', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Bone+Fracture',
      explanation: 'The X-ray shows a bone fracture, which is a break in the continuity of the bone.'
    },
    {
      questionText: 'Which vitamin deficiency causes this condition?',
      answerOptions: [
        { answerText: 'Vitamin A', isCorrect: false },
        { answerText: 'Vitamin B12', isCorrect: false },
        { answerText: 'Vitamin C', isCorrect: true },
        { answerText: 'Vitamin D', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Scurvy+Symptoms',
      explanation: 'Vitamin C deficiency causes scurvy, characterized by swollen bleeding gums, joint pain, and impaired wound healing.'
    },
    {
      questionText: 'What does this EKG pattern indicate?',
      answerOptions: [
        { answerText: 'Normal heart rhythm', isCorrect: false },
        { answerText: 'Atrial fibrillation', isCorrect: false },
        { answerText: 'Myocardial infarction', isCorrect: true },
        { answerText: 'Ventricular tachycardia', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Myocardial+Infarction+EKG',
      explanation: 'This EKG pattern shows ST-segment elevation, which is characteristic of a myocardial infarction (heart attack).'
    },
    {
      questionText: 'What is this medical device used for?',
      answerOptions: [
        { answerText: 'Measuring blood pressure', isCorrect: true },
        { answerText: 'Checking blood sugar', isCorrect: false },
        { answerText: 'Monitoring heart rate', isCorrect: false },
        { answerText: 'Testing reflexes', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Sphygmomanometer',
      explanation: 'This is a sphygmomanometer, a device used to measure blood pressure.'
    },
    {
      questionText: 'Which respiratory condition is shown in this image?',
      answerOptions: [
        { answerText: 'Asthma', isCorrect: false },
        { answerText: 'Pneumonia', isCorrect: true },
        { answerText: 'Bronchitis', isCorrect: false },
        { answerText: 'Tuberculosis', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Pneumonia+X-ray',
      explanation: 'The image shows a chest X-ray of pneumonia, characterized by white opacities representing fluid in the lungs.'
    },
    {
      questionText: 'What is this surgical procedure called?',
      answerOptions: [
        { answerText: 'Appendectomy', isCorrect: false },
        { answerText: 'Cholecystectomy', isCorrect: false },
        { answerText: 'Coronary bypass', isCorrect: true },
        { answerText: 'Tonsillectomy', isCorrect: false },
      ],
      imageUrl: 'https://via.placeholder.com/600x500?text=Coronary+Bypass+Surgery',
      explanation: 'Coronary bypass surgery creates new routes around narrowed and blocked arteries, allowing blood to flow more freely to heart muscle.'
    },
  ];
  
  // Select questions based on user preference
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Select random questions based on numQuestions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(requestedQuestions, allQuestions.length));
    setQuestions(selectedQuestions);
    // Reset quiz state
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setCorrectAnswerIndex(null);
  }, [requestedQuestions]);

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
    // Select new random questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(requestedQuestions, allQuestions.length));
    setQuestions(selectedQuestions);
    // Reset quiz state
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setCorrectAnswerIndex(null);
  };
  
  if (questions.length === 0) {
    return <div className="quiz-loading">Loading quiz questions...</div>;
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
                alt={`Visual for question ${currentQuestion + 1}`} 
                className="question-image"
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