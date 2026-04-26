import React from 'react';

const ProfileScreen = ({ user, onLogout }) => {
  return (
    <div className="screen">
      <h2>Profile & Settings</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone:</strong> {user?.phone}</p>
      <p><strong>Emergency Contacts:</strong> {user?.emergencyContacts?.join(', ') || 'None'}</p>

      <h3>SOS Preferences</h3>
      <ul>
        <li>Voice SOS: Enabled</li>
        <li>GPS Sharing: Enabled</li>
      </ul>

      <button className="btn-secondary" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfileScreen;
