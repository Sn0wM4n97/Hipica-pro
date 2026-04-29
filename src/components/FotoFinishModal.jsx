
import { motion, AnimatePresence } from 'framer-motion';
import {Camera, X} from 'lucide-react';


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

export default FotoFinishModal;