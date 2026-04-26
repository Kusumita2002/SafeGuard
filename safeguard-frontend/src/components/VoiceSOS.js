// src/components/VoiceSOS.js
import React, { useRef, useState } from 'react';

const VoiceSOS = ({ onTriggerSOS }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1][0].transcript;
      const text = last.trim();
      setTranscript((prev) => (prev ? prev + ' ' + text : text));

      // simple SOS detection
      if (/sos|help|bacha[o|ao]|danger/i.test(text)) {
        onTriggerSOS(); // calls /api/sos in Dashboard
      }
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  return (
    <div>
      <p style={{ fontSize: 13 }}>
        Press start and speak your SOS phrase (for example: &quot;SOS&quot; or
        &quot;I need help&quot;).
      </p>
      <button
  className="sg-btn sg-btn-primary"
  onClick={listening ? stopListening : startListening}
>
  {listening ? 'Listening...' : 'Start Voice SOS'}
</button>

      <p style={{ marginTop: 8, fontSize: 12 }}>
        Heard: {transcript || '—'}
      </p>
    </div>
  );
};

export default VoiceSOS;
