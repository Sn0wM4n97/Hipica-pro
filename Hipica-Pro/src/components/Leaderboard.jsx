import React, { useState, useEffect } from 'react'; // 1. Agregamos useState
import { motion } from 'framer-motion';
import JockeyModal from './JockeyModal'; // Importamos el modal que creamos

const initialRiders = [
  { rank: 2, name: 'Irad Ortiz Jr.', wins: 42, rate: '20%', img: 'https://i.pravatar.cc/300?img=12', history: [1, 1, 2, 1, 3, 1, 1, 2, 1, 1] },
  { rank: 1, name: 'Flavien Prat', wins: 45, rate: '22%', img: 'https://i.pravatar.cc/300?img=13', history: [1, 2, 1, 3, 2, 1, 2, 1, 3, 2] },
  { rank: 3, name: 'Juan Hernandez', wins: 38, rate: '18%', img: 'https://i.pravatar.cc/300?img=14', history: [3, 1, 2, 1, 3, 1, 2, 1, 3, 1] },
  { rank: 4, name: 'Luis Saez', wins: 35, rate: '17%', img: 'https://i.pravatar.cc/300?img=15', history: [2, 1, 3, 1, 1, 2, 1, 4, 1, 1] },
  { rank: 5, name: 'Joel Rosario', wins: 31, rate: '16%', img: 'https://i.pravatar.cc/300?img=16', history: [1, 2, 1, 3, 2, 1, 2, 1, 3, 2] },
  { rank: 6, name: 'Tyler Gaffalione', wins: 29, rate: '15%', img: 'https://i.pravatar.cc/300?img=17', history: [3, 1, 2, 1, 3, 1, 2, 1, 3, 1] },
]

const EliteLeaderboard = () => {
  // 2. Estado para controlar qué jockey mostrar en el modal
  const [selectedJockey, setSelectedJockey] = useState(null);
  const [riders, setRiders] = useState(initialRiders)

  useEffect(() => {
    const controller = new AbortController()

    const fetchRandomUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=6&inc=picture&noinfo', {
          signal: controller.signal,
        })
        const data = await response.json()
        if (!data.results) return

        setRiders((current) =>
          current.map((item, index) => ({
            ...item,
            img: data.results[index]?.picture?.large || item.img,
          }))
        )
      } catch (error) {
        console.warn('No se pudieron cargar las fotos de randomuser:', error)
      }
    }

    fetchRandomUsers()
    return () => controller.abort()
  }, [])

  const topThree = riders.slice(0, 3)
  const restOfList = riders.slice(3)



  return (
    <section style={{ padding: '100px 5%', backgroundColor: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)' }}>Ranking de <span style={{ color: '#eab308' }}>Jockeys</span></h2>
        <p style={{ opacity: 0.6, color: 'var(--text-main)' }}>La élite del hipódromo en la actual temporada.</p>
      </div>

      {/* 1. EL PODIO (TOP 3) */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end', 
        gap: '20px', marginBottom: '60px', flexWrap: 'wrap' 
      }}>
        {topThree.map((l, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -15 }}
            onClick={() => setSelectedJockey(l)} // 3. Click para abrir
            style={{
              position: 'relative',
              width: l.rank === 1 ? '300px' : '250px',
              height: l.rank === 1 ? '400px' : '340px',
              borderRadius: '24px', overflow: 'hidden',
              border: l.rank === 1 ? '2px solid #eab308' : '1px solid var(--border-color)',
              background: '#000',
              order: l.rank === 1 ? 2 : l.rank === 2 ? 1 : 3,
              cursor: 'pointer' // 4. Cursor de mano
            }}
          >
            <img src={l.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
            }}>
              <div style={{ 
                width: '35px', height: '35px', backgroundColor: l.rank === 1 ? '#eab308' : '#fff',
                borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: '#000', fontWeight: '900', marginBottom: '10px'
              }}>
                {l.rank}
              </div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: l.rank === 1 ? '1.4rem' : '1.1rem' }}>{l.name}</h3>
              <span style={{ color: '#eab308', fontWeight: 'bold', fontSize: '0.9rem' }}>{l.wins} VICTORIAS</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. LA LISTA (RESTO DEL RANKING) */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {restOfList.map((l, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10, backgroundColor: 'var(--hover-bg)' }}
            onClick={() => setSelectedJockey(l)} // 5. Click para abrir en la lista también
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '15px 30px', borderRadius: '16px',
              border: '1px solid var(--border-color)', background: 'var(--bg-card)',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <span style={{ fontWeight: '800', opacity: 0.4, width: '20px' }}>{l.rank}</span>
              <span style={{ fontWeight: '600' }}>{l.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem' }}>
              <span><b>{l.wins}</b> Wins</span>
              <span style={{ opacity: 0.6 }}>{l.rate} Efic.</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 6. MODAL (Se muestra solo si hay un jockey seleccionado) */}
      <JockeyModal 
        jockey={selectedJockey} 
        onClose={() => setSelectedJockey(null)} 
      />
    </section>
  );
};

export default EliteLeaderboard;
