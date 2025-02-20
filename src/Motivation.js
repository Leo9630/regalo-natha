import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, BookOpen, Youtube } from 'lucide-react';
import './Motivation.css';
import { afirmaciones, agradecimientos, versiculosBiblicos } from './frases';

const MotivationCard = ({ icon, label, emoji, gradient, onClick }) => {
  return (
    <div
      className="motivation-card"
      onClick={onClick}
      style={{
        background: gradient,
        boxShadow: `0 8px 15px ${gradient.split(',')[1].trim()}`
      }}
    >
      <div className="card-content">
        {icon}
        <span>{label}</span>
        <span role="img" aria-label="emoji">{emoji}</span>
      </div>
      <div className="card-hover-effect"></div>
    </div>
  );
};

const Motivation = ({ onBack }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentType, setCurrentType] = useState('');

  const showRandomMessage = (array, type) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    setCurrentMessage(array[randomIndex]);
    setCurrentType(type);
  };

  const openYouTubeLink = () => {
    window.open(
      'https://www.youtube.com/results?search_query=MOTIVACION+PERSONAL+MUJERES%2C+AUTOESTIMA%2BCONFIANZA',
      '_blank'
    );
  };

  return (
    <div className="motivation-container">
      <div className="motivation-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft />
          <span>Volver</span>
        </button>
        <h1>Motivación <span role="img" aria-label="destellos">✨</span></h1>
        <button
          onClick={openYouTubeLink}
          className="videos-button"
        >
          <Youtube />
          <span>Videos de Ayuda</span>
        </button>
      </div>

      <div className="motivation-grid">
        <MotivationCard
          icon={<Heart className="motivation-icon" />}
          label="Afirmación"
          emoji={<span role="img" aria-label="estrella">⭐</span>}
          gradient="linear-gradient(135deg, #ff69b4, #ff1493)"
          onClick={() => showRandomMessage(afirmaciones, 'Afirmación')}
        />
        <MotivationCard
          icon={<Star className="motivation-icon" />}
          label="Agradecimiento"
          emoji={<span role="img" aria-label="corazón">💖</span>}
          gradient="linear-gradient(135deg, #ff4e83, #ff2a6a)"
          onClick={() => showRandomMessage(agradecimientos, 'Agradecimiento')}
        />
        <MotivationCard
          icon={<BookOpen className="motivation-icon" />}
          label="Biblia"
          emoji={<span role="img" aria-label="ángel">👼</span>}
          gradient="linear-gradient(135deg, #ff6b9e, #ff3a7f)"
          onClick={() => showRandomMessage(versiculosBiblicos, 'Biblia')}
        />
      </div>

      {currentMessage && (
        <div className="motivation-message-box">
          <div className="message-type">
            {currentType === 'Afirmación' && <span role="img" aria-label="estrella">⭐</span>} Afirmación
            {currentType === 'Agradecimiento' && <span role="img" aria-label="corazón">💖</span>} Agradecimiento
            {currentType === 'Biblia' && <span role="img" aria-label="ángel">👼</span>} Versículo Bíblico
          </div>
          <p>{currentMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Motivation;
