import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Target, Layers, HelpCircle, ShieldCheck, X, Send, Mail, MessageSquare } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const RulesPage = () => {

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const colors = {
    bgMain: '#0f172a',
    bgCard: '#1e293b',
    accent: '#eab308',
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };

  const mainRules = [
    {
      id: 1,
      title: "Ganador (Win)",
      desc: "La apuesta más clásica. Selecciona al ejemplar que cruzará la meta en la primera posición. Es la base de toda jugada hípica.",
      icon: <Award size={32} />,
      img: "https://plus.unsplash.com/premium_photo-1683749805319-2c481ae54bc1?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "Exacta",
      desc: "Sube el nivel. Debes acertar los dos primeros caballos en el orden exacto de llegada (1º y 2º). Ofrece mejores dividendos.",
      icon: <Target size={32} />,
      img: "https://images.unsplash.com/photo-1628440501245-393606514a9e?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Trifecta",
      desc: "El reto para expertos. Selecciona los tres primeros lugares en el orden correlativo de llegada. ¡Premios de alto impacto!",
      icon: <Layers size={32} />,
      img: "https://plus.unsplash.com/premium_photo-1668902223985-70daff1e31b1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header Visual */}
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ color: colors.accent, marginBottom: '15px' }}
          >
            <BookOpen size={50} style={{ margin: '0 auto' }} />
          </motion.div>
          <h1 style={{ color: colors.textMain, fontSize: '3.5rem', fontWeight: '900', margin: 0 }}>
            Guía de <span style={{ color: colors.accent }}>Juego</span>
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '1.2rem', maxWidth: '600px', margin: '15px auto 0' }}>
            Aprende los conceptos básicos y avanzados para dominar la pista de carreras.
          </p>
        </header>

        {/* Grid de Reglas principales */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {mainRules.map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: colors.bgCard,
                borderRadius: '32px',
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={rule.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt={rule.title} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1e293b, transparent)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: colors.accent }}>
                  {rule.icon}
                </div>
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 10px 0' }}>{rule.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{rule.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de "Información Importante" */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(30, 41, 59, 1) 100%)',
            padding: '40px',
            borderRadius: '40px',
            border: `1px solid rgba(234, 179, 8, 0.2)`,
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ backgroundColor: colors.accent, padding: '15px', borderRadius: '20px' }}>
            <ShieldCheck size={40} color="#000" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: colors.textMain, fontSize: '1.4rem', fontWeight: '800', margin: '0 0 5px 0' }}>Juego Seguro y Legal</h3>
            <p style={{ color: colors.textMuted, margin: 0, fontSize: '0.95rem' }}>
              Todas nuestras operaciones están reguladas por las autoridades hípicas correspondientes. Recuerda que el juego es para mayores de 18 años. Los dividendos se calculan en base al pozo total de apuestas oficial de cada hipódromo.
            </p>
          </div>
        </motion.section>
        {/* Sección adicional para insertar antes de la FAQ */}
<section style={{ marginTop: '60px' }}>
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <h2 style={{ color: colors.textMain, fontSize: '2.2rem', fontWeight: '800' }}>
      Potencial de <span style={{ color: colors.accent }}>Dividendos</span>
    </h2>
    <p style={{ color: colors.textMuted }}>Estimación de pagos basados en una apuesta base de $2.00</p>
  </div>

  <div style={{ 
    overflowX: 'auto', 
    background: 'rgba(255,255,255,0.02)', 
    borderRadius: '24px', 
    border: `1px solid ${colors.border}`,
    padding: '20px'
  }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', color: colors.textMain }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${colors.border}`, textAlign: 'left' }}>
          <th style={{ padding: '15px', color: colors.accent }}>TIPO DE APUESTA</th>
          <th style={{ padding: '15px' }}>DIFICULTAD</th>
          <th style={{ padding: '15px' }}>PAGO ESTIMADO (PROMEDIO)</th>
          <th style={{ padding: '15px' }}>PROBABILIDAD</th>
        </tr>
      </thead>
      <tbody>
        {[
          { type: "Ganador (Win)", diff: "Baja", payout: "$4.00 - $12.00", prob: "1 de 8" },
          { type: "Exacta", diff: "Media", payout: "$40.00 - $150.00", prob: "1 de 56" },
          { type: "Trifecta", diff: "Alta", payout: "$500.00 - $2,500.00+", prob: "1 de 336" }
        ].map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${colors.border}`, transition: 'background 0.3s' }}>
            <td style={{ padding: '15px', fontWeight: 'bold' }}>{row.type}</td>
            <td style={{ padding: '15px' }}>
              <span style={{ 
                padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold',
                backgroundColor: row.diff === 'Alta' ? '#ef4444' : row.diff === 'Media' ? colors.accent : '#22c55e',
                color: '#000'
              }}>
                {row.diff.toUpperCase()}
              </span>
            </td>
            <td style={{ padding: '15px', color: colors.success, fontWeight: 'bold' }}>{row.payout}</td>
            <td style={{ padding: '15px', opacity: 0.6 }}>{row.prob}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <p style={{ fontSize: '0.75rem', color: colors.textMuted, marginTop: '15px', fontStyle: 'italic' }}>
    * Los dividendos reales se calculan mediante el sistema pari-mutuel y dependen del total apostado y el número de ganadores.
  </p>
</section>

        {/* FAQ Sencilla */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: colors.accent, marginBottom: '10px' }}>
            <HelpCircle size={20} />
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>AYUDA ADICIONAL</span>
          </div>
          {/* BOTÓN QUE ACTIVA EL MODAL (Al final de tu página) */}
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <h2 style={{ color: colors.textMain, fontSize: '2rem', fontWeight: '800' }}>¿Dudas sobre tus jugadas?</h2>
        <button 
          onClick={() => setIsSupportOpen(true)}
          style={{ 
            backgroundColor: colors.accent, color: '#000', padding: '15px 40px', 
            borderRadius: '16px', border: 'none', fontWeight: '900', cursor: 'pointer',
            marginTop: '20px', boxShadow: '0 10px 20px rgba(234, 179, 8, 0.2)'
          }}
        >
          CONTACTAR SOPORTE
        </button>
      </div>
        </div>
      </div>

      {/* --- MODAL DE SOPORTE --- */}
      <AnimatePresence>
        {isSupportOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSupportOpen(false)}
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(10, 23, 42, 0.9)',
              backdropFilter: 'blur(12px)', zIndex: 10000, display: 'flex',
              justifyContent: 'center', alignItems: 'center', padding: '20px'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '500px', background: colors.bgCard,
                borderRadius: '32px', border: `1px solid ${colors.border}`,
                padding: '40px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
            >
              {/* Botón Cerrar */}
              <button 
                onClick={() => setIsSupportOpen(false)}
                style={{
                  position: 'absolute', top: '25px', right: '25px', background: 'none',
                  border: 'none', color: colors.textMuted, cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ 
                  backgroundColor: 'rgba(234, 179, 8, 0.1)', width: '60px', height: '60px',
                  borderRadius: '20px', display: 'flex', justifyContent: 'center', 
                  alignItems: 'center', margin: '0 auto 15px'
                }}>
                  <MessageSquare color={colors.accent} size={30} />
                </div>
                <h2 style={{ color: '#fff', fontSize: '1.8rem', margin: 0 }}>Centro de Ayuda</h2>
                <p style={{ color: colors.textMuted, fontSize: '0.9rem', marginTop: '5px' }}>
                  Envíanos tu duda y te responderemos en breve.
                </p>
              </div>

              {/* Formulario */}
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: colors.accent, fontSize: '0.75rem', fontWeight: '800' }}>ASUNTO</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Duda sobre pago de Exacta"
                    style={{
                      background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`,
                      padding: '14px', borderRadius: '12px', color: '#fff', outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: colors.accent, fontSize: '0.75rem', fontWeight: '800' }}>MENSAJE</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe tu consulta detalladamente..."
                    style={{
                      background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`,
                      padding: '14px', borderRadius: '12px', color: '#fff', outline: 'none',
                      resize: 'none', fontFamily: 'inherit'
                    }}
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  style={{
                    backgroundColor: colors.accent, color: '#000', padding: '16px',
                    borderRadius: '14px', border: 'none', fontWeight: '900',
                    marginTop: '10px', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}
                >
                  <Send size={18} /> ENVIAR CONSULTA
                </motion.button>
              </form>

              <div style={{ 
                marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${colors.border}`,
                display: 'flex', justifyContent: 'center', gap: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMuted, fontSize: '0.8rem' }}>
                  <Mail size={14} /> soporte@hipicapro.com
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

export default RulesPage;
