import React from 'react';

const MessagesScreen = () => {
  return (
    <div className="screen">
      <h2>Emergency Messaging</h2>
      <div className="templates">
        <button className="template-btn">
          I am in danger, please help.
        </button>
        <button className="template-btn">
          Track my location.
        </button>
      </div>
      <textarea
        className="message-box"
        placeholder="Edit or type your emergency message..."
      />
      <div className="gps-actions">
        <button className="btn-primary">Send to Contacts</button>
      </div>
    </div>
  );
};

export default MessagesScreen;
