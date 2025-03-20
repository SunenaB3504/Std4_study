import React, { createContext, useState, useContext, useEffect } from 'react';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  
  const [rewards, setRewards] = useState(() => {
    const savedRewards = localStorage.getItem('rewards');
    return savedRewards ? JSON.parse(savedRewards) : [];
  });
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('points', points);
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [points, rewards]);

  const addPoints = (amount, reason) => {
    setPoints(prevPoints => prevPoints + amount);
    
    setNotificationMessage(`🎉 Earned ${amount} points: ${reason}`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const unlockReward = (reward) => {
    if (!rewards.some(r => r.id === reward.id)) {
      setRewards(prev => [...prev, reward]);
      
      setNotificationMessage(`🏆 New reward unlocked: ${reward.name}`);
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <RewardsContext.Provider 
      value={{ 
        points, 
        rewards, 
        addPoints, 
        unlockReward,
        showNotification,
        notificationMessage
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};
