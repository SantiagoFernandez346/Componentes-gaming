import React, { useState, useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(false), 3000);
    const timer2 = setTimeout(() => onClose(), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#3b82f6',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        boxShadow: '0 4px 8px rgba(59, 130, 246, 0.6)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        zIndex: 1100,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
