// src/RecentSosPanel.js
import React from "react";

const RecentSosPanel = ({ sosList, selectedId, onSelect }) => {
  return (
    <div className="panel alerts-panel">
      <h2 className="panel-title">Recent SOS Alerts</h2>

      <div className="alerts-table-header">
        <span>Status</span>
        <span>User Email</span>
        <span>Location</span>
        <span>Triggered At</span>
        <span>Action</span>
      </div>

      <div className="alerts-table-body">
        {sosList.map((sos) => {
          const isActive = sos.id === selectedId;

          const lat = sos.location?.latitude ?? sos.location?.lat;
          const lng = sos.location?.longitude ?? sos.location?.lng;

          const triggeredTime = sos.triggeredAt
            ? new Date(sos.triggeredAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-";

          const triggeredDate = sos.triggeredAt
            ? new Date(sos.triggeredAt).toLocaleDateString()
            : "";

          return (
            <button
              key={sos.id}
              type="button"
              className={`alerts-row ${isActive ? "alerts-row-active" : ""}`}
              onClick={() => onSelect(sos)}
            >
              <span>
                <span className={`status-pill status-${sos.status || "pending"}`}>
                  {(sos.status || "pending").toUpperCase()}
                </span>
              </span>

              <span className="alerts-email">
                {sos.userProfile?.email || "-"}
              </span>

              <span className="alerts-location">
                {lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : "-"}
              </span>

              <span className="alerts-triggered">
                <span>{triggeredTime}</span>
                <span className="alerts-triggered-date">{triggeredDate}</span>
              </span>

              <span>
                <span className="alerts-view-btn">View</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSosPanel;