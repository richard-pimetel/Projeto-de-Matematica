import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Search, Target, Calculator, Trophy, Shuffle, Info, TrendingUp } from 'lucide-react'
import { generateSoccerMatches, showRandomDataNotification, MOCK_SOCCER_PLAYERS } from '../utils/dataGenerator'

const Geometrica = () => {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showFormula, setShowFormula] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  // Inicializar dados de jogadores com função melhorada (8 jogadores para mais testes)
  const initializePlayers = () => {
    return MOCK_SOCCER_PLAYERS.slice(0, 8).map(player => ({
      ...player,
      matches: generateSoccerMatches(5)
    }));
  };

  useEffect(() => {
    console.log('Inicializando página Geométrica...'); // Debug
    const initialPlayers = initializePlayers();
    console.log('Jogadores iniciais:', initialPlayers); // Debug
    setPlayers(initialPlayers);
    setRenderKey(1); // Forçar renderização inicial
  }, [])
  
  // Debug: Monitorar mudanças no estado players
  useEffect(() => {
    console.log('Estado players atualizado:', players);
    console.log('Quantidade de players:', players.length);
  }, [players]);

  // Filtrar jogadores por busca
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Selecionar jogador
  const selectPlayer = (player) => {
    if (selectedPlayers.length < 4 && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  // Remover jogador selecionado
  const removePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId))
  }

  // Calcular média geométrica
  const calculateGeometricMean = (values) => {
    if (values.some(v => v <= 0)) return 0
    const product = values.reduce((prod, value) => prod * value, 1)
    return Math.pow(product, 1 / values.length)
  }

  // Gerar dados aleatórios melhorados
  const generateRandomData = () => {
    console.log('Gerando dados aleatórios Futebol...'); // Debug
    console.log('Estado atual players:', players); // Debug
    
    // Sempre usar dados mock com novas estatísticas (8 jogadores para mais testes)
    const newPlayers = MOCK_SOCCER_PLAYERS.slice(0, 8).map(player => ({
      ...player,
      matches: generateSoccerMatches(5)
    }));
    
    console.log('Novos jogadores Futebol (8):', newPlayers); // Debug
    
    setPlayers(newPlayers);
    setSelectedPlayers([]); // Limpar seleção para usuário escolher
    setRenderKey(prev => prev + 1); // Forçar re-renderização
    
    // Debug: Verificar se o estado foi atualizado
    setTimeout(() => {
      console.log('Estado após setPlayers:', players);
    }, 100);
    
    showRandomDataNotification('futebol');
  }

  // Escutar evento global de dados aleatórios
  useEffect(() => {
    const handleGlobalRandomData = () => {
      console.log('Evento recebido na página Geométrica'); // Debug
      generateRandomData();
    };

    window.addEventListener('generateRandomData', handleGlobalRandomData);
    return () => window.removeEventListener('generateRandomData', handleGlobalRandomData);
  }, []);

  // Preparar dados para comparação
  const prepareComparisonData = () => {
    return selectedPlayers.map(player => {
      const efficiencies = player.matches.map(match => match.efficiency)
      const arithmeticMean = efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length
      const geometricMean = calculateGeometricMean(efficiencies)
      const totalGoals = player.matches.reduce((sum, match) => sum + match.goals, 0)
      const totalShots = player.matches.reduce((sum, match) => sum + match.shots, 0)

      return {
        name: player.name.split(' ').slice(0, 2).join(' '), // Primeiros 2 nomes
        mediaAritmetica: Math.round(arithmeticMean * 10) / 10,
        mediaGeometrica: Math.round(geometricMean * 10) / 10,
        totalGols: totalGoals,
        totalChutes: totalShots,
        aproveitamentoGeral: Math.round((totalGoals / totalShots) * 1000) / 10
      }
    })
  }

  // Preparar dados para gráfico de linha (evolução)
  const prepareEvolutionData = () => {
    if (selectedPlayers.length === 0) return []

    const matches = selectedPlayers[0].matches.map((_, index) => {
      const matchData = { match: `Jogo ${index + 1}` }
      selectedPlayers.forEach(player => {
        matchData[player.name.split(' ').slice(0, 2).join(' ')] = player.matches[index].efficiency
      })
      return matchData
    })

    return matches
  }

  const comparisonData = prepareComparisonData()
  const evolutionData = prepareEvolutionData()

  // Encontrar melhor jogador por média geométrica
  const bestPlayerGeometric = comparisonData.length > 0 
    ? comparisonData.reduce((best, current) => 
        current.mediaGeometrica > best.mediaGeometrica ? current : best
      )
    : null

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="section-title">
            Média <span className="gradient-text">Geométrica</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Analise o aproveitamento de gols no futebol usando a média geométrica. 
            Ideal para calcular taxas de crescimento e eficiência ao longo do tempo.
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar jogador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="btn-primary inline-flex items-center"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {showFormula ? 'Ocultar' : 'Mostrar'} Fórmula
          </button>
        </div>

        {/* Fórmula da Média Geométrica */}
        {showFormula && (
          <div className="card mb-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Fórmula da Média Geométrica
                </h3>
                <div className="text-2xl font-mono bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 text-center">
                  <span className="text-green-600 dark:text-green-400">MG = </span>
                  <span className="text-gray-800 dark:text-gray-200">ⁿ√(x₁ × x₂ × x₃ × ... × xₙ)</span>
                </div>
                <p className="text-green-800 dark:text-green-200 mb-2">
                  Onde <strong>x₁, x₂, ..., xₙ</strong> são as eficiências de cada jogo e <strong>n</strong> é o número de jogos.
                </p>
                <p className="text-green-800 dark:text-green-200">
                  <strong>Por que usar média geométrica?</strong> Ela é ideal para calcular taxas de crescimento, 
                  eficiência ao longo do tempo e quando os valores se multiplicam entre si. No futebol, 
                  representa melhor a consistência do aproveitamento.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Jogadores */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Selecione até 4 Jogadores
              </h3>
              
              {/* Jogadores Selecionados */}
              {selectedPlayers.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Selecionados ({selectedPlayers.length}/4):
                  </h4>
                  {selectedPlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between bg-green-100 dark:bg-green-900/20 rounded-lg p-3 mb-2">
                      <div>
                        <span className="font-medium block">{player.name}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{player.team}</span>
                      </div>
                      <button
                        onClick={() => removePlayer(player.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 max-h-96 overflow-y-auto" key={`players-${renderKey}`}>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player, index) => (
                    <button
                      key={`${player.id}-${player.name}-${index}`}
                      onClick={() => selectPlayer(player)}
                      disabled={selectedPlayers.length >= 4 || selectedPlayers.find(p => p.id === player.id)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{player.team}</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        {player.matches ? player.matches.reduce((sum, match) => sum + match.goals, 0) : 0} gols em {player.matches ? player.matches.length : 0} jogos
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Nenhum jogador encontrado.</p>
                    <p className="text-sm mt-2">Clique em "Gerar Dados Aleatórios" para carregar jogadores.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gráficos e Análise */}
          <div className="lg:col-span-2 space-y-8">
            {selectedPlayers.length > 0 ? (
              <>
                {/* Comparação de Médias */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    Comparação: Média Aritmética vs Geométrica
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Eficiência (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value}%`, 
                          name === 'mediaAritmetica' ? 'Média Aritmética' : 'Média Geométrica'
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="mediaAritmetica" fill="#ff6b35" name="Média Aritmética" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="mediaGeometrica" fill="#4caf50" name="Média Geométrica" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  {/* Melhor Jogador */}
                  {bestPlayerGeometric && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-center mb-2">
                        <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          Melhor Consistência (Média Geométrica): {bestPlayerGeometric.name}
                        </span>
                      </div>
                      <div className="text-center text-sm text-green-700 dark:text-green-300">
                        Média Geométrica: {bestPlayerGeometric.mediaGeometrica}% | 
                        Aproveitamento Geral: {bestPlayerGeometric.aproveitamentoGeral}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Evolução da Eficiência */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Evolução da Eficiência por Jogo</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={evolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="match" />
                      <YAxis label={{ value: 'Eficiência (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Eficiência']} />
                      <Legend />
                      {selectedPlayers.map((player, index) => {
                        const colors = ['#ff6b35', '#4caf50', '#2196f3', '#9c27b0']
                        return (
                          <Line
                            key={player.id}
                            type="monotone"
                            dataKey={player.name.split(' ').slice(0, 2).join(' ')}
                            stroke={colors[index]}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        )
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Estatísticas Detalhadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedPlayers.map((player) => {
                    const efficiencies = player.matches.map(match => match.efficiency)
                    const geometricMean = calculateGeometricMean(efficiencies)
                    const arithmeticMean = efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length
                    
                    return (
                      <div key={player.id} className="card">
                        <h4 className="font-semibold text-lg mb-4">{player.name}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-semibold">{player.team}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total de gols:</span>
                            <span className="font-semibold">
                              {player.matches.reduce((sum, match) => sum + match.goals, 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total de chutes:</span>
                            <span className="font-semibold">
                              {player.matches.reduce((sum, match) => sum + match.shots, 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Média Aritmética:</span>
                            <span className="font-semibold text-orange-600">
                              {Math.round(arithmeticMean * 10) / 10}%
                            </span>
                          </div>
                          <hr className="border-gray-200 dark:border-gray-600" />
                          <div className="flex justify-between text-lg font-bold text-primary-green">
                            <span>Média Geométrica:</span>
                            <span>{Math.round(geometricMean * 10) / 10}%</span>
                          </div>
                        </div>
                        
                        {/* Jogos individuais */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Desempenho por jogo:
                          </h5>
                          <div className="space-y-1">
                            {player.matches.map((match, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>Jogo {match.match}:</span>
                                <span>{match.goals}/{match.shots} ({match.efficiency}%)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="card text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Selecione jogadores para analisar
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Escolha até 4 jogadores da lista para ver a análise de aproveitamento usando média geométrica.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Geometrica
