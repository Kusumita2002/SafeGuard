import React from "react";

const GpsPanel = ({ gpsEvents }) => {
  return (
    <div className="panel">
      <h2>GPS Shares</h2>
      <table className="sos-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {(!gpsEvents || gpsEvents.length === 0) && (
            <tr>
              <td colSpan="4">No GPS shares yet.</td>
            </tr>
          )}
          {gpsEvents.map((evt) => (
            <tr key={evt.id}>
              <td>
                {evt.time ? new Date(evt.time).toLocaleString() : "-"}
              </td>
              <td>{evt.email}</td>
              <td>{evt.latitude}</td>
              <td>{evt.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GpsPanel;
