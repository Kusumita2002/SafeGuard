// src/components/EmergencySOS.js
import React, { useState, useRef } from 'react';

const EmergencySOS = ({ user }) => {
  const [status, setStatus] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [sosPopup, setSosPopup] = useState(false);

  const videoStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const stopAllStreams = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((t) => t.stop());
      videoStreamRef.current = null;
    }
  };

  const triggerSOS = async () => {
    try {
      setIsRunning(true);
      setStatus('Requesting camera & microphone access...');

      // 1. Camera (back) + mic
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: true,
      });
      videoStreamRef.current = stream;

      // 2. Start video recording
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.start();
      setStatus('Recording video from camera...');

      // 3. Take photo
      const videoTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      const photoBlob = await imageCapture.takePhoto();
      setPhotoUrl(URL.createObjectURL(photoBlob));

      // 4. Separate audio recording
      audioChunksRef.current = [];
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioRecorder = new MediaRecorder(audioStream);
      audioRecorderRef.current = audioRecorder;
      audioRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      audioRecorder.start();
      setStatus('Recording voice...');

      // 5. GPS
      setStatus('Getting current GPS location...');
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
        });
      });
      const { latitude, longitude } = position.coords;
      setLastLocation({ latitude, longitude });

      // 6. Wait then stop recordings
      await new Promise((resolve) => setTimeout(resolve, 8000));
      mediaRecorder.stop();
      audioRecorder.stop();

      await new Promise((resolve) => {
        mediaRecorder.onstop = resolve;
      });
      await new Promise((resolve) => {
        audioRecorder.onstop = resolve;
      });

      stopAllStreams();

      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

      setStatus('Preparing data to send...');

      // 7. Automatically send to backend
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('photo', photoBlob, 'sos-photo.jpg');
      formData.append('video', videoBlob, 'sos-video.webm');
      formData.append('audio', audioBlob, 'sos-audio.webm');
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const res = await fetch('http://localhost:5000/api/emergency-sos', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('SOS data sent to authorities and saviours.');
      } else {
        setStatus(data.message || 'Could not send SOS data.');
      }
    } catch (err) {
      console.error(err);
      setStatus('SOS failed. Please allow camera, mic & location and try again.');
      stopAllStreams();
    } finally {
      setIsRunning(false);
    }
  };

    return (
    <div className="sg-sos-layout">
      <div className="sg-sos-top">
        <button
          className="sg-sos-big-btn"
          onClick={triggerSOS}
          disabled={isRunning}
        >
          EMERGENCY SOS
        </button>
      </div>

      <div className="sg-sos-cards">
        {/* GPS card */}
        <div className="sg-card sg-sos-gps-card">
          <h3>GPS Location Sharing</h3>
          <p className="sg-sos-label">
            SHARING GPS WITH
            {lastLocation && (
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  textTransform: 'none',
                  marginTop: 2,
                }}
              >
                Lat: {lastLocation.latitude.toFixed(5)}, Lng:{' '}
                {lastLocation.longitude.toFixed(5)}
              </span>
            )}
          </p>
        </div>

        {/* Share Photos/Videos card */}
        <div className="sg-card sg-sos-upload-card">
          <h3>Share Photos/Videos</h3>

          <div
  style={{
    width: '100%',          // fill card width
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    background: '#e5e7eb',
  }}
>
  {photoUrl && (
    <img
      src={photoUrl}
      alt="Last SOS snapshot"
      style={{
        width: '100%',       // scale width with card
        height: 'auto',      // auto height from camera frame
        display: 'block',
      }}
    />
  )}
</div>

          <p className="sg-sos-note">
            On SOS, your live location, photo, video and voice are captured and
            sent automatically.
          </p>
        </div>
      </div>

      {status && <p className="sg-sos-status">{status}</p>}
    </div>
  );
};

export default EmergencySOS;
