import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Leadership from './pages/Leadership'
import Members from './pages/Members'
import Services from './pages/Services'
import Leo from './pages/Leo'
import Login from './pages/Login'
import MembershipDashboard from './pages/MembershipDashboard'
import AdminDashboard from './pages/AdminDashboard'
import './styles/cinematic.css'
import './styles/home.css'
import './styles/pages.css'
import './styles/react-supplement.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/members" element={<Members />} />
        <Route path="/services" element={<Services />} />
        <Route path="/leo" element={<Leo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<MembershipDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
