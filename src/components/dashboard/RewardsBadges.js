import React from 'react';
import './RewardsBadges.css';

// Available badges in the system
const availableBadges = [
  {
    id: 'first-login',
    name: 'First Steps',
    description: 'Started your learning journey',
    icon: '🏁',
    color: '#4C86A8'
  },
  {
    id: 'spelling-master',
    name: 'Spelling Master',
    description: 'Spelled 20 words correctly',
    icon: '🔤',
    color: '#FF8E53'
  },
  {
    id: 'math-whiz',
    name: 'Math Whiz',
    description: 'Solved 10 math problems correctly',
    icon: '🔢',
    color: '#F44336'
  },
  {
    id: 'nature-explorer',
    name: 'Nature Explorer',
    description: 'Completed Plants chapter',
    icon: '🌱',
    color: '#4CAF50'
  },
  {
    id: 'word-collector',
    name: 'Word Collector',
    description: 'Learned 30 new words',
    icon: '📚',
    color: '#2196F3'
  },
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Answered 5 questions in under 10 seconds',
    icon: '⏱️',
    color: '#9C27B0'
  },
  {
    id: 'perfect-match',
    name: 'Perfect Match',
    description: 'Completed a matching game with no mistakes',
    icon: '🎯',
    color: '#E91E63'
  },
  {
    id: 'consistent-learner',
    name: 'Consistent Learner',
    description: 'Studied for 5 days in a row',
    icon: '📅',
    color: '#009688'
  }
];

const RewardsBadges = ({ rewards = [] }) => {
  // Get the badges that the user has earned
  const earnedBadges = rewards.map(reward => 
    availableBadges.find(badge => badge.id === reward.id) || reward
  );
  
  // Get locked badges (not yet earned)
  const lockedBadges = availableBadges.filter(
    badge => !rewards.some(reward => reward.id === badge.id)
  );

  return (
    <div className="rewards-badges">
      {earnedBadges.length > 0 ? (
        <div className="earned-badges">
          <div className="badges-grid">
            {earnedBadges.map(badge => (
              <div 
                key={badge.id} 
                className="badge-item earned"
                style={{ 
                  backgroundColor: `${badge.color}10`, 
                  borderColor: badge.color 
                }}
              >
                <div className="badge-icon" style={{ backgroundColor: badge.color }}>
                  <span>{badge.icon}</span>
                </div>
                <div className="badge-details">
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-badges">
          <p>You haven't earned any badges yet. Keep learning to unlock achievements!</p>
        </div>
      )}
      
      {lockedBadges.length > 0 && (
        <div className="locked-badges">
          <h3 className="section-title">Badges to Earn</h3>
          <div className="badges-grid">
            {lockedBadges.slice(0, 4).map(badge => (
              <div key={badge.id} className="badge-item locked">
                <div className="badge-icon locked">
                  <span>🔒</span>
                </div>
                <div className="badge-details">
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsBadges;
