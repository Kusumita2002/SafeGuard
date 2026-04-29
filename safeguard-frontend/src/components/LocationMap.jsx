// src/components/MyLocation.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MyLocation = ({ user }) => {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by this browser.');
      return;
    }

    setStatus('Getting your GPS location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setStatus('Location received. Sharing with server...');

        try {
          await fetch('https://safeguard-backend-1-4rf1.onrender.com/api/share-location-once', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              latitude,
              longitude,
            }),
          });
          setStatus(
            `Shared: Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`
          );
        } catch (err) {
          console.error(err);
          setStatus('Could not share location. Check server connection.');
        }
      },
      (error) => {
        console.error(error);
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('Permission denied. Please allow location in browser.');
        } else {
          setStatus('Could not get GPS. Try again.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  }, [user.email]);

  if (!coords) {
    return (
      <div className="sg-card">
        <h3>My Location</h3>
        <p style={{ fontSize: 12 }}>{status || 'Getting your location...'}</p>
      </div>
    );
  }

  return (
    <div className="sg-card">
      <h3>My Location</h3>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={16}
        style={{ width: '100%', height: '180px', borderRadius: 8 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
          <Popup>
            You are here
            <br />
            Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)}
          </Popup>
        </Marker>
      </MapContainer>
      <p style={{ marginTop: 6, fontSize: 12 }}>{status}</p>
    </div>
  );
};

export default MyLocation;
