import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRewards } from '../../context/RewardsContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { points, showNotification, notificationMessage } = useRewards();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">NiaLearn</span>
          </Link>
        </div>

        <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <span className="nav-icon">🏠</span> Home
              </Link>
            </li>
            <li>
              <Link to="/subjects" onClick={() => setMenuOpen(false)}>
                <span className="nav-icon">📚</span> Subjects
              </Link>
            </li>
            <li className="points-display mobile-hidden">
              <span className="points-icon">⭐</span>
              <span className="points-count">{points}</span>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="points-display desktop-only">
            <span className="points-icon">⭐</span>
            <span className="points-count">{points}</span>
          </div>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="menu-icon">{menuOpen ? '✖' : '☰'}</span>
          </button>
        </div>
      </div>
      
      {showNotification && (
        <div className="reward-notification">
          {notificationMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
