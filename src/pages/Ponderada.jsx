import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Trophy, Calculator, Shuffle, Info, Crown, Medal, Award, Settings } from 'lucide-react'
import { generateTeamStats, showRandomDataNotification, MOCK_TEAMS } from '../utils/dataGenerator'

const Ponderada = () => {
  const [teams, setTeams] = useState([])
  const [weights, setWeights] = useState({
    victories: 3,
    draws: 1,
    goals_for: 2,
    goals_against: 2
  })
  const [showFormula, setShowFormula] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState('premier')

  // Dados simulados de diferentes campeonatos
  const mockData = {
    premier: [
      { name: 'Manchester City', victories: 28, draws: 5, defeats: 5, goals_for: 89, goals_against: 31 },
      { name: 'Arsenal', victories: 26, draws: 6, defeats: 6, goals_for: 88, goals_against: 43 },
      { name: 'Manchester United', victories: 23, draws: 6, defeats: 9, goals_for: 58, goals_against: 43 },
      { name: 'Newcastle', victories: 19, draws: 14, defeats: 5, goals_for: 68, goals_against: 33 },
      { name: 'Liverpool', victories: 19, draws: 10, defeats: 9, goals_for: 75, goals_against: 28 },
      { name: 'Brighton', victories: 18, draws: 8, defeats: 12, goals_for: 72, goals_against: 53 },
      { name: 'Aston Villa', victories: 18, draws: 7, defeats: 13, goals_for: 61, goals_against: 51 },
      { name: 'Tottenham', victories: 18, draws: 6, defeats: 14, goals_for: 66, goals_against: 63 }
    ],
    laliga: [
      { name: 'Barcelona', victories: 28, draws: 4, defeats: 6, goals_for: 70, goals_against: 20 },
      { name: 'Real Madrid', victories: 26, draws: 8, defeats: 4, goals_for: 75, goals_against: 31 },
      { name: 'Atletico Madrid', victories: 23, draws: 9, defeats: 6, goals_for: 70, goals_against: 33 },
      { name: 'Real Sociedad', victories: 20, draws: 11, defeats: 7, goals_for: 51, goals_against: 35 },
      { name: 'Villarreal', victories: 19, draws: 7, defeats: 12, goals_for: 59, goals_against: 36 },
      { name: 'Real Betis', victories: 15, draws: 15, defeats: 8, goals_for: 48, goals_against: 40 },
      { name: 'Valencia', victories: 15, draws: 11, defeats: 12, goals_for: 42, goals_against: 42 },
      { name: 'Athletic Bilbao', victories: 14, draws: 13, defeats: 11, goals_for: 50, goals_against: 43 }
    ],
    brasileirao: [
      { name: 'Palmeiras', victories: 22, draws: 7, defeats: 9, goals_for: 66, goals_against: 27 },
      { name: 'Grêmio', victories: 20, draws: 9, defeats: 9, goals_for: 58, goals_against: 36 },
      { name: 'Flamengo', victories: 20, draws: 8, defeats: 10, goals_for: 75, goals_against: 42 },
      { name: 'Athletico-PR', victories: 18, draws: 11, defeats: 9, goals_for: 55, goals_against: 40 },
      { name: 'Fluminense', victories: 18, draws: 10, defeats: 10, goals_for: 64, goals_against: 39 },
      { name: 'Internacional', victories: 17, draws: 11, defeats: 10, goals_for: 50, goals_against: 36 },
      { name: 'São Paulo', victories: 16, draws: 12, defeats: 10, goals_for: 53, goals_against: 43 },
      { name: 'Corinthians', victories: 15, draws: 13, defeats: 10, goals_for: 54, goals_against: 45 }
    ]
  }

  const leagues = {
    premier: 'Premier League',
    laliga: 'La Liga',
    brasileirao: 'Brasileirão'
  }

  useEffect(() => {
    setTeams(mockData[selectedLeague])
  }, [selectedLeague])

  // Calcular média ponderada
  const calculateWeightedAverage = (team) => {
    const defenseScore = Math.max(0, 100 - team.goals_against) // Inverter gols sofridos
    
    const values = [
      team.victories,
      team.draws,
      team.goals_for,
      defenseScore
    ]
    
    const weightValues = [
      weights.victories,
      weights.draws,
      weights.goals_for,
      weights.goals_against
    ]
    
    const numerator = values.reduce((sum, value, index) => sum + (value * weightValues[index]), 0)
    const denominator = weightValues.reduce((sum, weight) => sum + weight, 0)
    
    return numerator / denominator
  }

  // Calcular ranking tradicional (apenas vitórias e empates)
  const calculateTraditionalPoints = (team) => {
    return (team.victories * 3) + (team.draws * 1)
  }

  // Gerar dados aleatórios melhorados
  const generateRandomData = () => {
    const newTeams = teams.length > 0 
      ? teams.map(team => ({
          ...team,
          ...generateTeamStats()
        }))
      : MOCK_TEAMS.slice(0, 8).map(team => ({
          ...team,
          ...generateTeamStats()
        }));
    
    setTeams(newTeams);
    showRandomDataNotification('ranking');
  }

  // Escutar evento global de dados aleatórios
  useEffect(() => {
    const handleGlobalRandomData = () => {
      console.log('Evento recebido na página Ponderada'); // Debug
      generateRandomData();
    };

    window.addEventListener('generateRandomData', handleGlobalRandomData);
    return () => window.removeEventListener('generateRandomData', handleGlobalRandomData);
  }, []);

  // Preparar dados para comparação
  const prepareComparisonData = () => {
    return teams.map(team => ({
      name: team.name.length > 12 ? team.name.substring(0, 12) + '...' : team.name,
      fullName: team.name,
      pontuacaoTradicional: calculateTraditionalPoints(team),
      mediaPonderada: Math.round(calculateWeightedAverage(team) * 10) / 10,
      vitorias: team.victories,
      empates: team.draws,
      golsPro: team.goals_for,
      golsContra: team.goals_against
    }))
    .sort((a, b) => b.mediaPonderada - a.mediaPonderada)
  }

  const comparisonData = prepareComparisonData()

  // Encontrar diferenças no ranking
  const traditionalRanking = [...comparisonData].sort((a, b) => b.pontuacaoTradicional - a.pontuacaoTradicional)
  const weightedRanking = comparisonData

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="section-title">
            Média <span className="gradient-text">Ponderada</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Crie rankings mais justos atribuindo pesos diferentes para vitórias, empates, 
            gols marcados e defesa. Veja como a ponderação muda a classificação!
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(leagues).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
          
          <button
            onClick={generateRandomData}
            className="btn-secondary inline-flex items-center"
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Gerar Dados Aleatórios
          </button>
          
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="btn-primary inline-flex items-center"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {showFormula ? 'Ocultar' : 'Mostrar'} Fórmula
          </button>
        </div>

        {/* Fórmula da Média Ponderada */}
        {showFormula && (
          <div className="card mb-8 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Info className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Fórmula da Média Ponderada
                </h3>
                <div className="text-2xl font-mono bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 text-center">
                  <span className="text-purple-600 dark:text-purple-400">MP = </span>
                  <span className="text-gray-800 dark:text-gray-200">Σ(valor × peso) / Σ(pesos)</span>
                </div>
                <div className="text-purple-800 dark:text-purple-200 space-y-2">
                  <p><strong>Onde:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Vitórias × {weights.victories} (peso das vitórias)</li>
                    <li>Empates × {weights.draws} (peso dos empates)</li>
                    <li>Gols Marcados × {weights.goals_for} (peso do ataque)</li>
                    <li>Defesa × {weights.goals_against} (peso da defesa - gols sofridos invertidos)</li>
                  </ul>
                  <p className="mt-2">
                    <strong>Vantagem:</strong> Permite valorizar diferentes aspectos do jogo, 
                    criando rankings mais equilibrados que consideram não apenas vitórias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Configuração de Pesos */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-purple-600" />
                Configurar Pesos
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vitórias (peso: {weights.victories})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weights.victories}
                    onChange={(e) => setWeights({...weights, victories: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Empates (peso: {weights.draws})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={weights.draws}
                    onChange={(e) => setWeights({...weights, draws: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gols Marcados (peso: {weights.goals_for})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weights.goals_for}
                    onChange={(e) => setWeights({...weights, goals_for: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Defesa (peso: {weights.goals_against})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weights.goals_against}
                    onChange={(e) => setWeights({...weights, goals_against: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Soma dos Pesos:
                </h4>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {weights.victories + weights.draws + weights.goals_for + weights.goals_against}
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico e Rankings */}
          <div className="lg:col-span-3 space-y-8">
            {/* Gráfico de Comparação */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">
                Ranking: Tradicional vs Ponderado
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      value, 
                      name === 'pontuacaoTradicional' ? 'Pontos Tradicionais' : 'Média Ponderada'
                    ]}
                    labelFormatter={(label) => {
                      const team = comparisonData.find(t => t.name === label)
                      return team ? team.fullName : label
                    }}
                  />
                  <Bar dataKey="pontuacaoTradicional" fill="#ff6b35" name="Pontuação Tradicional" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="mediaPonderada" fill="#9c27b0" name="Média Ponderada" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tabelas de Classificação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ranking Tradicional */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Medal className="mr-2 h-5 w-5 text-orange-500" />
                  Ranking Tradicional
                </h3>
                <div className="space-y-2">
                  {traditionalRanking.slice(0, 8).map((team, index) => (
                    <div key={team.fullName} className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                      index < 3 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index < 3 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-medium">{team.fullName}</span>
                      </div>
                      <span className="font-bold text-orange-600">
                        {team.pontuacaoTradicional} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ranking Ponderado */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-purple-600" />
                  Ranking Ponderado
                </h3>
                <div className="space-y-2">
                  {weightedRanking.slice(0, 8).map((team, index) => (
                    <div key={team.fullName} className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' :
                      index < 3 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-purple-600 text-white' :
                          index < 3 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-medium">{team.fullName}</span>
                      </div>
                      <span className="font-bold text-purple-600">
                        {team.mediaPonderada}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campeão Destacado */}
            {comparisonData.length > 0 && (
              <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    🏆 Campeão pela Média Ponderada
                  </h3>
                  <h4 className="text-3xl font-bold mb-4">
                    {comparisonData[0].fullName}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{comparisonData[0].vitorias}</div>
                      <div className="text-sm opacity-90">Vitórias</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{comparisonData[0].empates}</div>
                      <div className="text-sm opacity-90">Empates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{comparisonData[0].golsPro}</div>
                      <div className="text-sm opacity-90">Gols Pró</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{comparisonData[0].golsContra}</div>
                      <div className="text-sm opacity-90">Gols Contra</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xl">
                    <strong>Média Ponderada: {comparisonData[0].mediaPonderada}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ponderada
