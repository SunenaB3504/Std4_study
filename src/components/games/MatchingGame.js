import React, { useState, useEffect } from 'react';
import { useRewards } from '../../context/RewardsContext';
import './MatchingGame.css';

const MatchingGame = ({ data, onComplete }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { addPoints } = useRewards();

  useEffect(() => {
    // Initialize game by creating shuffled arrays of items and matches
    const itemsArray = data.map((pair, index) => ({
      id: `item-${index}`,
      content: pair.item,
      matchId: `match-${index}`,
      matched: false
    }));
    
    const matchesArray = data.map((pair, index) => ({
      id: `match-${index}`,
      content: pair.match,
      matchId: `item-${index}`,
      matched: false
    }));
    
    // Shuffle both arrays
    setItems(shuffle(itemsArray));
    setMatches(shuffle(matchesArray));
  }, [data]);

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleItemClick = (item) => {
    if (item.matched) return;
    
    setSelectedItem(item);
  };

  const handleMatchClick = (match) => {
    if (!selectedItem || match.matched) return;
    
    if (match.matchId === selectedItem.id) {
      // Correct match
      const updatedItems = items.map(item => 
        item.id === selectedItem.id ? { ...item, matched: true } : item
      );
      
      const updatedMatches = matches.map(m => 
        m.id === match.id ? { ...m, matched: true } : m
      );
      
      setItems(updatedItems);
      setMatches(updatedMatches);
      setSelectedItem(null);
      setAttempts(attempts + 1);
      
      // Check if game is completed
      const allMatched = updatedItems.every(item => item.matched);
      if (allMatched) {
        const score = calculateScore(attempts, data.length);
        addPoints(score, 'Completed matching game');
        setGameCompleted(true);
        onComplete && onComplete(score);
      }
    } else {
      // Incorrect match
      setAttempts(attempts + 1);
      
      // Briefly show selected items before resetting
      setTimeout(() => {
        setSelectedItem(null);
      }, 1000);
    }
  };

  const calculateScore = (attempts, pairsCount) => {
    // Perfect score: 10 points per pair
    const perfectScore = pairsCount * 10;
    // Minimum score: 2 points per pair
    const minScore = pairsCount * 2;
    // Optimal number of attempts is equal to the number of pairs
    const optimalAttempts = pairsCount;
    
    // Calculate score based on number of attempts
    const score = Math.max(
      minScore,
      perfectScore - (attempts - optimalAttempts) * 5
    );
    
    return Math.round(score);
  };

  const resetGame = () => {
    const itemsArray = data.map((pair, index) => ({
      id: `item-${index}`,
      content: pair.item,
      matchId: `match-${index}`,
      matched: false
    }));
    
    const matchesArray = data.map((pair, index) => ({
      id: `match-${index}`,
      content: pair.match,
      matchId: `item-${index}`,
      matched: false
    }));
    
    setItems(shuffle(itemsArray));
    setMatches(shuffle(matchesArray));
    setSelectedItem(null);
    setAttempts(0);
    setGameCompleted(false);
  };

  return (
    <div className="matching-game">
      <h2>Match the Items</h2>
      
      {gameCompleted ? (
        <div className="game-completed">
          <h3>Great job! 🏆</h3>
          <p>You completed the matching game in {attempts} attempts</p>
          <p>Score: {calculateScore(attempts, data.length)} points</p>
          <div className="game-actions">
            <button onClick={resetGame}>Play Again</button>
            <button onClick={() => onComplete && onComplete(calculateScore(attempts, data.length))}>
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="game-board">
          <div className="items-column">
            <h3>Items</h3>
            <div className="items-list">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`game-item ${item.matched ? 'matched' : ''} ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.content}
                </div>
              ))}
            </div>
          </div>
          
          <div className="matches-column">
            <h3>Matches</h3>
            <div className="matches-list">
              {matches.map((match) => (
                <div 
                  key={match.id}
                  className={`game-item ${match.matched ? 'matched' : ''}`}
                  onClick={() => handleMatchClick(match)}
                >
                  {match.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="game-stats">
        <p>Attempts: {attempts}</p>
        <p>Matches: {items.filter(item => item.matched).length} of {items.length}</p>
      </div>
    </div>
  );
};

export default MatchingGame;
