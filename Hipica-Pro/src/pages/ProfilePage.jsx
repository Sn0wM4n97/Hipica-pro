import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Wallet, Shield, Bell, LogOut, 
  Trophy, TrendingUp, Star, Camera, Save, MapPin
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('cuenta');

  const colors = {
    bgMain: '#0f172a',      // Azul profundo
    bgCard: '#1e293b',      // Azul tarjeta
    accent: '#eab308',      // Dorado
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };

  const stats = [
    { label: "APUESTAS GANADAS", val: "124", icon: <Trophy size={18} /> },
    { label: "WIN RATE", val: "68%", icon: <TrendingUp size={18} /> },
    { label: "LOGROS", val: "12/20", icon: <Star size={18} /> },
  ];

  const menuItems = [
    { id: 'cuenta', label: 'Mi Cuenta', icon: <User size={20} /> },
    { id: 'billetera', label: 'Billetera y Pagos', icon: <Wallet size={20} /> },
    { id: 'seguridad', label: 'Seguridad', icon: <Shield size={20} /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={20} /> },
    { id: 'logout', label: 'Cerrar Sesión', icon: <LogOut size={20} />, color: '#ef4444' },
  ];

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* 1. HEADER DEL PERFIL (Igual a tu imagen) */}
        <section style={{ 
  background: colors.bgCard, 
  borderRadius: '32px', 
  padding: '40px',
  border: `1px solid ${colors.border}`, 
  marginBottom: '30px',
  display: 'flex', 
  alignItems: 'center', 
  gap: '40px', 
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* Decoración de fondo corregida */}
  <Trophy size={180} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.03, color: colors.accent, transform: 'rotate(-15deg)' }} />

  {/* 1. LADO IZQUIERDO: AVATAR */}
  <div style={{ position: 'relative', flexShrink: 0 }}>
    <div style={{ 
      width: '130px', height: '130px', borderRadius: '35px', 
      backgroundColor: colors.accent, display: 'flex', 
      justifyContent: 'center', alignItems: 'center', color: '#000',
      boxShadow: `0 10px 30px ${colors.accent}22`
    }}>
      <User size={70} strokeWidth={1.5} />
    </div>
    <motion.button 
      whileHover={{ scale: 1.1 }}
      style={{ 
        position: 'absolute', bottom: '-5px', right: '-5px',
        width: '38px', height: '38px', borderRadius: '12px',
        backgroundColor: colors.bgMain, border: `2px solid ${colors.bgCard}`,
        color: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
    >
      <Camera size={18} />
    </motion.button>
  </div>

  {/* 2. LADO DERECHO: INFO PRINCIPAL */}
  <div style={{ flex: 1 }}>
    
    {/* FILA 1: NOMBRE Y RANGO */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
      <div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>Alexander Pierce</h1>
        <p style={{ color: colors.textMuted, fontSize: '0.9rem', margin: '5px 0 0' }}>
          alex.pierce@pro-racer.com • <span style={{ opacity: 0.7 }}>Miembro desde 2023</span>
        </p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <span style={{ 
          backgroundColor: 'rgba(234, 179, 8, 0.1)', color: colors.accent,
          padding: '6px 14px', borderRadius: '10px', fontSize: '0.75rem', 
          fontWeight: '900', border: `1px solid ${colors.accent}33`,
          letterSpacing: '1px'
        }}>
          RANGO: LEYENDA
        </span>
      </div>
    </div>

    {/* FILA 2: BARRA DE PROGRESO (Separada y clara) */}
    <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.02)', padding: '15px 20px', borderRadius: '16px', border: `1px solid ${colors.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.65rem', color: colors.textMuted, fontWeight: '800', letterSpacing: '1px' }}>PROGRESO DE NIVEL</span>
        <span style={{ fontSize: '0.65rem', color: colors.accent, fontWeight: '900' }}>85% PARA NIVEL PRO</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '85%' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ height: '100%', backgroundColor: colors.accent, boxShadow: `0 0 15px ${colors.accent}44` }}
        />
      </div>
    </div>

    {/* FILA 3: STATS (Con iconos y mejor espaciado) */}
    <div style={{ display: 'flex', gap: '50px' }}>
      {[
        { label: "APUESTAS GANADAS", val: "124", icon: <Trophy size={16} color={colors.accent}/> },
        { label: "WIN RATE", val: "68%", icon: <TrendingUp size={16} color="#22c55e"/> },
        { label: "LOGROS", val: "12/20", icon: <Star size={16} color="#3b82f6"/> },
      ].map((s, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMuted, fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.5px' }}>
            {s.icon} {s.label}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '4px', color: '#fff' }}>{s.val}</div>
        </div>
      ))}
    </div>

  </div>
</section>

        {/* 2. CUERPO: SIDEBAR + CONTENIDO */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
          
          {/* Menú Lateral */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '15px',
                  padding: '18px 25px', borderRadius: '20px', border: 'none',
                  backgroundColor: activeTab === item.id ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
                  color: activeTab === item.id ? colors.accent : (item.color || colors.textMuted),
                  cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left',
                  fontWeight: activeTab === item.id ? '900' : '600'
                }}
              >
                {item.icon}
                <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
              </motion.button>
            ))}
          </aside>

          {/* Área de Contenido Dinámico */}
          <section style={{ 
            background: colors.bgCard, borderRadius: '32px', padding: '40px',
            border: `1px solid ${colors.border}`
          }}>
            <AnimatePresence mode='wait'>
              {activeTab === 'cuenta' && (
                <motion.div 
                  key="form" initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', textAlign: 'center' }}>Información General</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', color: colors.accent, fontWeight: '900' }}>NOMBRE COMPLETO</label>
                      <input type="text" defaultValue="Alexander Pierce" style={inputStyle(colors)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', color: colors.accent, fontWeight: '900' }}>PAÍS / REGIÓN</label>
                      <input type="text" defaultValue="Venezuela" style={inputStyle(colors)} />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', color: colors.accent, fontWeight: '900' }}>CORREO ELECTRÓNICO</label>
                      <input type="email" defaultValue="alex.pierce@pro-racer.com" style={inputStyle(colors)} />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ 
                      width: '100%', marginTop: '40px', padding: '16px', borderRadius: '16px',
                      backgroundColor: colors.accent, color: '#000', border: 'none',
                      fontWeight: '900', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '10px'
                    }}
                  >
                    <Save size={18} /> GUARDAR CAMBIOS
                  </motion.button>
                </motion.div>
              )}

              {activeTab === 'billetera' && (
  <motion.div 
    key="wallet" 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: -20 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Estado de Cuenta</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ padding: '10px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>RETIRAR</button>
        <button style={{ padding: '10px 20px', borderRadius: '12px', background: colors.accent, border: 'none', color: '#000', fontSize: '0.8rem', fontWeight: '900', cursor: 'pointer' }}>DEPOSITAR</button>
      </div>
    </div>

    {/* 1. CARDS DE BALANCE RÁPIDO */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '25px', borderRadius: '24px', border: `1px solid ${colors.border}` }}>
        <div style={{ color: colors.textMuted, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>SALDO TOTAL</div>
        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: colors.accent, marginTop: '5px' }}>$1,250.00</div>
      </div>
      <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '25px', borderRadius: '24px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
        <div style={{ color: colors.success, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>GANANCIAS ESTE MES</div>
        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: colors.success, marginTop: '5px' }}>+$420.50</div>
      </div>
    </div>

    {/* 1. SECCIÓN DE GRÁFICOS (Doble Columna) */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px', marginBottom: '40px' }}>
      
      {/* Gráfico de Actividad (Barras) */}
      <div style={{ background: 'rgba(0,0,0,0.1)', padding: '30px', borderRadius: '32px', border: `1px solid ${colors.border}` }}>
        <h3 style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '20px' }}>Actividad Semanal</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', gap: '10px' }}>
          {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <motion.div 
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                style={{ width: '100%', background: i === 3 ? colors.accent : 'rgba(234, 179, 8, 0.2)', borderRadius: '6px' }} 
              />
              <span style={{ fontSize: '0.6rem', color: colors.textMuted }}>D{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. GRÁFICO DE DONA (Distribución por Hipódromo) */}
      <div style={{ background: 'rgba(0,0,0,0.1)', padding: '30px', borderRadius: '32px', border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '20px', alignSelf: 'flex-start' }}>Distribución de Jugadas</h3>
        
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '20px' }}>
          <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {/* Segmento Gulfstream (45%) */}
            <circle cx="18" cy="18" r="16" fill="none" stroke={colors.accent} strokeWidth="4" strokeDasharray="45 100" />
            {/* Segmento Saratoga (30%) */}
            <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-45" />
            {/* Segmento La Rinconada (25%) */}
            <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-75" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>3</span>
            <span style={{ fontSize: '0.5rem', color: colors.textMuted }}>PISTAS</span>
          </div>
        </div>

        {/* Leyenda del gráfico circular */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Gulfstream', color: colors.accent, pct: '45%' },
            { label: 'Saratoga', color: '#3b82f6', pct: '30%' },
            { label: 'La Rinconada', color: '#10b981', pct: '25%' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: item.color }} />
                <span style={{ fontSize: '0.75rem', color: colors.textMuted }}>{item.label}</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{item.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 3. HISTORIAL DE TRANSACCIONES */}
    <div>
      <h3 style={{ fontSize: '1rem', color: colors.textMuted, marginBottom: '20px' }}>Transacciones Recientes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { type: 'Depósito', date: '24 Abr, 2026', amount: '+ $500.00', status: 'Completado', icon: <TrendingUp size={16}/>, color: colors.success },
          { type: 'Apuesta GSP - R4', date: '23 Abr, 2026', amount: '- $50.00', status: 'Procesado', icon: <TrendingUp size={16} style={{transform: 'rotate(180deg)'}}/>, color: '#ef4444' },
          { type: 'Premio Carrera 8', date: '22 Abr, 2026', amount: '+ $125.00', status: 'Completado', icon: <Trophy size={16}/>, color: colors.success },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ color: t.color, background: `${t.color}15`, padding: '10px', borderRadius: '10px' }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{t.type}</div>
                <div style={{ fontSize: '0.7rem', color: colors.textMuted }}>{t.date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', color: t.color }}>{t.amount}</div>
              <div style={{ fontSize: '0.6rem', color: colors.textMuted, fontWeight: 'bold' }}>{t.status.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}

{activeTab === 'seguridad' && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Seguridad de la Cuenta</h2>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Autenticación de 2 Factores */}
      <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 'bold', color: '#fff' }}>Autenticación de Dos Factores (2FA)</div>
          <div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Añade una capa extra de seguridad a tus retiros.</div>
        </div>
        <div style={{ width: '50px', height: '26px', backgroundColor: colors.accent, borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#000', borderRadius: '50%', position: 'absolute', right: '3px', top: '3px' }} />
        </div>
      </div>

      {/* Juego Responsable */}
      <div style={{ marginTop: '20px', padding: '25px', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
        <h3 style={{ color: '#ef4444', fontSize: '1rem', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} /> Juego Responsable
        </h3>
        <p style={{ fontSize: '0.85rem', color: colors.textMuted, marginBottom: '20px' }}>Establece límites para mantener tu experiencia de juego divertida y segura.</p>
        <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #ef4444', background: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
            DEFINIR LÍMITE DE PÉRDIDAS
        </button>
      </div>
    </div>
  </motion.div>
)}
{activeTab === 'notificaciones' && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Preferencias de Alertas</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {[
        { t: "Resultados de Apuestas", d: "Notificarme apenas termine la carrera." },
        { t: "Inicio de Carrera", d: "Alertar 5 minutos antes de que abran los aparatos." },
        { t: "Nuevos Bonos", d: "Recibir avisos de promociones y créditos gratis." }
      ].map((n, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: `1px solid ${colors.border}` }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>{n.t}</div>
            <div style={{ fontSize: '0.8rem', color: colors.textMuted }}>{n.d}</div>
          </div>
          <input type="checkbox" defaultChecked style={{ accentColor: colors.accent, width: '18px', height: '18px' }} />
        </div>
      ))}
    </div>
  </motion.div>
)}

            </AnimatePresence>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

// Estilo reutilizable para inputs
const inputStyle = (colors) => ({
  backgroundColor: 'rgba(0,0,0,0.2)',
  border: `1px solid ${colors.border}`,
  padding: '16px 20px',
  borderRadius: '14px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.3s ease'
});

export default ProfilePage;
