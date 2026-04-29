const StableNotes = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: 'rgba(234, 179, 8, 0.05)', 
    borderRadius: '16px', 
    borderLeft: '4px solid #eab308',
    marginBottom: '25px'
  }}>
    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#eab308' }}>NOTAS DE ESTABLO</h4>
    <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.8 }}>
      <li>Caballo #5 RETIRADO (Veterinario)</li>
      <li>Cambio de Jockey en #2: F. Prat sustituye a J. Rosario</li>
      <li>Pista movida de Arena Firme a Húmeda</li>
    </ul>
  </div>
);

export default StableNotes;