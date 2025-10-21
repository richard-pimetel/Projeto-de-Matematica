import { useState, useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Search, Users, Calculator, Trophy, Shuffle, Info } from 'lucide-react'
import axios from 'axios'
import { generateNBAStats, showRandomDataNotification, MOCK_NBA_PLAYERS } from '../utils/dataGenerator'

const Aritmetica = () => {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFormula, setShowFormula] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  // Inicializar com dados mock melhorados (6 jogadores para mais testes)
  const initializeMockPlayers = () => {
    return MOCK_NBA_PLAYERS.slice(0, 6).map(player => ({
      ...player,
      stats: generateNBAStats()
    }));
  };

  // Buscar jogadores da API
  const fetchPlayers = async () => {
    console.log('Carregando jogadores NBA...'); // Debug
    setLoading(true)
    try {
      // Tentativa de usar a API real
      const response = await axios.get('https://www.balldontlie.io/api/v1/players?per_page=10')
      const playersWithStats = response.data.data.slice(0, 2).map(player => ({
        ...player,
        stats: generateNBAStats()
      }))
      
      console.log('Jogadores da API:', playersWithStats); // Debug
      setPlayers(playersWithStats)
    } catch (error) {
      console.log('API não disponível, usando dados simulados')
      const mockPlayers = initializeMockPlayers();
      console.log('Jogadores mock:', mockPlayers); // Debug
      setPlayers(mockPlayers)
    }
    setRenderKey(1); // Forçar renderização inicial
    setLoading(false)
  }

  useEffect(() => {
    fetchPlayers()
  }, [])
  
  // Debug: Monitorar mudanças no estado players
  useEffect(() => {
    console.log('Estado players NBA atualizado:', players);
    console.log('Quantidade de players NBA:', players.length);
  }, [players]);

  // Filtrar jogadores por busca
  const filteredPlayers = players.filter(player =>
    `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Selecionar jogador
  const selectPlayer = (player) => {
    if (selectedPlayers.length < 2 && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  // Remover jogador selecionado
  const removePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId))
  }

  // Calcular média aritmética
  const calculateArithmeticMean = (values) => {
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  // Gerar dados aleatórios melhorados
  const generateRandomData = () => {
    console.log('Gerando dados aleatórios NBA...'); // Debug
    
    // Sempre usar dados mock com novas estatísticas (6 jogadores para mais testes)
    const randomPlayers = MOCK_NBA_PLAYERS.slice(0, 6).map(player => ({
      ...player,
      stats: generateNBAStats()
    }));
    
    console.log('Novos jogadores NBA (6):', randomPlayers); // Debug
    
    setPlayers(randomPlayers);
    setSelectedPlayers([]); // Limpar seleção para usuário escolher
    setRenderKey(prev => prev + 1); // Forçar re-renderização
    showRandomDataNotification('nba');
  }

  // Escutar evento global de dados aleatórios
  useEffect(() => {
    const handleGlobalRandomData = () => {
      console.log('Evento recebido na página Aritmética'); // Debug
      generateRandomData();
    };

    window.addEventListener('generateRandomData', handleGlobalRandomData);
    return () => window.removeEventListener('generateRandomData', handleGlobalRandomData);
  }, []);

  // Preparar dados para o gráfico radar
  const prepareRadarData = () => {
    if (selectedPlayers.length !== 2) return []

    const stats = ['pts', 'reb', 'ast', 'fg_pct', 'fg3_pct']
    const labels = ['Pontos', 'Rebotes', 'Assistências', 'FG%', '3P%']

    return labels.map((label, index) => {
      const stat = stats[index]
      const data = {
        stat: label,
        [`${selectedPlayers[0].first_name} ${selectedPlayers[0].last_name}`]: selectedPlayers[0].stats[stat] * (stat.includes('pct') ? 100 : 1),
        [`${selectedPlayers[1].first_name} ${selectedPlayers[1].last_name}`]: selectedPlayers[1].stats[stat] * (stat.includes('pct') ? 100 : 1)
      }
      return data
    })
  }

  // Preparar dados para comparação de médias
  const prepareComparisonData = () => {
    if (selectedPlayers.length !== 2) return []

    const player1Stats = [
      selectedPlayers[0].stats.pts,
      selectedPlayers[0].stats.reb,
      selectedPlayers[0].stats.ast,
      selectedPlayers[0].stats.fg_pct * 100,
      selectedPlayers[0].stats.fg3_pct * 100
    ]

    const player2Stats = [
      selectedPlayers[1].stats.pts,
      selectedPlayers[1].stats.reb,
      selectedPlayers[1].stats.ast,
      selectedPlayers[1].stats.fg_pct * 100,
      selectedPlayers[1].stats.fg3_pct * 100
    ]

    const player1Mean = calculateArithmeticMean(player1Stats)
    const player2Mean = calculateArithmeticMean(player2Stats)

    return [
      {
        name: `${selectedPlayers[0].first_name} ${selectedPlayers[0].last_name}`,
        media: Math.round(player1Mean * 10) / 10,
        fill: '#ff6b35'
      },
      {
        name: `${selectedPlayers[1].first_name} ${selectedPlayers[1].last_name}`,
        media: Math.round(player2Mean * 10) / 10,
        fill: '#4caf50'
      }
    ]
  }

  const radarData = prepareRadarData()
  const comparisonData = prepareComparisonData()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏀</div>
          <h1 className="section-title">
            Média <span className="gradient-text">Aritmética</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare dois jogadores da NBA usando a média aritmética. Analise pontos, rebotes, 
            assistências e porcentagens de arremesso para determinar o desempenho geral.
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Fórmula da Média Aritmética */}
        {showFormula && (
          <div className="card mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Fórmula da Média Aritmética
                </h3>
                <div className="text-2xl font-mono bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 text-center">
                  <span className="text-blue-600 dark:text-blue-400">MA = </span>
                  <span className="text-gray-800 dark:text-gray-200">(a₁ + a₂ + a₃ + ... + aₙ) / n</span>
                </div>
                <p className="text-blue-800 dark:text-blue-200">
                  Onde <strong>a₁, a₂, ..., aₙ</strong> são os valores das estatísticas e <strong>n</strong> é o número total de estatísticas.
                  A média aritmética é ideal para dados que não têm valores extremos e quando queremos o valor "típico" central.
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
                <Users className="mr-2 h-5 w-5 text-primary-orange" />
                Selecione 2 Jogadores
              </h3>
              
              {/* Jogadores Selecionados */}
              {selectedPlayers.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Selecionados:</h4>
                  {selectedPlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between bg-primary-orange/10 rounded-lg p-3 mb-2">
                      <span className="font-medium">{player.first_name} {player.last_name}</span>
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

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando jogadores...</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto" key={`players-nba-${renderKey}`}>
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player, index) => (
                      <button
                        key={`${player.id}-${player.first_name}-${index}`}
                        onClick={() => selectPlayer(player)}
                        disabled={selectedPlayers.length >= 2 || selectedPlayers.find(p => p.id === player.id)}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <div className="font-medium">{player.first_name} {player.last_name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {player.team?.full_name || 'NBA'}
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
              )}
            </div>
          </div>

          {/* Gráficos e Análise */}
          <div className="lg:col-span-2 space-y-8">
            {selectedPlayers.length === 2 ? (
              <>
                {/* Gráfico Radar */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Comparação Detalhada</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="stat" />
                      <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                      <Radar
                        name={`${selectedPlayers[0].first_name} ${selectedPlayers[0].last_name}`}
                        dataKey={`${selectedPlayers[0].first_name} ${selectedPlayers[0].last_name}`}
                        stroke="#ff6b35"
                        fill="#ff6b35"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name={`${selectedPlayers[1].first_name} ${selectedPlayers[1].last_name}`}
                        dataKey={`${selectedPlayers[1].first_name} ${selectedPlayers[1].last_name}`}
                        stroke="#4caf50"
                        fill="#4caf50"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Comparação de Médias */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                    Média Aritmética Geral
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [value.toFixed(1), 'Média Aritmética']}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Bar dataKey="media" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  {/* Vencedor */}
                  {comparisonData.length === 2 && (
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                        <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                          Melhor Desempenho Geral: {comparisonData[0].media > comparisonData[1].media ? comparisonData[0].name : comparisonData[1].name}
                        </span>
                      </div>
                      <p className="text-center text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                        Baseado na média aritmética de todas as estatísticas principais
                      </p>
                    </div>
                  )}
                </div>

                {/* Estatísticas Detalhadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedPlayers.map((player, index) => (
                    <div key={player.id} className="card">
                      <h4 className="font-semibold text-lg mb-4">{player.first_name} {player.last_name}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Pontos por jogo:</span>
                          <span className="font-semibold">{player.stats.pts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rebotes por jogo:</span>
                          <span className="font-semibold">{player.stats.reb}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assistências por jogo:</span>
                          <span className="font-semibold">{player.stats.ast}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>% Arremessos de campo:</span>
                          <span className="font-semibold">{(player.stats.fg_pct * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>% Arremessos de 3:</span>
                          <span className="font-semibold">{(player.stats.fg3_pct * 100).toFixed(1)}%</span>
                        </div>
                        <hr className="border-gray-200 dark:border-gray-600" />
                        <div className="flex justify-between text-lg font-bold text-primary-orange">
                          <span>Média Aritmética:</span>
                          <span>{comparisonData[index]?.media}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="card text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Selecione 2 jogadores para comparar
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Escolha dois jogadores da lista para ver a análise comparativa usando média aritmética.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aritmetica
