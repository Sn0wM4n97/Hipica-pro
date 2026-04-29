

const ExpertQuickView = () => (
  <div style={{ 
    marginTop: '25px', 
    padding: '20px', 
    background: 'var(--bg-card)', 
    borderRadius: '24px', 
    border: '1px solid var(--border-color)' 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
      <img src="https://i.pravatar.cc/300?img=50" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Dra. Turf</div>
        <div style={{ fontSize: '0.6rem', color: '#eab308' }}>PICK DEL DÍA</div>
      </div>
    </div>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.7 }}>
      "El #1 Thunder Bolt viene de un gran apronte. La pista rápida le favorece."
    </p>
  </div>
);

export default ExpertQuickView;