import React from 'react';

const HelplineModal = ({ onClose }) => {
  const helplines = [
    { name: 'Police', number: '100' },
    { name: 'Child Helpline', number: '1098' },
    { name: 'Women Helpline', number: '1091' },
    { name: 'Citizen Helpline', number: '112' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Emergency Helplines</h3>
        <ul>
          {helplines.map((item, idx) => (
            <li key={idx}>
              <a href={`tel:${item.number}`}>{item.name}: {item.number}</a>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="modal-close">Close</button>
      </div>
    </div>
  );
};

export default HelplineModal;