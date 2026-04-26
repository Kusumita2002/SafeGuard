import React from 'react';
import SOSButton from '../components/SOSButton';

const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="screen home-screen">
      <h2>SafeGuard</h2>

      <div className="main-sos-section">
        <button className="big-sos-button">
          SOS
        </button>

        <div className="sos-options-grid">
          <button className="sos-option">🎤 Voice SOS</button>
          <button className="sos-option">🔴 Button SOS</button>
          <button className="sos-option">✍️ Manual SOS</button>
          <button className="sos-option" onClick={() => onNavigate('video')}>
            📹 Video Call
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <SOSButton />
      </div>
    </div>
  );
};

export default HomeScreen;
