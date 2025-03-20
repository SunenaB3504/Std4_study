import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import subjects from '../data/subjects';
import './ChapterContent.css';

const ChapterContent = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const { recordTimeSpent } = useUserProgress();
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const videoRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
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
    
    // Reset the start time for tracking time spent
    startTimeRef.current = Date.now();
    
    // Record time spent when component unmounts
    return () => {
      const minutesSpent = (Date.now() - startTimeRef.current) / (1000 * 60);
      if (minutesSpent > 0.1) { // Only record if at least 6 seconds spent
        recordTimeSpent(subjectId, chapterId, minutesSpent);
      }
    };
  }, [subjectId, chapterId, navigate, recordTimeSpent]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };
  
  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };
  
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };
  
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };
  
  if (!subject || !chapter) {
    return <div className="loading">Loading chapter content...</div>;
  }
  
  return (
    <div className="chapter-content-page">
      <div className="chapter-header" style={{ backgroundColor: subject.color }}>
        <Link to={`/subjects/${subject.id}`} className="back-link">
          ← Back to {subject.name}
        </Link>
        <h1>{chapter.title}</h1>
      </div>
      
      <div className="chapter-tabs">
        <button 
          className={`tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => handleTabChange('content')}
        >
          <span className="tab-icon">📖</span> Content
        </button>
        <button 
          className={`tab ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => handleTabChange('video')}
        >
          <span className="tab-icon">🎬</span> Video
        </button>
        <button 
          className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => handleTabChange('summary')}
        >
          <span className="tab-icon">📝</span> Summary
        </button>
      </div>
      
      <div className="chapter-tab-content">
        {activeTab === 'content' && (
          <div className="content-tab">
            <div className="text-controls">
              <button onClick={() => playAudio(chapter.content)} className="read-aloud-button">
                <span className="control-icon">🔊</span> Read Aloud
              </button>
              <button onClick={stopAudio} className="stop-button">
                <span className="control-icon">⏹️</span> Stop
              </button>
            </div>
            
            <div className="chapter-text">
              {chapter.content}
            </div>
            
            <div className="chapter-actions">
              <Link to={`/subjects/${subject.id}/chapters/${chapter.id}/game`} className="action-button game-button">
                <span className="action-icon">🎮</span> Play Learning Game
              </Link>
              <Link to={`/subjects/${subject.id}/chapters/${chapter.id}/exercise`} className="action-button exercise-button">
                <span className="action-icon">✏️</span> Practice Exercises
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'video' && (
          <div className="video-tab">
            {chapter.videoUrl ? (
              <div className="video-container">
                <video 
                  ref={videoRef}
                  src={chapter.videoUrl}
                  controls
                  poster={`/images/${subject.id}/${chapter.id}-poster.jpg`}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoPause}
                />
                <div className="video-description">
                  <h3>Video: {chapter.title}</h3>
                  <p>Watch this video to learn more about {chapter.title.toLowerCase()}.</p>
                </div>
              </div>
            ) : (
              <div className="no-video">
                <p>No video available for this chapter yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'summary' && (
          <div className="summary-tab">
            <div className="summary-content">
              <div className="text-controls">
                <button onClick={() => playAudio(chapter.summary || `Summary of ${chapter.title}: ${chapter.content.substring(0, 200)}...`)} className="read-aloud-button">
                  <span className="control-icon">🔊</span> Read Summary
                </button>
                <button onClick={stopAudio} className="stop-button">
                  <span className="control-icon">⏹️</span> Stop
                </button>
              </div>
              
              <div className="summary-text">
                <h3>Chapter Summary</h3>
                <p>{chapter.summary || `${chapter.content.substring(0, 200)}...`}</p>
              </div>
              
              <div className="key-points">
                <h3>Key Points to Remember</h3>
                <ul>
                  {(chapter.keyPoints || ['Point 1', 'Point 2', 'Point 3']).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="summary-image">
              <img 
                src={`/images/${subject.id}/${chapter.id}-summary.jpg`} 
                alt={`Illustration for ${chapter.title}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default-summary.jpg';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
