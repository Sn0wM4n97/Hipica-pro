import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Lock, ChevronRight, Sun, CloudRain, Star } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const DailySchedulePage = () => {
  // Definimos los colores exactos para asegurar el patrón
  const colors = {
    bgMain: '#0f172a',      // Azul marino opaco (Fondo)
    bgCard: '#1e293b',      // Azul un poco más claro (Tarjetas)
    accent: '#eab308',      // Amarillo/Dorado (Acciones)
    textMain: '#ffffff',    // Blanco
    textMuted: '#94a3b8',   // Gris azulado (Textos secundarios)
    border: 'rgba(255, 255, 255, 0.05)'
  };

  const schedule = [
    { 
      track: "GULFSTREAM PARK", 
      next: "2:45 PM", 
      status: "LIVE", 
      color: "#ef4444", // Rojo para En Vivo
      condition: "FAST",
      weather: "SUNNY",
      minsToNext: "8 min",
      highlight: "Clásico Grado 1 en Carrera 9"
    },
    { 
      track: "SANTA ANITA", 
      next: "4:15 PM", 
      status: "OPEN", 
      color: "#a855f7", // Morado para Abierto
      condition: "FIRM",
      weather: "CLOUDY",
      minsToNext: "22 min",
      highlight: "Pick 6 Acumulado: $150k"
    },
    { 
      track: "CHURCHILL DOWNS", 
      next: "1:00 PM", 
      status: "CLOSED", 
      color: colors.textMuted,
      condition: "MUDDY",
      weather: "RAINY",
      minsToNext: null,
      highlight: "Resultados Finalizados"
    },
  ];

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ color: colors.textMain, fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>
              Programación <span style={{ color: colors.accent }}>Hoy</span>
            </h1>
            <p style={{ color: colors.textMuted, marginTop: '5px' }}>Sábado, 20 de Abril 2024</p>
          </div>
          
          <div style={{ border: `1px solid ${colors.accent}`, padding: '8px 16px', borderRadius: '12px' }}>
            <span style={{ color: colors.accent, fontWeight: 'bold', fontSize: '0.8rem' }}>2 PISTAS ACTIVAS</span>
          </div>
        </header>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {schedule.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                background: colors.bgCard, 
                padding: '24px 32px', 
                borderRadius: '24px', 
                border: `1px solid ${colors.border}`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}
            >
              {/* Info Pista */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  {item.status === 'LIVE' && (
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: item.color }}
                    />
                  )}
                </div>
                
                <div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ color: item.color, fontWeight: '900', fontSize: '0.7rem', letterSpacing: '1px' }}>{item.status}</span>
                    <span style={{ fontSize: '0.65rem', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {item.weather === 'SUNNY' ? <Sun size={12} /> : <CloudRain size={12} />} {item.condition}
                    </span>
                  </div>
                  <h3 style={{ margin: '0', color: colors.textMain, fontSize: '1.5rem', fontWeight: '800' }}>{item.track}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: colors.accent, fontSize: '0.8rem' }}>
                    <Star size={14} fill={colors.accent} />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>

              {/* Tiempos y Botón */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', color: colors.textMuted }}>PRÓXIMA SALIDA</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: colors.textMain }}>{item.next}</div>
                  {item.minsToNext && (
                    <div style={{ fontSize: '0.75rem', color: item.status === 'LIVE' ? '#ef4444' : colors.textMain, fontWeight: '700' }}>
                       en {item.minsToNext}
                    </div>
                  )}
                </div>

                <Link to={`/carrera/${i}`} style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    disabled={item.status === 'CLOSED'}
                    style={{ 
                      padding: '12px 28px', borderRadius: '16px', border: 'none', 
                      backgroundColor: item.status === 'CLOSED' ? 'rgba(255,255,255,0.05)' : colors.accent, 
                      color: item.status === 'CLOSED' ? colors.textMuted : '#000',
                      fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                    }}
                  >
                    {item.status === 'CLOSED' ? <Lock size={16} /> : 'ENTRAR'}
                    {item.status !== 'CLOSED' && <ChevronRight size={18} />}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DailySchedulePage;
