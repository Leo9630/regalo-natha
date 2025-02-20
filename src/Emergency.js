import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Youtube,
  ArrowLeft,
  HelpCircle,
  Alarm,
  X
} from 'lucide-react';

const EMERGENCY_CONTACTS = [
  {
    name: "Mamá",
    phone: "3123592432",
    message: "Emergencia: Necesito ayuda urgente.",
    icon: "👩‍👧"
  },
  {
    name: "Papá",
    phone: "3114713155",
    message: "Emergencia: Necesito ayuda urgente.",
    icon: "👨‍👦"
  },
  {
    name: "Hermana",
    phone: "3115283005",
    message: "Emergencia: Necesito ayuda urgente.",
    icon: "👭"
  },
  {
    name: "Leo",
    phone: "3115283005",
    message: "Emergencia: Necesito ayuda urgente.",
    icon: "👥"
  }
];

const EmergencyButton = ({ icon: Icon, label, color, onClick, description }) => (
  <div
    className="emergency-quick-button"
    onClick={onClick}
    style={{
      backgroundColor: color,
      boxShadow: `0 10px 20px ${color}50`
    }}
  >
    <div className="emergency-button-content">
      <Icon className="emergency-button-icon" />
      <div className="emergency-button-text">
        <h3>{label}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Emergency = ({ onBack }) => {
  const [emergencyMode, setEmergencyMode] = useState(null);

  const triggerEmergencyCall = () => {
    window.location.href = 'tel:106';
    setEmergencyMode('call');
  };

  const sendWhatsAppMessage = (contact) => {
    const message = `🚨 ALERTA DE EMERGENCIA 🚨\n\n${contact.message}`;
    const whatsappUrl = contact.phone
      ? `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setEmergencyMode('message');
  };

  const openCalmingMusic = () => {
    window.open('https://www.youtube.com/watch?v=sYoqCJNPxv4', '_blank');
    setEmergencyMode('music');
  };

  return (
    <div className="emergency-full-container">
      <div className="emergency-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft /> Volver
        </button>
        <h1>Zona de Emergencia 🚨</h1>
      </div>

      <div className="emergency-buttons-grid">
        <EmergencyButton
          icon={Phone}
          label="Llamada de Emergencia"
          description="Contacta servicios de emergencia"
          color="#FF4136"
          onClick={triggerEmergencyCall}
        />

        <EmergencyButton
          icon={MessageCircle}
          label="Mensaje de Ayuda"
          description="Contacta a un familiar"
          color="#2ECC40"
          onClick={() => setEmergencyMode('contacts')}
        />

        <EmergencyButton
          icon={Youtube}
          label="Música Calmante"
          description="Relájate y respira"
          color="#0074D9"
          onClick={openCalmingMusic}
        />
      </div>

      {emergencyMode === 'contacts' && (
        <div className="emergency-contacts-modal">
          <div className="emergency-contacts-content">
            <h2>Selecciona un Contacto</h2>
            <div className="contacts-grid">
              {EMERGENCY_CONTACTS.map((contact, index) => (
                <button
                  key={index}
                  className="contact-button"
                  onClick={() => sendWhatsAppMessage(contact)}
                >
                  <span className="contact-emoji">{contact.icon}</span>
                  {contact.name}
                </button>
              ))}
            </div>
            <button
              className="close-contacts-modal"
              onClick={() => setEmergencyMode(null)}
            >
              <X /> Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;