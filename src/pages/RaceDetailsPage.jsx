import React, { useState, useEffect, useRef, memo } from 'react';

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines'
import TopBar from '../components/TopBar'
import caballosEnVivo from '../assets/caballosEnVivo.mp4'
import { Send, X, Award, Dna, History, BarChart3, CheckCircle, Download, Share2, Coins, Camera } from 'lucide-react'; // Asegúrate de importar Send
import Footer from '../components/Footer';

const FotoFinishModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(15px)', padding: '20px'
        }}
      >
        {/* EFECTO FLASH INICIAL */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', zIndex: 6001, pointerEvents: 'none' }}
        />

        <motion.div
          initial={{ scale: 0.8, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: '900px', backgroundColor: '#111',
            borderRadius: '12px', overflow: 'hidden', border: '4px solid #fff',
            boxShadow: '0 0 50px rgba(0,0,0,1)', position: 'relative'
          }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: '#fff', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', zIndex: 10 }}>
            <X size={20} color="#000" />
          </button>

          {/* IMAGEN DE LA FOTO FINISH */}
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1526094633853-031707a44819?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.2) sepia(0.2)' }} 
              alt="Foto Finish"
            />
            
            {/* LÍNEA DE META ROJA */}
            <div style={{ position: 'absolute', top: 0, left: '70%', bottom: 0, width: '2px', backgroundColor: 'red', boxShadow: '0 0 10px red' }} />
            
            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '8px' }}>
              <Camera size={20} />
              <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>OFFICIAL PHOTO FINISH - RACE {result.race}</span>
            </div>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.6 }}>GANADOR</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>#{result.horse} {result.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.6 }}>TIEMPO OFICIAL</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ef4444' }}>1:42.34</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const QuickResults = () => {

    const [selectedFinish, setSelectedFinish] = useState(null);

  const previousWinners = [
    { race: 1, horse: 4, name: "Storm", paid: "$5.20", color: "#FF0000" },
    { race: 2, horse: 1, name: "Fast", paid: "$3.40", color: "#FFFFFF" },
    { race: 3, horse: 8, name: "Mighty", paid: "$12.00", color: "#008000" },
    { race: 4, horse: 3, name: "Shadow", paid: "$7.50", color: "#0000FF" },
    { race: 5, horse: 2, name: "Blaze", paid: "$4.10", color: "#FFFF00" },
    { race: 6, horse: 5, name: "Thunder", paid: "$6.30", color: "#FFA500" },
    { race: 7, horse: 6, name: "Lightning", paid: "$8.00", color: "#800080" },
    { race: 8, horse: 7, name: "Rocket", paid: "$9.20", color: "#00FFFF" },


  ];

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', overflowX: 'auto', padding: '10px 5px' }}>
      {previousWinners.map((res, index) => (
        <motion.div 
          key={res.race}
          onClick={() => setSelectedFinish(res)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }} // Entrada en cascada
          whileHover={{ y: -5, scale: 1.02 }}
          style={{ 
            minWidth: '140px', 
            background: 'var(--bg-card)', 
            padding: '12px', 
            borderRadius: '16px', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Pequeño brillo decorativo */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#22c55e' }} />
          
          <div style={{ fontSize: '0.65rem', fontWeight: 'bold', opacity: 0.5, marginBottom: '5px' }}>R{res.race} RESULTADO</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '20px', height: '20px', borderRadius: '4px', 
              backgroundColor: res.color, border: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: '0.7rem', fontWeight: 'bold', color: res.race === 2 ? '#000' : '#fff'
            }}>
              {res.horse}
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)' }}>{res.name}</span>
          </div>
          
          <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#22c55e', fontWeight: 'bold' }}>
            Paga: {res.paid}
          </div>
        </motion.div>
      ))}
      <FotoFinishModal result={selectedFinish} onClose={() => setSelectedFinish(null)} />
    </div>
  );
};

const RaceCountdown = ({ initialMinutes = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isUrgent = timeLeft < 60; // Menos de 1 minuto

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      padding: '12px',
      backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.05)',
      borderRadius: '12px',
      marginBottom: '15px',
      border: `1px solid ${isUrgent ? '#ef4444' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease'
    }}>
      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isUrgent ? '#ef4444' : '#eab308', letterSpacing: '1px' }}>
        {isUrgent ? 'CIERRE INMINENTE' : 'TIEMPO PARA APUESTA'}
      </span>
      <div style={{ 
        fontSize: '1.4rem', 
        fontWeight: '900', 
        fontFamily: 'monospace',
        color: isUrgent ? '#ef4444' : 'var(--text-main)',
        animation: isUrgent ? 'blink-red 1s infinite' : 'none'
      }}>
        {timeLeft > 0 ? formatTime(timeLeft) : "CERRADO"}
      </div>
    </div>
  );
};


const JackpotBanner = ({ isUrgent }) => {
  const [amount, setAmount] = useState(125480.50);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => prev + (Math.random() * 5)); // Sube más rápido si es urgente
    }, isUrgent ? 500 : 2000);
    return () => clearInterval(interval);
  }, [isUrgent]);

  return (
    <motion.div 
      animate={isUrgent ? { 
        borderColor: ['#eab308', '#ef4444', '#eab308'],
        scale: [1, 1.02, 1]
      } : {}}
      transition={{ duration: 0.5, repeat: Infinity }}
      style={{
        background: isUrgent ? 'linear-gradient(90deg, #450a0a 0%, #0f172a 100%)' : 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
        border: '2px solid #eab308', boxShadow: isUrgent ? '0 0 40px rgba(239, 68, 68, 0.4)' : '0 0 25px rgba(234, 179, 8, 0.2)',
        marginBottom: '30px', position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div style={{ color: isUrgent ? '#ef4444' : '#eab308', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>
          {isUrgent ? '⚠️ ¡EL BOTE CIERRA EN SEGUNDOS!' : 'JACKPOT ACUMULADO DEL DÍA'}
        </div>
        <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', fontFamily: 'monospace' }}>
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>
    </motion.div>
  );
};

const BetSuccessTick = ({ betData, onReset }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{ textAlign: 'center', padding: '20px' }}
  >
    <div style={{ color: '#22c55e', marginBottom: '20px' }}>
      <CheckCircle size={60} strokeWidth={3} />
    </div>
    <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>¡APUESTA CONFIRMADA!</h3>
    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '20px' }}>ID de Ticket: #HP-992834</p>
    
    {/* TICKET DIGITAL ESTILO RECIBO */}
    <div style={{ 
      background: 'rgba(255,255,255,0.05)', 
      padding: '20px', 
      borderRadius: '16px', 
      border: '1px dashed rgba(255,255,255,0.2)',
      textAlign: 'left',
      marginBottom: '25px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>CABALLO</span>
        <span style={{ fontWeight: 'bold' }}>{betData.name}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>MONTO</span>
        <span style={{ fontWeight: 'bold' }}>${betData.amount}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>RETORNO ESTIMADO</span>
        <span style={{ fontWeight: 'bold', color: '#22c55e' }}>${(betData.amount * betData.odds).toFixed(2)}</span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '10px' }}>
      <button onClick={onReset} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>NUEVA</button>
      <button style={{ backgroundColor: '#eab308', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Download size={18} />
      </button>
    </div>
  </motion.div>
);


const HorseProfileModal = ({ horse, onClose }) => {
  if (!horse) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={overlayStyle}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={modalContentStyle}
        >
          {/* BOTÓN CERRAR */}
          <button onClick={onClose} style={closeBtnStyle}><X size={20} /></button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', height: '100%' }}>
            
            {/* LADO IZQUIERDO: IMAGEN Y PEDIGRÍ */}
            <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
              <img 
                src={horse.img || 'https://unsplash.com'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
              />
              <div style={imageOverlayStyle}>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{horse.name}</h2>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <span style={badgeStyle}>MARE: Lady Shine</span>
                  <span style={badgeStyle}>SIRE: Storm Cat</span>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: ESTADÍSTICAS Y CARRERAS */}
            <div style={{ padding: '40px', overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <QuickStat icon={<Award color="#eab308" />} label="Victorias" value="12/24" />
                <QuickStat icon={<BarChart3 color="#eab308" />} label="Earnings" value="$1.2M" />
                <QuickStat icon={<History color="#eab308" />} label="Última" value="1ro" />
              </div>

              <h4 style={sectionTitleStyle}><Dna size={16} /> COMENTARIO DEL ENTRENADOR</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '30px' }}>
                "{horse.name} ha mostrado una recuperación excepcional tras su última victoria. El entrenamiento del martes fue el mejor de la temporada. Está listo para dominar la distancia."
              </p>

              <h4 style={sectionTitleStyle}><History size={16} /> HISTORIAL RECIENTE</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['1ro - Churchill Downs', '2do - Gulfstream Park', '1ro - Santa Anita'].map((res, i) => (
                  <div key={i} style={pastRaceStyle}>
                    <span style={{ fontWeight: 'bold' }}>{res}</span>
                    <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>Abril 2024</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- SUB-COMPONENTES Y ESTILOS ---
const QuickStat = ({ icon, label, value }) => (
  <div style={{ flex: 1, padding: '15px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>{icon}</div>
    <div style={{ fontWeight: '900', color: 'var(--text-main)' }}>{value}</div>
    <div style={{ fontSize: '0.6rem', opacity: 0.5, textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const overlayStyle = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', padding: '40px' };
const modalContentStyle = { width: '100%', maxWidth: '1000px', height: '600px', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' };
const closeBtnStyle = { position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', color: '#fff', padding: '10px', cursor: 'pointer', zIndex: 10 };
const imageOverlayStyle = { position: 'absolute', bottom: '40px', left: '40px', color: '#fff' };
const badgeStyle = { backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.2)' };
const sectionTitleStyle = { fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', opacity: 0.4 };
const pastRaceStyle = { padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-main)' };

const RaceIntel = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '15px', 
    marginBottom: '25px' 
  }}>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>SESGO DE PISTA</span>
      <div style={{ color: '#eab308', fontWeight: 'bold' }}>Favor al Carril Interno</div>
    </div>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>VELOCIDAD PROMEDIO</span>
      <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>62.5 km/h</div>
    </div>
    <div style={intelCardStyle}>
      <span style={intelLabelStyle}>HUMEDAD PISTA</span>
      <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>12% (Firme)</div>
    </div>
  </div>
);

// Estilos rápidos
const intelCardStyle = {
  padding: '15px',
  background: 'var(--bg-card)',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
  textAlign: 'center'
};
const intelLabelStyle = {
  fontSize: '0.65rem',
  opacity: 0.5,
  display: 'block',
  marginBottom: '5px'
};


const actionButtonStyle = {
  backgroundColor: '#eab308', // Dorado
  color: '#000',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 10px rgba(234, 179, 8, 0.2)',
};



const MatchupPreview = ({ horses }) => {
  const h1 = horses[0];
  const h2 = horses[1];

  if (!h1 || !h2) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '20px', border: '1px dashed #eab308', color: 'var(--text-main)', opacity: 0.6, marginBottom: '30px' }}>
        {horses.length === 1 ? `Selecciona otro caballo para comparar con ${h1.name}` : "Selecciona dos caballos para comparar estadísticas"}
      </div>
    );
  }

  // Lógica simple de Power Bar: Basada en la cuota (menor cuota = más poder)
  const total = (1/h1.odds) + (1/h2.odds);
  const powerH1 = (((1/h1.odds) / total) * 100).toFixed(0);

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }} 
      animate={{ height: 'auto', opacity: 1 }}
      style={{ background: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '1px solid #eab308', marginBottom: '30px', color: 'var(--text-main)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <b style={{ color: '#eab308' }}>#{h1.number}</b> {h1.name}
        </div>
        <div style={{ fontWeight: '900', fontSize: '0.8rem', background: '#eab308', color: '#000', padding: '4px 10px', borderRadius: '10px' }}>VS</div>
        <div style={{ textAlign: 'right' }}>
          {h2.name} <b style={{ color: '#eab308' }}>#{h2.number}</b>
        </div>
      </div>

      {/* POWER BAR GRÁFICA */}
      <div style={{ height: '12px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
        <motion.div 
          initial={{ width: '50%' }}
          animate={{ width: `${powerH1}%` }}
          style={{ height: '100%', background: '#eab308', boxShadow: '0 0 15px #eab308' }} 
        />
        <div style={{ height: '100%', flex: 1, background: '#333' }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>
        <span>PROBABILIDAD: {powerH1}%</span>
        <span>{100 - powerH1}%</span>
      </div>
    </motion.div>
  );
};


const LiveChat = memo(() => {
  const [messages, setMessages] = useState([
    { id: 1, user: "Juan_Turf", text: "¡El #4 viene con todo!" },
    { id: 2, user: "Maria_Bet", text: "Cuota del #1 está bajando rápido" },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Función para enviar mensajes manuales
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const myMessage = {
      id: Date.now(),
      user: "Tú",
      text: inputValue,
      isMe: true // Para darle un color diferente si quieres
    };

    setMessages(prev => [...prev.slice(-5), myMessage]);
    setInputValue("");
  };

  // Mantenemos los mensajes automáticos (opcional, para que el chat no muera)
  useEffect(() => {
    const interval = setInterval(() => {
      const botMessage = {
        id: Date.now(),
        user: "Andrés_G",
        text: "¡Increíble remate!"
      };
      setMessages(prev => [...prev.slice(-5), botMessage]);
    }, 8000); // Un poco más lento para no molestar al usuario escribiendo
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      height: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', 
      padding: '20px', display: 'flex', flexDirection: 'column',
      border: '1px solid var(--border-color)', minHeight: '350px', maxHeight: '350px'
    }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#eab308', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="pulse-red" style={{ width: '6px', height: '6px' }} /> CHAT EN VIVO
      </div>

      {/* ÁREA DE MENSAJES */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', gap: '10px', overflow: 'hidden', marginBottom: '15px' }}>
        <AnimatePresence initial={false}>
          {[...messages].reverse().map((msg) => (
            <motion.div 
              key={msg.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '0.85rem' }}
            >
              <b style={{ color: msg.isMe ? '#22c55e' : '#eab308', marginRight: '5px' }}>
                {msg.user}:
              </b> 
              <span style={{ color: 'var(--text-main)' }}>{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* BARRA DE ENTRADA (INPUT) */}
      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', position: 'relative' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '10px 40px 10px 15px',
            fontSize: '0.85rem',
            color: 'var(--text-main)',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#eab308',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
});




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



const StableNotes = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: 'rgba(234, 179, 8, 0.05)', 
    borderRadius: '16px', 
    borderLeft: '4px solid #eab308',
    marginBottom: '25px'
  }}>
    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#eab308' }}>NOTAS DE ESTABLO</h4>
    <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.8 }}>
      <li>Caballo #5 RETIRADO (Veterinario)</li>
      <li>Cambio de Jockey en #2: F. Prat sustituye a J. Rosario</li>
      <li>Pista movida de Arena Firme a Húmeda</li>
    </ul>
  </div>
);

const ExpertQuickView = () => (
  <div style={{ 
    marginTop: '25px', 
    padding: '20px', 
    background: 'var(--bg-card)', 
    borderRadius: '24px', 
    border: '1px solid var(--border-color)' 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
      <img src="https://i.pravatar.cc/300?img=50" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Dra. Turf</div>
        <div style={{ fontSize: '0.6rem', color: '#eab308' }}>PICK DEL DÍA</div>
      </div>
    </div>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.7 }}>
      "El #1 Thunder Bolt viene de un gran apronte. La pista rápida le favorece."
    </p>
  </div>
);



// 1. Constantes de configuración
const MANTILLA_COLORS = {
  1: "#FF0000", 2: "#FFFFFF", 3: "#0000FF", 4: "#FFFF00", 5: "#008000"
};

// 2. Sub-componentes de la interfaz
const RaceNavigator = ({ totalRaces = 8 }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', padding: '10px 0' }}>
      {Array.from({ length: totalRaces }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => navigate(`/carrera/${num}`)} // Navegación real
          style={{
            minWidth: '45px', height: '45px', borderRadius: '50%', border: 'none',
            backgroundColor: num.toString() === id ? '#eab308' : 'var(--bg-card)',
            color: num.toString() === id ? '#000' : 'var(--text-main)',
            fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
          }}
        >
          R{num}
        </button>
      ))}
    </div>
  );
};

const TrackStatus = () => (
  <div style={{ 
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', 
    backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '20px', marginBottom: '30px',
    border: '1px solid var(--border-color)'
  }}>
    <StatusItem label="Pista" value="Arena / Rápida" color="#22c55e" />
    <StatusItem label="Clima" value="Soleado 28°C" />
    <StatusItem label="Viento" value="12 km/h NE" />
  </div>
);

const StatusItem = ({ label, value, color }) => (
  <div style={{ borderRight: '1px solid var(--border-color)', padding: '0 10px' }}>
    <span style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', color: 'var(--text-main)' }}>{label}</span>
    <div style={{ fontWeight: 'bold', color: color || 'var(--text-main)' }}>{value}</div>
  </div>
);

// 3. Componente de Fila de Caballo
const HorseRow = ({ horse, onSelect, onCompare, isComparing, onShowProfile }) => (
  <motion.div
    layout
    whileHover={{ backgroundColor: 'var(--hover-bg)' }}
    style={{
      display: 'grid',
      gridTemplateColumns: '60px 2fr 1fr 1fr 150px', // Ajustamos ancho para botones
      padding: '20px',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      color: 'var(--text-main)',
      cursor: 'pointer'
    }}
  >
    {/* Mantilla de Color (Ya lo tienes) */}
    <div style={{ 
      width: '35px', height: '35px', 
      backgroundColor: MANTILLA_COLORS[horse.number] || '#ccc', 
      color: horse.number === 2 || horse.number === 4 ? '#000' : '#fff',
      display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontWeight: 'bold'
    }}>
      {horse.number}
    </div>

    {/* Nombre y Equipo */}
    <div style={{ flex: 1 }}>
      <motion.div 
        onClick={(e) => {
          e.stopPropagation(); // Evita que se active el onSelect de la fila
          onShowProfile();
        }}
        whileHover={{ color: '#eab308' }} // El nombre se pone dorado al pasar el mouse
        style={{ 
          fontWeight: 'bold', 
          fontSize: '1.1rem', 
          cursor: 'help', // Cursor de ayuda/información
          display: 'inline-block' 
        }}
      >
        {horse.name.toUpperCase()}
      </motion.div>
      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
        J: {horse.jockey} • E: {horse.trainer}
      </div>
    </div>

    {/* Tendencia (Sparklines) */}
    <div style={{ width: '80px' }}>
      <Sparklines data={horse.history} limit={10} height={40}>
        <SparklinesLine color="#eab308" style={{ strokeWidth: 3 }} />
      </Sparklines>
    </div>

    {/* Cuota */}
    <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '1.1rem' }}>
      {horse.odds.toFixed(2)}
    </div>

    {/* ACCIONES: Apostar y Comparar */}
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <button 
        style={actionButtonStyle}
        onClick={(e) => { e.stopPropagation(); onSelect(horse); }}
      >
        APOSTAR
      </button>
      
      {/* BOTÓN DE COMPARAR */}
      <button 
        onClick={(e) => { e.stopPropagation(); onCompare(); }}
        style={{
          background: isComparing ? '#eab308' : 'transparent',
          border: '1px solid #eab308',
          color: isComparing ? '#000' : '#eab308',
          borderRadius: '10px',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
      >
        ⚖️
      </button>
    </div>
  </motion.div>
);


const ALL_RACES_DATA = {
  "1": [
    { id: 101, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 102, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 103, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 104, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 105, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 106, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 107, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
],
  "2": [
     { id: 201, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 202, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 203, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 204, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 205, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 206, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 207, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],
  "3": [
     { id: 301, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 302, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 303, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 304, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 305, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 306, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 307, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],
  "4": [
     { id: 401, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 402, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 403, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 404, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 405, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 406, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 407, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],
  "5": [
     { id: 501, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 502, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 503, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 504, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 505, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 506, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 507, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],
  "6": [
     { id: 601, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 602, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 603, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 604, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 605, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 606, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 607, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],
  "7": [
     { id: 701, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5, history: [2, 3, 2.5], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 702, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2, history: [4, 4.5, 4.2], img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 703, number: 1, name: "Thunder Bolt", jockey: "I. Ortiz Jr.", trainer: "T. Pletcher", odds: 2.5,img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,history: [2, 3, 2.5, 2.1, 2.5] },
    { id: 704, number: 2, name: "Sea Star", jockey: "F. Prat", trainer: "B. Baffert", odds: 4.2,img: "https://images.unsplash.com/photo-1606107869722-d5cbadabe2f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [4, 4.5, 4.2, 4.8, 4.2] },
    { id: 705, number: 3, name: "Golden Sun", jockey: "L. Saez", trainer: "C. Brown", odds: 5.0,img:"https://images.unsplash.com/photo-1450052590821-8bf91254a353?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [6, 5.5, 5.2, 5.0, 5.0] },
    { id: 706, number: 4, name: "Night Shadow", jockey: "J. Rosario", trainer: "D. O'Neill", odds: 3.8,img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [3.5, 4, 3.8, 4.2, 3.8] },
    { id: 707, number: 5, name: "Red Comet", jockey: "M. Smith", trainer: "A. Cassidy", odds: 6.5,img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", history: [7, 6.8, 6.5, 6.2, 6.5] },
  ],

  // ... Copia el resto de tus caballos asignándoles un ID de carrera
};

// 4. Componente Principal
const RaceDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [selectedToCompare, setSelectedToCompare] = useState([]);
  const [horseForProfile, setHorseForProfile] = useState(null);
  const [betStatus, setBetStatus] = useState('idle'); // 'idle', 'processing', 'success'
  const [betAmount, setBetAmount] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(480); // 8 minutos iniciales
  const [activeMarket, setActiveMarket] = useState('WIN');
  const [winnerToast, setWinnerToast] = useState(null);

  const horses = ALL_RACES_DATA[id] || [];

// Simulamos carga al cambiar de carrera
useEffect(() => {
  setIsLoading(true);
  const timer = setTimeout(() => setIsLoading(false), 600); // 0.6s de loading
  return () => clearTimeout(timer);
}, [id]);

useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
  const winners = [
    { name: "@Alex_Turf", amount: 450, horse: "Thunder Bolt" },
    { name: "@MariaH", amount: 1200, horse: "Golden Sun" },
    { name: "@BetMaster", amount: 85, horse: "Sea Star" }
  ];

  const interval = setInterval(() => {
    const randomWinner = winners[Math.floor(Math.random() * winners.length)];
    setWinnerToast(randomWinner);
    
    // Se oculta después de 4 segundos
    setTimeout(() => setWinnerToast(null), 4000);
  }, 10000); // Aparece cada 10 segundos

  return () => clearInterval(interval);
}, []);


  const isUrgent = secondsLeft < 60 && secondsLeft > 0;

  const handleConfirmBet = () => {
  setBetStatus('processing');
  
  // Simulamos una respuesta del servidor tras 2 segundos
  setTimeout(() => {
    setBetStatus('success');
  }, 2000);
};

  const toggleCompare = (horse) => {
    setSelectedToCompare((prev) => {
      if (prev.find((h) => h.id === horse.id)) {
        return prev.filter((h) => h.id !== horse.id);
      }
      if (prev.length === 2) {
        return [prev[1], horse]; // Desplaza el primero y mete el nuevo
      }
      return [...prev, horse];
    });
  };

  return (
    <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', padding: '120px 5% 50px' }}>
      <TopBar />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <RaceNavigator currentRace={id} />

        {/* Jackpot ahora sabe si hay prisa */}
        <JackpotBanner isUrgent={isUrgent} />

        {/* AQUÍ VAN LOS RESULTADOS RÁPIDOS */}
        <QuickResults />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start' }}>
          
          <section>
            <TrackStatus />

            {/* Reloj sincronizado */}
            <div style={{
              padding: '15px', borderRadius: '15px', marginBottom: '20px',
              backgroundColor: isUrgent ? '#ef4444' : 'rgba(234, 179, 8, 0.1)',
              textAlign: 'center', transition: '0.3s'
            }}>
              <span style={{ fontWeight: '900', color: isUrgent ? '#fff' : '#eab308' }}>
                CIERRE DE APUESTAS: {Math.floor(secondsLeft/60)}:{(secondsLeft%60).toString().padStart(2,'0')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginBottom: '30px' }}>
                <LiveRaceStream />
                <LiveChat />
            </div>

            {/* COMPARADOR (Encima de la tabla para visibilidad) */}
            <MatchupPreview horses={selectedToCompare} />

            {/* NUEVO: CONTEO REGRESIVO */}
            <RaceCountdown initialMinutes={8} />

            
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              {/* SPINNER DE CARGA DORADO */}
                <AnimatePresence>
                {isLoading && (
                    <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'var(--bg-card)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                    <div className="modern-loader"></div> {/* Reutiliza el loader de noticias */}
                    </motion.div>
                )}
                </AnimatePresence>
                <div style={{ 
  backgroundColor: 'var(--bg-card)', 
  borderTopLeftRadius: '24px', 
  borderTopRightRadius: '24px', 
  border: '1px solid var(--border-color)',
  borderBottom: 'none', // Se une con la tabla abajo
  padding: '10px 20px 0 20px',
  display: 'flex',
  gap: '30px',
  position: 'relative'
}}>
  {['WIN', 'PLACE', 'EXACTA', 'TRIFECTA'].map((market) => (
    <div 
      key={market}
      onClick={() => setActiveMarket(market)}
      style={{ 
        padding: '15px 5px', 
        cursor: 'pointer', 
        position: 'relative',
        color: activeMarket === market ? '#eab308' : 'var(--text-main)',
        opacity: activeMarket === market ? 1 : 0.5,
        fontSize: '0.8rem',
        fontWeight: '900',
        letterSpacing: '1px',
        transition: '0.3s'
      }}
    >
      {market}

      {/* Línea animada que se mueve suavemente */}
      {activeMarket === market && (
        <motion.div 
          layoutId="activeTab" // Esto hace que la línea "viaje" de un texto a otro
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '3px', 
            backgroundColor: '#eab308',
            borderRadius: '10px 10px 0 0',
            boxShadow: '0 -4px 10px rgba(234, 179, 8, 0.3)'
          }} 
        />
      )}
    </div>
  ))}
</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr 120px', padding: '15px 20px', background: 'rgba(0,0,0,0.05)', fontSize: '0.7rem', fontWeight: 'bold', opacity: 0.5, color: 'var(--text-main)' }}>
                <span>#</span>
                <span>CABALLO / EQUIPO</span>
                <span>TENDENCIA</span>
                <span style={{ textAlign: 'center' }}>CUOTA</span>
                <span>ACCIONES</span>
              </div>
                {/* ANIMACIÓN DE LA TABLA AL CAMBIAR DE CARRERA O MERCADO */}
                <AnimatePresence mode="wait">
                {horses.length > 0 ? (
                    <motion.div
                    key={activeMarket} // Dispara el rebote al cambiar de pestaña
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25, 
                        mass: 1 
                    }}
                    >
                    {horses.map((horse, index) => (
                        <motion.div
                        key={horse.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }} // Efecto cascada
                        >
                        <HorseRow 
                            horse={horse} 
                            onSelect={setSelectedHorse}
                            onCompare={() => toggleCompare(horse)}
                            isComparing={selectedToCompare.some(h => h.id === horse.id)}
                            onShowProfile={() => setHorseForProfile(horse)} 
                        />
                        </motion.div>
                    ))}
                    </motion.div>
                ) : (
                    <motion.div
                    key="no-data"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                        padding: '60px 40px', 
                        textAlign: 'center', 
                        color: 'var(--text-main)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                    >
                    <div style={{ fontSize: '3rem', opacity: 0.3 }}>🐎</div>
                    <div style={{ opacity: 0.5, fontWeight: 'bold' }}>
                        No hay datos disponibles para esta carrera.
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>


                {/* IMPORTANTE: Coloca el componente del modal fuera del bucle, al final del main */}
                <HorseProfileModal 
                horse={horseForProfile} 
                onClose={() => setHorseForProfile(null)} 
                />
            </div>
          </section>

          <aside style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StableNotes />
            
            <AnimatePresence mode="wait">
    {/* ESTADO 1: ÉXITO (Muestra el ticket final) */}
    {betStatus === 'success' ? (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ backgroundColor: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '2px solid #22c55e', color: 'var(--text-main)', textAlign: 'center' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
        <h3 style={{ margin: 0 }}>¡APUESTA RECIBIDA!</h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Ticket: #HP-{Math.floor(Math.random() * 10000)}</p>
        
        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '15px', margin: '20px 0', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>Caballo:</span> <b>{selectedHorse.name}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '5px' }}>
            <span>Inversión:</span> <b>${betAmount}</b>
          </div>
        </div>

        <button 
          onClick={() => { setBetStatus('idle'); setSelectedHorse(null); setBetAmount(""); }}
          style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#eab308', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ACEPTAR
        </button>
      </motion.div>
    ) : (
      /* ESTADO 2: FORMULARIO (Lo que ya tenías pero conectado) */
      <motion.div key="form">
        {selectedHorse ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bet-card-active"
            style={{ backgroundColor: 'var(--bg-card)', padding: '25px', borderRadius: '24px', border: '1px solid #eab308', color: 'var(--text-main)' }}
          >
            <h3 style={{ marginTop: 0 }}>TU BOLETO</h3>
            <div style={{ padding: '15px', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', color: '#eab308' }}>#{selectedHorse.number} {selectedHorse.name}</div>
              <div style={{ fontSize: '0.8rem' }}>Ganador • Cuota: {selectedHorse.odds}</div>
            </div>

            <input 
              type="number" 
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Monto $" 
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', color: 'inherit', outline: 'none' }} 
            />

            <button 
              onClick={handleConfirmBet}
              disabled={betStatus === 'processing' || !betAmount}
              style={{ 
                width: '100%', marginTop: '20px', padding: '15px', 
                backgroundColor: betStatus === 'processing' ? '#666' : '#eab308', 
                border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' 
              }}
            >
              {betStatus === 'processing' ? 'PROCESANDO...' : 'CONFIRMAR APUESTA'}
            </button>

            <button 
              onClick={() => setSelectedHorse(null)} 
              style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
            >
              CANCELAR
            </button>
          </motion.div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5, border: '2px dashed var(--border-color)', borderRadius: '24px', color: 'var(--text-main)' }}>
            Selecciona un caballo para apostar
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
            
            <ExpertQuickView />
            <RaceIntel />
            <AnimatePresence>
  
</AnimatePresence>
            
          </aside>
        </div>
      </div>
      <Footer />
      <AnimatePresence>
  {winnerToast && (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.8 }}
      style={{
        position: 'fixed', bottom: '40px', left: '40px',
        backgroundColor: 'var(--bg-card)', border: '1px solid #eab308',
        padding: '15px 25px', borderRadius: '16px', zIndex: 9999,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', gap: '15px', color: 'var(--text-main)'
      }}
    >
      <div style={{ fontSize: '1.5rem' }}>🚀</div>
      <div>
        <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 'bold' }}>¡NUEVO GANADOR!</div>
        <div style={{ fontSize: '0.9rem' }}>
          <b style={{ color: '#eab308' }}>{winnerToast.name}</b> ganó <b>${winnerToast.amount}</b>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </main>
  );
};



export default RaceDetailPage
