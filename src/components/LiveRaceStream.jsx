import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import caballosEnVivo from '../assets/caballosEnVivo.mp4'


const LiveRaceStream = memo(() => {
  const [isFloating, setIsFloating] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activamos modo flotante solo cuando el contenedor original sale del todo
        setIsFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Componente interno del video para no repetir código
  const VideoPlayer = ({ isMini }) => (
    <motion.div
      layoutId="main-video" // <-- CLAVE: Esto conecta ambos estados
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: isMini ? '16px' : '24px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src={caballosEnVivo} type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
        LIVE
      </div>
    </motion.div>
  );

  return (
    <>
      {/* 1. CONTENEDOR ORIGINAL (Siempre mide lo mismo, no se mueve) */}
      <div ref={containerRef} style={{ width: '100%', aspectRatio: '16/9', marginBottom: '30px' }}>
        {!isFloating && <VideoPlayer isMini={false} />}
      </div>

      {/* 2. VERSIÓN FLOTANTE (Solo existe cuando isFloating es true) */}
      <AnimatePresence>
        {isFloating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '320px',
              height: '180px',
              zIndex: 9999,
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <VideoPlayer isMini={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default LiveRaceStream;