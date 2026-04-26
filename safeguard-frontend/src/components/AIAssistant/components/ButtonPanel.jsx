import React from 'react';

const ButtonPanel = ({ onFindSafePlace, onGuideMe, onHelpline, onAlertContacts, onVoiceHelp }) => {
  return (
    <>
      <div className="primary-buttons two-buttons">
        <button onClick={onFindSafePlace} className="danger-btn">
          <i className="fas fa-exclamation-triangle small-icon"></i> 🚨 I am in danger find safe place
        </button>
        <button onClick={onGuideMe} className="guide-btn">
          <i className="fas fa-map-marked-alt small-icon"></i> 🧭 Guide Me Safely
        </button>
      </div>
      <div className="secondary-buttons">
        <button onClick={onHelpline} className="secondary-btn">
          <i className="fas fa-phone-alt"></i> 📞 Help Line
        </button>
        <button onClick={onAlertContacts} className="secondary-btn">
          <i className="fas fa-users"></i> 👥 Alert Contacts
        </button>
        <button onClick={onVoiceHelp} className="secondary-btn">
          <i className="fas fa-microphone-alt"></i> 🔊 Voice Help
        </button>
      </div>
    </>
  );
};

export default ButtonPanel;