// 🎲 GERADOR DE DADOS ALEATÓRIOS - StatsBall
// Funções utilitárias para geração de dados realistas e consistentes

/**
 * Gera número aleatório entre min e max com precisão decimal
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo  
 * @param {number} decimals - Casas decimais (padrão: 1)
 * @returns {number} Número aleatório
 */
export const randomBetween = (min, max, decimals = 1) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

/**
 * Gera estatísticas realistas para jogadores da NBA
 * @returns {object} Objeto com estatísticas de basquete
 */
export const generateNBAStats = () => {
  return {
    pts: randomBetween(15, 35, 1),      // Pontos por jogo: 15-35
    reb: randomBetween(3, 12, 1),       // Rebotes por jogo: 3-12
    ast: randomBetween(2, 10, 1),       // Assistências por jogo: 2-10
    fg_pct: randomBetween(0.35, 0.65, 3), // Field Goal %: 35-65%
    fg3_pct: randomBetween(0.25, 0.50, 3), // 3-Point %: 25-50%
    distance: randomBetween(8, 28, 1)   // Distância média: 8-28 pés
  };
};

/**
 * Gera dados de partidas de futebol para média geométrica
 * @param {number} numMatches - Número de partidas (padrão: 10)
 * @returns {array} Array com dados de partidas
 */
export const generateSoccerMatches = (numMatches = 10) => {
  const matches = [];
  for (let i = 1; i <= numMatches; i++) {
    const shots = Math.floor(Math.random() * 8) + 3; // 3-10 finalizações
    const goals = Math.floor(Math.random() * Math.min(shots, 4)); // 0-4 gols (máx shots)
    const efficiency = goals > 0 ? goals / shots : 0.01; // Evita divisão por zero
    
    matches.push({
      match: i,
      goals,
      shots,
      efficiency: Math.round(efficiency * 1000) / 1000 // 3 casas decimais
    });
  }
  return matches;
};

/**
 * Gera dados de times para rankings com média ponderada
 * @returns {object} Objeto com dados do time
 */
export const generateTeamStats = () => {
  const victories = Math.floor(Math.random() * 16) + 15; // 15-30 vitórias
  const draws = Math.floor(Math.random() * 8) + 2;       // 2-9 empates  
  const defeats = Math.floor(Math.random() * 10) + 3;    // 3-12 derrotas
  const goalsFor = Math.floor(Math.random() * 40) + 30;  // 30-69 gols pró
  const goalsAgainst = Math.floor(Math.random() * 25) + 15; // 15-39 gols contra
  
  return {
    victories,
    draws,
    defeats,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    totalGames: victories + draws + defeats,
    points: victories * 3 + draws * 1
  };
};

/**
 * Embaralha array usando algoritmo Fisher-Yates
 * @param {array} array - Array para embaralhar
 * @returns {array} Array embaralhado
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Gera notificação de sucesso para dados aleatórios
 * @param {string} type - Tipo de dados gerados
 * @returns {void}
 */
export const showRandomDataNotification = (type = 'geral') => {
  const messages = {
    nba: '🏀 Novos dados da NBA gerados! Estatísticas atualizadas com valores realistas.',
    futebol: '⚽ Dados de futebol atualizados! Novas eficiências de gols calculadas.',
    ranking: '🏆 Rankings atualizados! Novos dados de times e pontuações geradas.',
    geral: '🎲 Dados aleatórios gerados! Navegue pelas seções para ver as atualizações.'
  };
  
  const message = messages[type] || messages.geral;
  
  // Criar notificação visual elegante
  const notification = document.createElement('div');
  notification.className = 'fixed top-24 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 max-w-sm transform translate-x-full transition-transform duration-300';
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-900 dark:text-white">Dados Atualizados!</p>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">${message}</p>
      </div>
      <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto remover após 4 segundos
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, 4000);
};

/**
 * Valida se um número está dentro de um range válido
 * @param {number} value - Valor para validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} True se válido
 */
export const isValidRange = (value, min, max) => {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
};

/**
 * Formata número para exibição com casas decimais consistentes
 * @param {number} value - Valor para formatar
 * @param {number} decimals - Casas decimais (padrão: 1)
 * @returns {string} Número formatado
 */
export const formatNumber = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) return '0.0';
  return value.toFixed(decimals);
};

// Dados mock melhorados para fallback
export const MOCK_NBA_PLAYERS = [
  {
    id: 1,
    first_name: 'LeBron',
    last_name: 'James',
    team: { full_name: 'Los Angeles Lakers' }
  },
  {
    id: 2,
    first_name: 'Stephen',
    last_name: 'Curry',
    team: { full_name: 'Golden State Warriors' }
  },
  {
    id: 3,
    first_name: 'Giannis',
    last_name: 'Antetokounmpo',
    team: { full_name: 'Milwaukee Bucks' }
  },
  {
    id: 4,
    first_name: 'Kevin',
    last_name: 'Durant',
    team: { full_name: 'Phoenix Suns' }
  },
  {
    id: 5,
    first_name: 'Luka',
    last_name: 'Dončić',
    team: { full_name: 'Dallas Mavericks' }
  },
  {
    id: 6,
    first_name: 'Jayson',
    last_name: 'Tatum',
    team: { full_name: 'Boston Celtics' }
  },
  {
    id: 7,
    first_name: 'Joel',
    last_name: 'Embiid',
    team: { full_name: 'Philadelphia 76ers' }
  },
  {
    id: 8,
    first_name: 'Nikola',
    last_name: 'Jokić',
    team: { full_name: 'Denver Nuggets' }
  },
  {
    id: 9,
    first_name: 'Jimmy',
    last_name: 'Butler',
    team: { full_name: 'Miami Heat' }
  },
  {
    id: 10,
    first_name: 'Kawhi',
    last_name: 'Leonard',
    team: { full_name: 'LA Clippers' }
  },
  {
    id: 11,
    first_name: 'Damian',
    last_name: 'Lillard',
    team: { full_name: 'Milwaukee Bucks' }
  },
  {
    id: 12,
    first_name: 'Anthony',
    last_name: 'Davis',
    team: { full_name: 'Los Angeles Lakers' }
  },
  {
    id: 13,
    first_name: 'Ja',
    last_name: 'Morant',
    team: { full_name: 'Memphis Grizzlies' }
  },
  {
    id: 14,
    first_name: 'Devin',
    last_name: 'Booker',
    team: { full_name: 'Phoenix Suns' }
  },
  {
    id: 15,
    first_name: 'Zion',
    last_name: 'Williamson',
    team: { full_name: 'New Orleans Pelicans' }
  }
];

export const MOCK_SOCCER_PLAYERS = [
  { id: 1, name: 'Neymar Jr', team: 'Al Hilal', position: 'Atacante' },
  { id: 2, name: 'Kylian Mbappé', team: 'Real Madrid', position: 'Atacante' },
  { id: 3, name: 'Erling Haaland', team: 'Manchester City', position: 'Atacante' },
  { id: 4, name: 'Vinicius Jr', team: 'Real Madrid', position: 'Atacante' },
  { id: 5, name: 'Mohamed Salah', team: 'Liverpool', position: 'Atacante' },
  { id: 6, name: 'Lionel Messi', team: 'Inter Miami', position: 'Atacante' },
  { id: 7, name: 'Cristiano Ronaldo', team: 'Al Nassr', position: 'Atacante' },
  { id: 8, name: 'Robert Lewandowski', team: 'Barcelona', position: 'Atacante' },
  { id: 9, name: 'Harry Kane', team: 'Bayern Munich', position: 'Atacante' },
  { id: 10, name: 'Pedri', team: 'Barcelona', position: 'Meio-campo' },
  { id: 11, name: 'Jude Bellingham', team: 'Real Madrid', position: 'Meio-campo' },
  { id: 12, name: 'Kevin De Bruyne', team: 'Manchester City', position: 'Meio-campo' },
  { id: 13, name: 'Bruno Fernandes', team: 'Manchester United', position: 'Meio-campo' },
  { id: 14, name: 'Virgil van Dijk', team: 'Liverpool', position: 'Zagueiro' },
  { id: 15, name: 'Marquinhos', team: 'Paris Saint-Germain', position: 'Zagueiro' }
];

export const MOCK_TEAMS = [
  { id: 1, name: 'Manchester City', league: 'Premier League' },
  { id: 2, name: 'Real Madrid', league: 'La Liga' },
  { id: 3, name: 'Bayern Munich', league: 'Bundesliga' },
  { id: 4, name: 'Paris Saint-Germain', league: 'Ligue 1' },
  { id: 5, name: 'Barcelona', league: 'La Liga' },
  { id: 6, name: 'Liverpool', league: 'Premier League' },
  { id: 7, name: 'Juventus', league: 'Serie A' },
  { id: 8, name: 'Chelsea', league: 'Premier League' },
  { id: 9, name: 'Arsenal', league: 'Premier League' },
  { id: 10, name: 'Manchester United', league: 'Premier League' },
  { id: 11, name: 'Atletico Madrid', league: 'La Liga' },
  { id: 12, name: 'AC Milan', league: 'Serie A' },
  { id: 13, name: 'Inter Milan', league: 'Serie A' },
  { id: 14, name: 'Borussia Dortmund', league: 'Bundesliga' },
  { id: 15, name: 'Tottenham', league: 'Premier League' },
  { id: 16, name: 'Napoli', league: 'Serie A' },
  { id: 17, name: 'Sevilla', league: 'La Liga' },
  { id: 18, name: 'Lyon', league: 'Ligue 1' },
  { id: 19, name: 'Ajax', league: 'Eredivisie' },
  { id: 20, name: 'Porto', league: 'Primeira Liga' }
];
