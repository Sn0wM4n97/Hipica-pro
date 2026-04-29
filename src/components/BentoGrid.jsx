import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Trophy, Star } from 'lucide-react';

const BentoGrid = () => {
  return (
    <section className="bento-grid">
      
      {/* 1. CARRERA ESTELAR (GRANDE) */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bento-card bento-item-large"
        style={{ background: '#000' }}
      >
        <img 
          src="https://images.unsplash.com/photo-1535430046985-b806390339ba?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
        />
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eab308', marginBottom: '10px' }}>
            <Star size={20} fill="#eab308" />
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>EVENTO ESTELAR</span>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>GULFSTREAM PARK</h2>
          <p style={{ opacity: 0.8 }}>Gran Premio de Campeones • R10</p>
          <button style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '50px', border: 'none', backgroundColor: '#eab308', fontWeight: 'bold', cursor: 'pointer' }}>
            APUESTA EN VIVO
          </button>
        </div>
      </motion.div>

      {/* 2. PRÓXIMA CARRERA (MEDIANA) */}
      <div className="bento-card bento-item-medium" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-main)' }}>PRÓXIMA SALIDA</h3>
          <p style={{ color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={16} /> 02:45 MTP
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)' }}>R4</span>
          <p style={{ margin: 0, opacity: 0.6 }}>Santa Anita</p>
        </div>
      </div>

      {/* 3. RESULTADO RECIENTE (PEQUEÑA) */}
      <div className="bento-card bento-item-small" style={{ padding: '1.5rem', background: 'rgba(34, 197, 94, 0.1)', borderColor: '#22c55e' }}>
        <Trophy size={24} color="#22c55e" />
        <p style={{ fontSize: '0.8rem', marginTop: '10px', marginBottom: '5px' }}>ÚLTIMO GANADOR</p>
        <div style={{ fontWeight: 'bold' }}>#3 AZABACHE</div>
      </div>

      {/* 4. STREAMING (PEQUEÑA) */}
      <div className="bento-card bento-item-small" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
          <Play fill="#fff" size={20} />
        </div>
        <p style={{ marginTop: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>VER EN VIVO</p>
      </div>

    </section>
  );
};

export default BentoGrid;
