// src/ActivityPanel.js
import React from "react";

const typeLabels = {
  gps: "GPS location shared",
  message: "Emergency message",
  voice_sos: "Voice / AI SOS",
  sos: "SOS",
  ai_assistant: "AI assistant",
  video_call: "Video call",
};

const ActivityPanel = ({ activity }) => {
  return (
    <div className="panel">
      <h2>All Triggers</h2>
      <table className="sos-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {(!activity || activity.length === 0) && (
            <tr>
              <td colSpan="4">No activity yet.</td>
            </tr>
          )}
          {activity &&
            activity.map((evt) => (
              <tr key={evt.id}>
                <td>
                  {evt.createdAt
                    ? new Date(evt.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td>{evt.userId}</td>
                <td>{typeLabels[evt.type] || evt.type}</td>
                <td>{renderDetails(evt)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

function renderDetails(evt) {
  const d = evt.details || {};

  if (evt.type === "gps" && d.latitude && d.longitude) {
    return `Lat ${d.latitude}, Lng ${d.longitude}`;
  }

  if (evt.type === "message" && d.text) {
    return d.text;
  }

  if (evt.type === "voice_sos" && d.message) {
    return d.message;
  }

  return JSON.stringify(d);
}

export default ActivityPanel;
