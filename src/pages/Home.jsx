import { Link } from 'react-router-dom'
import { Calculator, TrendingUp, Award, BookOpen, Play, Shuffle } from 'lucide-react'
import { showRandomDataNotification } from '../utils/dataGenerator'

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Média Aritmética',
      description: 'Compare jogadores da NBA usando a média aritmética para analisar pontos, rebotes e assistências.',
      link: '/aritmetica',
      color: 'from-blue-500 to-blue-600',
      sport: '🏀 Basquete'
    },
    {
      icon: TrendingUp,
      title: 'Média Geométrica',
      description: 'Analise o aproveitamento de gols no futebol com a média geométrica para taxas de crescimento.',
      link: '/geometrica',
      color: 'from-green-500 to-green-600',
      sport: '⚽ Futebol'
    },
    {
      icon: Award,
      title: 'Média Ponderada',
      description: 'Crie rankings de times usando pesos diferentes para vitórias, empates e estatísticas.',
      link: '/ponderada',
      color: 'from-purple-500 to-purple-600',
      sport: '🏆 Rankings'
    }
  ]

  const generateRandomData = () => {
    console.log('Disparando evento generateRandomData'); // Debug
    
    // Disparar evento personalizado para atualizar dados em todas as páginas
    window.dispatchEvent(new CustomEvent('generateRandomData', { 
      detail: { timestamp: Date.now() } 
    }));
    
    // Mostrar notificação elegante
    showRandomDataNotification('geral');
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 opacity-50"></div>
        
        {/* Geometric Background Elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent rounded-full opacity-20 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/statsball-logo.png" 
                  alt="StatsBall Logo" 
                  className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-auto transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="w-24 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
              <p className="text-2xl md:text-3xl font-extralight text-gray-600 dark:text-gray-400 mb-6 tracking-wide">
                Sistema de Análise Matemática Esportiva
              </p>
              <p className="text-lg font-light text-gray-500 dark:text-gray-500 mb-20 max-w-3xl mx-auto leading-relaxed">
                Plataforma profissional para demonstração de metodologias estatísticas aplicadas 
                ao desempenho esportivo através de visualizações interativas e análises precisas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link 
                to="/explicacoes"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Explorar Metodologias</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <button 
                onClick={generateRandomData}
                className="btn-outline group relative overflow-hidden"
              >
                <span className="relative z-10">Demonstração Interativa</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="relative py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="section-title">
              Metodologias Matemáticas
            </h2>
            <p className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Três abordagens estatísticas fundamentais para análise quantitativa de desempenho esportivo, 
              cada uma com aplicações específicas e precisão comprovada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative"
              >
                <div className="card group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  {/* Number Badge */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-light text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                        {feature.sport}
                      </p>
                      <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                    
                    <div className="pt-6 flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      <span className="text-sm font-medium tracking-wide">Explorar Sistema</span>
                      <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Desafio das Contas Section */}
      <section className="relative py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20">
            <div className="text-6xl mb-6">🧮</div>
            <h2 className="section-title mb-8">
              Desafio das <span className="gradient-text">Contas HARDCORE</span>
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl font-extralight text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Matemática extrema para os mais corajosos. Números grandes, operações complexas, 90 segundos de pura adrenalina.
            </p>
          </div>

          <div className="card max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Informações do Jogo */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🏆 Competição Matemática
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">⏱️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">90 segundos de matemática extrema</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 font-bold">🔥</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Operações HARDCORE: números grandes e complexos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">👥</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Ranking dos mais habilidosos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">⚡</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Apenas para os mais rápidos e precisos</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 mb-6">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Pronto para o Desafio?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Mostre suas habilidades matemáticas e conquiste o topo do ranking!
                  </p>
                </div>
                
                <Link
                  to="/desafio-contas"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>🎮</span>
                  Começar Desafio HARDCORE!
                </Link>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Gratuito • Sem cadastro • Diversão garantida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-gray-900 dark:text-white tracking-tight">
              Inicie Sua Análise
            </h2>
            <div className="w-32 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore metodologias estatísticas avançadas através de análises esportivas interativas. 
              Dados verificados, visualizações precisas e fundamentos matemáticos sólidos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
              to="/aritmetica" 
              className="group relative p-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="text-left">
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Análise NBA
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">
                  Média Aritmética
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  Estatísticas de jogadores da NBA com dados reais da API BallDontLie
                </p>
              </div>
              <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                <Play className="h-5 w-5" />
              </div>
            </Link>
            
            <Link 
              to="/explicacoes" 
              className="group relative p-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="text-left">
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Fundamentos
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">
                  Base Matemática
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  Conceitos teóricos e aplicações práticas das metodologias estatísticas
                </p>
              </div>
              <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                <Play className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
