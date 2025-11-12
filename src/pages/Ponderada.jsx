import { useState, useEffect } from 'react';
import { Info, Calculator, Trophy, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { getSportsData } from '../services/sportsApi';

const Ponderada = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState('premier')
  const [selectedSport, setSelectedSport] = useState('football')

  // Estados para desafios de médias
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [challengeResult, setChallengeResult] = useState(null)
  const [challengeScore, setChallengeScore] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  // Dados padrão para quando a API não estiver disponível
  const defaultData = {
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
    football: {
      premier: { id: '4328', name: 'Premier League' },
      laliga: { id: '4335', name: 'La Liga' },
      brasileirao: { id: '4371', name: 'Brasileirão' }
    },
    basketball: {
      nba: { id: 'nba', name: 'NBA' },
      euroleague: { id: 'euroleague', name: 'EuroLeague' }
    }
  }

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      try {
        let data = [];
        
        if (selectedSport === 'football') {
          const leagueId = leagues.football[selectedLeague]?.id || '4328';
          data = await getSportsData('football', leagueId);
          if (data.length === 0) {
            data = defaultData[selectedLeague] || [];
          }
        } else {
          data = await getSportsData('basketball');
          if (data.length === 0) {
            data = defaultData[selectedLeague] || [];
          } else {
            // Formatar dados do basquete para o formato esperado
            data = data.slice(0, 8).map(team => ({
              name: team.full_name,
              victories: team.wins || 0,
              defeats: team.losses || 0,
              points: team.wins ? (team.wins * 2) : 0,
              goals_for: team.points_for || 0,
              goals_against: team.points_against || 0
            }));
          }
        }
        
        setTeams(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setTeams(defaultData[selectedLeague] || []);
      } finally {
        setLoading(false);
      }
    };
    
    loadTeams();
  }, [selectedLeague, selectedSport])

  // Preparar dados para exibição
  const prepareTeamStats = () => {
    return teams.map(team => ({
      name: team.name,
      vitorias: team.victories || 0,
      derrotas: team.defeats || 0,
      empates: team.draws || 0,
      golsPro: team.goals_for || 0,
      golsContra: team.goals_against || 0,
      saldoGols: (team.goals_for || 0) - (team.goals_against || 0),
      pontos: team.points || ((team.victories || 0) * 3) + (team.draws || 0)
    })).sort((a, b) => b.pontos - a.pontos);
  };

  const teamStats = prepareTeamStats();

  // Funções para desafios de médias
  const generateMediaChallenge = () => {
    const challengeTypes = [
      {
        type: 'media_aritmetica',
        title: 'Média Aritmética',
        description: 'Calcule a média aritmética dos valores',
        generator: () => {
          const numbers = Array.from({length: Math.floor(Math.random() * 3) + 3}, () => Math.floor(Math.random() * 50) + 1);
          const sum = numbers.reduce((a, b) => a + b, 0);
          const average = (sum / numbers.length).toFixed(1);
          return {
            question: `Calcule a média aritmética de: ${numbers.join(', ')}`,
            answer: parseFloat(average),
            explanation: `Soma: ${sum}, Quantidade: ${numbers.length}, Média: ${sum}/${numbers.length} = ${average}`
          };
        }
      },
      {
        type: 'media_ponderada',
        title: 'Média Ponderada',
        description: 'Calcule a média ponderada com os pesos dados',
        generator: () => {
          const values = Array.from({length: 3}, () => Math.floor(Math.random() * 20) + 1);
          const weights = Array.from({length: 3}, () => Math.floor(Math.random() * 5) + 1);
          const weightedSum = values.reduce((sum, val, i) => sum + (val * weights[i]), 0);
          const totalWeight = weights.reduce((a, b) => a + b, 0);
          const average = (weightedSum / totalWeight).toFixed(1);
          return {
            question: `Calcule a média ponderada: Valores: ${values.join(', ')} | Pesos: ${weights.join(', ')}`,
            answer: parseFloat(average),
            explanation: `Soma ponderada: ${weightedSum}, Peso total: ${totalWeight}, Média: ${weightedSum}/${totalWeight} = ${average}`
          };
        }
      },
      {
        type: 'media_times',
        title: 'Média de Gols dos Times',
        description: 'Calcule a média usando dados dos times',
        generator: () => {
          if (teamStats.length === 0) {
            const numbers = [15, 20, 18, 22];
            const average = (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1);
            return {
              question: `Calcule a média de gols por jogo: ${numbers.join(', ')} gols`,
              answer: parseFloat(average),
              explanation: `Média: ${numbers.reduce((a, b) => a + b, 0)}/${numbers.length} = ${average}`
            };
          }
          const selectedTeams = teamStats.slice(0, 4);
          const goals = selectedTeams.map(team => team.golsPro);
          const average = (goals.reduce((a, b) => a + b, 0) / goals.length).toFixed(1);
          return {
            question: `Calcule a média de gols marcados pelos times: ${selectedTeams.map(t => `${t.name} (${t.golsPro})`).join(', ')}`,
            answer: parseFloat(average),
            explanation: `Gols: ${goals.join(' + ')} = ${goals.reduce((a, b) => a + b, 0)}, Média: ${goals.reduce((a, b) => a + b, 0)}/${goals.length} = ${average}`
          };
        }
      }
    ];

    const randomType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    const challenge = randomType.generator();
    
    setCurrentChallenge({
      ...challenge,
      type: randomType.type,
      title: randomType.title,
      description: randomType.description
    });
    setUserAnswer('');
    setChallengeResult(null);
  };

  const checkAnswer = () => {
    if (!currentChallenge || !userAnswer) return;
    
    const userNum = parseFloat(userAnswer);
    const isCorrect = Math.abs(userNum - currentChallenge.answer) < 0.1; // Tolerância de 0.1
    
    setChallengeResult({
      isCorrect,
      userAnswer: userNum,
      correctAnswer: currentChallenge.answer,
      explanation: currentChallenge.explanation
    });

    setChallengesCompleted(prev => prev + 1);
    if (isCorrect) {
      setChallengeScore(prev => prev + 1);
    }
  };

  const resetChallenges = () => {
    setChallengeScore(0);
    setChallengesCompleted(0);
    setCurrentChallenge(null);
    setUserAnswer('');
    setChallengeResult(null);
  };
  
  // Dados para as estatísticas adicionais
  const melhorAtaque = teamStats.length > 0 ? [...teamStats].sort((a, b) => b.golsPro - a.golsPro)[0] : null;
  const melhorDefesa = teamStats.length > 0 ? [...teamStats].sort((a, b) => a.golsContra - b.golsContra)[0] : null;
  const melhorInvencibilidade = teamStats.length > 0 ? [...teamStats].sort((a, b) => (b.vitorias + b.empates) - (a.vitorias + a.empates))[0] : null;
  const jogoComMaisGols = teamStats.length > 0 ? [...teamStats].sort((a, b) => (b.golsPro + b.golsContra) - (a.golsPro + a.golsContra))[0] : null;
  
  // Cálculos para as estatísticas
  const totalGols = teamStats.reduce((sum, team) => sum + team.golsPro, 0);
  const totalJogos = teamStats.reduce((sum, team) => sum + team.vitorias + team.empates + team.derrotas, 0);
  const mediaGolsPorJogo = totalJogos > 0 ? (totalGols / (totalJogos / 2)).toFixed(2) : 0;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Estatísticas de <span className="text-blue-600 dark:text-blue-400">Esportes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dados e estatísticas de {selectedSport === 'football' ? 'futebol' : 'basquete'} em tempo real
          </p>
        </div>

        {/* Controles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seletor de Esporte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Esporte
              </label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="football">Futebol ⚽</option>
                <option value="basketball">Basquete 🏀</option>
              </select>
            </div>

            {/* Seletor de Campeonato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campeonato
              </label>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={loading}
              >
                {selectedSport === 'football' 
                  ? Object.entries(leagues.football).map(([key, league]) => (
                      <option key={key} value={key}>{league.name}</option>
                    ))
                  : Object.entries(leagues.basketball).map(([key, league]) => (
                      <option key={key} value={key}>{league.name}</option>
                    ))
                }
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Classificação */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Classificação - {selectedSport === 'football' 
                ? leagues.football[selectedLeague]?.name 
                : leagues.basketball[selectedLeague]?.name}
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Posição
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        PTS
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        J
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        V
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        E
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        D
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        GP
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        GC
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        SG
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {teamStats.length > 0 ? (
                      teamStats.map((team, index) => (
                        <tr key={team.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {index + 1}º
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                {team.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {team.name.length > 20 ? `${team.name.substring(0, 20)}...` : team.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900 dark:text-white">
                            {team.pontos}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.vitorias + team.empates + team.derrotas}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.vitorias}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.empates}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.derrotas}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.golsPro}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                            {team.golsContra}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-center text-sm font-medium ${
                            team.saldoGols > 0 ? 'text-green-600 dark:text-green-400' : 
                            team.saldoGols < 0 ? 'text-red-600 dark:text-red-400' : 
                            'text-gray-500 dark:text-gray-300'
                          }`}>
                            {team.saldoGols > 0 ? `+${team.saldoGols}` : team.saldoGols}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Nenhum dado disponível no momento. Tente novamente mais tarde.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dados atualizados em {new Date().toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedSport(prev => prev === 'football' ? 'basketball' : 'football')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver {selectedSport === 'football' ? 'Basquete' : 'Futebol'}
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Estatísticas Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Melhor Ataque */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Melhor Ataque
            </h3>
            {teamStats.length > 0 ? (
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                    {[...teamStats].sort((a, b) => b.golsPro - a.golsPro)[0].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {[...teamStats].sort((a, b) => b.golsPro - a.golsPro)[0].name}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {[...teamStats].sort((a, b) => b.golsPro - a.golsPro)[0].golsPro}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">gols</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Média de {melhorAtaque ? (melhorAtaque.golsPro / (melhorAtaque.vitorias + melhorAtaque.empates + melhorAtaque.derrotas)).toFixed(1) : '0.0'} por jogo
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
            )}
          </div>

          {/* Melhor Defesa */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Melhor Defesa
            </h3>
            {teamStats.length > 0 ? (
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold">
                    {[...teamStats].sort((a, b) => a.golsContra - b.golsContra)[0].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {[...teamStats].sort((a, b) => a.golsContra - b.golsContra)[0].name}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {[...teamStats].sort((a, b) => a.golsContra - b.golsContra)[0].golsContra}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">gols sofridos</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Média de {melhorDefesa ? (melhorDefesa.golsContra / (melhorDefesa.vitorias + melhorDefesa.empates + melhorDefesa.derrotas)).toFixed(1) : '0.0'} por jogo
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
            )}
          </div>

          {/* Maior Invencibilidade */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Maior Invencibilidade
            </h3>
            {teamStats.length > 0 ? (
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-300 font-bold">
                    {[...teamStats].sort((a, b) => (b.vitorias + b.empates) - (a.vitorias + a.empates))[0].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {[...teamStats].sort((a, b) => (b.vitorias + b.empates) - (a.vitorias + a.empates))[0].name}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {melhorInvencibilidade ? (
                      <>
                        {melhorInvencibilidade.vitorias + melhorInvencibilidade.empates}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">jogos sem perder</span>
                      </>
                    ) : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {melhorInvencibilidade ? (
                      `${melhorInvencibilidade.vitorias} vitórias e ${melhorInvencibilidade.empates} empates`
                    ) : 'Nenhum dado disponível'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
            )}
          </div>
        </div>

        {/* Estatísticas do Campeonato */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Estatísticas do Campeonato
          </h3>
          {teamStats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Gols</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {teamStats.reduce((sum, team) => sum + team.golsPro, 0)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Média de {(teamStats.reduce((sum, team) => sum + team.golsPro, 0) / teamStats.length).toFixed(1)} por time
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Média de Gols por Jogo</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {((teamStats.reduce((sum, team) => sum + team.golsPro, 0) / 
                    (teamStats.reduce((sum, team) => sum + team.vitorias + team.empates + team.derrotas, 0) / 2)).toFixed(2))}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Por partida no campeonato
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Jogos com Mais Gols</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {jogoComMaisGols ? jogoComMaisGols.name : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {jogoComMaisGols ? `${jogoComMaisGols.golsPro + jogoComMaisGols.golsContra} gols em ${jogoComMaisGols.vitorias + jogoComMaisGols.empates + jogoComMaisGols.derrotas} jogos` : 'Nenhum dado disponível'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma estatística disponível no momento</p>
          )}
          </div>

        {/* Seção de Desafios de Médias */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Desafios de Médias Matemáticas
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Área do Desafio */}
            <div>
              {!currentChallenge ? (
                <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calculator className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Teste seus conhecimentos sobre médias!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Resolva exercícios de média aritmética, média ponderada e cálculos baseados nos dados dos times.
                  </p>
                  <button
                    onClick={generateMediaChallenge}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Começar Desafio
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                        {currentChallenge.title}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {currentChallenge.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {currentChallenge.question}
                    </h5>
                  </div>

                  {!challengeResult ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="number"
                        step="0.1"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Digite sua resposta..."
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                      />
                      <button
                        onClick={checkAnswer}
                        disabled={!userAnswer.trim()}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Verificar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`flex items-center gap-3 p-4 rounded-lg ${
                        challengeResult.isCorrect 
                          ? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700' 
                          : 'bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700'
                      }`}>
                        {challengeResult.isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )}
                        <div>
                          <p className={`font-semibold ${
                            challengeResult.isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                          }`}>
                            {challengeResult.isCorrect ? 'Correto!' : 'Incorreto!'}
                          </p>
                          <p className={`text-sm ${
                            challengeResult.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                          }`}>
                            Sua resposta: {challengeResult.userAnswer} | Resposta correta: {challengeResult.correctAnswer}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
                        <h6 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explicação:</h6>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          {challengeResult.explanation}
                        </p>
                      </div>

                      <button
                        onClick={generateMediaChallenge}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Próximo Desafio
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Estatísticas dos Desafios */}
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Suas Estatísticas
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{challengeScore}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{challengesCompleted}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tentativas</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center col-span-2">
                    <div className="text-2xl font-bold text-green-600">
                      {challengesCompleted > 0 ? Math.round((challengeScore / challengesCompleted) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Acerto</div>
                  </div>
                </div>

                {challengesCompleted > 0 && (
                  <button
                    onClick={resetChallenges}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reiniciar Estatísticas
                  </button>
                )}

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Dica:</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Para média aritmética: some todos os valores e divida pela quantidade. 
                    Para média ponderada: some os produtos (valor × peso) e divida pela soma dos pesos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ponderada;
