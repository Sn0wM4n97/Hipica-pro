import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';


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

export default LiveChat;