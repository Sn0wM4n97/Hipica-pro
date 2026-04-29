import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEWS_DATA = [
  { id: 1, tag: "PRENSA", title: "Favoritos confirmados para el Derby", img: "https://images.unsplash.com/photo-1511469100221-c23ac91d1f29?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, tag: "STABLE NOTES", title: "Récord de pista en los entrenamientos", img: "https://images.unsplash.com/photo-1675866949369-9a5dbbdd1884?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, tag: "EVENTOS", title: "Gran Gala Hípica este sábado", img: "https://images.unsplash.com/photo-1626002644000-fdef78240836?q=80&w=1545&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const DURATION = 5000; // 5 segundos por noticia


const NewsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0); // Para reiniciar la barra al cambiar de noticia


  // Lógica de rotación automática
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % NEWS_DATA.length);
      setKey((prev) => prev + 1); // Reinicia la animación de la barra
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '80px 5%', backgroundColor: 'var(--bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        
        {/* NUEVO HEADER ESTILO "RANKING DE JOCKEYS" */}
    <header style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h2 style={{ 
        fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
        fontWeight: '900', 
        color: '#fff', 
        margin: 0,
        lineHeight: '1.1'
      }}>
        Notas del <span style={{ color: '#eab308' }}>Establo</span>
      </h2>
      <p style={{ 
        fontSize: '1rem', 
        color: '#fff', 
        opacity: 0.5, 
        marginTop: '10px',
        fontWeight: '400' 
      }}>
        Información exclusiva directamente desde los recintos de entrenamiento.
      </p>
    </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={NEWS_DATA[index].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'center',
              height: '100%'
            }}
          >
            {/* Lado Imagen */}
            <div style={{ borderRadius: '30px', overflow: 'hidden', height: '350px' }}>
              <img src={NEWS_DATA[index].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Lado Texto */}
            <div>
              <span style={{ color: '#eab308', fontWeight: 'bold', letterSpacing: '2px' }}>
                {NEWS_DATA[index].tag}
              </span>
              <h3 style={{ fontSize: '2.5rem', margin: '20px 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
                {NEWS_DATA[index].title}
              </h3>
              <p style={{ opacity: 0.7, color: 'var(--text-main)', marginBottom: '30px' }}>
                Descubre los detalles más importantes de la jornada y cómo se preparan los jockeys para el gran evento.
              </p>
              <button style={{ background: '#eab308', border: 'none', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
                Leer nota completa
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* CONTENEDOR DE LA BARRA DE PROGRESO */}
        <div style={{ 
          width: '100%', 
          height: '4px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '10px',
          marginTop: '40px',
          overflow: 'hidden' 
        }}>
          <motion.div
            key={key} // Esto obliga a Framer Motion a reiniciar la animación
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: DURATION / 1000, ease: "linear" }}
            style={{ 
              height: '100%', 
              backgroundColor: '#eab308', 
              boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)'
            }}
          />
        </div>

        {/* Indicadores de posición (Dots) */}
        <div style={{ position: 'absolute', bottom: '20px', right: '0', display: 'flex', gap: '10px' }}>
          {NEWS_DATA.map((_, i) => (
            <div 
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? '30px' : '10px',
                height: '10px',
                borderRadius: '10px',
                backgroundColor: i === index ? '#eab308' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;



