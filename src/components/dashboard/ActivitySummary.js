import React from 'react';
import { Link } from 'react-router-dom';
import './ActivitySummary.css';

const ActivitySummary = ({ activities }) => {
  // Helper function to format date
  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="activity-summary">
      {activities.length === 0 ? (
        <div className="no-activity">
          <p>No activity recorded yet.</p>
          <p>Start learning by exploring subjects!</p>
          <Link to="/subjects" className="explore-button">
            Explore Subjects
          </Link>
        </div>
      ) : (
        <ul className="activity-list">
          {activities.map((activity, index) => (
            <li key={index} className="activity-item">
              <Link to={`/subjects/${activity.subjectId}/chapters/${activity.chapterId}`}>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.chapterTitle}</h4>
                  <p className="activity-subject">{activity.subjectName}</p>
                </div>
                <div className="activity-time">
                  <span>{formatDate(activity.date)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivitySummary;
