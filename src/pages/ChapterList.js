import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import subjects from '../data/subjects';
import './ChapterList.css';

const ChapterList = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { getChapterProgress } = useUserProgress();
  const [subject, setSubject] = useState(null);
  
  useEffect(() => {
    const foundSubject = subjects.find(s => s.id === subjectId);
    if (!foundSubject) {
      navigate('/subjects', { replace: true });
      return;
    }
    
    setSubject(foundSubject);
  }, [subjectId, navigate]);
  
  if (!subject) {
    return <div className="loading">Loading subject...</div>;
  }
  
  return (
    <div className="chapter-list-page">
      <div className="subject-header" style={{ backgroundColor: subject.color }}>
        <Link to="/subjects" className="back-link">
          ← All Subjects
        </Link>
        <div className="subject-title">
          <span className="subject-icon">{subject.icon}</span>
          <h1>{subject.name}</h1>
        </div>
        <p className="subject-description">{subject.description}</p>
      </div>
      
      <div className="chapters-container">
        <h2>Chapters</h2>
        <div className="chapters-list">
          {subject.chapters.map((chapter, index) => {
            const chapterProgress = getChapterProgress(subject.id, chapter.id);
            
            return (
              <Link 
                to={`/subjects/${subject.id}/chapters/${chapter.id}`}
                key={chapter.id}
                className={`chapter-card ${chapterProgress.completed ? 'completed' : ''}`}
              >
                <div className="chapter-number">{index + 1}</div>
                <div className="chapter-content">
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  
                  {chapterProgress.completed && (
                    <div className="completion-badge">
                      <span className="checkmark">✓</span> Completed
                    </div>
                  )}
                  
                  {chapterProgress.lastAccessed && !chapterProgress.completed && (
                    <div className="in-progress-badge">
                      <span className="progress-icon">⏱</span> In Progress
                    </div>
                  )}
                  
                  {chapterProgress.timeSpent > 0 && (
                    <div className="time-spent">
                      Time spent: {Math.round(chapterProgress.timeSpent)} minutes
                    </div>
                  )}
                </div>
                <div className="chapter-arrow">→</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChapterList;
