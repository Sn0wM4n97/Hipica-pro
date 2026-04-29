import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, ReceiptText, Wallet } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';


  const colors = {
    bgMain: '#0f172a',      // Azul marino opaco (Igual al footer)
    bgCard: '#1e293b',      // Azul tarjeta
    accent: '#eab308',      // Dorado
    success: '#22c55e',     // Verde
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  };


  const myBets = [
    { id: "TX-992", horse: "Thunder Bolt", race: "GSP - R8", amount: 50, payout: 125, status: "GANADA", color: colors.success },
    { id: "TX-995", horse: "Sea Star", race: "SA - R2", amount: 20, payout: 0, status: "PENDIENTE", color: colors.accent },
    { id: "TX-980", horse: "Golden Sun", race: "ASC - R1", amount: 15, payout: 0, status: "PERDIDA", color: "#ef4444" },
  ];

const MyBetsPage = () => {

  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredBets = myBets.filter(bet => 
    activeFilter === 'ALL' ? true : bet.status === activeFilter
  );

  return (
    <main style={{ backgroundColor: colors.bgMain, minHeight: '100vh', padding: '120px 5% 60px' }}>
      <TopBar />
      
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        {/* Header con Resumen de Saldo Rápido */}
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: '12px', borderRadius: '15px' }}>
              <ReceiptText color={colors.accent} size={28} />
            </div>
            <div>
              <h1 style={{ color: colors.textMain, fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>Mis <span style={{ color: colors.accent }}>Boletos</span></h1>
              <p style={{ color: colors.textMuted, margin: 0 }}>Gestión de jugadas en tiempo real</p>
            </div>
          </div>
          
          <div style={{ background: colors.bgCard, padding: '10px 20px', borderRadius: '16px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Wallet size={18} color={colors.accent} />
            <div>
              <div style={{ fontSize: '0.6rem', color: colors.textMuted }}>SALDO DISPONIBLE</div>
              <div style={{ color: '#fff', fontWeight: '800' }}>$1,250.00</div>
            </div>
          </div>
        </header>

        {/* Filtros Estilizados */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
          {['ALL', 'GANADA', 'PENDIENTE', 'PERDIDA'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: activeFilter === f ? `1px solid ${colors.accent}` : `1px solid ${colors.border}`,
                backgroundColor: activeFilter === f ? colors.accent : 'transparent',
                color: activeFilter === f ? '#000' : colors.textMuted,
                fontSize: '0.75rem',
                fontWeight: '900',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {f === 'ALL' ? 'VER TODO' : f}
            </button>
          ))}
        </div>

        {/* Lista de Boletos con Animación de Reubicación */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode='popLayout'>
            {filteredBets.map((bet) => (
              <motion.div 
                layout
                key={bet.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.01 }}
                style={{ 
                  background: colors.bgCard, 
                  borderRadius: '24px', 
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Decoración de Ticket */}
                <div style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', background: colors.bgMain, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', background: colors.bgMain, borderRadius: '50%' }} />

                <div style={{ padding: '25px 35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ color: bet.color }}>
                      {bet.status === "GANADA" && <CheckCircle2 size={34} />}
                      {bet.status === "PENDIENTE" && <Clock size={34} />}
                      {bet.status === "PERDIDA" && <AlertCircle size={34} />}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: colors.textMuted, letterSpacing: '1px', fontWeight: 'bold' }}>
                        ID: {bet.id} • {bet.race}
                      </div>
                      <h3 style={{ margin: '4px 0', color: colors.textMain, fontSize: '1.4rem', fontWeight: '800' }}>{bet.horse}</h3>
                      <div style={{ 
                        display: 'inline-block', padding: '2px 10px', borderRadius: '6px', 
                        fontSize: '0.65rem', fontWeight: '900', border: `1px solid ${bet.color}`, color: bet.color 
                      }}>
                        {bet.status}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flex: '1', minWidth: '120px' }}>
                    <div style={{ fontSize: '0.65rem', color: colors.textMuted, fontWeight: 'bold' }}>MONTO JUGADO</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: colors.textMain }}>${bet.amount.toFixed(2)}</div>
                    
                    {bet.status === "GANADA" ? (
                      <div style={{ color: colors.success, fontSize: '1rem', fontWeight: '900', marginTop: '5px' }}>
                        PAGO: +${bet.payout.toFixed(2)}
                      </div>
                    ) : (
                      <div style={{ color: colors.textMuted, fontSize: '0.8rem', marginTop: '5px' }}>
                        {bet.status === "PENDIENTE" ? "Esperando resultado..." : "Ticket no premiado"}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Resumen Final */}
        {filteredBets.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '60px 0' }}>
            <ReceiptText size={48} color={colors.textMuted} style={{ opacity: 0.2, marginBottom: '15px' }} />
            <p style={{ color: colors.textMuted }}>No se encontraron boletos en esta categoría.</p>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default MyBetsPage;
