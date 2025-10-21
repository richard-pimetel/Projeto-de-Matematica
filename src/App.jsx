import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Aritmetica from './pages/Aritmetica'
import Geometrica from './pages/Geometrica'
import Ponderada from './pages/Ponderada'
import Explicacoes from './pages/Explicacoes'
import Creditos from './pages/Creditos'
import Integrantes from './pages/Integrantes'
import DesafioContas from './pages/DesafioContas'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Verificar preferência do usuário no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Alternar tema
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aritmetica" element={<Aritmetica />} />
            <Route path="/geometrica" element={<Geometrica />} />
            <Route path="/ponderada" element={<Ponderada />} />
            <Route path="/explicacoes" element={<Explicacoes />} />
            <Route path="/desafio-contas" element={<DesafioContas />} />
            <Route path="/creditos" element={<Creditos />} />
            <Route path="/integrantes" element={<Integrantes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
