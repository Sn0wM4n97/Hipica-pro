const TracksSlider = () => {
  const logos = [
    "GULFSTREAM PARK", "SANTA ANITA", "CHURCHILL DOWNS", 
    "PALERMO", "LA RINCONADA", "MONTERRICO", "ASCOT", "LONGCHAMP"
  ];

  return (
    <section style={{ 
      padding: '40px 0', 
      backgroundColor: 'var(--bg)', 
      borderTop: '1px solid var(--border-color)', 
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex'
    }}>
      <div className="logo-slider">
        {/* Renderizamos la lista dos veces para crear el loop infinito real */}
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="logo-item">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TracksSlider;