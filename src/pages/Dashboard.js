import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import { useRewards } from '../context/RewardsContext';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CalendarHeatmap from '../components/dashboard/CalendarHeatmap';
import ActivitySummary from '../components/dashboard/ActivitySummary';
import RewardsBadges from '../components/dashboard/RewardsBadges';
import subjects from '../data/subjects';
import './Dashboard.css';

Chart.register(...registerables);

const Dashboard = () => {
  const { progress } = useUserProgress();
  const { points, rewards } = useRewards();
  const [subjectProgress, setSubjectProgress] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Calculate progress for each subject
    const subjectStats = subjects.map(subject => {
      const totalChapters = subject.chapters.length;
      const completedChapters = subject.chapters.filter(chapter => 
        progress.completedChapters.includes(`${subject.id}-${chapter.id}`)
      ).length;
      
      return {
        id: subject.id,
        name: subject.name,
        icon: subject.icon,
        color: subject.color,
        completed: completedChapters,
        total: totalChapters,
        percentage: totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0
      };
    });
    
    setSubjectProgress(subjectStats);

    // Get recent activity from last access dates
    const activity = Object.entries(progress.lastAccessDates)
      .map(([key, date]) => {
        const [subjectId, chapterId] = key.split('-');
        const subject = subjects.find(s => s.id === subjectId);
        const chapter = subject?.chapters.find(c => c.id === chapterId);
        
        return {
          subjectId,
          subjectName: subject?.name || 'Unknown',
          chapterId,
          chapterTitle: chapter?.title || 'Unknown',
          date: new Date(date)
        };
      })
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
    
    setRecentActivity(activity);
  }, [progress]);

  return (
    <div className="dashboard">
      <h1>Welcome Back! 👋</h1>
      <p className="points-display">You have <span className="points">{points}</span> points</p>

      <div className="dashboard-grid">
        <div className="card subject-progress">
          <h2>Subject Progress</h2>
          <div className="subject-list">
            {subjectProgress.map(subject => (
              <Link to={`/subjects/${subject.id}`} key={subject.id} className="subject-card">
                <div className="subject-icon" style={{ backgroundColor: subject.color }}>
                  {subject.icon}
                </div>
                <div className="subject-info">
                  <h3>{subject.name}</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${subject.percentage}%`, 
                        backgroundColor: subject.color 
                      }}
                    ></div>
                  </div>
                  <p>{subject.completed} of {subject.total} chapters completed</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="card activity-summary">
          <h2>Recent Activity</h2>
          <ActivitySummary activities={recentActivity} />
        </div>

        <div className="card calendar-view">
          <h2>Activity Calendar</h2>
          <CalendarHeatmap accessDates={progress.lastAccessDates} />
        </div>

        <div className="card rewards-section">
          <h2>Rewards & Achievements</h2>
          <RewardsBadges rewards={rewards} />
        </div>
      </div>

      <div className="study-suggestion">
        <h2>Suggested Next Steps</h2>
        <div className="suggestion-cards">
          {subjectProgress
            .sort((a, b) => a.percentage - b.percentage)
            .slice(0, 2)
            .map(subject => {
              const subjectData = subjects.find(s => s.id === subject.id);
              const nextChapter = subjectData?.chapters.find(chapter => 
                !progress.completedChapters.includes(`${subject.id}-${chapter.id}`)
              );
              
              return nextChapter ? (
                <Link 
                  to={`/subjects/${subject.id}/chapters/${nextChapter.id}`}
                  key={`${subject.id}-${nextChapter.id}`}
                  className="suggestion-card"
                  style={{ borderColor: subject.color }}
                >
                  <span className="subject-icon" style={{ backgroundColor: subject.color }}>
                    {subject.icon}
                  </span>
                  <div>
                    <h3>{subject.name}</h3>
                    <p>Continue with: {nextChapter.title}</p>
                  </div>
                </Link>
              ) : null;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
