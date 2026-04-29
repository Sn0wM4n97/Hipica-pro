import { useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../components/TopBar'
import Footer from '../components/Footer';
import QuickResults from '../components/QuickResults';
import RaceCountdown from '../components/RaceCountdown';
import JackpotBanner from '../components/JackpotBanner';
import HorseProfileModal from '../components/HorseProfileModal';
import MatchupPreview from '../components/MatchupPreview';
import RaceIntel from '../components/RaceIntel';
import LiveRaceStream from '../components/LiveRaceStream';
import LiveChat from '../components/LiveChat';
import StableNotes from '../components/StableNotes';
import ExpertQuickView from '../components/ExpertQuickView';
import HorseRow from '../components/HorseRow';



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
