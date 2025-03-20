import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RewardsProvider } from './context/RewardsContext';
import { UserProgressProvider } from './context/UserProgressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
