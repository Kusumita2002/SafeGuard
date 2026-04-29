// src/components/Dashboard.js
import React, { useState } from 'react';
import VideoCall from './VideoCall';
import LocationMap from './LocationMap';
import VoiceSOS from './VoiceSOS';
import AIAssistant from './AIAssistant';
import EmergencySOS from './EmergencySOS';
import UnknownTrackerAlerts from './UnknownTrackerAlerts';

import gpsSharingImg from './assets/gps-sharing.jpg';
import aiAssistantImg from './assets/ai-assistant.jpg';
import emergencyMsgImg from './assets/emergency-messaging.jpg';
import videoCallImg from './assets/video-call.jpg';
import voiceSosImg from './assets/voice-sos.jpg';

const Dashboard = ({ user, onLogout }) => {
  const [mode, setMode] = useState('home');
  const [customMsg, setCustomMsg] = useState('');
  const [featureGps, setFeatureGps] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    phone: user.phone || '',
    landmark: '',
    city: '',
    district: '',
    stateName: '',
    country: '',
    saviour1: '',
    saviour2: '',
    gender: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [howtoSearch, setHowtoSearch] = useState('');
  const [featureFilter, setFeatureFilter] = useState('all');
  const [activeHowTo, setActiveHowTo] = useState('video');

  const [feedback, setFeedback] = useState({
    name: user.name || '',
    email: user.email || '',
    message: '',
  });
  const [feedbackStatus, setFeedbackStatus] = useState('');

  const howtoImages = {
    gps: gpsSharingImg,
    ai: aiAssistantImg,
    messaging: emergencyMsgImg,
    video: videoCallImg,
    voice: voiceSosImg,
  };

  const howtoItems = [
    {
      key: 'video',
      title: 'SafeGuard Video Call – How to use',
      steps: [
        'Launch the application on your device.',
        'Navigate to the main dashboard.',
        'Start a video call with authorities.',
        'Establish a connection with the authorities.',
        'Start recording the video call conversation.',
      ],
    },
    {
      key: 'gps',
      title: 'GPS Sharing with Saviour – How to use',
      steps: [
        'Click "Share Live GPS" in the Features page.',
        'Allow location permission when the browser asks.',
        'Your current latitude and longitude are sent to the backend.',
        'Authorities and saviours receive your live GPS link.',
      ],
    },
    {
      key: 'messaging',
      title: 'Emergency Messaging – How to use',
      steps: [
        'Go to the "Messaging" card in Features.',
        'Use quick buttons like "I am in danger" or "Track my live location".',
        'To send your own text, type it and click "Send Custom Message".',
        'Messages are delivered to your saved saviour contacts via backend integration.',
      ],
    },
    {
      key: 'ai',
      title: 'AI Safety Assistant – How to use',
      steps: [
        'Open the "AI Assistant" card in Features.',
        'Read the calm guidance messages.',
        'When ready, press quick actions like "Activate SOS".',
        'AI guidance supports you, but real help still comes from authorities and saviours.',
      ],
    },
    {
      key: 'voice',
      title: 'Voice SOS – How to use',
      steps: [
        'Open the "Voice SOS" card in Features.',
        'Allow microphone access when the browser asks.',
        'Say your safe word or SOS phrase to trigger SOS.',
        'Wait for confirmation that SOS has been sent.',
      ],
    },
  ];

  const handleTriggerSOS = async () => {
    await fetch('https://safeguard-backend-1-4rf1.onrender.com/api/sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        message: 'Voice/AI triggered SOS',
      }),
    });
  };

  const sendEmergencyMessage = async (type, text) => {
    await fetch('https://safeguard-backend-1-4rf1.onrender.com/api/send-emergency-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        type,
        customText: text || undefined,
      }),
    });
  };

  return (
    <div className="sg-dashboard">
      {/* HEADER */}
      <header className="sg-hero">
        <div className="sg-hero-inner">
          <div className="sg-logo-block">
            <div className="sg-logo-icon">🛡️</div>
            <div>
              <h1 className="sg-logo-text">SafeGuard</h1>
              <p className="sg-subtitle-text">
                AI-Powered Citizen Safety Platform
              </p>
              <p className="sg-welcome-text">Welcome, {user.name}</p>
            </div>
          </div>

          <div className="sg-user-info-top">
            <button
              className={`sg-home-tab-btn ${mode === 'home' ? 'active' : ''}`}
              onClick={() => setMode('home')}
            >
              Home
            </button>
            <button
              className={`sg-home-tab-btn ${mode === 'howto' ? 'active' : ''}`}
              onClick={() => setMode('howto')}
            >
              How to use
            </button>
            <button
              className={`sg-home-tab-btn ${
                mode === 'features' ? 'active' : ''
              }`}
              onClick={() => setMode('features')}
            >
              Features
            </button>
            <button
              className={`sg-home-tab-btn ${
                mode === 'contact' ? 'active' : ''
              }`}
              onClick={() => setMode('contact')}
            >
              Contact us
            </button>

            <button onClick={onLogout} className="sg-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="sg-main">
        {/* HOME */}
        {mode === 'home' && (
          <section className="sg-home-row">
            <div className="sg-card sg-profile-card-big">
              <div className="sg-profile-header">
                <div className="sg-profile-photo">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" />
                  ) : (
                    <span>{user.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h2 className="sg-profile-title">Your Profile</h2>
                  <p className="sg-profile-name-big">{user.name}</p>
                  <label className="sg-photo-upload-label">
                    Change photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => setProfilePhoto(reader.result);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>
                {!isEditing && (
                  <button
                    className="sg-btn sg-btn-secondary sg-profile-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>

              <p className="sg-profile-row">
                <strong>Email:</strong> {user.email}
              </p>

              {isEditing ? (
                <>
                  {[
                    ['Phone', 'phone'],
                    ['Landmark', 'landmark'],
                    ['City', 'city'],
                    ['District', 'district'],
                    ['State', 'stateName'],
                    ['Country', 'country'],
                    ['Saviour contact 1', 'saviour1'],
                    ['Saviour contact 2', 'saviour2'],
                  ].map(([label, key]) => (
                    <label className="sg-field-label" key={key}>
                      {label}:
                      <input
                        type="text"
                        value={profileData[key]}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            [key]: e.target.value,
                          })
                        }
                      />
                    </label>
                  ))}

                  <label className="sg-field-label">
                    Gender:
                    <select
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                    <button
                      className="sg-btn sg-btn-primary"
                      onClick={() => setIsEditing(false)}
                    >
                      Save
                    </button>
                    <button
                      className="sg-btn sg-btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {[
                    ['Phone', 'phone'],
                    ['Landmark', 'landmark'],
                    ['City', 'city'],
                    ['District', 'district'],
                    ['State', 'stateName'],
                    ['Country', 'country'],
                    ['Saviour contact 1', 'saviour1'],
                    ['Saviour contact 2', 'saviour2'],
                    ['Gender', 'gender'],
                  ].map(([label, key]) => (
                    <p className="sg-profile-row" key={key}>
                      <strong>{label}:</strong>{' '}
                      {profileData[key] || 'Not set'}
                    </p>
                  ))}
                </>
              )}
            </div>

            <div className="sg-home-right">
              <EmergencySOS user={user} />
            </div>
          </section>
        )}

        {/* HOW TO USE */}
        {mode === 'howto' && (
          <section className="sg-howto-section" style={{ width: '100%' }}>
            <div className="sg-card">
              <h2>User Manual – How to use SafeGuard</h2>
              <input
                className="sg-howto-search"
                type="text"
                placeholder="Type topic or 'all' to show every topic..."
                value={howtoSearch}
                onChange={(e) => setHowtoSearch(e.target.value)}
              />

              <div className="sg-howto-tabs">
                <div className="sg-howto-tab-buttons">
                  {howtoItems.map((item) => (
                    <button
                      key={item.key}
                      className={
                        'sg-howto-tab-btn' +
                        (activeHowTo === item.key ? ' active' : '')
                      }
                      onClick={() => setActiveHowTo(item.key)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                {howtoItems
                  .filter((item) => {
                    const q = howtoSearch.toLowerCase().trim();
                    if (q === '' || q === 'all') return true;
                    return item.title.toLowerCase().includes(q);
                  })
                  .filter((item) => item.key === activeHowTo)
                  .map((item) => (
                    <div className="sg-howto-fullcard" key={item.key}>
                      <div className="sg-howto-icon">
                        {item.key === 'video' && '🎥'}
                        {item.key === 'gps' && '📍'}
                        {item.key === 'messaging' && '✉️'}
                        {item.key === 'ai' && '🤖'}
                        {item.key === 'voice' && '🎙️'}
                      </div>

                      <h3>{item.title}</h3>
                      <ol>
                        {item.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>

                      {howtoImages[item.key] && (
                        <div
                          className="sg-howto-image-card"
                          style={{ marginTop: 12 }}
                        >
                          <img
                            src={howtoImages[item.key]}
                            alt={item.title}
                            style={{ width: '100%', borderRadius: 8 }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURES */}
        {mode === 'features' && (
          <section className="sg-features-page" style={{ width: '100%' }}>
            <div className="sg-card">
              <h2>SafeGuard Features</h2>
              <select
                className="sg-feature-select"
                value={featureFilter}
                onChange={(e) => setFeatureFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="video">Video Call</option>
                <option value="gps">GPS</option>
                <option value="messaging">Messaging</option>
                <option value="voice">Voice SOS</option>
                <option value="ai">AI Assistant</option>
              </select>

              <div className="sg-features-grid">
                {(featureFilter === 'all' || featureFilter === 'video') && (
                  <div className="sg-card sg-video-card">
                    <h3>Video Call</h3>
                    <VideoCall />
                  </div>
                )}

                {(featureFilter === 'all' || featureFilter === 'gps') && (
                  <div className="sg-card sg-gps-card">
                    <h3>GPS</h3>
                    <div className="sg-gps-layout">
                      <div className="sg-gps-map">
                        <LocationMap user={user} />
                      </div>
                      <div className="sg-gps-side">
                        <p className="sg-gps-label">Sharing GPS with</p>
                        <div className="sg-gps-buttons">
                          <button
                            className="sg-btn sg-btn-primary"
                            onClick={async () => {
                              if (!navigator.geolocation) {
                                alert(
                                  'Geolocation is not supported by this browser.'
                                );
                                return;
                              }

                              navigator.geolocation.getCurrentPosition(
                                async (position) => {
                                  const { latitude, longitude } =
                                    position.coords;
                                  setFeatureGps({ latitude, longitude });

                                  await fetch(
                                    'https://safeguard-backend-1-4rf1.onrender.com/api/share-location-once',
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        email: user.email,
                                        latitude,
                                        longitude,
                                      }),
                                    }
                                  );
                                },
                                (error) => {
                                  console.error(error);
                                  alert(
                                    'Could not get GPS location. Please allow location permission.'
                                  );
                                },
                                {
                                  enableHighAccuracy: true,
                                  timeout: 15000,
                                }
                              );
                            }}
                          >
                            Share Live GPS
                          </button>
                          <button
                            className="sg-btn sg-btn-secondary"
                            onClick={async () => {
                              await fetch(
                                'https://safeguard-backend-1-4rf1.onrender.com/api/stop-location',
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ email: user.email }),
                                }
                              );
                              setFeatureGps(null);
                            }}
                          >
                            Stop Sharing
                          </button>
                        </div>

                        {featureGps && (
                          <p style={{ marginTop: 6, fontSize: 12 }}>
                            Current location: Lat{' '}
                            {featureGps.latitude.toFixed(5)}, Lng{' '}
                            {featureGps.longitude.toFixed(5)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(featureFilter === 'all' || featureFilter === 'messaging') && (
                  <div className="sg-card">
                    <h3>Messaging</h3>
                    <p>Quickly notify authorities and your trusted contacts.</p>
                    <div className="sg-emergency-msg">
                      <button
                        className="sg-btn sg-btn-primary"
                        onClick={() => sendEmergencyMessage('danger')}
                      >
                        Send "I am in danger, please help"
                      </button>
                      <button
                        className="sg-btn sg-btn-secondary"
                        onClick={() => sendEmergencyMessage('track')}
                      >
                        Send "Track my live location"
                      </button>
                      <textarea
                        className="sg-message-box"
                        value={customMsg}
                        onChange={(e) => setCustomMsg(e.target.value)}
                        placeholder="Type a custom emergency message..."
                      />
                      <button
                        className="sg-btn sg-btn-primary"
                        onClick={() =>
                          sendEmergencyMessage('custom', customMsg)
                        }
                      >
                        Send Custom Message
                      </button>
                    </div>
                  </div>
                )}

                {(featureFilter === 'all' || featureFilter === 'voice') && (
                  <div className="sg-card">
                    <h3>Voice SOS</h3>
                    <p>Trigger SOS hands-free using your voice.</p>
                    <VoiceSOS onTriggerSOS={handleTriggerSOS} />
                  </div>
                )}

                {(featureFilter === 'all' || featureFilter === 'ai') && (
                 <div className="sg-card">
                   <h3>AI Assistant</h3>
                   <p>Get calm guidance and quick actions during panic.</p>
                   <AIAssistant user={user} onTriggerSOS={handleTriggerSOS} />
                 </div>
                )}

                {/* Unknown tracker alerts full-width card */}
                {featureFilter === 'all' && (
                  <div className="sg-card tracker-full">
                    <UnknownTrackerAlerts />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT US */}
        {mode === 'contact' && (
          <section className="sg-features-page" style={{ width: '100%' }}>
            <div className="sg-card">
              <h2>Contact Us / Feedback</h2>
              <p>Tell us what you feel about SafeGuard or report any issue.</p>

              <div className="sg-contact-info">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@safeguardapp.com">
                    support@safeguardapp.com
                  </a>
                </p>
                <p>
                  <strong>Contact No:</strong> +91-98765-43210
                </p>
                <p>
                  <strong>Fax:</strong> +91-11-4000-1234
                </p>
              </div>

              <form
                className="sg-feedback-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFeedbackStatus('Sending...');
                  try {
                    const res = await fetch(
                      'https://safeguard-backend-1-4rf1.onrender.com/api/feedback',
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(feedback),
                      }
                    );
                    const data = await res.json();
                    setFeedbackStatus(data.message || 'Sent.');
                    if (data.success) {
                      setFeedback((prev) => ({ ...prev, message: '' }));
                    }
                  } catch (err) {
                    setFeedbackStatus('Could not send. Try again.');
                  }
                }}
              >
                <label className="sg-field-label">
                  Name:
                  <input
                    type="text"
                    value={feedback.name}
                    onChange={(e) =>
                      setFeedback({ ...feedback, name: e.target.value })
                    }
                  />
                </label>

                <label className="sg-field-label">
                  Email:
                  <input
                    type="email"
                    value={feedback.email}
                    onChange={(e) =>
                      setFeedback({ ...feedback, email: e.target.value })
                    }
                  />
                </label>

                <label className="sg-field-label">
                  Message:
                  <textarea
                    className="sg-message-box"
                    value={feedback.message}
                    onChange={(e) =>
                      setFeedback({ ...feedback, message: e.target.value })
                    }
                    placeholder="Share feedback, suggestions, or issues..."
                  />
                </label>

                <button type="submit" className="sg-btn sg-btn-primary">
                  Send Feedback
                </button>
                {feedbackStatus && (
                  <p style={{ fontSize: 13, marginTop: 4 }}>
                    {feedbackStatus}
                  </p>
                )}
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;