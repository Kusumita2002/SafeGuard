import React from 'react';
import LocationMap from '../components/LocationMap';

const LocationScreen = ({ user }) => {
  return (
    <div className="screen">
      <h2>GPS Location Sharing</h2>
      <LocationMap user={user} />

      <div className="gps-status">
        <p>Shared with: Police, Emergency Contacts</p>
        <p>Last updated: just now</p>
      </div>

      <div className="gps-actions">
        <button className="btn-primary">Stop Sharing</button>
        <button className="btn-secondary">Call Emergency Contact</button>
      </div>
    </div>
  );
};

export default LocationScreen;
