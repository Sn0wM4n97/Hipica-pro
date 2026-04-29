import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BentoGrid from '../components/BentoGrid' // Importamos el Bento que creamos
import ExpertSlider from '../components/ExpertSlider' // Importamos el slider de expertos
import TracksSlider from '../components/TracksSlider' // Importamos el slider de logos
import NewsCarousel from '../components/NewsSction' // Importamos la sección de noticias
import HealthDynamicSection from '../components/HealthSection' // Importamos la sección de salud
import EliteLeaderboard from '../components/Leaderboard'
import videoCaballos from '../assets/videoCaballos.mp4'
import Footer from '../components/Footer' // Importamos el footer


const ExpertCard = ({ name, pick, accuracy, img, isBest }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    // Aplicamos las clases condicionalmente
    className={`expert-card ${isBest ? 'card-shine best-expert-border' : ''}`}
    style={{
      background: 'var(--bg-card)',
      padding: '25px',
      borderRadius: '24px',
      border: '1px solid var(--border-color)',
      color: 'var(--text-main)',
      position: 'relative'
    }}
  >
    {/* Badge de "Mejor Pick" solo para el destacado */}
    {isBest && (
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        backgroundColor: '#eab308', color: '#000',
        padding: '2px 10px', borderRadius: '50px',
        fontSize: '0.6rem', fontWeight: 'bold', zIndex: 1
      }}>
        TOP PICK
      </div>
    )}

    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
      <img src={img} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} alt={name} />
      <div>
        <h4 style={{ margin: 0 }}>{name}</h4>
        <span style={{ fontSize: '0.8rem', color: isBest ? '#eab308' : 'inherit', fontWeight: isBest ? 'bold' : 'normal' }}>
          Efectividad: {accuracy}
        </span>
      </div>
    </div>

    <div style={{ 
      background: isBest ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)', 
      padding: '15px', borderRadius: '15px', position: 'relative', zIndex: 2 
    }}>
      <p style={{ fontSize: '0.7rem', margin: '0 0 5px 0', opacity: 0.6 }}>FIJO DEL DÍA:</p>
      <strong style={{ fontSize: '1.1rem' }}>{pick}</strong>
    </div>
  </motion.div>
);


const LandingPage = () => {

  return (
    <main className="landing-page" style={{ backgroundColor: 'var(--bg)' }}>
      <TopBar />
      
      {/* HERO SECTION MEJORADO */}
<section className="hero-splash" style={{ position: 'relative', overflow: 'hidden', height: '95vh', display: 'flex', alignItems: 'center' }}>
  
  {/* VIDEO DE FONDO */}
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <video 
      autoPlay 
      loop 
      muted 
      src={videoCaballos}
      playsInline 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    >
      {/* URL de un video de stock de alta calidad */}
      <source src={videoCaballos} type="video/mp4" />
    </video>
    {/* Capa de oscurecimiento para legibilidad */}
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, var(--bg) 100%)' 
    }} />
  </div>

  <div style={{ 
    width: '100%', maxWidth: '1300px', margin: '0 auto', padding: '0 5%', 
    display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center', zIndex: 2 
  }}>
    
    {/* COLUMNA IZQUIERDA: MENSAJE (Impacto) */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <div className="pulse-red" />
        <span style={{ color: '#eab308', fontWeight: '800', letterSpacing: '2px', fontSize: '0.8rem' }}>
          EN VIVO • HIPÓDROMO REAL
        </span>
      </div>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', lineHeight: '1.1', fontWeight: '900' }}>
        La emoción de <br/> ganar se vive <br/> <span style={{ color: '#eab308' }}>segundo a segundo</span>
      </h1>
      <div style={{ display: 'flex', gap: '15px', marginTop: '2.5rem' }}>
      <Link to="/carrera/1" style={{ textDecoration: 'none' }}>
        <button 
          className="button-primary" 
          style={{ 
            padding: '15px 35px', 
            borderRadius: '50px',
            cursor: 'pointer' // Para que el usuario sepa que es clickeable
          }}
        >
          Comenzar a Ganar
        </button>
      </Link>
    </div>
    </motion.div>

    {/* COLUMNA DERECHA: WIDGET DE APUESTA RÁPIDA (Acción) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#eab308', fontWeight: 'bold' }}>NEXT OFF</div>
          <div style={{ fontWeight: '900', color: '#fff', fontSize: '1.1rem' }}>SARATOGA • R5</div>
        </div>
        <div style={{ textAlign: 'right', color: '#fff' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>02:45</div>
          <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>MINUTOS</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { n: '3', name: 'Desert Storm', odds: '1.80' },
          { n: '6', name: 'Winter Soul', odds: '3.45' },
          { n: '1', name: 'Fast Lane', odds: '7.20' }
        ].map((h, i) => (
          <div key={i} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            background: 'rgba(0,0,0,0.2)', padding: '12px 18px', borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ color: '#fff', fontWeight: '600' }}>
              <span style={{ color: '#eab308', marginRight: '10px' }}>{h.n}</span> {h.name}
            </div>
            <button style={{ 
              background: '#eab308', border: 'none', width: '60px', height: '35px', 
              borderRadius: '10px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s' 
            }} className="odd-button">
              {h.odds}
            </button>
          </div>
        ))}
      </div>
      
      <p style={{ color: '#fff', fontSize: '0.7rem', opacity: 0.5, textAlign: 'center', marginTop: '20px' }}>
        * Cuotas en tiempo real sujetas a cambios antes del inicio.
      </p>
    </motion.div>
  </div>
</section>



  {/* SECCIÓN BENTO GRID (Datos en Vivo) */}
  <section id="live" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
    <BentoGrid />
  </section>

      {/* 3. NUEVA SECCIÓN: EXPERT PICKS (Agrégala aquí) */}
<section id="experts" style={{ padding: '80px 5%', overflow: 'hidden' }}>
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Pronósticos de Expertos</h2>
    <p style={{ opacity: 0.7, color: 'var(--text-main)' }}>Desliza para ver más tipsters.</p>
  </div>

  <ExpertSlider>
    {/* Importante: Cada tarjeta debe tener un minWidth fijo en el slider */}
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Juan 'El Mago'" pick="Don Alberto (#5)" accuracy="84%" img="https://i.pravatar.cc/300?img=19" />
    </div>
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Carlos Hípico" pick="Rayo Veloz (#2)" accuracy="79%" img="https://i.pravatar.cc/300?img=20" />
    </div>
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Dra. Turf" pick="Reina de Copas (#7)" accuracy="91%" img="https://i.pravatar.cc/300?img=21" isBest={true} />
    </div>
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Luis Paddock" pick="Furia Real (#1)" accuracy="82%" img="https://i.pravatar.cc/300?img=22" />
    </div>
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Jose" pick="Furia Real (#1)" accuracy="82%" img="https://i.pravatar.cc/300?img=22" />
    </div>
    <div style={{ minWidth: '350px' }}>
      <ExpertCard name="Luis Paddock" pick="Furia Real (#1)" accuracy="82%" img="https://i.pravatar.cc/300?img=22" />
    </div>
  </ExpertSlider>
</section>

    {/* 4. Lideres (Aquí agregas la sección de líderes) */}
    <EliteLeaderboard/>


      {/* 4. ACTUALIDAD (Aquí agregas Noticias) */}
      <NewsCarousel />

      {/* 5. ÉTICA Y SEGURIDAD (Aquí agregas Salud) */}
      <HealthDynamicSection />

      {/* 5. SECCIÓN DE LOGOS (Agrégalo aquí) */}
      <TracksSlider />

        {/* FOOTER */}
        <Footer/>
    </main>
  )
}

export default LandingPage
