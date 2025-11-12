// Chaves de API (em um ambiente real, use variáveis de ambiente)
const API_KEYS = {
  FOOTBALL: '1', // TheSportsDB usa 1 como chave de teste
  BASKETBALL: '1' // Balldontlie não requer chave
};

// Função para buscar dados de times de futebol
export const fetchFootballTeams = async (leagueId) => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/${API_KEYS.FOOTBALL}/lookuptable.php?l=${leagueId}&s=2023-2024`
    );
    const data = await response.json();
    return data.table || [];
  } catch (error) {
    console.error('Erro ao buscar times de futebol:', error);
    return [];
  }
};

// Função para buscar dados de times de basquete
export const fetchBasketballTeams = async (season = 2023) => {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/teams`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erro ao buscar times de basquete:', error);
    return [];
  }
};

// Função para buscar estatísticas de um time de basquete
const fetchTeamStats = async (teamId, season) => {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/games?seasons[]=${season}&team_ids[]=${teamId}&per_page=100`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erro ao buscar estatísticas do time:', error);
    return [];
  }
};

// Gerador de desafios com base no esporte e dificuldade
export const generateChallenge = (sport, difficulty) => {
  // Exemplo de desafios - você pode personalizar conforme necessário
  const challenges = {
    football: {
      easy: {
        question: 'Qual time marcou mais gols na temporada?',
        type: 'most_goals',
        points: 10
      },
      medium: {
        question: 'Se cada vitória vale 3 pontos e cada empate 1, qual a pontuação total do time X?',
        type: 'calculate_points',
        points: 20
      },
      hard: {
        question: 'Qual a média de gols por jogo do time com melhor defesa?',
        type: 'defense_avg_goals',
        points: 30
      }
    },
    basketball: {
      easy: {
        question: 'Qual time venceu mais jogos?',
        type: 'most_wins',
        points: 10
      },
      medium: {
        question: 'Qual a média de pontos marcados por jogo do time X?',
        type: 'avg_points',
        points: 20
      },
      hard: {
        question: 'Se cada vitória vale 2 pontos, qual a diferença de pontos entre o primeiro e o último colocado?',
        type: 'points_difference',
        points: 30
      }
    }
  };

  return challenges[sport]?.[difficulty] || null;
};

// Processar dados dos times para o formato esperado pelo componente
const processTeamData = (teams, sport) => {
  if (sport === 'football') {
    return teams.map(team => ({
      name: team.strTeam,
      victories: parseInt(team.intWin) || 0,
      draws: parseInt(team.intDraw) || 0,
      defeats: parseInt(team.intLoss) || 0,
      goals_for: parseInt(team.intGoalsFor) || 0,
      goals_against: parseInt(team.intGoalsAgainst) || 0,
      points: parseInt(team.intPoints) || 0,
      played: parseInt(team.intPlayed) || 0
    }));
  }
  
  // Para basquete, precisamos buscar estatísticas adicionais
  return teams.map(team => ({
    id: team.id,
    name: team.full_name,
    city: team.city,
    conference: team.conference,
    division: team.division,
    abbreviation: team.abbreviation
  }));
};

export const getSportsData = async (sport, leagueId = '4335') => { // 4335 é o ID da Premier League
  try {
    let teams = [];
    
    if (sport === 'football') {
      const data = await fetchFootballTeams(leagueId);
      teams = processTeamData(data, 'football');
    } else if (sport === 'basketball') {
      const data = await fetchBasketballTeams();
      teams = processTeamData(data, 'basketball');
    }
    
    return teams;
  } catch (error) {
    console.error(`Erro ao buscar dados do esporte ${sport}:`, error);
    return [];
  }
};

// Função para validar resposta do desafio
export const validateChallenge = (challenge, answer, teams) => {
  if (!challenge || !teams.length) return false;
  
  switch (challenge.type) {
    case 'most_goals':
      const teamWithMostGoals = [...teams].sort((a, b) => b.goals_for - a.goals_for)[0];
      return answer === teamWithMostGoals.name;
      
    case 'calculate_points':
      const team = teams.find(t => t.name === challenge.team);
      if (!team) return false;
      const expectedPoints = (team.victories * 3) + (team.draws * 1);
      return parseInt(answer) === expectedPoints;
      
    case 'defense_avg_goals':
      const bestDefense = [...teams].sort((a, b) => a.goals_against - b.goals_against)[0];
      const avgGoals = (bestDefense.goals_against / bestDefense.played).toFixed(2);
      return parseFloat(answer) === parseFloat(avgGoals);
      
    default:
      return false;
  }
};
