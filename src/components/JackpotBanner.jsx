import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const JackpotBanner = ({ isUrgent }) => {
  const [amount, setAmount] = useState(125480.50);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => prev + (Math.random() * 5)); // Sube más rápido si es urgente
    }, isUrgent ? 500 : 2000);
    return () => clearInterval(interval);
  }, [isUrgent]);

  return (
    <motion.div 
      animate={isUrgent ? { 
        borderColor: ['#eab308', '#ef4444', '#eab308'],
        scale: [1, 1.02, 1]
      } : {}}
      transition={{ duration: 0.5, repeat: Infinity }}
      style={{
        background: isUrgent ? 'linear-gradient(90deg, #450a0a 0%, #0f172a 100%)' : 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
        border: '2px solid #eab308', boxShadow: isUrgent ? '0 0 40px rgba(239, 68, 68, 0.4)' : '0 0 25px rgba(234, 179, 8, 0.2)',
        marginBottom: '30px', position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div style={{ color: isUrgent ? '#ef4444' : '#eab308', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>
          {isUrgent ? '⚠️ ¡EL BOTE CIERRA EN SEGUNDOS!' : 'JACKPOT ACUMULADO DEL DÍA'}
        </div>
        <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', fontFamily: 'monospace' }}>
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>
    </motion.div>
  );
};

export default JackpotBanner;