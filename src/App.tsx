import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DiaryApp from './components/DiaryApp';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diary" element={<DiaryApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;