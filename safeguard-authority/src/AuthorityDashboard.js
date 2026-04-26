// src/AuthorityDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import RecentSosPanel from "./RecentSosPanel";
import MainView from "./MainView";
import UserInfoPanel from "./UserInfoPanel";
import ActivityPanel from "./ActivityPanel";
import MessagePanel from "./MessagePanel";
import VoicePanel from "./VoicePanel";
import AiPanel from "./AiPanel";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const API_BASE_URL = "http://localhost:5000";

const AuthorityDashboard = () => {
  const navigate = useNavigate();

  const [mainView, setMainView] = useState("sos");
  const authorityId = "authority1@safeguard";

  const [sosList, setSosList] = useState([]);
  const [selectedSos, setSelectedSos] = useState(null);

  const [activity, setActivity] = useState([]);
  const [messageEvents, setMessageEvents] = useState([]);
  const [voiceEvents, setVoiceEvents] = useState([]);
  const [aiEvents, setAiEvents] = useState([]);

  const AUTH_HEADERS = {
    headers: {
      "x-authority-secret": process.env.REACT_APP_AUTHORITY_SECRET,
    },
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #eef4ff 0%, #f8fbff 45%, #ffffff 100%)",
      padding: "20px",
      color: "#12305f",
      fontFamily: "Inter, Arial, sans-serif",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      marginBottom: "18px",
      background: "#ffffff",
      border: "1px solid #d8e6ff",
      borderRadius: "18px",
      padding: "18px 20px",
      boxShadow: "0 10px 25px rgba(42, 111, 255, 0.08)",
    },
    headerTitle: {
      margin: 0,
      fontSize: "28px",
      fontWeight: 800,
      color: "#0f3d91",
    },
    headerSub: {
      marginTop: "6px",
      fontSize: "14px",
      color: "#5f7fb8",
      fontWeight: 500,
    },
    logoutBtn: {
      background: "#1f6bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      padding: "12px 18px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 8px 18px rgba(31, 107, 255, 0.22)",
    },
    topPanel: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      background: "#ffffff",
      border: "1px solid #d8e6ff",
      borderRadius: "18px",
      padding: "14px",
      marginBottom: "18px",
      boxShadow: "0 8px 20px rgba(42, 111, 255, 0.06)",
    },
    navButton: {
      background: "#edf4ff",
      color: "#1a4fa3",
      border: "1px solid #cfe0ff",
      borderRadius: "12px",
      padding: "10px 16px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    activeNavButton: {
      background: "#1f6bff",
      color: "#ffffff",
      border: "1px solid #1f6bff",
      boxShadow: "0 8px 18px rgba(31, 107, 255, 0.20)",
    },
    panel: {
      background: "#ffffff",
      border: "1px solid #d8e6ff",
      borderRadius: "20px",
      padding: "18px",
      boxShadow: "0 10px 24px rgba(42, 111, 255, 0.08)",
      minHeight: "100%",
    },
    rootGrid: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1.3fr 1fr",
      gap: "18px",
      alignItems: "start",
    },
    sectionTitle: {
      margin: "0 0 12px 0",
      fontSize: "20px",
      fontWeight: 800,
      color: "#17438f",
    },
    mainTitle: {
      margin: "0 0 14px 0",
      fontSize: "24px",
      fontWeight: 800,
      color: "#0f3d91",
    },
    locationText: {
      margin: "0 0 12px 0",
      padding: "10px 12px",
      background: "#f2f7ff",
      border: "1px solid #d6e5ff",
      borderRadius: "12px",
      color: "#3b64a5",
      fontSize: "14px",
      fontWeight: 600,
    },
    secondaryContent: {
      background: "#ffffff",
      border: "1px solid #d8e6ff",
      borderRadius: "20px",
      padding: "18px",
      boxShadow: "0 10px 24px rgba(42, 111, 255, 0.08)",
    },
  };

  const getNavButtonStyle = (view) => ({
    ...styles.navButton,
    ...(mainView === view ? styles.activeNavButton : {}),
  });

  const handleLogout = () => {
    localStorage.removeItem("sg_authority_logged_in");
    navigate("/authority", { replace: true });
  };

  useEffect(() => {
    fetchSos();
    fetchActivity();
    fetchMessages();
  }, []);

  const fetchSos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/sos`, AUTH_HEADERS);
      const list = res.data || [];
      setSosList(list);

      if (!selectedSos && list.length > 0) {
        setSelectedSos(list[0]);
      }
    } catch (err) {
      console.error("Error fetching SOS list:", err);
      setSosList([]);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/authority/activity?limit=200`,
        AUTH_HEADERS
      );
      const list = res.data || [];
      setActivity(list);
      setVoiceEvents(list.filter((evt) => evt.type === "voice_sos"));
      setAiEvents(list.filter((evt) => evt.type === "ai_assistant"));
    } catch (err) {
      console.error("Error fetching activity:", err);
      setActivity([]);
      setVoiceEvents([]);
      setAiEvents([]);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/messages`,
        AUTH_HEADERS
      );
      setMessageEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessageEvents([]);
    }
  };

  useEffect(() => {
    socket.on("sos:new", (event) => {
      setSosList((prev) => {
        const updated = [event, ...prev];
        if (!selectedSos) {
          setSelectedSos(event);
        }
        return updated;
      });
    });

    socket.on("sos:update", (updated) => {
      setSosList((prev) =>
        prev.map((sos) => (sos.id === updated.id ? updated : sos))
      );

      setSelectedSos((prev) =>
        prev && prev.id === updated.id ? updated : prev
      );
    });

    socket.on("message:new", (evt) => {
      setMessageEvents((prev) => [evt, ...prev]);
    });

    socket.on("activity:new", (evt) => {
      setActivity((prev) => [evt, ...prev].slice(0, 200));

      if (evt.type === "voice_sos") {
        setVoiceEvents((prev) => [evt, ...prev]);
      }

      if (evt.type === "ai_assistant") {
        setAiEvents((prev) => [evt, ...prev]);
      }
    });

    return () => {
      socket.off("sos:new");
      socket.off("sos:update");
      socket.off("message:new");
      socket.off("activity:new");
    };
  }, [selectedSos]);

  const claimSos = async (id) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/sos/${id}/claim`,
        { authorityId },
        AUTH_HEADERS
      );
    } catch (err) {
      console.error("Failed to claim SOS", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/sos/${id}/status`,
        { status },
        AUTH_HEADERS
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const renderSecondaryView = () => {
    if (mainView === "message") {
      return (
        <div style={styles.secondaryContent}>
          <MessagePanel messageEvents={messageEvents} />
        </div>
      );
    }

    if (mainView === "voice") {
      return (
        <div style={styles.secondaryContent}>
          <VoicePanel voiceEvents={voiceEvents} />
        </div>
      );
    }

    if (mainView === "ai") {
      return (
        <div style={styles.secondaryContent}>
          <AiPanel aiEvents={aiEvents} />
        </div>
      );
    }

    if (mainView === "all") {
      return (
        <div style={styles.secondaryContent}>
          <ActivityPanel activity={activity} />
        </div>
      );
    }

    return null;
  };

  const renderSosColumns = () => {
    const liveSosWithMedia = sosList.filter(
      (sos) =>
        sos.media &&
        (sos.media.photoUrl || sos.media.videoUrl || sos.media.audioUrl)
    );

    const selectedLat =
      selectedSos?.location?.lat ?? selectedSos?.location?.latitude ?? null;
    const selectedLng =
      selectedSos?.location?.lng ?? selectedSos?.location?.longitude ?? null;

    return (
      <div style={styles.rootGrid}>
        <section style={styles.panel}>
          <h1 style={styles.mainTitle}>SafeGuard Authority Panel</h1>
          <h2 style={styles.sectionTitle}>Recent SOS Alerts</h2>

          <RecentSosPanel
            sosList={liveSosWithMedia}
            selectedId={selectedSos?.id}
            onSelect={setSelectedSos}
            onUpdateStatus={updateStatus}
            onClaim={claimSos}
            authorityId={authorityId}
          />
        </section>

        <section style={styles.panel}>
          <h2 style={styles.sectionTitle}>Incident View</h2>

          {selectedSos && selectedSos.location && (
            <p style={styles.locationText}>
              Lat: {selectedLat ?? "-"}, Lng: {selectedLng ?? "-"}
            </p>
          )}

          <MainView selectedSos={selectedSos} />
        </section>

        <section style={styles.panel}>
          <h2 style={styles.sectionTitle}>User Info</h2>
          <UserInfoPanel selectedSos={selectedSos} />
        </section>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.headerTitle}>SafeGuard Authority Dashboard</h2>
          <div style={styles.headerSub}>Logged in as {authorityId}</div>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.topPanel}>
        <button
          style={getNavButtonStyle("sos")}
          onClick={() => setMainView("sos")}
        >
          Live SOS
        </button>

        <button
          style={getNavButtonStyle("message")}
          onClick={() => setMainView("message")}
        >
          Message Alerts
        </button>

        <button
          style={getNavButtonStyle("voice")}
          onClick={() => setMainView("voice")}
        >
          Voice SOS
        </button>

        <button
          style={getNavButtonStyle("ai")}
          onClick={() => setMainView("ai")}
        >
          AI Assistant
        </button>

        <button
          style={getNavButtonStyle("all")}
          onClick={() => setMainView("all")}
        >
          All Triggers Info
        </button>
      </div>

      {mainView === "sos" ? renderSosColumns() : renderSecondaryView()}
    </div>
  );
};

export default AuthorityDashboard;