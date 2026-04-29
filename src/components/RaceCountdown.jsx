import { useState, useEffect } from 'react';


const RaceCountdown = ({ initialMinutes = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isUrgent = timeLeft < 60; // Menos de 1 minuto

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      padding: '12px',
      backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.05)',
      borderRadius: '12px',
      marginBottom: '15px',
      border: `1px solid ${isUrgent ? '#ef4444' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease'
    }}>
      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isUrgent ? '#ef4444' : '#eab308', letterSpacing: '1px' }}>
        {isUrgent ? 'CIERRE INMINENTE' : 'TIEMPO PARA APUESTA'}
      </span>
      <div style={{ 
        fontSize: '1.4rem', 
        fontWeight: '900', 
        fontFamily: 'monospace',
        color: isUrgent ? '#ef4444' : 'var(--text-main)',
        animation: isUrgent ? 'blink-red 1s infinite' : 'none'
      }}>
        {timeLeft > 0 ? formatTime(timeLeft) : "CERRADO"}
      </div>
    </div>
  );
};

export default RaceCountdown;