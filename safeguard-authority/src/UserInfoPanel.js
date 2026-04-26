// src/UserInfoPanel.js
import React, { useState } from "react";

const UserInfoPanel = ({ selectedSos }) => {
  const [showMore, setShowMore] = useState(false);

  if (!selectedSos) {
    return (
      <div className="panel user-info-panel-empty">
        <h2>User Info</h2>
        <p>No user selected.</p>
      </div>
    );
  }

  const profile = selectedSos.userProfile || {};

  const name =
    profile.name ||
    "Unknown user";

  const email = profile.email || "";

  const phone = profile.phone || "";

  const emergencyContacts = Array.isArray(profile.emergencyContacts)
    ? profile.emergencyContacts
    : [];

  return (
    <div className="panel user-info-panel">
      <h2>User Info</h2>

      {/* basic info always visible */}
      <p>
        <strong>Name:</strong> {name}
      </p>

      {email && (
        <p>
          <strong>Email:</strong> {email}
        </p>
      )}

      {/* show all saviour / emergency contacts here */}
      {emergencyContacts.length > 0 ? (
        <div>
          <strong>Saviour contacts:</strong>
          <ul className="user-info-contacts-list">
            {emergencyContacts.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          <strong>Saviour contacts:</strong> Not provided
        </p>
      )}

      {/* always show toggle button */}
      <button
        type="button"
        className="user-info-toggle-btn"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Hide details" : "More details"}
      </button>

      {/* expanded details */}
      {showMore && (
        <div className="user-info-extra">
          {phone ? (
            <p>
              <strong>Phone:</strong> {phone}
            </p>
          ) : (
            <p>
              <strong>Phone:</strong> Not provided
            </p>
          )}

          {emergencyContacts.length === 0 && (
            <p style={{ fontSize: 13, color: "#cbd5e1" }}>
              User has not added any saviour contacts yet.
            </p>
          )}

          {!phone && (
            <p style={{ fontSize: 13, color: "#cbd5e1" }}>
              User has not saved a primary phone number.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoPanel;