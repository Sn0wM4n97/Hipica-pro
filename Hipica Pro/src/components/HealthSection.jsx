import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Activity, HeartHandshake, Microscope } from 'lucide-react';


const HEALTH_INFO = [
  {
    title: "Exámenes de Integridad",
    subtitle: "PROTOCOLO PRE-CARRERA 24H",
    description: "Cada competidor se somete a una inspección física rigurosa. Evaluamos la simetría del movimiento, frecuencia cardíaca en reposo y estado de las extremidades para garantizar que solo los atletas al 100% entren a la pista.",
    icon: <ShieldCheck size={32} />,
    color: "#eab308",
    img: "https://images.unsplash.com/uploads/14136148007774dc82563/ce92d553?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Vigilancia Biométrica",
    subtitle: "TECNOLOGÍA DE MONITOREO AVANZADO",
    description: "Implementamos cámaras termográficas FLIR y sensores de zancada para detectar inflamaciones subclínicas antes de que sean visibles al ojo humano, permitiendo intervenciones preventivas inmediatas.",
    icon: <Microscope size={32} />,
    color: "#22c55e",
    img: "https://images.unsplash.com/photo-1541600593739-1d4c5177aae2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Vida Post-Carrera",
    subtitle: "PROGRAMA DE RETIRO DIGNO",
    description: "Nuestro compromiso no termina en la meta. Financiamos santuarios y programas de reentrenamiento para que nuestros caballos inicien nuevas carreras como compañeros de terapia o equitación recreativa.",
    icon: <HeartHandshake size={32} />,
    color: "#3b82f6",
    img: "https://images.unsplash.com/photo-1563884037443-70886457ce4f?q=80&w=1442&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const DURATION = 6000; // 6 segundos por cada tema


const HealthDynamicSection = () => {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  // --- MANTENEMOS TU LÓGICA DE CURSOR ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HEALTH_INFO.length);
      setProgressKey((prev) => prev + 1);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '100px 5%', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        
        {/* LADO IZQUIERDO: IMAGEN FIJA CON ANIMACIÓN */}
        <div style={{ 
            position: 'relative', 
            height: '500px', 
            borderRadius: '40px', 
            width: '100%', // Asegura el ancho total
            overflow: 'hidden', 
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={HEALTH_INFO[index].img}
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
        </div>

        {/* LADO DERECHO: TEXTO DINÁMICO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {HEALTH_INFO.map((item, i) => (
              <div 
                key={i} 
                onClick={() => { setIndex(i); setProgressKey(prev => prev + 1); }}
                style={{ cursor: 'pointer', position: 'relative', padding: '15px 0' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', opacity: i === index ? 1 : 0.3, transition: '0.3s' }}>
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>{item.title}</h3>
                </div>
                
                {/* BARRA DE PROGRESO (Solo visible en el activo) */}
                {i === index && (
                  <div style={{ height: '2px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', marginTop: '10px', overflow: 'hidden' }}>
                    <motion.div 
                      key={progressKey}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      style={{ height: '100%', backgroundColor: item.color }}
                    />
                  </div>
                )}

                {/* DESCRIPCIÓN (Solo visible en el activo) */}
                <AnimatePresence>
                  {i === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 0.7 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ paddingTop: '15px', fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HealthDynamicSection;
