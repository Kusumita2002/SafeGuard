// src/ControlPanel.js
import React from "react";

const ControlPanel = ({ activeView, setActiveView, filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="control-panel panel">
      <h2>Control Panel</h2>

      <div className="view-switch">
        <button
          className={activeView === "overview" ? "active" : ""}
          onClick={() => setActiveView("overview")}
        >
          Overview
        </button>
        <button
          className={activeView === "live" ? "active" : ""}
          onClick={() => setActiveView("live")}
        >
          Live SOS
        </button>
        <button
          className={activeView === "user" ? "active" : ""}
          onClick={() => setActiveView("user")}
        >
          User Info
        </button>
        <button
          className={activeView === "analytics" ? "active" : ""}
          onClick={() => setActiveView("analytics")}
        >
          Analytics
        </button>
      </div>

      <div className="filters">
        <label>
          Status:
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>

        <label>
          From:
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleFilterChange}
          />
        </label>

        <label>
          To:
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleFilterChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
