import React, { useState, useEffect } from 'react';
import { useRewards } from '../../context/RewardsContext';
import './SelectionGame.css';

const SelectionGame = ({ data, onComplete }) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { addPoints } = useRewards();

  // Current sentence being worked on
  const currentSentence = data[currentSentenceIndex] || { sentence: '', nouns: [] };
  
  // Split the sentence into words to make them selectable
  const words = currentSentence.sentence.split(' ').map(word => {
    // Remove punctuation for comparison but keep it for display
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '');
    return {
      display: word,
      clean: cleanWord,
      isPunctuation: cleanWord === ''
    };
  });

  const handleWordClick = (wordIndex) => {
    if (isChecked) return; // Don't allow changes after checking
    
    const word = words[wordIndex];
    if (word.isPunctuation) return; // Don't allow selecting punctuation
    
    setSelectedWords(prev => {
      const isSelected = prev.includes(wordIndex);
      if (isSelected) {
        return prev.filter(idx => idx !== wordIndex);
      } else {
        return [...prev, wordIndex];
      }
    });
  };

  const checkAnswer = () => {
    const selectedWordTexts = selectedWords.map(idx => words[idx].clean);
    const correctNouns = currentSentence.nouns.map(noun => noun.toLowerCase());
    
    // Check if all selections are correct and all correct items are selected
    const allSelectionsCorrect = selectedWordTexts.every(word => 
      correctNouns.includes(word.toLowerCase())
    );
    
    const allNounsSelected = correctNouns.every(noun =>
      selectedWordTexts.some(word => word.toLowerCase() === noun)
    );
    
    const isAnswerCorrect = allSelectionsCorrect && allNounsSelected;
    setIsCorrect(isAnswerCorrect);
    setIsChecked(true);
    
    if (isAnswerCorrect) {
      // Award 10 points per correct sentence
      addPoints(10, `Correctly identified nouns in a sentence`);
      setScore(score + 10);
    }
    
    // Move to next sentence after a delay
    setTimeout(() => {
      if (currentSentenceIndex < data.length - 1) {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
        setSelectedWords([]);
        setIsChecked(false);
        setIsCorrect(null);
      } else {
        // Game completed
        setGameCompleted(true);
        const finalScore = score + (isAnswerCorrect ? 10 : 0);
        onComplete && onComplete(finalScore);
      }
    }, 1500);
  };

  return (
    <div className="selection-game">
      <h2>Identify the Nouns</h2>
      
      {gameCompleted ? (
        <div className="game-completed">
          <h3>Great job! 🏆</h3>
          <p>You completed all the sentences!</p>
          <p>Your score: {score + (isCorrect ? 10 : 0)} points</p>
          <button onClick={() => onComplete && onComplete(score + (isCorrect ? 10 : 0))}>
            Continue
          </button>
        </div>
      ) : (
        <>
          <div className="game-progress">
            <span>Sentence {currentSentenceIndex + 1} of {data.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentSentenceIndex / data.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="game-instructions">
            <p>Click on all the nouns in this sentence:</p>
          </div>
          
          <div className="sentence-container">
            <div className={`sentence ${isChecked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
              {words.map((word, index) => (
                <span 
                  key={index}
                  className={`word ${selectedWords.includes(index) ? 'selected' : ''} ${
                    isChecked && currentSentence.nouns.includes(word.clean) ? 'is-noun' : ''
                  } ${word.isPunctuation ? 'punctuation' : ''}`}
                  onClick={() => handleWordClick(index)}
                >
                  {word.display}
                </span>
              ))}
            </div>
          </div>
          
          {isChecked && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {isCorrect ? (
                <p>Excellent! You found all the nouns. 🎉</p>
              ) : (
                <p>
                  Not quite. The nouns in this sentence are: {currentSentence.nouns.join(', ')}.
                </p>
              )}
            </div>
          )}
          
          <div className="game-actions">
            <button 
              onClick={checkAnswer} 
              disabled={selectedWords.length === 0 || isChecked}
              className="check-button"
            >
              Check Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionGame;
