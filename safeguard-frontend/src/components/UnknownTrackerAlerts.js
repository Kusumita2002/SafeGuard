// src/components/UnknownTrackerAlerts.js
import React, { useState } from 'react';
import '../App.css'; // or remove if App.js already imports App.css

const UnknownTrackerAlerts = () => {
  const [locationOn, setLocationOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const handleTurnOnLocation = () => {
    setLocationOn(true);
  };

  const handleManualScan = async () => {
    setScanning(true);
    setAlerts([]);

    try {
      if (!navigator.bluetooth) {
        alert(
          'Web Bluetooth not supported. Use Chrome on desktop/Android over HTTPS.'
        );
        return;
      }

      // Manual scan for any nearby BLE device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });

      const name = device.name || 'Unnamed Bluetooth device';
      setAlerts([`${name} (${device.id.slice(-6)})`]);
    } catch (err) {
      if (err.name !== 'NotFoundError') {
        console.error(err);
        alert('Scan failed or permission denied.');
      }
    } finally {
      setScanning(false);
    }
  };

  const hasTracker = alerts.length > 0;

  return (
    <div className="tracker-section">
      <h2 className="tracker-title">Unknown tracker alerts</h2>

      {!locationOn && (
        <div className="tracker-card tracker-location-card">
          <div className="tracker-card-icon">📍</div>
          <div className="tracker-card-body">
            <h3>Location required</h3>
            <p>To receive Unknown tracker alerts, turn on device location.</p>
            <p>You can still run manual scans without turning on device location.</p>
            <button
              type="button"
              className="tracker-link-button"
              onClick={handleTurnOnLocation}
            >
              Turn on location
            </button>
          </div>
        </div>
      )}

      <div className="tracker-card tracker-status-card">
        <div className="tracker-status-icon">🛡️</div>
        <div className="tracker-status-text">
          <div className="tracker-status-title">
            {hasTracker ? 'Tracker found' : 'No tracker alerts'}
          </div>
          <div className="tracker-status-sub">
            {scanning ? 'Scanning…' : 'Scanning paused'}
          </div>
        </div>
      </div>

      <div className="tracker-manual">
        <h3>Manual scan</h3>
        <p>
          Check for trackers near you right now that are separated from their owner.
        </p>

        <button
          type="button"
          className="tracker-scan-button"
          onClick={handleManualScan}
          disabled={scanning}
        >
          {scanning ? 'Scanning…' : 'Scan now'}
        </button>

        <p className="tracker-info">
          Trackers are small Bluetooth devices that owners can attach to items,
          like their keys or bags, to locate them.
        </p>

        {hasTracker && (
          <div className="tracker-results">
            {alerts.map((t, i) => (
              <div key={i} className="tracker-result-item">
                • {t}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnknownTrackerAlerts;
