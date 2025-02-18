import { afirmaciones, agradecimientos, versiculosBiblicos } from './frases';
import React, { useState } from 'react';
import { Heart, Star, BookOpen, Book } from 'lucide-react';
import './App.css';
import Diary from './Diary';

function App() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [showDiary, setShowDiary] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const showRandomMessage = (array) => {
    setAnimationClass('message-exit');
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * array.length);
      setCurrentMessage(array[randomIndex]);
      setAnimationClass('message-enter');
    }, 300);
  };

  if (showDiary) {
    return <Diary onBack={() => setShowDiary(false)} />;
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Para Natha: Se vale ser feliz 🌟🎉</h1>

        <div className="buttons-container">
          <button
            onClick={() => showRandomMessage(afirmaciones)}
            className="button afirmacion"
          >
            <Heart className="button-icon" />
            <span>Afirmación</span>
            <Star className="button-icon" />
          </button>

          <button
            onClick={() => showRandomMessage(agradecimientos)}
            className="button agradecimiento"
          >
            <Star className="button-icon" />
            <span>Agradecimiento</span>
            <Heart className="button-icon" />
          </button>

          <button
            onClick={() => showRandomMessage(versiculosBiblicos)}
            className="button biblia"
          >
            <BookOpen className="button-icon" />
            <span>Biblia</span>
            <span>👼</span>
          </button>

          <button
            onClick={() => setShowDiary(true)}
            className="button diario"
          >
            <Book className="button-icon" />
            <span>Diario</span>
            <span>📝</span>
          </button>
        </div>

        {currentMessage && (
          <div className={`message-box ${animationClass}`}>
            <p>{currentMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;