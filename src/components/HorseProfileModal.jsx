import { motion, AnimatePresence } from 'framer-motion';
import { Award, BarChart3, History, Dna, X } from 'lucide-react';



const HorseProfileModal = ({ horse, onClose }) => {
  if (!horse) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={overlayStyle}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={modalContentStyle}
        >
          {/* BOTÓN CERRAR */}
          <button onClick={onClose} style={closeBtnStyle}><X size={20} /></button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', height: '100%' }}>
            
            {/* LADO IZQUIERDO: IMAGEN Y PEDIGRÍ */}
            <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
              <img 
                src={horse.img || 'https://unsplash.com'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
              />
              <div style={imageOverlayStyle}>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{horse.name}</h2>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <span style={badgeStyle}>MARE: Lady Shine</span>
                  <span style={badgeStyle}>SIRE: Storm Cat</span>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: ESTADÍSTICAS Y CARRERAS */}
            <div style={{ padding: '40px', overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <QuickStat icon={<Award color="#eab308" />} label="Victorias" value="12/24" />
                <QuickStat icon={<BarChart3 color="#eab308" />} label="Earnings" value="$1.2M" />
                <QuickStat icon={<History color="#eab308" />} label="Última" value="1ro" />
              </div>

              <h4 style={sectionTitleStyle}><Dna size={16} /> COMENTARIO DEL ENTRENADOR</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '30px' }}>
                "{horse.name} ha mostrado una recuperación excepcional tras su última victoria. El entrenamiento del martes fue el mejor de la temporada. Está listo para dominar la distancia."
              </p>

              <h4 style={sectionTitleStyle}><History size={16} /> HISTORIAL RECIENTE</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['1ro - Churchill Downs', '2do - Gulfstream Park', '1ro - Santa Anita'].map((res, i) => (
                  <div key={i} style={pastRaceStyle}>
                    <span style={{ fontWeight: 'bold' }}>{res}</span>
                    <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>Abril 2024</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- SUB-COMPONENTES Y ESTILOS ---
const QuickStat = ({ icon, label, value }) => (
  <div style={{ flex: 1, padding: '15px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>{icon}</div>
    <div style={{ fontWeight: '900', color: 'var(--text-main)' }}>{value}</div>
    <div style={{ fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const overlayStyle = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', padding: '40px' };
const modalContentStyle = { width: '100%', maxWidth: '1000px', height: '600px', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' };
const closeBtnStyle = { position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', color: '#fff', padding: '10px', cursor: 'pointer', zIndex: 10 };
const imageOverlayStyle = { position: 'absolute', bottom: '40px', left: '40px', color: '#fff' };
const badgeStyle = { backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.2)' };
const sectionTitleStyle = { fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', opacity: 0.4 };
const pastRaceStyle = { padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-main)' };


export default HorseProfileModal;