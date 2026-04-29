import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; // 1. Importante importar Link
import { motion, AnimatePresence } from 'framer-motion'
import { flushSync } from 'react-dom'
import RaceTicker from './RaceTicker'
import { Zap, Ticket, Calendar, Trophy, History, ShieldQuestion, PlayCircle,HeartPlus,Rss,User,Moon,Sun, ChevronRight, Menu, X, Wallet} from 'lucide-react'; 





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

const NavItem = ({ title, icon, subItems, image, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [balance, setBalance] = useState(1250.00);

  const handleFakeDeposit = () => {
    setBalance(prev => prev + 500);
  };

  const menuData = [
    { 
      title: 'CARRERAS', 
      icon: <Zap size={18} />,
      image: 'https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?q=80&w=871&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1446669052213-5dcff53f1f3f?q=80&w=1473&auto=format&fit=crop',
      description: 'Gestiona tus apuestas, revisa tus boletos y accede a promociones exclusivas.',
      subItems: [
        { label: 'Mis Boletos', icon: <Ticket size={14} /> },
        { label: 'Reglas', icon: <ShieldQuestion size={14} /> },
        { label: 'En Vivo', icon: <PlayCircle size={14} /> }
      ] 
    },
    { title: 'SALUD', icon: <HeartPlus size={18} /> },
    { title: 'NOTICIAS', icon: <Rss size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsFloating(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  const toggleTheme = (event) => {
    if (!document.startViewTransition) {
      setIsDark((prev) => !prev); return;
    }
    document.startViewTransition(() => {
      flushSync(() => setIsDark((prev) => !prev));
    });
  }

  return (
  <>
    <motion.nav
      initial={false}
      animate={{
        y: isFloating ? 15 : 0,
        width: isFloating ? '95%' : '100vw',
        left: isFloating ? '2.5%' : 0,
        borderRadius: isFloating ? '20px' : '0px',
        backgroundColor: isDark
          ? isFloating ? 'rgba(30, 41, 59, 0.85)' : '#1e293b'
          : isFloating ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
        boxShadow: isFloating ? '0 10px 30px rgba(0,0,0,0.2)' : 'none',
        backdropFilter: isFloating ? 'blur(12px)' : 'none',
        border: isFloating ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ position: 'fixed', top: 0, zIndex: 1000 }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '70px' }}>
        
        {/* IZQUIERDA: LOGO + DESKTOP MENU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#eab308', letterSpacing: '-1px' }}>HÍPICA PRO</div>
          </Link>
          
          <div className="nav-desktop-links" style={{ display: 'flex', gap: '5px' }}>
            {menuData.map((menu, i) => (
              <NavItem key={i} {...menu} />
            ))}
          </div>
        </div>

        {/* CENTRO: TICKER */}
        <div className="nav-ticker" style={{ flex: 1, margin: '0 30px', maxWidth: '350px' }}>
          <RaceTicker />
        </div>

        {/* DERECHA: ACCIONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <div className="nav-balance" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.5rem', opacity: 0.6, fontWeight: 'bold' }}>SALDO</div>
              <div style={{ color: '#eab308', fontWeight: '800', fontSize: '0.85rem' }}>${balance.toLocaleString()}</div>
            </div>
            <button onClick={handleFakeDeposit} style={{ background: '#eab308', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '0.6rem', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
          </div>

          <Link to="/perfil" style={{ display: 'flex', alignItems: 'center', color: '#eab308' }}>
            <User size={20} />
          </Link>

          <button 
            className="nav-mobile-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>

    {/* MENÚ MÓVIL CORREGIDO */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0f172a',
            zIndex: 9999,
            padding: '30px 25px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Cabecera del Menú */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '40px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: '20px'
          }}>
            <div style={{ fontWeight: '900', color: '#eab308', fontSize: '1.2rem', letterSpacing: '-1px' }}>
              HÍPICA PRO
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '12px', padding: '10px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Cuerpo del Menú (Scrollable) */}
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '10px' }}>
            {menuData.map((menu, i) => (
              <div key={i} style={{ marginBottom: '35px' }}>
                {/* Título de Categoría - Ahora usa getPath para ser funcional si se clickea el padre */}
                <Link 
                  to={getPath(menu.title)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: '#eab308', 
                    marginBottom: '20px', 
                    fontWeight: '900', 
                    fontSize: '0.8rem',
                    letterSpacing: '2px',
                    textDecoration: 'none'
                  }}
                >
                  {menu.icon} {menu.title}
                </Link>

                {/* Links de la Categoría */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingLeft: '32px' }}>
                  {menu.subItems ? menu.subItems.map((sub, j) => (
                    <Link 
                      key={j} 
                      to={getPath(sub.label)} // CORRECCIÓN: Usamos getPath para traducir el label a la ruta
                      onClick={() => setIsMobileMenuOpen(false)} 
                      style={{ 
                        color: '#f8fafc', 
                        textDecoration: 'none', 
                        fontSize: '1.1rem', 
                        fontWeight: '500',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {sub.label}
                      <ChevronRight size={18} style={{ opacity: 0.2 }} />
                    </Link>
                  )) : (
                    <Link 
                      to={getPath(menu.title)} // Para items sin subItems como SALUD o NOTICIAS
                      onClick={() => setIsMobileMenuOpen(false)} 
                      style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}
                    >
                      Ver sección
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer del Menú Móvil */}
          <div style={{ 
            marginTop: '20px', 
            paddingTop: '20px', 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>MI PERFIL</Link>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>SOPORTE 24/7</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>


      {/* ESTILOS CSS PARA RESPONSIVE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .nav-desktop-links, .nav-ticker { display: none !important; }
        }
        @media (min-width: 1025px) {
          .nav-mobile-trigger { display: none !important; }
        }
        @media (max-width: 480px) {
          .nav-balance { display: none !important; }
        }
      `}} />
    </>
  )
}

export default TopBar;