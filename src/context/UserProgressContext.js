import React, { createContext, useState, useContext, useEffect } from 'react';

const UserProgressContext = createContext();

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedChapters: [],
      exerciseScores: {},
      lastAccessDates: {},
      timeSpent: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const markChapterCompleted = (subjectId, chapterId) => {
    const chapterKey = `${subjectId}-${chapterId}`;
    
    setProgress(prev => ({
      ...prev,
      completedChapters: [...new Set([...prev.completedChapters, chapterKey])],
      lastAccessDates: {
        ...prev.lastAccessDates,
        [chapterKey]: new Date().toISOString()
      }
    }));
  };

  const recordExerciseScore = (subjectId, chapterId, exerciseId, score, maxScore) => {
    const exerciseKey = `${subjectId}-${chapterId}-${exerciseId}`;
    
    setProgress(prev => ({
      ...prev,
      exerciseScores: {
        ...prev.exerciseScores,
        [exerciseKey]: {
          score,
          maxScore,
          percentage: (score / maxScore) * 100,
          date: new Date().toISOString()
        }
      },
      lastAccessDates: {
        ...prev.lastAccessDates,
        [`${subjectId}-${chapterId}`]: new Date().toISOString()
      }
    }));
  };

  const recordTimeSpent = (subjectId, chapterId, minutes) => {
    const chapterKey = `${subjectId}-${chapterId}`;
    const currentTime = prev => (prev.timeSpent[chapterKey] || 0);
    
    setProgress(prev => ({
      ...prev,
      timeSpent: {
        ...prev.timeSpent,
        [chapterKey]: currentTime(prev) + minutes
      }
    }));
  };

  const getChapterProgress = (subjectId, chapterId) => {
    const chapterKey = `${subjectId}-${chapterId}`;
    return {
      completed: progress.completedChapters.includes(chapterKey),
      lastAccessed: progress.lastAccessDates[chapterKey] || null,
      timeSpent: progress.timeSpent[chapterKey] || 0
    };
  };

  return (
    <UserProgressContext.Provider 
      value={{ 
        progress,
        markChapterCompleted,
        recordExerciseScore,
        recordTimeSpent,
        getChapterProgress
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};
