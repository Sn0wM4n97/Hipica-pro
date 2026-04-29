const Footer = () => (
  <footer style={{  marginTop: '120px',backgroundColor: '#0f172a', color: '#f8fafc', padding: '80px 5% 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '60px' }}>
        
        {/* COLUMNA 1: NEWSLETTER */}
        <div style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#eab308', marginBottom: '15px' }}>HÍPICA PRO</h3>
          <p style={{ opacity: 0.7, maxWidth: '400px', marginBottom: '25px' }}>
            Únete a nuestra comunidad y recibe los "fijos" de los expertos directamente en tu correo cada mañana.
          </p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '450px' }}>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              style={{ flex: 1, padding: '15px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
            />
            <button style={{ backgroundColor: '#eab308', color: '#000', border: 'none', padding: '0 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              SUSCRIBIRSE
            </button>
          </div>
        </div>

        {/* COLUMNA 2: LINKS */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Plataforma</h4>
          <ul style={{ listStyle: 'none', padding: 0, opacity: 0.6, lineHeight: '2.5', fontSize: '0.9rem' }}>
            <li style={{ cursor: 'pointer' }}>Carreras en Vivo</li>
            <li style={{ cursor: 'pointer' }}>Resultados Históricos</li>
            <li style={{ cursor: 'pointer' }}>Calendario Hípico</li>
            <li style={{ cursor: 'pointer' }}>Ranking de Jockeys</li>
          </ul>
        </div>

        {/* COLUMNA 3: SOPORTE */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Soporte</h4>
          <ul style={{ listStyle: 'none', padding: 0, opacity: 0.6, lineHeight: '2.5', fontSize: '0.9rem' }}>
            <li style={{ cursor: 'pointer' }}>Centro de Ayuda</li>
            <li style={{ cursor: 'pointer' }}>Reglas de Apuesta</li>
            <li style={{ cursor: 'pointer' }}>Juego Responsable</li>
            <li style={{ cursor: 'pointer' }}>Contacto</li>
          </ul>
        </div>
      </div>

      {/* BARRA FINAL */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', opacity: 0.4 }}>
          <span style={{ border: '1px solid #fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>+18</span>
          <span style={{ fontSize: '0.8rem' }}>Safe & Secure Betting</span>
        </div>
        <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>© 2024 HÍPICA PRO. Made for Champions.</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', opacity: 0.6 }}>
          <span>𝕏</span> <span>📸</span> <span>📺</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
