import { User, Code, Lightbulb, Users, Presentation } from 'lucide-react'

const Integrantes = () => {
  const integrantes = [
    {
      nome: "Richard",
      papel: "Desenvolvedor Principal",
      responsabilidade: "Desenvolvimento completo do projeto, implementação do código, arquitetura do sistema e integração das funcionalidades.",
      icon: Code,
      cor: "from-blue-500 to-blue-600",
      skills: ["React", "JavaScript", "Tailwind CSS", "Vite", "APIs"],
      foto: "/IMG/RICHARD.jpg"
    },
    {
      nome: "Gustavo", 
      papel: "Idealizador do Projeto",
      responsabilidade: "Concepção da ideia original, definição do escopo do projeto e direcionamento conceitual da aplicação matemática.",
      icon: Lightbulb,
      cor: "from-green-500 to-green-600",
      skills: ["Concepção", "Planejamento", "Análise", "Estratégia", "Visão"],
      foto: "/IMG/GUSTAVO ZUMBA.jpg"
    },
    {
      nome: "João",
      papel: "Auxiliar do Projeto", 
      responsabilidade: "Suporte no desenvolvimento, revisão de código, testes de funcionalidades e apoio técnico geral.",
      icon: Users,
      cor: "from-purple-500 to-purple-600",
      skills: ["Suporte Técnico", "Testes", "Revisão", "Documentação", "QA"],
      foto: "/IMG/JAMAL.jpg"
    },
    {
      nome: "Kauan",
      papel: "Apresentação e Suporte",
      responsabilidade: "Preparação da apresentação do produto, criação de materiais de demonstração e suporte ao projeto.",
      icon: Presentation,
      cor: "from-orange-500 to-orange-600", 
      skills: ["Apresentação", "Comunicação", "Demonstração", "Suporte", "Marketing"],
      foto: "/IMG/Kauan.jpg"
    },
    {
      nome: "Vitor",
      papel: "Apresentação e Suporte",
      responsabilidade: "Colaboração na apresentação do produto, apoio na demonstração das funcionalidades e suporte geral.",
      icon: Presentation,
      cor: "from-red-500 to-red-600",
      skills: ["Apresentação", "Demonstração", "Suporte", "Colaboração", "Comunicação"],
      foto: "/IMG/VITOR.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="page-title">
            Equipe de Desenvolvimento
          </h1>
          <div className="w-32 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Conheça os profissionais responsáveis pelo desenvolvimento do StatsBall, 
            cada um contribuindo com suas competências específicas para criar este sistema de análise matemática esportiva.
          </p>
        </div>

        {/* Grid de Integrantes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
          {integrantes.map((integrante, index) => (
            <div 
              key={integrante.nome}
              className="group card hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              style={{animationDelay: `${index * 0.1}s`}}
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
                        // Fallback para ícone se a imagem não carregar
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-24 h-24 bg-gradient-to-br ${integrante.cor} rounded-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hidden`}>
                      <integrante.icon className="h-12 w-12 text-white" />
                    </div>
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

        {/* Informações do Projeto */}
        <div className="mt-24 relative">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Sobre o Projeto
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 dark:bg-white mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="card">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6 tracking-wide">
                Objetivo Acadêmico
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Desenvolver uma plataforma interativa que demonstre aplicações práticas das três principais 
                médias matemáticas (aritmética, geométrica e ponderada) através de análises esportivas reais, 
                combinando conhecimento matemático rigoroso com tecnologia moderna e design profissional.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6 tracking-wide">
                Stack Tecnológico
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['React 18', 'Vite 4', 'Tailwind CSS', 'Recharts', 'JavaScript ES6+', 'APIs REST'].map((tech) => (
                  <div 
                    key={tech}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-light text-center border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrantes
