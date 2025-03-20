import React, { useState, useEffect } from 'react';
import { useRewards } from '../../context/RewardsContext';
import './DragDropGame.css';

const DragDropGame = ({ problems, onComplete }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [answers, setAnswers] = useState({});
  const [correct, setCorrect] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { addPoints } = useRewards();
  
  // Create a shuffled array of answers
  const [answerOptions, setAnswerOptions] = useState([]);
  
  useEffect(() => {
    // Extract all answers and shuffle them
    const allAnswers = problems.map(problem => problem.answer);
    setAnswerOptions(shuffle([...allAnswers]));
  }, [problems]);
  
  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const handleDragStart = (e, answer) => {
    setDraggedItem(answer);
  };
  
  const handleDragOver = (e, problemIndex) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, problemIndex) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // Place the dragged answer in the problem's drop zone
    setAnswers(prev => ({
      ...prev,
      [problemIndex]: draggedItem
    }));
    
    // Remove this answer from the available options
    setAnswerOptions(prev => prev.filter(a => a !== draggedItem));
    
    // Clear the dragged item
    setDraggedItem(null);
  };
  
  const handleRemoveAnswer = (problemIndex) => {
    const answer = answers[problemIndex];
    if (!answer) return;
    
    // Return the answer to the available options
    setAnswerOptions(prev => [...prev, answer]);
    
    // Remove it from the answers
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[problemIndex];
      return newAnswers;
    });
    
    // Clear any correctness indicator
    setCorrect(prev => {
      const newCorrect = { ...prev };
      delete newCorrect[problemIndex];
      return newCorrect;
    });
  };
  
  const checkAnswers = () => {
    // Check each answer against the correct answer
    let correctCount = 0;
    const newCorrect = {};
    
    problems.forEach((problem, index) => {
      if (answers[index] === problem.answer) {
        newCorrect[index] = true;
        correctCount++;
      } else if (answers[index]) {
        newCorrect[index] = false;
      }
    });
    
    setCorrect(newCorrect);
    
    // Calculate score based on correctness
    const newScore = Math.round((correctCount / problems.length) * 100);
    setScore(newScore);
    
    // Check if all are correct or if we've attempted all problems
    if (correctCount === problems.length || Object.keys(answers).length === problems.length) {
      setGameCompleted(true);
      addPoints(newScore, 'Completed drag and drop exercise');
      onComplete && onComplete(newScore);
    }
  };
  
  const resetGame = () => {
    setAnswers({});
    setCorrect({});
    setGameCompleted(false);
    setScore(0);
    
    // Reshuffle answer options
    const allAnswers = problems.map(problem => problem.answer);
    setAnswerOptions(shuffle([...allAnswers]));
  };

  return (
    <div className="dragdrop-game">
      <h2>Match the Answers</h2>
      
      {gameCompleted ? (
        <div className="game-completed">
          <h3>Great job! 🏆</h3>
          <p>You scored {score} out of 100 points!</p>
          <div className="game-actions">
            <button onClick={resetGame}>Play Again</button>
            <button onClick={() => onComplete && onComplete(score)}>
              Continue
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="problems-container">
            {problems.map((problem, index) => (
              <div key={index} className="problem-item">
                <div className="problem-text">{problem.text}</div>
                <div 
                  className={`answer-drop-zone ${answers[index] ? 'has-answer' : ''} ${
                    correct[index] === true ? 'correct' : 
                    correct[index] === false ? 'incorrect' : ''
                  }`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {answers[index] ? (
                    <>
                      <span className="answer-text">{answers[index]}</span>
                      <button 
                        className="remove-answer" 
                        onClick={() => handleRemoveAnswer(index)}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="drop-placeholder">Drop answer here</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="answer-options">
            <h3>Available Answers</h3>
            <div className="options-container">
              {answerOptions.map((answer, index) => (
                <div 
                  key={index}
                  className="answer-option"
                  draggable
                  onDragStart={(e) => handleDragStart(e, answer)}
                >
                  {answer}
                </div>
              ))}
              
              {answerOptions.length === 0 && (
                <div className="no-options">
                  All answers have been used. Remove an answer to swap it.
                </div>
              )}
            </div>
          </div>
          
          <div className="check-answers">
            <button onClick={checkAnswers} disabled={Object.keys(answers).length === 0}>
              Check Answers
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DragDropGame;
