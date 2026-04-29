import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RaceDetailPage from './pages/RaceDetailsPage'
import DailySchedulePage from './pages/DailySchedulePage'
import TracksPage from './pages/TracksPage'
import ResultsPage from './pages/ResultsPage'
import CalendarPage from './pages/CalendarPage'
import MyBetsPage from './pages/MyBetsPage'
import RulesPage from './pages/RulesPage'
import HealthPage from './pages/HealthPage'
import NewsPage from './pages/NewsPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/carrera/:id" element={<RaceDetailPage />} />
        <Route path="/programacion" element={<DailySchedulePage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/hipodromos" element={<TracksPage />} />
        <Route path="/mis-boletos" element={<MyBetsPage />} />
        <Route path="/reglas" element={<RulesPage />} />
        <Route path="/salud" element={<HealthPage />} />
        <Route path="/noticias" element={<NewsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App

