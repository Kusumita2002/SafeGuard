// src/MessagePanel.js
import React from "react";

const MessagePanel = ({ messageEvents }) => {
  return (
    <div className="panel">
      <h2>Messaging Alerts</h2>
      <table className="sos-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Type</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {(!messageEvents || messageEvents.length === 0) && (
            <tr>
              <td colSpan="4">No emergency messages yet.</td>
            </tr>
          )}
          {messageEvents.map((evt) => (
            <tr key={evt.id}>
              <td>
                {evt.time ? new Date(evt.time).toLocaleString() : "-"}
              </td>
              <td>{evt.email}</td>
              <td>{evt.type}</td>
              <td>{evt.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagePanel;
