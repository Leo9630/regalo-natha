import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, Settings } from 'lucide-react';

function Diary({ onBack }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem('diaryPassword');
    const storedEntries = localStorage.getItem('diaryEntries');
    if (storedPassword) {
      setHasPassword(true);
    }
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleSetPassword = () => {
    if (password.length >= 5 && /^\d+$/.test(password)) {
      localStorage.setItem('diaryPassword', password);
      setHasPassword(true);
      setIsAuthenticated(true);
    } else {
      alert('La contraseña debe tener al menos 5 números');
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length >= 5 && /^\d+$/.test(newPassword)) {
      localStorage.setItem('diaryPassword', newPassword);
      setShowChangePassword(false);
      alert('Contraseña cambiada exitosamente');
    } else {
      alert('La nueva contraseña debe tener al menos 5 números');
    }
  };

  const handleLogin = () => {
    const storedPassword = localStorage.getItem('diaryPassword');
    if (password === storedPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleSaveEntry = () => {
    if (entry.trim()) {
      const now = new Date();
      const newEntry = {
        date: now.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: entry,
        timestamp: now.getTime()
      };
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      setEntry('');
    }
  };

  return (
    <div className="diary-container">
      <div className="diary-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft /> Volver
        </button>
        {isAuthenticated && (
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="settings-button"
          >
            <Settings /> Cambiar Contraseña
          </button>
        )}
      </div>

      {!hasPassword ? (
        <div className="password-setup">
          <div className="password-welcome">
            <h2>✨ Bienvenida a tu Diario Personal ✨</h2>
            <p className="password-intro">
              Este es un espacio seguro para tus pensamientos.
              Vamos a protegerlo con una contraseña especial.
            </p>
          </div>
          <div className="password-card">
            <div className="password-header">
              <Lock className="lock-icon" />
              <h3>Crea tu Contraseña</h3>
            </div>
            <p className="password-instructions">
              Elige una contraseña de 5 números que puedas recordar fácilmente
            </p>
            <div className="password-input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••"
                className="password-input"
                maxLength="10"
              />
            </div>
            <p className="password-hint">
              🔐 Mínimo 5 números para mantener seguro tu diario
            </p>
            <button onClick={handleSetPassword} className="password-button">
              Crear mi Diario Personal 📖
            </button>
          </div>
        </div>
      ) : !isAuthenticated ? (
        <div className="password-setup">
          <div className="password-welcome">
            <h2>💖 Bienvenida de Nuevo 💖</h2>
            <p className="password-intro">
              Tu diario te está esperando...
            </p>
          </div>
          <div className="password-card">
            <div className="password-header">
              <Lock className="lock-icon" />
              <h3>Ingresa tu Contraseña</h3>
            </div>
            <div className="password-input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••"
                className="password-input"
                maxLength="10"
              />
            </div>
            <button onClick={handleLogin} className="password-button">
              Abrir mi Diario 🗝️
            </button>
          </div>
        </div>
      ) : showChangePassword ? (
        <div className="password-change">
          <h2>Cambiar Contraseña</h2>
          <div className="password-input-container">
            <Lock className="input-icon" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña (mínimo 5 números)"
              className="password-input"
            />
          </div>
          <button onClick={handleChangePassword} className="diary-button">
            Actualizar Contraseña
          </button>
        </div>
      ) : (
        <div className="diary-content">
          <h2>💖 Mi Diario Personal 📖</h2>
          <div className="entry-section">
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Escribe aquí tus pensamientos..."
              className="entry-input"
              rows="10"
            />
            <button onClick={handleSaveEntry} className="diary-button">
              Guardar Entrada 💝
            </button>
          </div>
          <div className="entries-list">
            {entries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="entry-date">{entry.date}</div>
                <div className="entry-text">{entry.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Diary;