import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, TrendingUp } from 'lucide-react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';


const JockeyModal = ({ jockey, onClose }) => {
  if (!jockey) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar la tarjeta
          style={{
            width: '100%', maxWidth: '600px', backgroundColor: 'var(--bg-card)',
            borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-color)',
            position: 'relative', color: 'var(--text-main)'
          }}
        >
          {/* Botón Cerrar */}
          <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <X size={20} />
          </button>

          {/* Header del Perfil */}
          <div style={{ height: '200px', position: 'relative' }}>
            <img src={jockey.img || 'https://unsplash.com'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-card), transparent)' }} />
            <h2 style={{ position: 'absolute', bottom: '20px', left: '30px', fontSize: '2rem', margin: 0 }}>{jockey.name}</h2>
          </div>

          {/* Estadísticas Rápidas */}
          <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
            <StatBox icon={<Trophy size={18}/>} label="Wins" value={jockey.wins} />
            <StatBox icon={<Target size={18}/>} label="Efic." value={jockey.rate} />
            <StatBox icon={<TrendingUp size={18}/>} label="Ganancias" value="$2.4M" />
          </div>

          {/* Historial Reciente */}

<div style={{ padding: '0 30px 30px' }}>
  <h4 style={{ opacity: 0.5, marginBottom: '15px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
    Tendencia de Rendimiento (Últimos 30 días)
  </h4>
  
  <div style={{ 
    background: 'rgba(234, 179, 8, 0.05)', 
    padding: '20px', 
    borderRadius: '20px', 
    border: '1px solid var(--border-color)' 
  }}>
    <Sparklines data={jockey.history || [1, 2, 1, 3, 2, 1]} limit={10} height={40}>
      <SparklinesLine color="#eab308" style={{ strokeWidth: 3, fill: "none" }} />
      <SparklinesSpots size={4} style={{ stroke: "#eab308", strokeWidth: 2, fill: "white" }} />
    </Sparklines>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', opacity: 0.5 }}>
      <span>INICIO DE MES</span>
      <span>ACTUALIDAD</span>
    </div>
  </div>
</div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div style={{ padding: '15px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
    <div style={{ color: '#eab308', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>{value}</div>
    <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase' }}>{label}</div>
  </div>
);

export default JockeyModal;
