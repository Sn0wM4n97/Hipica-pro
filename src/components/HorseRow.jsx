import { motion } from 'framer-motion';
import { Sparklines, SparklinesLine } from 'react-sparklines'




const actionButtonStyle = {
  backgroundColor: '#eab308', // Dorado
  color: '#000',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 10px rgba(234, 179, 8, 0.2)',
};


// 1. Constantes de configuración
const MANTILLA_COLORS = {
  1: "#FF0000", 2: "#FFFFFF", 3: "#0000FF", 4: "#FFFF00", 5: "#008000"
};


const HorseRow = ({ horse, onSelect, onCompare, isComparing, onShowProfile }) => (
  <motion.div
    layout
    whileHover={{ backgroundColor: 'var(--hover-bg)' }}
    style={{
      display: 'grid',
      gridTemplateColumns: '60px 2fr 1fr 1fr 150px', // Ajustamos ancho para botones
      padding: '20px',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      color: 'var(--text-main)',
      cursor: 'pointer'
    }}
  >
    {/* Mantilla de Color (Ya lo tienes) */}
    <div style={{ 
      width: '35px', height: '35px', 
      backgroundColor: MANTILLA_COLORS[horse.number] || '#ccc', 
      color: horse.number === 2 || horse.number === 4 ? '#000' : '#fff',
      display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontWeight: 'bold'
    }}>
      {horse.number}
    </div>

    {/* Nombre y Equipo */}
    <div style={{ flex: 1 }}>
      <motion.div 
        onClick={(e) => {
          e.stopPropagation(); // Evita que se active el onSelect de la fila
          onShowProfile();
        }}
        whileHover={{ color: '#eab308' }} // El nombre se pone dorado al pasar el mouse
        style={{ 
          fontWeight: 'bold', 
          fontSize: '1.1rem', 
          cursor: 'help', // Cursor de ayuda/información
          display: 'inline-block' 
        }}
      >
        {horse.name.toUpperCase()}
      </motion.div>
      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
        J: {horse.jockey} • E: {horse.trainer}
      </div>
    </div>

    {/* Tendencia (Sparklines) */}
    <div style={{ width: '80px' }}>
      <Sparklines data={horse.history} limit={10} height={40}>
        <SparklinesLine color="#eab308" style={{ strokeWidth: 3 }} />
      </Sparklines>
    </div>

    {/* Cuota */}
    <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '1.1rem' }}>
      {horse.odds.toFixed(2)}
    </div>

    {/* ACCIONES: Apostar y Comparar */}
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <button 
        style={actionButtonStyle}
        onClick={(e) => { e.stopPropagation(); onSelect(horse); }}
      >
        APOSTAR
      </button>
      
      {/* BOTÓN DE COMPARAR */}
      <button 
        onClick={(e) => { e.stopPropagation(); onCompare(); }}
        style={{
          background: isComparing ? '#eab308' : 'transparent',
          border: '1px solid #eab308',
          color: isComparing ? '#000' : '#eab308',
          borderRadius: '10px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
      >
        ⚖️
      </button>
    </div>
  </motion.div>
);

export default HorseRow;