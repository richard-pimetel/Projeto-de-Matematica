import { Heart, Github, Mail, BarChart3 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre o Projeto */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/statsball-logo.png" 
                alt="StatsBall Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed font-medium">
              Sistema profissional para análise matemática esportiva. Demonstrações práticas de 
              metodologias estatísticas com visualizações interativas e dados reais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <a href="/explicacoes" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                  📚 Fundamentos Matemáticos
                </a>
              </li>
              <li>
                <a href="/creditos" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                  👥 Equipe & Créditos
                </a>
              </li>
              <li>
                <a href="https://www.balldontlie.io/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                  🏀 API NBA - BallDontLie
                </a>
              </li>
              <li>
                <a href="https://www.football-data.org/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                  ⚽ API Football Data
                </a>
              </li>
            </ul>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Tecnologias</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Lucide Icons'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-2 bg-gray-800 dark:bg-gray-700 rounded-lg text-sm text-gray-200 border border-gray-600 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 font-medium">
              🎯 Sistema Profissional de Análise Matemática Esportiva
            </p>
            <p className="text-gray-300 mt-2 md:mt-0 font-medium">
              © 2024 StatsBall - Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
