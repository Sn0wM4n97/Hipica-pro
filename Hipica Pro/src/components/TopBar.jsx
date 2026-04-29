import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; // 1. Importante importar Link
import { motion, AnimatePresence } from 'framer-motion'
import { flushSync } from 'react-dom'
import RaceTicker from './RaceTicker'
import { 
  Zap, 
  Ticket, 
  Newspaper, 
  Calendar, 
  Trophy, 
  History, 
  ShieldQuestion, 
  PlayCircle,
  HeartPlus,
  Rss,
  User,
  Wallet,
  Bell,
  LogOut,
  Moon,
  Sun
} from 'lucide-react'; 
import { desc } from 'framer-motion/client';

const actionButtonStyle = {
  backgroundColor: '#eab308', // Dorado
  color: '#000',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 15px rgba(234, 179, 8, 0.3)',
};


const handleFakeDeposit = () => {
  // Animación de incremento
  let start = balance;
  const end = balance + 500;
  const duration = 1000; // 1 segundo
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    setBalance(start + (end - start) * progress);
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const NavItem = ({ title, icon, subItems, image, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const getPath = (label) => {
    const paths = {
      "SALUD": "/salud",
      "NOTICIAS": "/noticias",
      "PERFIL": "/perfil",
      "Calendario Hípico": "/calendario",
      "Resultados en Vivo": "/resultados",
      "Programación Diaria": "/programacion",
      "Hipódromos": "/hipodromos",
      "Mis Boletos": "/mis-boletos",
      "Reglas": "/reglas",
      "En Vivo": "/carrera/1",
    };
    return paths[label] || "/";
  };

  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => { setIsOpen(false); setImgLoaded(false); }}
      style={{ position: 'static' }}
    >
      {/* 
         Envolvemos todo en el Link si NO tiene subItems. 
         Si TIENE subItems, el Link se maneja dentro del menú.
      */}
      {hasSubItems ? (
        <div style={{ height: '70px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '0 10px' }}>
          <motion.div animate={{ y: isOpen ? -3 : 0, color: isOpen ? '#eab308' : 'var(--text-main)' }}>
            {icon}
          </motion.div>
          <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-main)', letterSpacing: '0.5px' }}>
            {title}
          </span>
        </div>
      ) : (
        <Link to={getPath(title)} style={{ textDecoration: 'none' }}>
          <div style={{ height: '70px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '0 10px' }}>
            {/* Animamos el icono también aquí */}
            <motion.div animate={{ y: isOpen ? -3 : 0, color: isOpen ? '#eab308' : 'var(--text-main)' }}>
              {icon}
            </motion.div>
            <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-main)', letterSpacing: '0.5px' }}>
              {title}
            </span>
          </div>
        </Link>
      )}

      <AnimatePresence>
        {/* Solo mostramos el Mega Menú si isOpen es true Y tiene subItems */}
        {isOpen && hasSubItems && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute', top: '70px', left: '0', right: '0',
              width: '100%', backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              display: 'grid',
              gridTemplateColumns: image ? '400px 1fr' : '1fr',
              zIndex: 2000, overflow: 'hidden', backdropFilter: 'blur(20px)'
            }}
          >
            {image && (
              <div style={{ position: 'relative', background: '#000', height: '350px' }}>
                <img 
                  src={image} 
                  onLoad={() => setImgLoaded(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imgLoaded ? 0.6 : 0, transition: 'opacity 0.5s' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, var(--bg-card))' }} />
                <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>{title}</h3>
                  <p style={{ color: '#ccc', fontSize: '0.8rem', marginTop: '5px' }}>{description}</p>
                </div>
              </div>
            )}

            <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', alignContent: 'start' }}>
              {subItems?.map((item, index) => (
                <Link key={index} to={getPath(item.label)} style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileHover={{ x: 10, backgroundColor: 'var(--hover-bg)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                  >
                    <div style={{ color: '#eab308' }}>{item.icon}</div>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};








// --- COMPONENTE PRINCIPAL ACTUALIZADO ---
const TopBar = () => {
  const [isFloating, setIsFloating] = useState(false)
  // 1. Iniciamos el estado desde localStorage para que no falle al recargar
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light'; // Por defecto oscuro
  });
  const [balance, setBalance] = useState(1250.00);

  const handleFakeDeposit = () => {
    setBalance(prev => prev + 500);
  };


  // Datos para los menús
  const menuData = [
  { 
    title: 'CARRERAS', 
    icon: <Zap size={18} />,
    image: 'https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Imagen de caballos
    description: 'Sigue la acción en vivo desde los mejores hipódromos del mundo.',
    subItems: [
    { label: "Calendario Hípico", icon: <Calendar size={18} /> },
    { label: "Resultados en Vivo", icon: <Trophy size={18} /> },
    { label: "Programación Diaria", icon: <History size={18} /> },
    { label: "Hipódromos", icon: <Zap size={18} /> }
  ]
  },
  { 
    title: 'APUESTAS', 
    icon: <Ticket size={18} />, 
    image: 'https://images.unsplash.com/photo-1446669052213-5dcff53f1f3f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Gestiona tus apuestas, revisa tus boletos y accede a promociones exclusivas.',
    subItems: [
      { label: 'Mis Boletos', icon: <Ticket size={14} /> },
      { label: 'Reglas', icon: <ShieldQuestion size={14} /> },
      { label: 'En Vivo', icon: <PlayCircle size={14} /> }
    ] 
  },
  { 
    title: 'SALUD', 
    icon: <HeartPlus size={18} />,
  },
  { 
    title: 'NOTICIAS', 
    icon: <Rss size={18} />,
  },
];

  useEffect(() => {
    const handleScroll = () => setIsFloating(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Efecto para aplicar el tema al documento
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);


  const toggleTheme = async (event) => {
    if (!document.startViewTransition) {
      setIsDark((prev) => !prev); return;
    }
    const x = event.clientX; const y = event.clientY;
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.startViewTransition(() => {
      flushSync(() => setIsDark((prev) => !prev));
    });
  }

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isFloating ? 20 : 0,
        width: isFloating ? '90%' : '100vw',
        left: isFloating ? '50%' : 0,
        x: isFloating ? '-50%' : '0%', // Mejor usar x en lugar de transform: translateX
        borderRadius: isFloating ? '24px' : '0px',
        backgroundColor: isDark
          ? isFloating ? 'rgba(30, 41, 59, 0.8)' : '#1e293b'
          : isFloating ? 'rgba(255, 255, 255, 0.8)' : '#ffffff',
        boxShadow: isFloating ? '0 10px 25px -5px rgba(0,0,0,0.3)' : 'none',
        backdropFilter: isFloating ? 'blur(12px)' : 'none',
        border: isFloating ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '70px' }}>
        
        {/* LOGO E ITEMS IZQUIERDA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Envolvemos el texto con Link */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              fontWeight: '900', 
              fontSize: '1.4rem', 
              letterSpacing: '-1px', 
              color: 'var(--text-main)', // Se adapta al modo oscuro/claro
              cursor: 'pointer' 
            }}>
              HÍPICA PRO
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '15px', position: 'static' }}> {/* Agregamos position static */}
  {menuData.map((menu, i) => (
    <NavItem 
      key={i} 
      title={menu.title} 
      icon={menu.icon} 
      subItems={menu.subItems}
      image={menu.image}       // <--- Agregado
      description={menu.description} // <--- Agregado
    />
  ))}
</div>
        </div>

        {/* CENTRO: TICKER */}
        <div style={{ flex: 1, margin: '0 40px', maxWidth: '400px' }}>
          <RaceTicker />
        </div>

        {/* DERECHA: ACCIONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  
  {/* WIDGET DE BALANCE */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: '6px 16px', 
    borderRadius: '12px',
    border: '1px solid var(--border-color)'
  }}>
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>MI SALDO</div>
      <div style={{ color: '#eab308', fontWeight: '900', fontSize: '0.9rem' }}>
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
    </div>
    <button 
      onClick={handleFakeDeposit}
      style={{
        backgroundColor: '#eab308',
        border: 'none',
        borderRadius: '8px',
        padding: '5px 12px',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '0.7rem',
        cursor: 'pointer'
      }}
    >
      DEPOSITAR
    </button>
  </div>

  {/* BOTÓN DE PERFIL (ACCESO DIRECTO) */}
  {/* Icono Perfil */}
          <Link to="/perfil">
             <div style={{ /* estilo de tu circulo de perfil */ }}>
                <User size={20} color="#eab308" />
             </div>
          </Link>

  {/* BOTÓN MODO OSCURO (Tu toggle actual) */}
   {/* BOTÓN MODO OSCURO CORREGIDO */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-main)', 
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Si isDark es true (modo azul), muestra el Sol para cambiar a Claro */}
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          


</div>
      </div>
    </motion.nav>
  )
}

export default TopBar