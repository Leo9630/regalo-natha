import React, { useState, useEffect } from 'react';
import { Lock, Unlock, User } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Natha' && password === 'mia') {
      if (rememberMe) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
      } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }
      setIsOpen(true);
      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="title-card">
        <h1 className="login-title">
          CAJA SEGURA DE NATHA <span role="img" aria-label="corazón rojo">❤️</span>
        </h1>
      </div>
      <div className="login-box">
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-container">
            <div className="input-group">
              <span role="img" aria-label="icono de usuario">
                <User className="input-icon" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                className="login-input"
              />
            </div>
            <div className="input-group">
              <span role="img" aria-label={isOpen ? "icono de candado abierto" : "icono de candado cerrado"}>
                {isOpen ? <Unlock className="input-icon" /> : <Lock className="input-icon" />}
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="login-input"
              />
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <button type="submit" className="login-button">
            <strong>ABRIR</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
