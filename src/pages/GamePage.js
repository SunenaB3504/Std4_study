import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import { useRewards } from '../context/RewardsContext';
import subjects from '../data/subjects';
import MatchingGame from '../components/games/MatchingGame';
import SpellingGame from '../components/games/SpellingGame';
import QuizGame from '../components/games/QuizGame';
import './GamePage.css';

const GamePage = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const { recordExerciseScore, markChapterCompleted } = useUserProgress();
  const { unlockReward } = useRewards();
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  
  useEffect(() => {
    // Find the subject and chapter from data
    const foundSubject = subjects.find(s => s.id === subjectId);
    if (!foundSubject) {
      navigate('/subjects', { replace: true });
      return;
    }
    
    const foundChapter = foundSubject.chapters.find(c => c.id === chapterId);
    if (!foundChapter) {
      navigate(`/subjects/${subjectId}`, { replace: true });
      return;
    }
    
    setSubject(foundSubject);
    setChapter(foundChapter);
  }, [subjectId, chapterId, navigate]);
  
  const handleGameComplete = (score) => {
    setFinalScore(score);
    setGameCompleted(true);
    
    // Record the score
    recordExerciseScore(subjectId, chapterId, 'game', score, 100);
    
    // Check if rewards should be unlocked based on score
    if (score >= 80) {
      if (subjectId === 'english' && chapterId === 'nouns') {
        unlockReward({
          id: 'word-collector',
          name: 'Word Collector',
          description: 'Learned 30 new words',
          icon: '📚',
          color: '#2196F3'
        });
      } else if (subjectId === 'environmental-studies' && chapterId === 'plants') {
        unlockReward({
          id: 'nature-explorer',
          name: 'Nature Explorer',
          description: 'Completed Plants chapter',
          icon: '🌱',
          color: '#4CAF50'
        });
      } else if (subjectId === 'mathematics' && chapterId === 'addition') {
        unlockReward({
          id: 'math-whiz',
          name: 'Math Whiz',
          description: 'Solved 10 math problems correctly',
          icon: '🔢',
          color: '#F44336'
        });
      }
    }
  };
  
  const handleCompleteChapter = () => {
    markChapterCompleted(subjectId, chapterId);
    navigate(`/subjects/${subjectId}`);
  };
  
  if (!subject || !chapter) {
    return <div className="loading">Loading game...</div>;
  }
  
  // Determine which game to render based on chapter content
  const renderGame = () => {
    // Simple logic to pick a game type based on data structure
    if (chapter.exercises && chapter.exercises.length > 0) {
      const firstExercise = chapter.exercises[0];
      
      switch (firstExercise.type) {
        case 'matching':
          return <MatchingGame data={firstExercise.data} onComplete={handleGameComplete} />;
        case 'spelling':
          return <SpellingGame words={firstExercise.words} onComplete={handleGameComplete} />;
        case 'quiz':
          return <QuizGame questions={firstExercise.questions} onComplete={handleGameComplete} />;
        default:
          return (
            <div className="no-game">
              <p>No game available for this chapter.</p>
              <Link to={`/subjects/${subjectId}/chapters/${chapterId}`} className="back-button">
                Back to Chapter
              </Link>
            </div>
          );
      }
    }
    
    return (
      <div className="no-game">
        <p>No game available for this chapter.</p>
        <Link to={`/subjects/${subjectId}/chapters/${chapterId}`} className="back-button">
          Back to Chapter
        </Link>
      </div>
    );
  };
  
  return (
    <div className="game-page">
      <div className="game-header" style={{ backgroundColor: subject.color }}>
        <Link to={`/subjects/${subject.id}/chapters/${chapter.id}`} className="back-link">
          ← Back to Chapter
        </Link>
        <h1>Learning Game: {chapter.title}</h1>
      </div>
      
      <div className="game-container">
        {gameCompleted ? (
          <div className="game-summary">
            <div className="completion-message">
              <h2>Great Job! 🎉</h2>
              <div className="score-display">
                <span className="score-label">Your Score:</span>
                <span className="score-value">{finalScore}</span>
              </div>
              
              <div className="feedback-message">
                {finalScore >= 80 ? (
                  <p>Excellent work! You've mastered this topic!</p>
                ) : finalScore >= 50 ? (
                  <p>Good job! A bit more practice will make you an expert!</p>
                ) : (
                  <p>Keep practicing! You'll get better with each attempt.</p>
                )}
              </div>
              
              <div className="completion-actions">
                <button 
                  onClick={() => setGameCompleted(false)} 
                  className="play-again-button"
                >
                  Play Again
                </button>
                <button 
                  onClick={handleCompleteChapter} 
                  className="complete-button"
                >
                  Complete Chapter
                </button>
              </div>
            </div>
          </div>
        ) : (
          renderGame()
        )}
      </div>
    </div>
  );
};

export default GamePage;
