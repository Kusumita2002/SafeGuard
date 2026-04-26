import React from "react";

const VoicePanel = ({ voiceEvents, mode }) => {
  const title =
    mode === "ai" ? "AI Assistant SOS" : "Voice SOS Alerts";

  const description =
    mode === "ai"
      ? "Get calm guidance and quick actions during panic based on AI assistant triggers."
      : "All voice-triggered SOS events with timing, location and user."

  return (
    <div className="panel">
      <h2>{title}</h2>
      <p style={{ marginBottom: "0.5rem" }}>{description}</p>
      <table className="sos-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {(!voiceEvents || voiceEvents.length === 0) && (
            <tr>
              <td colSpan="3">No events yet.</td>
            </tr>
          )}
          {voiceEvents.map((evt) => (
            <tr key={evt.id}>
              <td>
                {evt.createdAt
                  ? new Date(evt.createdAt).toLocaleString()
                  : "-"}
              </td>
              <td>{evt.userId}</td>
              <td>
                {evt.details?.message || "Voice/AI triggered SOS"}
                {evt.details?.location && (
                  <>
                    {" "}
                    — {evt.details.location.latitude},{" "}
                    {evt.details.location.longitude}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoicePanel;
