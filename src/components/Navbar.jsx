import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, BarChart3 } from 'lucide-react'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Aritmética', href: '/aritmetica' },
    { name: 'Geométrica', href: '/geometrica' },
    { name: 'Ponderada', href: '/ponderada' },
    { name: 'Desafio das Contas', href: '/desafio-contas' },
    { name: 'Como Funciona', href: '/explicacoes' },
    { name: 'Créditos', href: '/creditos' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full glass z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-8xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img 
                src="/statsball-logo.png" 
                alt="StatsBall Logo" 
                className="h-20 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-3 text-sm font-light transition-all duration-300 group ${
                    isActive(item.href)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
                  )}
                  <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className="relative p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </div>
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-6 py-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-base font-light transition-colors duration-150 ${
                  isActive(item.href)
                    ? 'text-gray-900 dark:text-white border-l-2 border-gray-900 dark:border-white pl-4'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white pl-2'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
