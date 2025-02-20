import React, { useState } from 'react';
import { FileText, FileImage, X } from 'lucide-react';
import jsPDF from 'jspdf';
import './ExportDialog.css';

const ExportDialog = ({ isOpen, onClose, entries, moods, categories }) => {
  const [filterType, setFilterType] = useState('all');
  const [moodFilter, setMoodFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const filterEntries = () => {
    let filteredEntries = [...entries];

    if (filterType === 'mood' && moodFilter) {
      filteredEntries = filteredEntries.filter(entry => entry.mood === moodFilter);
    }
    else if (filterType === 'category' && categoryFilter) {
      filteredEntries = filteredEntries.filter(entry => entry.category === categoryFilter);
    }
    else if (filterType === 'date' && (dateRange.start || dateRange.end)) {
      filteredEntries = filteredEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        const start = dateRange.start ? new Date(dateRange.start) : new Date(0);
        const end = dateRange.end ? new Date(dateRange.end) : new Date();
        return entryDate >= start && entryDate <= end;
      });
    }

    return filteredEntries;
  };

  const exportToPDF = () => {
    const filteredEntries = filterEntries();
    const doc = new jsPDF();
    let yOffset = 20;

    // Título
    doc.setFontSize(20);
    doc.setTextColor(255, 105, 180);
    doc.text('Mi Diario Personal', 105, yOffset, { align: 'center' });
    yOffset += 20;

    // Entradas
    filteredEntries.forEach((entry, index) => {
      // Si no hay espacio suficiente en la página, crear una nueva
      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(0);

      // Fecha
      const date = new Date(entry.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.text(date, 20, yOffset);
      yOffset += 10;

      // Estado de ánimo y categoría
      if (entry.mood) {
        const mood = moods.find(m => m.value === entry.mood);
        doc.text(`Estado de ánimo: ${mood?.label}`, 20, yOffset);
        yOffset += 7;
      }
      if (entry.category) {
        const category = categories.find(c => c.value === entry.category);
        doc.text(`Categoría: ${category?.label}`, 20, yOffset);
        yOffset += 7;
      }

      // Contenido
      doc.setFontSize(10);
      const textLines = doc.splitTextToSize(entry.text, 170);
      doc.text(textLines, 20, yOffset);
      yOffset += textLines.length * 7 + 15;
    });

    doc.save('mi-diario.pdf');
  };

  const exportToWord = () => {
    const filteredEntries = filterEntries();

    let content = '<html><head><style>';
    content += 'body { font-family: Arial, sans-serif; }';
    content += 'h1 { color: #ff69b4; text-align: center; }';
    content += '.entry { margin-bottom: 20px; padding: 15px; border-bottom: 1px solid #ffd1dc; }';
    content += '.date { color: #666; }';
    content += '.metadata { margin: 10px 0; color: #ff69b4; }';
    content += '.content { line-height: 1.6; }';
    content += '</style></head><body>';

    content += '<h1>Mi Diario Personal</h1>';

    filteredEntries.forEach(entry => {
      content += '<div class="entry">';

      // Fecha
      content += `<div class="date">${new Date(entry.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</div>`;

      // Metadata
      content += '<div class="metadata">';
      if (entry.mood) {
        const mood = moods.find(m => m.value === entry.mood);
        content += `Estado de ánimo: ${mood?.label} `;
      }
      if (entry.category) {
        const category = categories.find(c => c.value === entry.category);
        content += `Categoría: ${category?.label}`;
      }
      content += '</div>';

      // Contenido
      content += `<div class="content">${entry.text}</div>`;
      content += '</div>';
    });

    content += '</body></html>';

    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mi-diario.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="export-dialog-overlay">
      <div className="export-dialog">
        <div className="export-dialog-header">
          <h2>Exportar Diario</h2>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="export-filters">
          <div className="filter-section">
            <h3>Filtrar por:</h3>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todo el diario</option>
              <option value="mood">Estado de ánimo</option>
              <option value="category">Categoría</option>
              <option value="date">Rango de fechas</option>
            </select>
          </div>

          {filterType === 'mood' && (
            <div className="filter-section">
              <h3>Estado de ánimo:</h3>
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccionar estado</option>
                {moods.map(mood => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {filterType === 'category' && (
            <div className="filter-section">
              <h3>Categoría:</h3>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {filterType === 'date' && (
            <div className="filter-section">
              <h3>Rango de fechas:</h3>
              <div className="date-range">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="date-input"
                />
                <span>hasta</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="date-input"
                />
              </div>
            </div>
          )}
        </div>

        <div className="export-actions">
          <button onClick={exportToWord} className="export-button word">
            <FileText /> Exportar a Word
          </button>
          <button onClick={exportToPDF} className="export-button pdf">
            <FileImage /> Exportar a PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;