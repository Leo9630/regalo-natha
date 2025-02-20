import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, Star, Filter, Download
} from 'lucide-react';
import DiaryLock from './DiaryLock';
import ExportDialog from './ExportDialog';
import './Diary.css';

const MOODS = [
  { emoji: '😊', label: 'Feliz', value: 'happy' },
  { emoji: '😔', label: 'Triste', value: 'sad' },
  { emoji: '😌', label: 'Tranquila', value: 'calm' },
  { emoji: '🥰', label: 'Enamorada', value: 'loved' },
  { emoji: '😤', label: 'Frustrada', value: 'frustrated' },
  { emoji: '🤗', label: 'Agradecida', value: 'grateful' },
  { emoji: '✨', label: 'Inspirada', value: 'inspired' },
  { emoji: '💪', label: 'Fuerte', value: 'strong' }
];

const CATEGORIES = [
  { icon: '🙏', label: 'Gratitud', value: 'gratitude' },
  { icon: '💭', label: 'Reflexiones', value: 'reflections' },
  { icon: '🎯', label: 'Metas', value: 'goals' },
  { icon: '💝', label: 'Amor', value: 'love' },
  { icon: '✨', label: 'Logros', value: 'achievements' },
  { icon: '📖', label: 'Aprendizajes', value: 'lessons' },
  { icon: '🙌', label: 'Celebraciones', value: 'celebrations' }
];

const Diary = ({ onBack }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        text: currentEntry,
        date: new Date().toISOString(),
        mood: selectedMood,
        category: selectedCategory,
        isFavorite: false
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
      setCurrentEntry('');
      setSelectedMood('');
      setSelectedCategory('');
    }
  };

  return (
    <div className="diary-container">
      <div className="new-entry-section">
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="¿Qué hay en tu corazón hoy?"
          className="entry-input"
        />

        <div className="entry-metadata">
          <div className="mood-selection">
            <h3>¿Cómo te sientes hoy?</h3>
            <div className="mood-selector">
              {MOODS.map(mood => (
                <button
                  key={mood.value}
                  className={`mood-button ${selectedMood === mood.value ? 'active' : ''}`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="category-selection">
            <h3>Categoría</h3>
            <div className="category-selector">
              {CATEGORIES.map(category => (
                <button
                  key={category.value}
                  className={`category-button ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSaveEntry} className="save-button">
          Guardar entrada
        </button>
      </div>
    </div>
  );
};

export default Diary;
