import React from 'react';
import './style.css';

const AIAssistant = ({ user, onTriggerSOS }) => {
  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <span className="ai-pill">Calm guidance</span>
        <span className="ai-status-dot" />
      </div>

      <p className="ai-assistant-text">
        Hello {user?.name || 'User'}, stay calm. Tap a quick action if you feel unsafe.
      </p>

      <div className="ai-quick-actions">
        <button
          className="ai-chip danger"
          onClick={onTriggerSOS}
        >
          I am in danger
        </button>
        <button className="ai-chip">
          Guide me to safe place
        </button>
        <button className="ai-chip">
          Alert contacts
        </button>
      </div>

      <div className="ai-footer-text">
        AI suggestions support you, but emergency services and saviours take real action.
      </div>
    </div>
  );
};

export default AIAssistant;