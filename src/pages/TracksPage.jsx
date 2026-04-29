import {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, Globe, X } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';


const tracks = [
    { 
      name: "Gulfstream Park", 
      location: "Hallandale Beach, Florida", 
      country: "USA",
      img: "https://images.unsplash.com/photo-1713453403365-de08ae6fc159?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      surface: "Dirt/Turf",
      length: "1 1/8 Miles"
    },
    { 
      name: "Santa Anita Park", 
      location: "Arcadia, California", 
      country: "USA",
      img: "https://images.unsplash.com/photo-1631746556116-7559088141d6?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      surface: "Dirt/Turf",
      length: "1 Mile"
    },
    { 
      name: "Ascot Racecourse", 
      location: "Berkshire, UK", 
      country: "UK",
      img: "https://images.unsplash.com/photo-1759063916119-e9302f91419d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      surface: "Turf",
      length: "1 1/2 Miles"
    },
  ];

    // Patrón de colores coherente
  const colors = {
    bgMain: '#0f172a',      // Azul marino opaco
    bgCard: '#1e293b',      // Azul tarjeta
    accent: '#eab308',      // Amarillo/Dorado
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };


const TracksPage = () => {

  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Corregido */}
        <header style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.accent, marginBottom: '12px' }}>
            <Globe size={18} />
            <span style={{ fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px' }}>RED GLOBAL</span>
          </div>
          <h1 style={{ color: colors.textMain, fontSize: '3.5rem', fontWeight: '900', margin: 0, lineHeight: '1.1' }}>
            Hipódromos <span style={{ color: colors.accent }}>Aliados</span>
          </h1>
          <p style={{ 
            color: colors.textMuted, 
            fontSize: '1.1rem', 
            
            marginTop: '15px',
            lineHeight: '1.6' 
          }}>
            Conectamos con las pistas más prestigiosas del mundo para ofrecerte la mejor cobertura y datos en tiempo real.
          </p>
        </header>

        {/* Grid de Pistas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {tracks.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ y: -10 }}
              style={{ borderRadius: '32px', overflow: 'hidden', background: colors.bgCard, border: `1px solid ${colors.border}`, position: 'relative' }}
            >
              <div style={{ height: '240px', position: 'relative' }}>
                <img src={t.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '10px', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>{t.country}</div>
              </div>

              <div style={{ padding: '30px' }}>
                <h3 style={{ margin: 0, color: colors.textMain, fontSize: '1.6rem', fontWeight: '800' }}>{t.name}</h3>
                <p style={{ color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', fontSize: '0.9rem' }}>
                  <MapPin size={14} color={colors.accent} /> {t.location}
                </p>

                <div style={{ display: 'flex', gap: '25px', marginTop: '20px', borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: colors.textMuted, fontWeight: 'bold' }}>PISTA</div>
                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>{t.surface}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: colors.textMuted, fontWeight: 'bold' }}>LONGITUD</div>
                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>{t.length}</div>
                  </div>
                </div>

                <motion.button 
                  onClick={() => setSelectedTrack(t)}
                  whileHover={{ backgroundColor: colors.accent, color: '#000' }}
                  style={{ 
                    width: '100%', marginTop: '25px', padding: '14px', borderRadius: '16px', 
                    border: `1px solid ${colors.accent}`, background: 'none', color: colors.accent, 
                    fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}
                >
                  <Info size={18} /> DETALLES DE PISTA
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL DE DETALLES --- */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedTrack(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '700px', background: colors.bgCard, borderRadius: '32px', overflow: 'hidden', position: 'relative', border: `1px solid ${colors.border}` }}
            >
              <button onClick={() => setSelectedTrack(null)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, background: 'rgba(0,0,0,0.3)', border: 'none', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}><X /></button>
              
              <div style={{ padding: '40px' }}>
                <span style={{ color: colors.accent, fontWeight: 'bold', fontSize: '0.8rem' }}>LAYOUT DE PISTA</span>
                <h2 style={{ color: '#fff', fontSize: '2.2rem', margin: '10px 0 20px' }}>{selectedTrack.name}</h2>
                
                {/* Imagen del Mapa/Layout */}
                <div style={{ width: '100%', height: '250px', background: '#0f172a', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${colors.border}`, marginBottom: '25px', overflow: 'hidden' }}>
                   <img src={selectedTrack.img} alt="Track Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>

                <p style={{ color: colors.textMuted, lineHeight: '1.6', marginBottom: '30px' }}>{selectedTrack.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px' }}>
                        <div style={{ fontSize: '0.7rem', color: colors.accent }}>TIPO DE SUELO</div>
                        <div style={{ fontWeight: 'bold', color: '#fff' }}>{selectedTrack.surface} Professional</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px' }}>
                        <div style={{ fontSize: '0.7rem', color: colors.accent }}>CAPACIDAD</div>
                        <div style={{ fontWeight: 'bold', color: '#fff' }}>+50,000 Espectadores</div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};


export default TracksPage;
