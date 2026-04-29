import  {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Search, PlayCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import caballosEnVivo from '../assets/caballosEnVivo.mp4' // Video de caballos en vivo (puedes usar cualquier video relacionado)



  // Colores del patrón de tu marca
const colors = {
    bgMain: '#0f172a',      // Azul marino opaco
    bgCard: '#1e293b',      // Azul tarjeta
    accent: '#eab308',      // Amarillo/Dorado
    success: '#22c55e',     // Verde para pagos
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.05)'
  };

  // 1. Actualizamos los datos para incluir el podio y video
const results = [
  { 
    track: "GULFSTREAM PARK", 
    race: "CARRERA 1", 
    winner: "Thunder Bolt", 
    num: 5, 
    payout: "$4.20", 
    exacta: "$12.40",
    second: "Quick Silver (3)",
    third: "Blue Ocean (1)",
    videoUrl: caballosEnVivo,
    isLongshot: false
  },
  { 
    track: "GULFSTREAM PARK", 
    race: "CARRERA 2", 
    winner: "Sea Star", 
    num: 2, 
    payout: "$28.60", // Pago alto
    exacta: "$84.00",
    second: "Red Fire (8)",
    third: "Desert Moon (4)",
    videoUrl: caballosEnVivo,
    isLongshot: true 
  },
];

const ResultsPage = () => {

    const [selectedVideo, setSelectedVideo] = useState(null); // Almacena la URL del video activo


    return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        {/* Header con Buscador */}
        <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ color: colors.textMain, fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>
              Últimos <span style={{ color: colors.accent }}>Ganadores</span>
            </h1>
            <p style={{ color: colors.textMuted, marginTop: '5px' }}>Resultados oficiales y dividendos de la jornada</p>
          </div>
          
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Filtrar por hipódromo..." 
              style={{ 
                backgroundColor: colors.bgCard, 
                border: `1px solid ${colors.border}`, 
                padding: '12px 20px 12px 45px', 
                borderRadius: '12px', 
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                width: '250px'
              }} 
            />
            <Search size={18} color={colors.textMuted} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </header>

        {/* Lista de Resultados */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {results.map((res, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.04)' }}
              style={{ 
                background: colors.bgCard, 
                padding: '24px 30px', 
                borderRadius: '24px', 
                border: `1px solid ${colors.border}`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              {/* Info Caballo Ganador y Podio */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flex: '1 1 350px' }}>
                <div style={{ 
                  width: '50px', height: '50px', 
                  background: colors.bgMain, 
                  color: colors.accent, 
                  borderRadius: '14px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  border: `2px solid ${colors.accent}`,
                  boxShadow: res.isLongshot ? `0 0 15px ${colors.accent}44` : 'none'
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: '900', opacity: 0.6 }}>Nº</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900', marginTop: '-5px' }}>{res.num}</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: colors.textMuted, letterSpacing: '0.5px' }}>
                      {res.track} • {res.race}
                    </span>
                    {res.isLongshot && (
                      <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '900' }}>
                        🔥 BATACAZO
                      </span>
                    )}
                  </div>
                  <h3 style={{ margin: 0, color: colors.textMain, fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {res.winner} <Trophy size={18} color={colors.accent} />
                  </h3>
                  {/* Podio 2do y 3ero */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.8rem', color: colors.textMuted }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>2º: <b style={{color: '#fff'}}>{res.second}</b></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>3º: <b style={{color: '#fff'}}>{res.third}</b></span>
                  </div>
                </div>
              </div>

              {/* Dividendos y Acciones */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                 <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', color: colors.textMuted, fontWeight: '700' }}>EXACTA</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: colors.textMain }}>{res.exacta}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', color: colors.textMuted, fontWeight: '900' }}>DIVIDENDO (WIN)</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '900', color: colors.success }}>{res.payout}</div>
                </div>

                {/* Botón Replay */}
                <motion.button 
                onClick={() => setSelectedVideo(res.videoUrl)}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(234, 179, 8, 0.1)', color: colors.accent }}
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    padding: '12px', 
                    borderRadius: '14px', 
                    cursor: 'pointer', 
                    color: colors.textMain,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PlayCircle size={22} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- MODAL DE VIDEO --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)} // Cierra al hacer clic fuera
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex',
              justifyContent: 'center', alignItems: 'center', padding: '20px'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en el video
              style={{
                width: '100%', maxWidth: '800px', aspectRatio: '16/9',
                background: '#000', borderRadius: '24px', overflow: 'hidden',
                position: 'relative', border: `1px solid ${colors.border}`
              }}
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedVideo(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                  borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer'
                }}
              >
                ✕
              </button>

              {/* El reproductor de Video (YouTube o MP4) */}
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo} // Aquí iría res.videoUrl
                title="Race Replay"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Botón Cargar Más */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <motion.button 
            whileHover={{ scale: 1.02, borderColor: colors.accent }}
            style={{ 
              background: 'transparent', 
              border: `1px solid ${colors.border}`, 
              color: colors.textMain, 
              padding: '14px 40px', 
              borderRadius: '14px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            VER MÁS RESULTADOS
          </motion.button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ResultsPage;
