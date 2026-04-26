// src/AiPanel.js
import React from "react";

const AiPanel = ({ aiEvents }) => {
  return (
    <div className="panel">
      <h2>AI Assistant Alerts</h2>
      <p style={{ marginBottom: "0.5rem" }}>
        All AI assistant guidance events with timing, user and message.
      </p>
      <table className="sos-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Message / Conversation</th>
          </tr>
        </thead>
        <tbody>
          {(!aiEvents || aiEvents.length === 0) && (
            <tr>
              <td colSpan="3">No AI assistant events yet.</td>
            </tr>
          )}
          {aiEvents.map((evt) => (
            <tr key={evt.id}>
              <td>
                {evt.createdAt
                  ? new Date(evt.createdAt).toLocaleString()
                  : "-"}
              </td>
              <td>{evt.userId}</td>
              <td>{evt.details?.message || "AI assistant triggered"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AiPanel;
