// src/IncidentMap.js
import React, { useMemo, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "460px",        // taller map
  borderRadius: "14px",
  overflow: "hidden",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const IncidentMap = ({ selectedSos }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [pathPoints, setPathPoints] = useState([]);
  const [directions, setDirections] = useState(null);

  const lat = Number(
    selectedSos?.location?.lat ?? selectedSos?.location?.latitude
  );
  const lng = Number(
    selectedSos?.location?.lng ?? selectedSos?.location?.longitude
  );

  const hasLocation = !Number.isNaN(lat) && !Number.isNaN(lng);

  useEffect(() => {
    if (!hasLocation) return;

    setPathPoints((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.lat === lat && last.lng === lng) return prev;
      return [...prev, { lat, lng }];
    });
  }, [lat, lng, hasLocation]);

  useEffect(() => {
    if (!selectedSos?.id) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sos/${selectedSos.id}`);
        const data = await res.json();
        const newLat = Number(
          data.location?.lat ?? data.location?.latitude
        );
        const newLng = Number(
          data.location?.lng ?? data.location?.longitude
        );
        if (!Number.isNaN(newLat) && !Number.isNaN(newLng)) {
          setPathPoints((prev) => [...prev, { lat: newLat, lng: newLng }]);
        }
      } catch (err) {
        console.log("Polling error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedSos?.id]);

  const center = useMemo(() => {
    if (pathPoints.length > 0) {
      return pathPoints[pathPoints.length - 1];
    }
    return { lat: 20, lng: 78 };
  }, [pathPoints]);

  const policeLocation = {
    lat: 19.9,
    lng: 83.1,
  };

  const directionsCallback = (result) => {
    if (result && result.status === "OK") {
      setDirections(result);
    }
  };

  if (!selectedSos || !hasLocation) {
    return (
      <div style={containerStyle}>
        <div style={emptyStyle}>No location for this SOS.</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={containerStyle}>
        <div style={emptyStyle}>Loading map...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={mapOptions}
      >
        {pathPoints.length > 1 && (
          <Polyline
            path={pathPoints}
            options={{
              strokeColor: "#2563eb",
              strokeWeight: 4,
            }}
          />
        )}

        {pathPoints.length > 0 && window.google && (
          <Marker
            position={pathPoints[0]}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#10b981",
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 2,
            }}
          />
        )}

        {pathPoints.length > 0 && window.google && (
          <Marker
            position={pathPoints[pathPoints.length - 1]}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#ef4444",
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 2,
            }}
          />
        )}

        <Marker position={policeLocation} label="P" />

        {!directions && (
          <DirectionsService
            options={{
              origin: policeLocation,
              destination: center,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

const emptyStyle = {
  width: "100%",
  height: "100%",
  background: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
};

export default IncidentMap;