

const RaceIntel = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '15px', 
    marginBottom: '25px' 
  }}>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>SESGO DE PISTA</span>
      <div style={{ color: '#eab308', fontWeight: 'bold' }}>Favor al Carril Interno</div>
    </div>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>VELOCIDAD PROMEDIO</span>
      <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>62.5 km/h</div>
    </div>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>HUMEDAD PISTA</span>
      <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>12% (Firme)</div>
    </div>
  </div>
);

// Estilos rápidos
const intelCardStyle = {
  padding: '15px',
  background: 'var(--bg-card)',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
  textAlign: 'center'
};
const intelLabelStyle = {
  fontSize: '0.65rem',
  opacity: 0.5,
  display: 'block',
  marginBottom: '5px'
};
export default RaceIntel;