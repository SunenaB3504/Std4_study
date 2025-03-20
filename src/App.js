import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import SubjectList from './pages/SubjectList';
import ChapterList from './pages/ChapterList';
import ChapterContent from './pages/ChapterContent';
import GamePage from './pages/GamePage';
import ExercisePage from './pages/ExercisePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/subjects/:subjectId" element={<ChapterList />} />
          <Route path="/subjects/:subjectId/chapters/:chapterId" element={<ChapterContent />} />
          <Route path="/subjects/:subjectId/chapters/:chapterId/game" element={<GamePage />} />
          <Route path="/subjects/:subjectId/chapters/:chapterId/exercise" element={<ExercisePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
