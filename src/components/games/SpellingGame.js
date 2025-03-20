import React, { useState, useEffect, useRef } from 'react';
import { useRewards } from '../../context/RewardsContext';
import './SpellingGame.css';

const SpellingGame = ({ words, onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speakRate, setSpeakRate] = useState(1);
  
  const inputRef = useRef(null);
  const { addPoints } = useRewards();

  const currentWord = words[currentWordIndex] || '';

  useEffect(() => {
    speakWord();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentWordIndex]);

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = speakRate;
      speechSynthesis.speak(utterance);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setFeedback('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const sanitizedInput = userInput.trim().toLowerCase();
    const sanitizedWord = currentWord.toLowerCase();
    
    setAttempts(attempts + 1);
    
    if (sanitizedInput === sanitizedWord) {
      setIsCorrect(true);
      setFeedback('Great job! 🎉');
      
      // Award points based on number of attempts
      const pointsEarned = attempts === 0 ? 10 : 5;
      addPoints(pointsEarned, `Spelled "${currentWord}" correctly`);
      setScore(score + pointsEarned);
      
      // Move to next word after a delay
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setAttempts(0);
          setShowHint(false);
        } else {
          setGameCompleted(true);
          onComplete && onComplete(score + (attempts === 0 ? 10 : 5));
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      
      // Compare letters to provide specific feedback
      let errorMessage = '';
      if (sanitizedInput.length > sanitizedWord.length) {
        errorMessage = 'Too many letters. ';
      } else if (sanitizedInput.length < sanitizedWord.length) {
        errorMessage = 'Not enough letters. ';
      }
      
      // Check for common mistakes
      let correctLetters = 0;
      for (let i = 0; i < Math.min(sanitizedInput.length, sanitizedWord.length); i++) {
        if (sanitizedInput[i] === sanitizedWord[i]) {
          correctLetters++;
        }
      }
      
      const percentCorrect = Math.round((correctLetters / sanitizedWord.length) * 100);
      
      setFeedback(`${errorMessage}${percentCorrect}% correct. Try again! 🔄`);
      
      // Show hint after 2 failed attempts
      if (attempts >= 1 && !showHint) {
        setShowHint(true);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const getHint = () => {
    // Show first and last letter with asterisks for middle letters
    return currentWord.charAt(0) + 
           '*'.repeat(Math.max(0, currentWord.length - 2)) + 
           (currentWord.length > 1 ? currentWord.charAt(currentWord.length - 1) : '');
  };

  return (
    <div className="spelling-game">
      <h2>Spelling Challenge</h2>
      
      {gameCompleted ? (
        <div className="game-completed">
          <h3>Great job! 🏆</h3>
          <p>You completed the spelling challenge</p>
          <p>Your score: {score} points</p>
          <button onClick={() => onComplete && onComplete(score)}>Continue</button>
        </div>
      ) : (
        <>
          <div className="word-progress">
            Word {currentWordIndex + 1} of {words.length}
          </div>
          
          <div className="spelling-controls">
            <button onClick={speakWord} className="listen-button">
              🔊 Listen
            </button>
            <div className="speed-control">
              <button onClick={() => setSpeakRate(0.7)} className={speakRate === 0.7 ? 'active' : ''}>Slow</button>
              <button onClick={() => setSpeakRate(1)} className={speakRate === 1 ? 'active' : ''}>Normal</button>
            </div>
          </div>
          
          {showHint && (
            <div className="hint">
              <p>Hint: {getHint()}</p>
            </div>
          )}
          
          <div className="spelling-input">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}
              placeholder="Type the word you hear..."
              autoComplete="off"
            />
            <button onClick={checkAnswer} className="check-button">
              Check ✓
            </button>
          </div>
          
          {feedback && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {feedback}
            </div>
          )}
          
          <div className="spelling-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentWordIndex / words.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingGame;
