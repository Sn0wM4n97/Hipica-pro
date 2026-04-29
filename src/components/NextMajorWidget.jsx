import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy } from 'lucide-react';

const NextMajorWidget = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 12, h: 5, m: 30, s: 45 });

  // Efecto simple de cuenta regresiva (simulado)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => ({ ...prev, s: prev.s > 0 ? prev.s - 1 : 59 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, #121212 100%)',
        padding: '40px',
        borderRadius: '32px',
        border: '1px solid rgba(234, 179, 8, 0.3)',
        marginBottom: '60px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ zIndex: 1, flex: '1 1 300px' }}>
        <span style={{ color: '#eab308', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '3px', display: 'block', marginBottom: '10px' }}>
          PRÓXIMO GRAN EVENTO
        </span>
        <h2 style={{ fontSize: '2.5rem', margin: '0 0 15px 0', color: '#fff', fontWeight: '800' }}>Kentucky Derby 150</h2>
        <div style={{ display: 'flex', gap: '20px', color: '#fff', opacity: 0.6, fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={16}/> Churchill Downs</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Trophy size={16}/> GI • $5,000,000</span>
        </div>
      </div>
      
      <div style={{ zIndex: 1, textAlign: 'right', flex: '1 1 200px', marginTop: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          {[
            { v: timeLeft.d, l: 'DÍAS' },
            { v: timeLeft.h, l: 'HRS' },
            { v: timeLeft.m, l: 'MIN' }
          ].map((unit, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#eab308', lineHeight: '1' }}>{unit.v.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '1px', marginTop: '5px' }}>{unit.l}</div>
            </div>
          ))}
        </div>
      </div>
      <Trophy size={200} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.03, color: '#eab308', transform: 'rotate(-15deg)' }} />
    </motion.div>
  );
};

export default NextMajorWidget;