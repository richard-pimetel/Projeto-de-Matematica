import { useState } from 'react'
import { Calculator, TrendingUp, BarChart3, BookOpen, Lightbulb, Target, Award, ArrowRight, CheckCircle } from 'lucide-react'

const Explicacoes = () => {
  const [activeCard, setActiveCard] = useState(null)

  const mathematicalConcepts = [
    {
      id: 'aritmetica',
      title: 'Média Aritmética',
      icon: Calculator,
      color: 'blue',
      formula: '(a₁ + a₂ + a₃ + ... + aₙ) / n',
      description: 'A média aritmética é a soma de todos os valores dividida pelo número de valores.',
      whenToUse: 'Use quando os dados são homogêneos e não há valores extremos que distorcem o resultado.',
      sportsExample: {
        title: 'Exemplo no Basquete',
        scenario: 'Comparar o desempenho médio de dois jogadores da NBA',
        calculation: 'Pontos + Rebotes + Assistências + % Arremessos ÷ 4 estatísticas',
        advantage: 'Mostra o desempenho "típico" equilibrando todas as estatísticas igualmente.'
      },
      realWorldUses: [
        'Notas escolares e acadêmicas',
        'Salários médios de uma empresa',
        'Temperatura média mensal',
        'Vendas médias por mês',
        'Tempo médio de resposta'
      ],
      pros: [
        'Fácil de calcular e entender',
        'Considera todos os valores igualmente',
        'Amplamente conhecida e aceita',
        'Boa para dados sem outliers'
      ],
      cons: [
        'Sensível a valores extremos',
        'Pode não representar a realidade se há outliers',
        'Não considera a importância relativa dos dados'
      ]
    },
    {
      id: 'geometrica',
      title: 'Média Geométrica',
      icon: TrendingUp,
      color: 'green',
      formula: 'ⁿ√(x₁ × x₂ × x₃ × ... × xₙ)',
      description: 'A média geométrica é a raiz n-ésima do produto de n valores.',
      whenToUse: 'Ideal para taxas de crescimento, porcentagens e quando os valores se multiplicam entre si.',
      sportsExample: {
        title: 'Exemplo no Futebol',
        scenario: 'Analisar a consistência do aproveitamento de gols',
        calculation: '⁵√(Eficiência Jogo1 × Eficiência Jogo2 × ... × Eficiência Jogo5)',
        advantage: 'Mostra a consistência real, penalizando performances muito baixas.'
      },
      realWorldUses: [
        'Taxa de crescimento de investimentos',
        'Crescimento populacional',
        'Inflação acumulada',
        'Retorno médio de ações',
        'Taxa de conversão em marketing'
      ],
      pros: [
        'Ideal para taxas e porcentagens',
        'Menos sensível a outliers que a aritmética',
        'Mostra crescimento sustentável',
        'Boa para dados multiplicativos'
      ],
      cons: [
        'Mais complexa de calcular',
        'Não funciona com valores zero ou negativos',
        'Menos intuitiva para o público geral',
        'Sempre menor ou igual à média aritmética'
      ]
    },
    {
      id: 'ponderada',
      title: 'Média Ponderada',
      icon: BarChart3,
      color: 'purple',
      formula: 'Σ(valor × peso) / Σ(pesos)',
      description: 'A média ponderada atribui diferentes pesos (importâncias) para cada valor.',
      whenToUse: 'Use quando alguns valores são mais importantes que outros na análise.',
      sportsExample: {
        title: 'Exemplo nos Rankings',
        scenario: 'Criar ranking de times considerando diferentes aspectos',
        calculation: '(Vitórias×3 + Empates×1 + Gols×2 + Defesa×2) ÷ (3+1+2+2)',
        advantage: 'Permite valorizar aspectos específicos, criando rankings mais justos.'
      },
      realWorldUses: [
        'Notas finais com pesos diferentes',
        'Avaliação de desempenho de funcionários',
        'Índices econômicos (inflação, PIB)',
        'Rankings de universidades',
        'Avaliação de produtos (qualidade, preço, etc.)'
      ],
      pros: [
        'Flexível e customizável',
        'Reflete a importância real dos fatores',
        'Mais justa em muitas situações',
        'Permite análises sofisticadas'
      ],
      cons: [
        'Subjetiva na definição dos pesos',
        'Mais complexa de explicar',
        'Pode ser manipulada pelos pesos escolhidos',
        'Requer conhecimento do domínio'
      ]
    }
  ]

  const comparisonData = [
    {
      aspect: 'Facilidade de Cálculo',
      aritmetica: '⭐⭐⭐⭐⭐',
      geometrica: '⭐⭐⭐',
      ponderada: '⭐⭐⭐⭐'
    },
    {
      aspect: 'Resistência a Outliers',
      aritmetica: '⭐⭐',
      geometrica: '⭐⭐⭐⭐',
      ponderada: '⭐⭐⭐'
    },
    {
      aspect: 'Flexibilidade',
      aritmetica: '⭐⭐',
      geometrica: '⭐⭐',
      ponderada: '⭐⭐⭐⭐⭐'
    },
    {
      aspect: 'Interpretação Intuitiva',
      aritmetica: '⭐⭐⭐⭐⭐',
      geometrica: '⭐⭐',
      ponderada: '⭐⭐⭐'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-900 dark:text-blue-100',
        accent: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-100 dark:bg-blue-800'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-900 dark:text-green-100',
        accent: 'text-green-600 dark:text-green-400',
        button: 'bg-green-100 dark:bg-green-800'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-900 dark:text-purple-100',
        accent: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-100 dark:bg-purple-800'
      }
    }
    return colors[color]
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="section-title">
            Como Funciona a <span className="gradient-text">Matemática</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Entenda as três principais médias matemáticas e quando usar cada uma. 
            Descubra como elas se aplicam no mundo real e nos esportes!
          </p>
        </div>

        {/* Cards das Médias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mathematicalConcepts.map((concept) => {
            const colors = getColorClasses(concept.color)
            const Icon = concept.icon
            const isActive = activeCard === concept.id

            return (
              <div key={concept.id} className={`card ${colors.bg} ${colors.border} transition-all duration-300 ${isActive ? 'scale-105 shadow-xl' : ''}`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${colors.button} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${colors.accent}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                    {concept.title}
                  </h3>
                  <div className={`text-lg font-mono ${colors.accent} bg-white dark:bg-gray-800 p-2 rounded`}>
                    {concept.formula}
                  </div>
                </div>

                <p className={`${colors.text} mb-4 text-sm`}>
                  {concept.description}
                </p>

                <div className={`${colors.button} p-3 rounded-lg mb-4`}>
                  <h4 className={`font-semibold ${colors.text} text-sm mb-1`}>
                    Quando usar:
                  </h4>
                  <p className={`${colors.text} text-xs`}>
                    {concept.whenToUse}
                  </p>
                </div>

                <button
                  onClick={() => setActiveCard(isActive ? null : concept.id)}
                  className={`w-full btn-primary text-sm py-2`}
                >
                  {isActive ? 'Ver Menos' : 'Ver Detalhes'}
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Detalhes Expandidos */}
        {activeCard && (
          <div className="mb-12 animate-fade-in">
            {mathematicalConcepts
              .filter(concept => concept.id === activeCard)
              .map((concept) => {
                const colors = getColorClasses(concept.color)
                
                return (
                  <div key={concept.id} className={`card ${colors.bg} ${colors.border}`}>
                    <h3 className={`text-2xl font-bold ${colors.text} mb-6 text-center`}>
                      Detalhes: {concept.title}
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Exemplo Esportivo */}
                      <div className="space-y-6">
                        <div className={`${colors.button} p-4 rounded-lg`}>
                          <h4 className={`font-semibold ${colors.text} mb-3 flex items-center`}>
                            <Target className={`mr-2 h-5 w-5 ${colors.accent}`} />
                            {concept.sportsExample.title}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className={colors.text}>
                              <strong>Cenário:</strong> {concept.sportsExample.scenario}
                            </p>
                            <p className={colors.text}>
                              <strong>Cálculo:</strong> {concept.sportsExample.calculation}
                            </p>
                            <p className={colors.text}>
                              <strong>Vantagem:</strong> {concept.sportsExample.advantage}
                            </p>
                          </div>
                        </div>

                        {/* Vantagens e Desvantagens */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Vantagens
                            </h5>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {concept.pros.map((pro, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-500 mr-2">•</span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                              <Lightbulb className="mr-2 h-4 w-4" />
                              Limitações
                            </h5>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {concept.cons.map((con, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-red-500 mr-2">•</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Usos no Mundo Real */}
                      <div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className={`font-semibold ${colors.text} mb-3 flex items-center`}>
                            <BookOpen className={`mr-2 h-5 w-5 ${colors.accent}`} />
                            Aplicações no Mundo Real
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            {concept.realWorldUses.map((use, index) => (
                              <li key={index} className="flex items-center">
                                <span className={`${colors.accent} mr-2`}>▶</span>
                                {use}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* Tabela Comparativa */}
        <div className="card mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Comparação das <span className="gradient-text">Três Médias</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Aspecto
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                    Aritmética
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600 dark:text-green-400">
                    Geométrica
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-600 dark:text-purple-400">
                    Ponderada
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.aritmetica}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.geometrica}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.ponderada}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dicas Práticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <Calculator className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                Dica para Aritmética
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Use quando todos os valores têm a mesma importância e não há outliers extremos.
              </p>
            </div>
          </div>

          <div className="card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">
                Dica para Geométrica
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Ideal para taxas, porcentagens e quando você quer penalizar valores muito baixos.
              </p>
            </div>
          </div>

          <div className="card bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                Dica para Ponderada
              </h4>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                Use quando alguns fatores são mais importantes que outros na sua análise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explicacoes
