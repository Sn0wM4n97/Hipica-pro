import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Activity, Stethoscope, Microscope, Search, 
  ShieldCheck, CheckCircle2, Zap, Thermometer, Weight, AlertCircle 
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const HealthPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const colors = {
    bgMain: '#0f172a',
    bgCard: '#1e293b',
    accent: '#eab308',
    success: '#10b981',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    setSearchResult({
      name: searchTerm.toUpperCase(),
      aptitud: 98,
      status: "APTO PARA COMPETIR",
      metrics: [
        { label: "Frecuencia Cardíaca", val: "38 bpm", status: "Excelente" },
        { label: "Hidratación", val: "Óptima", status: "Verificado" },
        { label: "Estado de Cascos", val: "Herraje Nuevo", status: "OK" }
      ]
    });
  };

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: '#fff', fontSize: '3.5rem', fontWeight: '900', margin: 0, lineHeight: 1.1 }}>
            Centro de <span style={{ color: colors.success }}>Aptitud</span>
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '1.1rem', marginTop: '15px' }}>
            Verificación técnica de requisitos físicos para la alta competencia.
          </p>
        </header>

        {/* 1. GRID PRINCIPAL (Buscador y Requisitos) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '24px', 
          alignItems: 'stretch',
          marginBottom: '24px'
        }}>
          
          {/* VALIDADOR (Lado Izquierdo - 8 Columnas) */}
          <section style={{ 
            gridColumn: 'span 8', 
            background: colors.bgCard, 
            padding: '40px', 
            borderRadius: '32px', 
            border: `1px solid ${colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
              <Search size={20} color={colors.success} /> Validador de Ejemplar
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Escribe el nombre del caballo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1, background: 'rgba(0,0,0,0.2)', border: `1px solid ${colors.border}`,
                  padding: '16px 20px', borderRadius: '14px', color: '#fff', outline: 'none'
                }}
              />
              <button 
                onClick={handleSearch}
                style={{ background: colors.success, color: '#000', padding: '0 30px', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', border: 'none' }}
              >
                VALIDAR
              </button>
            </div>

            <AnimatePresence>
              {searchResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '30px', paddingTop: '30px', borderTop: `1px solid ${colors.border}` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <div>
                      <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem' }}>{searchResult.name}</h2>
                      <span style={{ color: colors.success, fontWeight: '900', fontSize: '0.8rem' }}>{searchResult.status}</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900', color: colors.success, lineHeight: 1 }}>{searchResult.aptitud}%</div>
                      <div style={{ fontSize: '0.6rem', color: colors.textMuted, letterSpacing: '1px' }}>SCORE DE SALUD</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                    {searchResult.metrics.map((m, i) => (
                      <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '16px', border: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: '0.6rem', color: colors.textMuted, marginBottom: '5px' }}>{m.label}</div>
                        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{m.val}</div>
                        <div style={{ color: colors.success, fontSize: '0.6rem', marginTop: '5px', fontWeight: '800' }}>● {m.status}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* REQUISITOS (Lado Derecho - 4 Columnas) */}
          <aside style={{ 
            gridColumn: 'span 4',
            background: `linear-gradient(180deg, ${colors.bgCard} 0%, #0f172a 100%)`, 
            padding: '30px', 
            borderRadius: '32px', 
            border: `1px solid ${colors.success}44`,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <h4 style={{ color: colors.success, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> Requisitos de Carrera
            </h4>
            {[
              { icon: <Thermometer size={16}/>, t: "Temp. Corporal", d: "37.5°C - 38.5°C" },
              { icon: <Weight size={16}/>, t: "Peso Óptimo", d: "Variación < 2%" },
              { icon: <Zap size={16}/>, t: "Test Lactato", d: "Niveles Normales" },
              { icon: <CheckCircle2 size={16}/>, t: "Endoscopía Laringe", d: "Vías Despejadas" }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '15px' }}>
                <div style={{ color: colors.success }}>{item.icon}</div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.t}</div>
                  <div style={{ color: colors.textMuted, fontSize: '0.7rem' }}>{item.d}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* 2. CICLO DE RECUPERACIÓN (Diseño Horizontal para llenar espacio) */}
        <section style={{ 
          background: 'rgba(255,255,255,0.02)', 
          padding: '40px', 
          borderRadius: '32px', 
          border: `1px solid ${colors.border}`,
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h3 style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem' }}>
              <Activity color={colors.success} size={24} /> Ciclo de Recuperación Post-Carrera
            </h3>
            <span style={{ fontSize: '0.7rem', color: colors.success, fontWeight: '900', letterSpacing: '1px' }}>PROTOCOLO OFICIAL</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '2px', background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`, zIndex: 0 }} />
            
            {[
              { day: "48 Horas", task: "Crioterapia", desc: "Reducción de inflamación muscular y térmica." },
              { day: "Día 4", task: "Trote Suave", desc: "Evaluación de movilidad y oxigenación." },
              { day: "Día 10", task: "Breezing", desc: "Primer ejercicio de velocidad controlada." }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '42px', height: '42px', background: colors.bgMain, border: `3px solid ${colors.success}`, borderRadius: '50%', margin: '0 auto 15px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '900', color: colors.success, fontSize: '0.85rem' }}>
                  {i + 1}
                </div>
                <div style={{ color: colors.success, fontSize: '0.7rem', fontWeight: '900', marginBottom: '5px' }}>{step.day}</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>{step.task}</div>
                <p style={{ color: colors.textMuted, fontSize: '0.8rem', lineHeight: '1.4', maxWidth: '220px', margin: '0 auto' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CONSEJOS DEL VETERINARIO (Tarjetas Horizontales) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {[
            { q: "¿Sudor en el Paddock?", a: "Un caballo 'lavado' puede estar perdiendo energía vital antes del salto.", icon: <Zap size={18}/> },
            { q: "¿Cambio de Peso?", a: "Una pérdida súbita de >10kg indica deshidratación o estrés metabólico.", icon: <AlertCircle size={18}/> }
          ].map((tip, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 10 }}
              style={{ background: colors.bgCard, padding: '25px', borderRadius: '24px', borderLeft: `4px solid ${colors.accent}`, border: `1px solid ${colors.border}` }}
            >
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: colors.accent, marginTop: '4px' }}>{tip.icon}</div>
                <div>
                  <div style={{ fontWeight: '900', color: colors.accent, fontSize: '0.8rem', marginBottom: '5px' }}>{tip.q}</div>
                  <p style={{ color: colors.textMuted, fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>{tip.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN FINAL: NUTRICIÓN ÉLITE (DISEÑO HORIZONTAL) */}
<section style={{ marginTop: '30px' }}>
  <div style={{ 
    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 1) 100%)',
    borderRadius: '32px',
    padding: '40px',
    border: `1px solid ${colors.border}`,
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Decoración de fondo sutil */}
    <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.03, color: colors.success }}>
      <Zap size={200} />
    </div>

    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '15px' }}>
          <Zap color={colors.success} size={24} />
        </div>
        <div>
          <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>Nutrición de <span style={{ color: colors.success }}>Élite</span></h2>
          <p style={{ color: colors.textMuted, margin: 0, fontSize: '0.9rem' }}>El balance nutricional detrás del alto rendimiento.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {[
          { label: "FORRAJE PREMIUM", val: "Heno de Alfalfa", pct: "60%", desc: "Fibra de alta digestibilidad." },
          { label: "ENERGÍA", val: "Avena & Granos", pct: "30%", desc: "Carbohidratos para explosividad." },
          { label: "SUPLEMENTOS", val: "Electrolitos", pct: "10%", desc: "Recuperación y vitalidad." }
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px', border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '900', color: colors.success }}>{item.label}</span>
              <span style={{ fontSize: '1rem', fontWeight: '900', color: '#fff' }}>{item.pct}</span>
            </div>
            <h4 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '1rem' }}>{item.val}</h4>
            <p style={{ color: colors.textMuted, fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
            
            {/* Barra de progreso */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '15px' }}>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: item.pct }}
                transition={{ duration: 1 }}
                style={{ height: '100%', background: colors.success, borderRadius: '2px' }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      </div>
      <Footer />
    </main>
  );
};

export default HealthPage;
