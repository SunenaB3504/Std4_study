import React from 'react';
import { Link } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import subjects from '../data/subjects';
import './SubjectList.css';

const SubjectList = () => {
  const { progress } = useUserProgress();
  
  const calculateSubjectProgress = (subject) => {
    const totalChapters = subject.chapters.length;
    const completedChapters = subject.chapters.filter(chapter => 
      progress.completedChapters.includes(`${subject.id}-${chapter.id}`)
    ).length;
    
    return {
      completedCount: completedChapters,
      totalCount: totalChapters,
      percentage: totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0
    };
  };

  return (
    <div className="subject-list-page">
      <h1>Subjects</h1>
      <p className="page-description">
        Choose a subject to start learning! Each subject has chapters with videos, games, and exercises.
      </p>
      
      <div className="subjects-grid">
        {subjects.map(subject => {
          const subjectProgress = calculateSubjectProgress(subject);
          
          return (
            <Link
              to={`/subjects/${subject.id}`}
              key={subject.id}
              className="subject-card"
            >
              <div 
                className="subject-icon" 
                style={{ backgroundColor: subject.color }}
              >
                {subject.icon}
              </div>
              
              <div className="subject-content">
                <h2>{subject.name}</h2>
                <p>{subject.description}</p>
                
                <div className="progress-details">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${subjectProgress.percentage}%`, 
                        backgroundColor: subject.color 
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span>{subjectProgress.completedCount} of {subjectProgress.totalCount} chapters</span>
                    <span>{subjectProgress.percentage}% complete</span>
                  </div>
                </div>
              </div>
              
              <div className="subject-arrow">→</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectList;
