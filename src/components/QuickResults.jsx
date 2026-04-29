import { useState} from 'react';
import { motion} from 'framer-motion';
import FotoFinishModal from './FotoFinishModal';

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

export default QuickResults;