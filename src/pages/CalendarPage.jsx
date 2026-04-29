import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as   MapPin,  ChevronRight, Bell } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import NextMajorWidget from '../components/NextMajorWidget';

const PREVIOUS_WINNERS = [
  { id: 1, name: "Mage", race: "Kentucky Derby 2023", img: "https://images.unsplash.com/photo-1635895901494-539a6b2647af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "National Treasure", race: "Preakness Stakes 2023", img: "https://images.unsplash.com/photo-1609510038916-9328a3c86966?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Arcangelo", race: "Belmont Stakes 2023", img: "https://images.unsplash.com/photo-1475539175801-4f770d7d1a49?q=80&w=1686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const STAKES_EVENTS = [
  { id: 1, date: "MAY 04", title: "KENTUCKY DERBY", grade: "GI", track: "CHURCHILL DOWNS", purse: "$5M", featured: true },
  { id: 2, date: "MAY 18", title: "PREAKNESS STAKES", grade: "GI", track: "PIMLICO", purse: "$2M", featured: true },
  { id: 3, date: "JUN 08", title: "BELMONT STAKES", grade: "GI", track: "SARATOGA", purse: "$2M", featured: true },
  { id: 4, date: "JUN 15", title: "METROPOLITAN HANDICAP", grade: "GI", track: "SARATOGA", purse: "$1M", featured: false },
  { id: 5, date: "JUL 20", title: "HASKELL STAKES", grade: "GI", track: "MONMOUTH PARK", purse: "$1M", featured: false },
];

// 1. Aseguramos que las variantes tengan un estado de "exit"
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.4 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    filter: 'blur(4px)',
    transition: { duration: 0.2 } 
  }
};

const ReminderBtn = ({ eventTitle }) => {
  const [active, setActive] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActive(!active)}
      style={{
        padding: '10px 18px',
        borderRadius: '10px',
        border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
        backgroundColor: active ? '#eab308' : 'rgba(255,255,255,0.05)',
        color: active ? '#000' : '#fff',
        fontSize: '0.7rem',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <Bell size={14} fill={active ? "#000" : "none"} />
      {active ? 'ACTIVADO' : 'RECORDATORIO'}
    </motion.button>
  );
};


const CalendarPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % PREVIOUS_WINNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = filter === 'FEATURED' 
    ? STAKES_EVENTS.filter(e => e.featured) 
    : STAKES_EVENTS;

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <TopBar />

      {/* Hero Carousel */}
      <section style={{ 
        height: '70vh', 
        position: 'relative', 
        overflow: 'hidden',
        margin: '0 0px',
        borderRadius: '0 0 0px 0px'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img 
              src={PREVIOUS_WINNERS[carouselIndex].img} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Winner"
            />
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,1) 95%)' 
            }} />
            
            <div style={{ position: 'absolute', bottom: '10%', left: '8%', maxWidth: '600px' }}>
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ backgroundColor: '#eab308', color: '#000', padding: '5px 12px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}
              >
                CAMPEÓN DEFENSOR
              </motion.span>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: '15px 0', fontWeight: '900', lineHeight: 1 }}
              >
                {PREVIOUS_WINNERS[carouselIndex].name}
              </motion.h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>{PREVIOUS_WINNERS[carouselIndex].race}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      
      <div style={{ maxWidth: '1100px', margin: '-50px auto 0', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        
        <NextMajorWidget />

        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>Calendario de <span style={{ color: '#eab308' }}>Stakes</span></h3>
              <p style={{ opacity: 0.5, marginTop: '5px' }}>Temporada Oficial 2024</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <FilterBtn active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="TODOS" />
              <FilterBtn active={filter === 'FEATURED'} onClick={() => setFilter('FEATURED')} label="MAJORS" />
            </div>
          </div>

          {/* LISTA CON CORRECCIÓN DE LÓGICA */}
          <div style={{ display: 'grid', gap: '15px', position: 'relative' }}>
            <AnimatePresence mode="popLayout">
              <motion.div 
                key={filter} // Forzamos la re-animación al cambiar filtro
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'grid', gap: '15px', width: '100%' }}
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    layout
                    key={event.id}
                    variants={itemVariants}
                    exit="exit"
                    whileHover={{ 
                      scale: 1.01, 
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(234, 179, 8, 0.4)' 
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      padding: '20px 30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      flexWrap: 'wrap',
                      backdropFilter: 'blur(10px)',
                      transition: 'border-color 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flex: 1 }}>
                      <div style={{ textAlign: 'center', minWidth: '70px' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: '900', color: '#eab308' }}>
                            {event.date.split(' ')[0]}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>
                            {event.date.split(' ')[1]}
                        </div>
                      </div>
                      
                      <div style={{ height: '40px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{event.title}</h4>
                          <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', border: '1px solid #eab308', color: '#eab308', fontWeight: '900' }}>{event.grade}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={12} /> {event.track} • {event.purse}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <ReminderBtn eventTitle={event.title} />
                      <motion.div whileHover={{ x: 5 }} style={{ cursor: 'pointer', color: '#eab308' }}>
                        <ChevronRight size={24} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- ESTILOS Y SUBCOMPONENTES ---

// Componente de Botón de Filtro
const FilterBtn = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: '30px',
      border: '1px solid',
      borderColor: active ? '#eab308' : 'rgba(255,255,255,0.1)',
      backgroundColor: active ? '#eab308' : 'transparent',
      color: active ? '#000' : '#fff',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      letterSpacing: '1px'
    }}
  >
    {label}
  </button>
);



export default CalendarPage;

