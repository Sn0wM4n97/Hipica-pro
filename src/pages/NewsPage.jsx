import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, X, 
  MessageSquare, Camera, ZoomIn, MapPin
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';



const colors = {
    bgMain: '#0f172a',
    bgCard: '#1e293b',
    accent: '#eab308',
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)',
    tagSpecial: '#ef4444'
  };

  const articles = [
    { id: 1, category: "ESPECIAL", title: "Kentucky Derby 152: Favoritos confirmados", date: "Abr 28, 2026", img: "https://images.unsplash.com/photo-1776918776746-61086575cc52?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", content: "El panorama hípico se consolida tras los resultados en Gulfstream Park..." },
    { id: 2, category: "NOTICIAS", title: "Incremento de bolsas en Gulfstream Park", date: "Abr 27, 2026", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", content: "La directiva anunció un incremento del 15% en los premios..." },
    { id: 3, category: "LATAM", title: "La Rinconada estrena sistema de fotofinish 4K", date: "Abr 26, 2026", img: "https://plus.unsplash.com/premium_photo-1678705961917-7bbbdbe80d68?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", content: "Tecnología de punta llega al óvalo de Caracas para mayor transparencia..." },
    { id: 4, category: "NOTICIAS", title: "Nuevas dietas optimizan la recuperación equina", date: "Abr 25, 2026", img: "https://images.unsplash.com/photo-1463748465553-80db1e6ff830?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", content: "En la hípica de alta competencia, el éxito no solo se define en los últimos 200 metros de la pista; se construye meses antes en el establo, el laboratorio y la clínica veterinaria. Un purasangre de carreras es un atleta de élite cuya fisiología está diseñada para la explosividad, pero cuya integridad depende de un equilibrio metabólico perfecto que solo se logra mediante un monitoreo constante y riguroso. Este proceso integral comienza con una nutrición de precisión quirúrgica, donde cada gramo de forraje y suplemento vitamínico es pesado para optimizar la síntesis de glucógeno muscular y la densidad ósea, factores determinantes para resistir las presiones biomecánicas extremas en cada zancada a más de 60 kilómetros por hora. Más allá de la dieta, la medicina deportiva equina moderna emplea tecnologías de vanguardia, como la termografía infrarroja y la endoscopia dinámica, para detectar anomalías respiratorias o inflamaciones subclínicas antes de que se manifiesten como lesiones graves que puedan comprometer la carrera de un ejemplar. El bienestar psicológico también juega un papel crucial, ya que un caballo sometido a niveles elevados de cortisol por estrés ambiental no podrá alcanzar su pico de rendimiento máximo el día del evento, sin importar su linaje o capacidad física. Además, la transparencia en los protocolos sanitarios y los controles antidopaje rigurosos no solo protegen la vida del animal, sino que también salvaguardan la pureza del deporte y la confianza del público apostador, garantizando que cada victoria sea el resultado del talento genético, un entrenamiento ético y una salud impecable. En última instancia, la hípica moderna ha evolucionado hacia un modelo de gestión deportiva donde el veterinario es tan influyente como el jinete, entendiendo que la salud es el cimiento inamovible sobre el cual se edifican las leyendas de la pista y los récords históricos." }
  ];

  const galleryImages = [
  { 
    url: "https://images.unsplash.com/photo-1494984858525-798dd0b282f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Recta Final en Churchill Downs",
    location: "Kentucky, USA"
  },
  { 
    url: "https://images.unsplash.com/photo-1601726429844-acd8b1385972?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Preparación en el Paddock",
    location: "Gulfstream Park"
  },
  { 
    url: "https://images.unsplash.com/photo-1612225330565-f79af9f92168?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Salida del Gran Premio",
    location: "La Rinconada"
  },
  { 
    url: "https://images.unsplash.com/photo-1508859459823-38ea91d8f937?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Entrenamiento Matutino",
    location: "Santa Anita Park"
  }
];


// Variantes de animación para cascada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [selectedImage, setSelectedImage] = useState(null);

  


  const filteredArticles = articles.filter(art => activeFilter === 'TODOS' || art.category === activeFilter);

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 1. TICKER URGENTE CORREGIDO (El texto ya no pasa por encima) */}
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', 
          padding: '12px 20px', borderRadius: '12px', marginBottom: '40px',
          display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden'
        }}>
          {/* Badge Fijo con Fondo Sólido */}
          <div style={{ 
            backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '6px', 
            fontSize: '0.7rem', fontWeight: '900', zIndex: 10, position: 'relative',
            boxShadow: '10px 0 20px #161e2e' // Sombra para separar del texto que corre
          }}>
            URGENTE
          </div>
          <motion.div 
            animate={{ x: [1000, -1500] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ whiteSpace: 'nowrap', color: '#fff', fontSize: '0.85rem', marginLeft: '20px', zIndex: 1 }}
          >
             • Mystik Dan confirmado para el Preakness Stakes • Pista fangosa en Belmont • Irad Ortiz Jr. con 3 montas clave hoy •
          </motion.div>
        </div>

        {/* 2. LAYOUT DE 12 COLUMNAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '30px' }}>
          
          {/* COLUMNA NOTICIAS (8 Col) */}
          <div style={{ gridColumn: 'span 8' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              {['TODOS', 'ESPECIAL', 'NOTICIAS', 'LATAM'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: activeFilter === f ? colors.accent : colors.bgCard, color: activeFilter === f ? '#000' : colors.textMuted, fontSize: '0.7rem', fontWeight: '900', cursor: 'pointer' }}>
                  {f}
                </button>
              ))}
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredArticles.map((post) => (
                <motion.article key={post.id} variants={itemVariants} onClick={() => setSelectedArticle(post)} whileHover={{ x: 5 }} style={{ background: colors.bgCard, borderRadius: '24px', border: `1px solid ${colors.border}`, display: 'flex', height: '180px', cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={post.img} style={{ width: '220px', height: '100%', objectFit: 'cover' }} />
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ color: post.category === 'ESPECIAL' ? colors.tagSpecial : colors.accent, fontSize: '0.65rem', fontWeight: '900' }}>{post.category}</span>
                    <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '5px 0', fontWeight: '800', lineHeight: 1.2 }}>{post.title}</h3>
                    <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{post.date}</div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* GALERÍA DE FOTOS */}
            <div style={{ marginTop: '50px' }}>
  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Camera size={24} color={colors.accent} /> La Meta en <span style={{ color: colors.accent }}>Fotos</span>
  </h3>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
    {galleryImages.map((img, i) => (
      <motion.div 
        key={i} 
        whileHover={{ scale: 1.05, y: -5 }}
        onClick={() => setSelectedImage(img)} // Enviamos el objeto completo
        style={{ 
          height: '120px', 
          borderRadius: '18px', 
          overflow: 'hidden', 
          border: `1px solid ${colors.border}`,
          cursor: 'pointer',
          background: '#000',
          position: 'relative'
        }}
      >
        <motion.img 
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          src={img.url} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {/* Lupa indicadora sutil */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff', opacity: 0.5 }}>
          <ZoomIn size={14} />
        </div>
      </motion.div>
    ))}
  </div>

  {/* --- MODAL DE ZOOM (LIGHTBOX) CON DESCRIPCIÓN --- */}
  <AnimatePresence>
    {selectedImage && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImage(null)}
        style={{ 
          position: 'fixed', inset: 0, backgroundColor: 'rgba(10, 23, 42, 0.98)',
          backdropFilter: 'blur(15px)', zIndex: 11000, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px'
        }}
      >
        {/* Botón de cierre superior */}
        <motion.button 
          whileHover={{ rotate: 90 }}
          style={{ position: 'absolute', top: '40px', right: '40px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={32} />
        </motion.button>

        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'relative', width: '100%', maxWidth: '900px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
        >
          <img 
            src={selectedImage.url} 
            style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain', display: 'block' }} 
          />
          
          {/* Barra de información inferior */}
          <div style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
            padding: '40px 30px 30px', position: 'absolute', bottom: 0, left: 0, right: 0 
          }}>
            <h4 style={{ color: colors.accent, margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>
              {selectedImage.title}
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '5px 0 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} /> {selectedImage.location}
            </p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
          </div>

          {/* SIDEBAR (4 Col) */}
          <aside style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ background: colors.bgCard, padding: '25px', borderRadius: '24px', border: `1px solid ${colors.border}` }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare size={18} color={colors.accent} /> Encuesta Pro</h4>
              <p style={{ color: colors.textMuted, fontSize: '0.85rem', marginBottom: '15px' }}>¿Mystik Dan ganará la Triple Corona?</p>
              {['Sí, es imparable', 'No, es muy difícil', 'Solo ganará el Belmont'].map((opt, i) => (
                <button key={i} style={{ width: '100%', textAlign: 'left', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`, color: '#fff', fontSize: '0.8rem', marginBottom: '10px', cursor: 'pointer' }}>{opt}</button>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '24px', border: `1px solid ${colors.border}` }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><TrendingUp size={18} color={colors.accent} /> Tendencias</h4>
                {[1,2,3].map(i => (
                    <div key={i} style={{ marginBottom: '15px', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none', paddingBottom: '10px' }}>
                        <p style={{ color: '#fff', fontSize: '0.9rem', margin: '0 0 5px 0', fontWeight: '600' }}>Pronósticos para el Derby 152</p>
                        <span style={{ fontSize: '0.7rem', color: colors.textMuted }}>12k lecturas</span>
                    </div>
                ))}
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL CON SCROLL */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArticle(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(10, 23, 42, 0.95)', backdropFilter: 'blur(15px)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '800px', maxHeight: '85vh', backgroundColor: colors.bgCard, borderRadius: '40px', border: `1px solid ${colors.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => setSelectedArticle(null)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 30, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}><X size={20}/></button>
              <div style={{ overflowY: 'auto' }}>
                <img src={selectedArticle.img} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                <div style={{ padding: '40px' }}>
                  <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.1 }}>{selectedArticle.title}</h2>
                  <p style={{ color: colors.textMuted, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '20px', whiteSpace: 'pre-line' }}>{selectedArticle.content}</p>
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

export default NewsPage;
