import { motion } from 'framer-motion';


const MatchupPreview = ({ horses }) => {
  const h1 = horses[0];
  const h2 = horses[1];

  if (!h1 || !h2) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '20px', border: '1px dashed #eab308', color: 'var(--text-main)', opacity: 0.6, marginBottom: '30px' }}>
        {horses.length === 1 ? `Selecciona otro caballo para comparar con ${h1.name}` : "Selecciona dos caballos para comparar estadísticas"}
      </div>
    );
  }

  // Lógica simple de Power Bar: Basada en la cuota (menor cuota = más poder)
  const total = (1/h1.odds) + (1/h2.odds);
  const powerH1 = (((1/h1.odds) / total) * 100).toFixed(0);

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }} 
      animate={{ height: 'auto', opacity: 1 }}
      style={{ background: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '1px solid #eab308', marginBottom: '30px', color: 'var(--text-main)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <b style={{ color: '#eab308' }}>#{h1.number}</b> {h1.name}
        </div>
        <div style={{ fontWeight: '900', fontSize: '0.8rem', background: '#eab308', color: '#000', padding: '4px 10px', borderRadius: '10px' }}>VS</div>
        <div style={{ textAlign: 'right' }}>
          {h2.name} <b style={{ color: '#eab308' }}>#{h2.number}</b>
        </div>
      </div>

      {/* POWER BAR GRÁFICA */}
      <div style={{ height: '12px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
        <motion.div 
          initial={{ width: '50%' }}
          animate={{ width: `${powerH1}%` }}
          style={{ height: '100%', background: '#eab308', boxShadow: '0 0 15px #eab308' }} 
        />
        <div style={{ height: '100%', flex: 1, background: '#333' }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>
        <span>PROBABILIDAD: {powerH1}%</span>
        <span>{100 - powerH1}%</span>
      </div>
    </motion.div>
  );
};

export default MatchupPreview;