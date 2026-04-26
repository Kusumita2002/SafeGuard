import React from 'react';

const InfoPanel = ({ aiMessage, instruction, onOpenGoogleMaps }) => {
  return (
    <div className="info-panel">
      <div className="ai-message">
        <i className="fas fa-robot"></i> {aiMessage}
      </div>
      <div className="distance-box">
        <span className="instruction-text">{instruction}</span>
        <button onClick={onOpenGoogleMaps} className="extra-nav-btn" style={{ background: '#34a853' }}>
          🗺️ Start Navigation
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;