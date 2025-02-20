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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterMood, setFilterMood] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSearch = () => {
    // La búsqueda ya está implementada en el filtrado de entradas,
    // pero podríamos añadir funcionalidad adicional aquí si se necesita
  };

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

      // Reset form
      setCurrentEntry('');
      setSelectedMood('');
      setSelectedCategory('');
    }
  };

  const toggleFavorite = (entryId) => {
    const updatedEntries = entries.map(entry =>
      entry.id === entryId
        ? { ...entry, isFavorite: !entry.isFavorite }
        : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = !filterMood || entry.mood === filterMood;
    const matchesCategory = !filterCategory || entry.category === filterCategory;
    return matchesSearch && matchesMood && matchesCategory;
  });

  // Si el diario está bloqueado, mostrar el componente de bloqueo
  if (isLocked) {
    return (
      <DiaryLock
        onUnlock={() => setIsLocked(false)}
        onClose={onBack}
      />
    );
  }

  return (
    <div className="diary-container">
      <div className="diary-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft />
          <span>Volver</span>
        </button>
        <h1>Mi Diario Personal ✨</h1>
        <div className="header-actions">
          <button onClick={() => setShowExportDialog(true)} className="export-button">
            <Download />
          </button>
        </div>
      </div>

      {showExportDialog && (
        <ExportDialog
          isOpen={showExportDialog}
          onClose={() => setShowExportDialog(false)}
          entries={entries}
          moods={MOODS}
          categories={CATEGORIES}
        />
      )}

      <div className="search-bar">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar en mi diario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} className="search-button">
          <Search />
        </button>
        <button
          className={`filter-button ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter />
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <h3>Estado de ánimo</h3>
            <div className="mood-filters">
              {MOODS.map(mood => (
                <button
                  key={mood.value}
                  className={`mood-filter ${filterMood === mood.value ? 'active' : ''}`}
                  onClick={() => setFilterMood(filterMood === mood.value ? '' : mood.value)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h3>Categoría</h3>
            <div className="category-filters">
              {CATEGORIES.map(category => (
                <button
                  key={category.value}
                  className={`category-filter ${filterCategory === category.value ? 'active' : ''}`}
                  onClick={() => setFilterCategory(filterCategory === category.value ? '' : category.value)}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

      <div className="entries-list">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="entry-card">
            <div className="entry-header">
              <div className="entry-meta">
                <span className="entry-date">
                  {new Date(entry.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {entry.mood && (
                  <span className="entry-mood">
                    {MOODS.find(m => m.value === entry.mood)?.emoji}
                    <span className="mood-label">
                      {MOODS.find(m => m.value === entry.mood)?.label}
                    </span>
                  </span>
                )}
                {entry.category && (
                  <span className="entry-category">
                    {CATEGORIES.find(c => c.value === entry.category)?.icon}
                    <span className="category-label">
                      {CATEGORIES.find(c => c.value === entry.category)?.label}
                    </span>
                  </span>
                )}
              </div>
              <button
                className={`favorite-button ${entry.isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(entry.id)}
              >
                <Star />
              </button>
            </div>
            <div className="entry-content">{entry.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;