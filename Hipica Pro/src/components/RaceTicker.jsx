import React from 'react'

const RACES = [
  { id: 1, track: 'GULFSTREAM', race: 'R1', time: '2m' },
  { id: 2, track: 'PALERMO', race: 'R4', time: '15m' },
  { id: 3, track: 'LA RINCONADA', race: 'R9', time: '30m' },
  { id: 4, track: 'SARATOGA', race: 'R2', time: '45m' },
  { id: 5, track: 'MONTERICO', race: 'R7', time: '1m' },
  { id: 6, track: 'ASCOT', race: 'R3', time: '5m' },
  { id: 7, track: 'BELMONT', race: 'R6', time: '12m' },
  { id: 8, track: 'CHURCHILL', race: 'R8', time: 'Post' },
]

const isUrgent = (time) => {
  const normalized = time.toLowerCase().trim()
  if (normalized === 'post') return true
  const minutes = parseInt(normalized, 10)
  return !Number.isNaN(minutes) && normalized.endsWith('m') && minutes <= 2
}

const RaceTicker = () => {
  const infiniteRaces = [...RACES, ...RACES]

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {infiniteRaces.map((race, index) => (
          <div key={index} className="race-item">
            <span style={{ opacity: 0.72, fontSize: '0.8rem' }}>{race.track}</span>
            <span style={{ fontWeight: 'bold' }}>{race.race}</span>
            <span className={`time-badge ${isUrgent(race.time) ? 'urgent' : ''}`}>
              {race.time}
            </span>
            <span style={{ opacity: 0.5, marginLeft: '8px' }}>•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RaceTicker
