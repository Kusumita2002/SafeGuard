// src/MainView.js
import React from "react";
import IncidentMap from "./IncidentMap";

const MainView = ({ selectedSos }) => {
  if (!selectedSos) {
    return (
      <div className="auth-main-view-empty">
        <p>No SOS selected. Click an alert on the left.</p>
      </div>
    );
  }

  const { id, triggeredAt, message, location, media } = selectedSos;

  const photoUrl = media?.photoUrl
    ? `http://localhost:5000${media.photoUrl}`
    : null;

  const videoUrl = media?.videoUrl
    ? `http://localhost:5000${media.videoUrl}`
    : null;

  const audioUrl = media?.audioUrl
    ? `http://localhost:5000${media.audioUrl}`
    : null;

  const latitude = Number(location?.lat ?? location?.latitude);
  const longitude = Number(location?.lng ?? location?.longitude);

  const hasLocation = !Number.isNaN(latitude) && !Number.isNaN(longitude);

  const openMapInNewTab = () => {
    if (!hasLocation) return;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=18`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="auth-main-view-wrap">
      {/* Top row: coords + button */}
      <div className="auth-incident-header-row">
        <p className="auth-incident-coords">
          {hasLocation
            ? `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
            : "No location available"}
        </p>

        {hasLocation && (
          <button
            type="button"
            className="auth-map-open-btn"
            onClick={openMapInNewTab}
          >
            Open full map
          </button>
        )}
      </div>

      <div className="auth-incident-grid auth-incident-grid-taller">
        {/* LEFT: BIGGER LIVE MAP */}
        <div className="auth-map-card auth-map-card-tall">
          <IncidentMap selectedSos={selectedSos} />
        </div>

        {/* RIGHT: MEDIA */}
        <div className="auth-media-stack auth-media-stack-tall">
          {photoUrl ? (
            <img src={photoUrl} alt="SOS" className="auth-media-photo" />
          ) : (
            <div className="auth-media-placeholder">No photo</div>
          )}

          <div className="auth-media-label">LIVE MEDIA FEEDS</div>

          {videoUrl ? (
            <video src={videoUrl} controls className="auth-media-video" />
          ) : (
            <div className="auth-media-placeholder small">No video</div>
          )}

          {audioUrl ? (
            <audio src={audioUrl} controls className="auth-media-audio" />
          ) : (
            <div className="auth-media-placeholder audio">No audio</div>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="auth-incident-meta">
        <p>
          <strong>SOS ID:</strong> {id}
        </p>
        <p>
          <strong>Triggered At:</strong>{" "}
          {triggeredAt ? new Date(triggeredAt).toLocaleString() : "-"}
        </p>
        <p>
          <strong>Message:</strong> {message || "Emergency SOS"}
        </p>
      </div>
    </div>
  );
};

export default MainView;