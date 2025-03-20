import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RewardsProvider } from './context/RewardsContext';
import { UserProgressProvider } from './context/UserProgressContext';

// Wait for DOM to be fully loaded before mounting
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <UserProgressProvider>
            <RewardsProvider>
              <App />
            </RewardsProvider>
          </UserProgressProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found. Check if index.html has a div with id="root"');
  }
});
