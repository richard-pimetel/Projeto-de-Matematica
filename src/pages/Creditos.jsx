import { useState } from 'react'
import { Github, Linkedin, Mail, Heart, Star, Code, Palette, Database, Zap, Award, Users, BookOpen, Lightbulb, Presentation } from 'lucide-react'

const Creditos = () => {
  const [selectedIntegrante, setSelectedIntegrante] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const integrantes = [
    {
      nome: "Richard",
      papel: "Desenvolvedor Principal",
      responsabilidade: "Desenvolvimento completo do projeto, implementação do código, arquitetura do sistema e integração das funcionalidades.",
      icon: Code,
      cor: "from-blue-500 to-blue-600",
      skills: ["React", "JavaScript", "Tailwind CSS", "Vite", "APIs"],
      foto: "/img/richard.jpg"
    },
    {
      nome: "Gustavo", 
      papel: "Idealizador do Projeto",
      responsabilidade: "Concepção da ideia original, definição do escopo do projeto e direcionamento conceitual da aplicação matemática.",
      icon: Lightbulb,
      cor: "from-green-500 to-green-600",
      skills: ["Concepção", "Planejamento", "Análise", "Estratégia", "Visão"],
      foto: "/img/GUSTAVO ZUMBA.jpg"
    },
    {
      nome: "João",
      papel: "Auxiliar do Projeto", 
      responsabilidade: "Suporte no desenvolvimento, revisão de código, testes de funcionalidades e apoio técnico geral.",
      icon: Users,
      cor: "from-purple-500 to-purple-600",
      skills: ["Suporte Técnico", "Testes", "Revisão", "Documentação", "QA"],
      foto: "/img/JAMAL.jpg"
    },
    {
      nome: "Kauan",
      papel: "Apresentação e Suporte",
      responsabilidade: "Preparação da apresentação do produto, criação de materiais de demonstração e suporte ao projeto.",
      icon: Presentation,
      cor: "from-orange-500 to-orange-600", 
      skills: ["Apresentação", "Comunicação", "Demonstração", "Suporte", "Marketing"],
      foto: "/img/Kauan.jpg"
    },
    {
      nome: "Vitor",
      papel: "Apresentação e Suporte",
      responsabilidade: "Colaboração na apresentação do produto, apoio na demonstração das funcionalidades e suporte geral.",
      icon: Presentation,
      cor: "from-red-500 to-red-600",
      skills: ["Apresentação", "Demonstração", "Suporte", "Colaboração", "Comunicação"],
      foto: "/img/VITOR.jpg"
    },
    {
      nome: "Gabriel",
      papel: "Suporte e Apresentação",
      responsabilidade: "Responsável pelo suporte técnico do site e colaboração na apresentação do projeto, garantindo funcionamento adequado e demonstração eficaz.",
      icon: Users,
      cor: "from-indigo-500 to-indigo-600",
      skills: ["Suporte Técnico", "Apresentação", "Resolução de Problemas", "Comunicação", "Demonstração"],
      foto: "/img/gabriel.jpg"
    }
  ]

  // Funções para controlar o modal
  const handleCardClick = (integrante) => {
    setSelectedIntegrante(integrante);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedIntegrante(null), 300); // Delay para animação
  };

  const teamMembers = [
    {
      name: 'Ana Silva',
      role: 'Desenvolvedora Frontend',
      description: 'Especialista em React e UI/UX, responsável pela interface e experiência do usuário.',
      avatar: '👩‍💻',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'UI/UX Design'],
      social: {
        github: 'https://github.com/anasilva',
        linkedin: 'https://linkedin.com/in/anasilva',
        email: 'ana.silva@email.com'
      }
    },
    {
      name: 'Carlos Santos',
      role: 'Matemático & Analista',
      description: 'Doutor em Matemática, responsável pela validação dos cálculos e explicações teóricas.',
      avatar: '👨‍🔬',
      skills: ['Estatística', 'Análise de Dados', 'Matemática Aplicada', 'Python'],
      social: {
        github: 'https://github.com/carlossantos',
        linkedin: 'https://linkedin.com/in/carlossantos',
        email: 'carlos.santos@email.com'
      }
    },
    {
      name: 'Marina Costa',
      role: 'Designer & Pesquisadora',
      description: 'Designer gráfica e pesquisadora em educação, focada na pedagogia visual e acessibilidade.',
      avatar: '👩‍🎨',
      skills: ['Design Gráfico', 'Pesquisa UX', 'Pedagogia Digital', 'Figma'],
      social: {
        github: 'https://github.com/marinacosta',
        linkedin: 'https://linkedin.com/in/marinacosta',
        email: 'marina.costa@email.com'
      }
    },
    {
      name: 'Pedro Oliveira',
      role: 'Desenvolvedor Full Stack',
      description: 'Engenheiro de software especializado em APIs e integração de dados esportivos.',
      avatar: '👨‍💻',
      skills: ['Node.js', 'APIs REST', 'Database', 'DevOps'],
      social: {
        github: 'https://github.com/pedrooliveira',
        linkedin: 'https://linkedin.com/in/pedrooliveira',
        email: 'pedro.oliveira@email.com'
      }
    }
  ]

  const technologies = [
    {
      name: 'React',
      description: 'Biblioteca JavaScript para construção de interfaces',
      icon: '⚛️',
      category: 'Frontend'
    },
    {
      name: 'Vite',
      description: 'Build tool rápido e moderno para desenvolvimento',
      icon: '⚡',
      category: 'Build Tool'
    },
    {
      name: 'Tailwind CSS',
      description: 'Framework CSS utility-first para estilização',
      icon: '🎨',
      category: 'Styling'
    },
    {
      name: 'Recharts',
      description: 'Biblioteca de gráficos para React',
      icon: '📊',
      category: 'Charts'
    },
    {
      name: 'Lucide React',
      description: 'Conjunto de ícones SVG para React',
      icon: '🎯',
      category: 'Icons'
    },
    {
      name: 'Axios',
      description: 'Cliente HTTP para requisições de API',
      icon: '🌐',
      category: 'HTTP Client'
    }
  ]

  const acknowledgments = [
    {
      name: 'BallDontLie API',
      description: 'API gratuita para dados da NBA',
      url: 'https://www.balldontlie.io/',
      icon: '🏀'
    },
    {
      name: 'Football-Data.org',
      description: 'API para dados de futebol',
      url: 'https://www.football-data.org/',
      icon: '⚽'
    },
    {
      name: 'Universidade Federal',
      description: 'Instituição de ensino que apoiou o projeto',
      url: '#',
      icon: '🎓'
    },
    {
      name: 'Comunidade Open Source',
      description: 'Desenvolvedores que contribuem com ferramentas gratuitas',
      url: '#',
      icon: '💻'
    }
  ]


  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/statsball-logo.png" 
              alt="StatsBall Logo" 
              className="h-24 w-auto mx-auto mb-6 transition-all duration-300 hover:scale-105"
            />
          </div>
          <h1 className="section-title">
            Créditos da <span className="gradient-text">Equipe</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Conheça as pessoas e tecnologias por trás do StatsBall. 
            Um projeto desenvolvido com paixão pela educação matemática e esportes!
          </p>
        </div>

        {/* Sobre o Projeto */}
        <div className="card mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">StatsBall</h2>
            <p className="text-xl mb-8 opacity-90">
              Trabalho Final da Disciplina de Estatística Aplicada
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold mb-3 opacity-90">📚 Disciplina</h3>
                <p className="text-base opacity-80">Estatística Aplicada e Visualização de Dados</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 opacity-90">🎯 Objetivo</h3>
                <p className="text-base opacity-80">Demonstrar aplicações práticas da matemática através de dados esportivos</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 opacity-90">⚡ Tecnologias</h3>
                <p className="text-base opacity-80">React, JavaScript, Tailwind CSS e APIs de dados esportivos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipe de Desenvolvimento */}
        <div className="mb-16">
          <h2 className="section-title text-center">
            Equipe de Desenvolvimento
          </h2>
          <div className="w-32 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {integrantes.map((integrante, index) => (
              <div 
                key={integrante.nome}
                className="group card hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                onClick={() => handleCardClick(integrante)}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="relative mb-6">
                    <div className="relative w-24 h-24 mx-auto">
                      <img 
                        src={integrante.foto}
                        alt={`${integrante.nome} - ${integrante.papel}`}
                        className="w-24 h-24 rounded-sm object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/img/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-light">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-2 tracking-wide">
                    {integrante.nome}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    {integrante.papel}
                  </p>
                </div>

                {/* Responsabilidades */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">
                    Responsabilidades
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm">
                    {integrante.responsabilidade}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">
                    Competências
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {integrante.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-light tracking-wide border border-gray-200 dark:border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Tecnologias <span className="gradient-text">Utilizadas</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{tech.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {tech.name}
                    </h3>
                    <span className="text-xs bg-primary-orange text-white px-2 py-1 rounded-full mb-2 inline-block">
                      {tech.category}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agradecimentos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            <span className="gradient-text">Agradecimentos</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {acknowledgments.map((ack, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{ack.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {ack.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {ack.description}
                    </p>
                    {ack.url !== '#' && (
                      <a 
                        href={ack.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-orange hover:text-orange-600 text-sm font-medium"
                      >
                        Visitar site →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contexto Acadêmico */}
        <div className="card bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Contexto do Projeto
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  🎓 Proposta Acadêmica
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Este projeto foi desenvolvido como trabalho final para demonstrar como conceitos matemáticos 
                  podem ser aplicados de forma prática e interativa. Utilizamos dados reais de esportes para 
                  exemplificar diferentes tipos de médias estatísticas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Média Aritmética</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Análise de estatísticas de jogadores da NBA</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">📈</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Média Geométrica</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Eficiência de gols no futebol</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">🏆</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Média Ponderada</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rankings de times com pesos diferentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agradecimento Final */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-4">
            Obrigado por conhecer nosso projeto!
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Esperamos que o StatsBall ajude você a entender melhor como a matemática está presente 
            nos esportes que amamos. Foi um prazer desenvolver este trabalho!
          </p>
          <div className="mt-6">
            <p className="text-sm opacity-75">
              StatsBall • 2024 • Trabalho Acadêmico
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Destaque do Integrante */}
      {selectedIntegrante && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${
            showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`card max-w-lg w-full mx-4 transform transition-all duration-300 ${
              showModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal - Similar ao card original */}
            <div className="text-center mb-8">
              <div className="relative mb-8">
                <div className="relative w-48 h-48 mx-auto">
                  <img 
                    src={selectedIntegrante.foto}
                    alt={`${selectedIntegrante.nome} - ${selectedIntegrante.papel}`}
                    className="w-48 h-48 rounded-sm object-cover shadow-lg"
                    onError={(e) => {
                      e.target.src = '/img/placeholder.svg';
                    }}
                  />
                </div>
                <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br ${selectedIntegrante.cor} rounded-full flex items-center justify-center shadow-lg`}>
                  <selectedIntegrante.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-4xl font-light text-gray-900 dark:text-white mb-3 tracking-wide">
                {selectedIntegrante.nome}
              </h3>
              <p className="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
                {selectedIntegrante.papel}
              </p>
            </div>

            {/* Responsabilidades */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">
                Responsabilidades
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {selectedIntegrante.responsabilidade}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">
                Competências
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedIntegrante.skills.map((skill) => (
                  <span 
                    key={skill}
                    className={`px-4 py-2 bg-gradient-to-r ${selectedIntegrante.cor} text-white text-sm font-light tracking-wide rounded-sm shadow-sm`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Botão de Fechar */}
            <div className="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCloseModal}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm uppercase tracking-wide font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Creditos
