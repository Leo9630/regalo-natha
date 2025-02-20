import React, { useState, useEffect } from 'react';
import { Edit, X } from 'lucide-react';

const DiaryLock = ({ onUnlock, onClose }) => {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Recuperar PIN almacenado
    const savedPin = localStorage.getItem('diaryPin');
    if (!savedPin) {
      setIsSettingPin(true);
    } else {
      setStoredPin(savedPin);
    }
  }, []);

  const handlePinChange = (value) => {
    if (pin.length < 4) {
      setPin(prev => prev + value);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (isSettingPin) {
      // Establecer nuevo PIN
      if (pin.length === 4) {
        localStorage.setItem('diaryPin', pin);
        setStoredPin(pin);
        setIsSettingPin(false);
        setPin('');
      } else {
        setError('El PIN debe tener 4 dígitos');
      }
    } else {
      // Verificar PIN
      if (pin === storedPin) {
        onUnlock();
      } else {
        setError('PIN incorrecto');
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'rgba(255, 105, 180, 0.1)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(255, 105, 180, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            color: '#ff69b4',
            margin: 0,
            flexGrow: 1,
            textAlign: 'center'
          }}>
            {isSettingPin ? 'Configura tu PIN' : 'Desbloquear Diario'}
          </h2>
          {!isSettingPin && (
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#ff69b4',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '0.5rem'
              }}
              onClick={() => setIsSettingPin(true)}
            >
              <Edit />
            </button>
          )}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#ff69b4',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0.5rem'
            }}
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: index < pin.length ? '#ff69b4' : '#ffd1dc',
                transition: 'background 0.3s ease'
              }}
            ></div>
          ))}
        </div>

        {error && (
          <div style={{
            color: '#ff4444',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
            <button
              key={num}
              style={{
                background: '#fff0f5',
                border: 'none',
                borderRadius: '15px',
                padding: '1rem',
                fontSize: '1.2rem',
                color: '#ff69b4',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 600
              }}
              onClick={() => handlePinChange(num.toString())}
            >
              {num}
            </button>
          ))}
          <button
            style={{
              background: '#ffe4e1',
              border: 'none',
              borderRadius: '15px',
              padding: '1rem',
              fontSize: '1.2rem',
              color: '#666',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              gridColumn: '2/3'
            }}
            onClick={handleBackspace}
          >
            ⌫
          </button>
        </div>

        <button
          style={{
            width: '100%',
            background: pin.length === 4
              ? 'linear-gradient(45deg, #ff69b4, #ff1493)'
              : '#ffd1dc',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '15px',
            fontSize: '1.1rem',
            cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease'
          }}
          onClick={handleSubmit}
          disabled={pin.length !== 4}
        >
          {isSettingPin ? 'Guardar PIN' : 'Desbloquear'}
        </button>
      </div>
    </div>
  );
};

export default DiaryLock;