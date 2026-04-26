import React from 'react';

const AIScreen = () => {
  return (
    <div className="screen">
      <h2>AI Safety Assistant</h2>
      <div className="chat-window">
        <div className="chat-bubble ai">
          Do you want to activate SOS?
        </div>
        <div className="chat-bubble ai">
          Nearest police station is 400m away.
        </div>
      </div>
      <div className="chat-actions">
        <button className="btn-primary">Activate SOS</button>
        <button className="btn-secondary">Show Route</button>
      </div>
    </div>
  );
};

export default AIScreen;


