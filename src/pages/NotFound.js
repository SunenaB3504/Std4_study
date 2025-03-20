import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1>Oops! Page Not Found</h1>
        <p>We can't seem to find the page you're looking for.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="home-button">Go to Home</Link>
          <Link to="/subjects" className="subjects-button">Explore Subjects</Link>
        </div>
        
        <div className="not-found-help">
          <h2>Looking for something specific?</h2>
          <ul className="help-links">
            <li><Link to="/">Dashboard</Link> - See your progress and activity</li>
            <li><Link to="/subjects">Subjects</Link> - Browse all learning subjects</li>
            <li><Link to="/subjects/environmental-studies">Environmental Studies</Link> - Learn about plants and animals</li>
            <li><Link to="/subjects/english">English</Link> - Improve reading and spelling</li>
            <li><Link to="/subjects/mathematics">Mathematics</Link> - Practice addition and other math skills</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
