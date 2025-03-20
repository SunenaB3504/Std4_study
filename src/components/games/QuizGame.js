import React, { useState, useEffect } from 'react';
import { useRewards } from '../../context/RewardsContext';
import './QuizGame.css';

const QuizGame = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(null);
  const { addPoints } = useRewards();

  const currentQuestion = questions[currentQuestionIndex] || {};

  useEffect(() => {
    // Reset states when moving to a new question
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    
    // For timed questions, start a timer
    if (currentQuestion.timeLimit) {
      setTimer(currentQuestion.timeLimit);
      const interval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            if (selectedOption === null) {
              // Auto-submit when time is up
              checkAnswer(null);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const checkAnswer = (optionIndex) => {
    // Store the selected option
    setSelectedOption(optionIndex);
    
    const correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
    const isAnswerCorrect = optionIndex === correctAnswerIndex;
    
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      // Award points based on whether this is timed and how quickly they answered
      const pointsEarned = currentQuestion.timeLimit && timer > 0
        ? Math.ceil(10 * (timer / currentQuestion.timeLimit)) + 5
        : 10;
      
      setScore(prevScore => prevScore + pointsEarned);
      addPoints(pointsEarned, `Correct answer: ${currentQuestion.question}`);
    }
    
    // Show explanation if there is one
    if (currentQuestion.explanation) {
      setShowExplanation(true);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameCompleted(true);
        onComplete && onComplete(score + (isAnswerCorrect ? 10 : 0));
      }
    }, currentQuestion.explanation ? 3000 : 1500);
  };

  const handleOptionClick = (optionIndex) => {
    if (selectedOption !== null) return; // Prevent changing answer
    checkAnswer(optionIndex);
  };

  return (
    <div className="quiz-game">
      <h2>Quiz Challenge</h2>
      
      {gameCompleted ? (
        <div className="game-completed">
          <h3>Quiz Complete! 🏆</h3>
          <p>Your score: {score} points</p>
          <p>You got {score / 10} out of {questions.length} questions correct!</p>
          <button onClick={() => onComplete && onComplete(score)}>Continue</button>
        </div>
      ) : (
        <>
          <div className="question-progress">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          {timer !== null && (
            <div className="timer">
              <div 
                className="timer-bar" 
                style={{ 
                  width: `${(timer / currentQuestion.timeLimit) * 100}%`,
                  backgroundColor: timer < (currentQuestion.timeLimit / 3) ? 'var(--danger-color)' : 'var(--success-color)'
                }}
              ></div>
              <div className="timer-text">{timer}s</div>
            </div>
          )}
          
          <div className="question">
            <h3>{currentQuestion.question}</h3>
            
            {currentQuestion.image && (
              <div className="question-image">
                <img src={currentQuestion.image} alt="Question illustration" />
              </div>
            )}
            
            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${selectedOption === index 
                    ? (isCorrect ? 'correct' : 'incorrect') 
                    : ''} ${selectedOption !== null && 
                      index === currentQuestion.options.indexOf(currentQuestion.correctAnswer) 
                      ? 'correct' : ''}`}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showExplanation && (
              <div className={`explanation ${isCorrect ? 'correct-explanation' : 'incorrect-explanation'}`}>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizGame;
