import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import { useRewards } from '../context/RewardsContext';
import subjects from '../data/subjects';
import SpellingGame from '../components/games/SpellingGame';
import MatchingGame from '../components/games/MatchingGame';
import QuizGame from '../components/games/QuizGame';
import './ExercisePage.css';

const ExercisePage = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const { recordExerciseScore } = useUserProgress();
  const { addPoints, unlockReward } = useRewards();
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  
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
  
  const handleExerciseComplete = (score) => {
    const exerciseId = chapter.exercises[activeExerciseIndex].id;
    
    // Update completed exercises
    setCompletedExercises(prev => [
      ...prev, 
      { 
        index: activeExerciseIndex, 
        id: exerciseId, 
        score 
      }
    ]);
    
    // Record the score
    recordExerciseScore(subjectId, chapterId, exerciseId, score, 100);
    
    // Update total score
    setTotalScore(prevScore => prevScore + score);
    
    // Check if there are more exercises
    if (activeExerciseIndex < chapter.exercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
    } else {
      // All exercises complete
      setShowResults(true);
      
      // Award bonus points for completing all exercises
      const bonusPoints = 20;
      addPoints(bonusPoints, `Completed all exercises for ${chapter.title}`);
      
      // Award badges based on performance
      if (completedExercises.every(ex => ex.score >= 70)) {
        // Perfect score badge
        if (subjectId === 'english') {
          unlockReward({
            id: 'spelling-master',
            name: 'Spelling Master',
            description: 'Spelled 20 words correctly',
            icon: '🔤',
            color: '#FF8E53'
          });
        } else if (subjectId === 'mathematics') {
          unlockReward({
            id: 'quick-thinker',
            name: 'Quick Thinker',
            description: 'Answered 5 questions in under 10 seconds',
            icon: '⏱️',
            color: '#9C27B0'
          });
        }
      }
    }
  };
  
  const restartExercises = () => {
    setActiveExerciseIndex(0);
    setCompletedExercises([]);
    setShowResults(false);
    setTotalScore(0);
  };
  
  if (!subject || !chapter) {
    return <div className="loading">Loading exercises...</div>;
  }
  
  // Check if chapter has exercises
  if (!chapter.exercises || chapter.exercises.length === 0) {
    return (
      <div className="exercise-page">
        <div className="exercise-header" style={{ backgroundColor: subject.color }}>
          <Link to={`/subjects/${subject.id}/chapters/${chapter.id}`} className="back-link">
            ← Back to Chapter
          </Link>
          <h1>Exercises: {chapter.title}</h1>
        </div>
        
        <div className="no-exercises">
          <p>No exercises available for this chapter yet.</p>
          <Link to={`/subjects/${subjectId}/chapters/${chapterId}`} className="back-button">
            Back to Chapter
          </Link>
        </div>
      </div>
    );
  }
  
  // Render the current exercise
  const renderExercise = () => {
    const exercise = chapter.exercises[activeExerciseIndex];
    
    switch (exercise.type) {
      case 'spelling':
        return <SpellingGame words={exercise.words} onComplete={handleExerciseComplete} />;
      case 'matching':
        return <MatchingGame data={exercise.data} onComplete={handleExerciseComplete} />;
      case 'quiz':
        return <QuizGame questions={exercise.questions} onComplete={handleExerciseComplete} />;
      default:
        return (
          <div className="exercise-error">
            <p>This exercise type is not supported yet.</p>
            <button onClick={() => setActiveExerciseIndex(activeExerciseIndex + 1)}>
              Skip Exercise
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="exercise-page">
      <div className="exercise-header" style={{ backgroundColor: subject.color }}>
        <Link to={`/subjects/${subject.id}/chapters/${chapter.id}`} className="back-link">
          ← Back to Chapter
        </Link>
        <h1>Exercises: {chapter.title}</h1>
      </div>
      
      <div className="exercise-container">
        {showResults ? (
          <div className="exercise-results">
            <h2>All Exercises Completed! 🎉</h2>
            
            <div className="results-summary">
              <div className="total-score">
                <span className="score-label">Total Score:</span>
                <span className="score-value">{totalScore}</span>
              </div>
              
              <div className="exercises-breakdown">
                <h3>Exercise Results</h3>
                <ul className="results-list">
                  {completedExercises.map((exercise, index) => {
                    const exerciseInfo = chapter.exercises[exercise.index];
                    return (
                      <li key={index} className="result-item">
                        <div className="result-info">
                          <span className="exercise-name">{exerciseInfo.title}</span>
                          <span className="exercise-score">{exercise.score} points</span>
                        </div>
                        <div 
                          className="result-bar" 
                          style={{ width: `${exercise.score}%` }}
                        ></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="result-actions">
                <button onClick={restartExercises} className="restart-button">
                  Try Again
                </button>
                <Link 
                  to={`/subjects/${subject.id}/chapters/${chapter.id}`} 
                  className="back-to-chapter"
                >
                  Back to Chapter
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="exercise-active">
            <div className="exercise-progress">
              <span>
                Exercise {activeExerciseIndex + 1} of {chapter.exercises.length}
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(activeExerciseIndex / chapter.exercises.length) * 100}%` }}  
                ></div>
              </div>
            </div>
            
            <div className="exercise-title">
              <h3>{chapter.exercises[activeExerciseIndex].title}</h3>
              <p>{chapter.exercises[activeExerciseIndex].instructions}</p>
            </div>
            
            <div className="exercise-content">
              {renderExercise()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
