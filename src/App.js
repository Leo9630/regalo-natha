import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertOctagon } from 'lucide-react';
import './App.css';
import Login from './Login';
import Diary from './Diary';
import Motivation from './Motivation';
import Emergency from './Emergency';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (showDiary) {
    return <Diary onBack={() => setShowDiary(false)} />;
  }

  if (showMotivation) {
    return <Motivation onBack={() => setShowMotivation(false)} />;
  }

  if (showEmergency) {
    return <Emergency onBack={() => setShowEmergency(false)} />;
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">LA CAJA SEGURA DE NATHA 🌟🎉</h1>

        <div className="buttons-container">
          <button
            onClick={() => setShowMotivation(true)}
            className="button motivation"
          >
            <Sparkles className="button-icon" />
            <span>Motivación</span>
            <Sparkles className="button-icon" />
          </button>

          <button
            onClick={() => setShowDiary(true)}
            className="button diario"
          >
            <BookOpen className="button-icon" />
            <span>Diario</span>
            <span>📝</span>
          </button>

          <button
            onClick={() => setShowEmergency(true)}
            className="button emergency"
          >
            <AlertOctagon className="button-icon" />
            <span>Emergencia</span>
            <AlertOctagon className="button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;