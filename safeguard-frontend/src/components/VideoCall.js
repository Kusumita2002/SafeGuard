// src/components/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const AUTHORITY_PEER_ID = 'SAFEGUARD_AUTHORITY';

const VideoCall = ({ user }) => {
  const [inCall, setInCall] = useState(false);
  const [status, setStatus] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const currentCallRef = useRef(null);

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: 'localhost',
      port: 9000,
      path: '/peerjs',
    });

    peer.on('open', (id) => {
      console.log('Citizen peer ID:', id);
      setStatus('Ready to call authority.');
    });

    peer.on('call', async (call) => {
      // optional: handle incoming call from authority
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        call.answer(stream);
        currentCallRef.current = call;
        setInCall(true);

        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        call.on('close', () => {
          endCall();
        });
      } catch (err) {
        console.error(err);
        setStatus('Could not get camera/mic for incoming call.');
      }
    });

    peerRef.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  const cleanupStreams = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      remoteVideoRef.current.srcObject = null;
    }
  };

  const endCall = () => {
    if (currentCallRef.current) {
      currentCallRef.current.close();
      currentCallRef.current = null;
    }
    cleanupStreams();
    setInCall(false);
    setStatus('Call ended.');
  };

  const handleCallAuthority = async () => {
    if (!peerRef.current) return;

    try {
      setStatus('Getting camera & mic...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setStatus('Calling authority...');
      const call = peerRef.current.call(AUTHORITY_PEER_ID, stream);
      currentCallRef.current = call;
      setInCall(true);

      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      call.on('close', () => {
        endCall();
      });
    } catch (err) {
      console.error(err);
      setStatus('Could not start call. Check camera/mic permissions.');
    }
  };

  return (
    <div className="sg-card sg-call-card">
      <h3>Live Video Call</h3>

      <div
        className="sg-call-videos"
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'stretch',
        }}
      >
        {/* small local preview */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '30%',
            borderRadius: 8,
            background: '#000',
            objectFit: 'cover',
          }}
        />

        {/* bigger remote panel */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: '70%',
            borderRadius: 8,
            background: '#000',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="sg-call-actions" style={{ marginTop: 12 }}>
        {!inCall && (
          <button
            className="sg-btn sg-btn-primary"
            onClick={handleCallAuthority}
          >
            Call Authority
          </button>
        )}

        {inCall && (
          <button
            className="sg-btn sg-btn-primary" // blue style
            onClick={endCall}
          >
            End Call
          </button>
        )}
      </div>

      {status && (
        <p className="sg-call-status" style={{ marginTop: 8, fontSize: 12 }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default VideoCall;
