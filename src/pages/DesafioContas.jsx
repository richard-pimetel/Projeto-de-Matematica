import { useState, useEffect, useRef } from 'react'
import { Trophy, Clock, Target, RotateCcw, Play, Users, Award } from 'lucide-react'

const DesafioContas = () => {
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'finished'
  const [playerName, setPlayerName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState({ num1: 0, num2: 0, operator: '+', answer: 0 })
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [rankings, setRankings] = useState([])
  const [feedback, setFeedback] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [difficultyLevel, setDifficultyLevel] = useState(1)
  
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  // Tipos de médias matemáticas com 3 níveis de dificuldade
  const mediaTypes = [
    { 
      type: 'aritmetica', 
      name: 'Média Aritmética',
      symbol: 'MA',
      description: 'Soma dos valores dividida pela quantidade'
    },
    { 
      type: 'geometrica', 
      name: 'Média Geométrica',
      symbol: 'MG',
      description: 'Raiz n-ésima do produto dos valores'
    },
    { 
      type: 'harmonica', 
      name: 'Média Harmônica',
      symbol: 'MH',
      description: 'Inverso da média aritmética dos inversos'
    },
    { 
      type: 'ponderada', 
      name: 'Média Ponderada',
      symbol: 'MP',
      description: 'Média com pesos diferentes para cada valor'
    }
  ]

  const difficultyLevels = [
    { level: 1, name: 'Fácil', color: 'green', timeBonus: 1 },
    { level: 2, name: 'Médio', color: 'yellow', timeBonus: 2 },
    { level: 3, name: 'Difícil', color: 'red', timeBonus: 3 }
  ]

  // Carregar rankings do localStorage
  useEffect(() => {
    const savedRankings = localStorage.getItem('statsball-desafio-rankings')
    if (savedRankings) {
      setRankings(JSON.parse(savedRankings))
    }
  }, [])

  // Timer do jogo
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishGame()
    }
    return () => clearTimeout(timerRef.current)
  }, [timeLeft, gameState])

  // Focar no input quando nova pergunta aparece
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQuestion, gameState])

  // Gerar nova pergunta sobre MÉDIAS MATEMÁTICAS com níveis de dificuldade
  const generateQuestion = () => {
    const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)]
    let values, weights, correctAnswer, questionText, explanation

    // Configurar complexidade baseada no nível de dificuldade
    const getComplexity = () => {
      switch (difficultyLevel) {
        case 1: return { count: 3, range: 10, decimals: false }
        case 2: return { count: 4, range: 20, decimals: true }
        case 3: return { count: 5, range: 50, decimals: true }
        default: return { count: 3, range: 10, decimals: false }
      }
    }

    const complexity = getComplexity()

    switch (mediaType.type) {
      case 'aritmetica':
        values = Array.from({length: complexity.count}, () => 
          Math.floor(Math.random() * complexity.range) + 1
        )
        correctAnswer = values.reduce((a, b) => a + b, 0) / values.length
        if (!complexity.decimals) correctAnswer = Math.round(correctAnswer)
        questionText = `Média Aritmética de: ${values.join(', ')}`
        explanation = `(${values.join(' + ')}) ÷ ${values.length} = ${correctAnswer}`
        break

      case 'geometrica':
        values = Array.from({length: complexity.count}, () => 
          Math.floor(Math.random() * (complexity.range/2)) + 1
        )
        const product = values.reduce((a, b) => a * b, 1)
        correctAnswer = Math.pow(product, 1/values.length)
        if (!complexity.decimals) correctAnswer = Math.round(correctAnswer)
        else correctAnswer = Math.round(correctAnswer * 10) / 10
        questionText = `Média Geométrica de: ${values.join(', ')}`
        explanation = `∜(${values.join(' × ')}) = ∜${product} = ${correctAnswer}`
        break

      case 'harmonica':
        values = Array.from({length: complexity.count}, () => 
          Math.floor(Math.random() * complexity.range) + 1
        )
        const sumInverses = values.reduce((sum, val) => sum + (1/val), 0)
        correctAnswer = values.length / sumInverses
        if (!complexity.decimals) correctAnswer = Math.round(correctAnswer)
        else correctAnswer = Math.round(correctAnswer * 10) / 10
        questionText = `Média Harmônica de: ${values.join(', ')}`
        explanation = `${values.length} ÷ (${values.map(v => `1/${v}`).join(' + ')}) = ${correctAnswer}`
        break

      case 'ponderada':
        values = Array.from({length: complexity.count}, () => 
          Math.floor(Math.random() * complexity.range) + 1
        )
        weights = Array.from({length: complexity.count}, () => 
          Math.floor(Math.random() * 5) + 1
        )
        const weightedSum = values.reduce((sum, val, i) => sum + (val * weights[i]), 0)
        const totalWeight = weights.reduce((a, b) => a + b, 0)
        correctAnswer = weightedSum / totalWeight
        if (!complexity.decimals) correctAnswer = Math.round(correctAnswer)
        else correctAnswer = Math.round(correctAnswer * 10) / 10
        questionText = `Média Ponderada: Valores: ${values.join(', ')} | Pesos: ${weights.join(', ')}`
        explanation = `(${values.map((v, i) => `${v}×${weights[i]}`).join(' + ')}) ÷ ${totalWeight} = ${correctAnswer}`
        break

      default:
        values = [1, 2, 3]
        correctAnswer = 2
        questionText = 'Erro na geração'
        explanation = 'Erro'
    }

    setCurrentQuestion({ 
      values, 
      weights, 
      mediaType: mediaType.symbol, 
      mediaName: mediaType.name,
      answer: correctAnswer,
      questionText,
      explanation,
      difficulty: difficultyLevel
    })
    setUserAnswer('')
    setFeedback('')
    setIsCorrect(null)
  }

  // Iniciar jogo
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Digite seu nome para começar!')
      return
    }
    
    setGameState('playing')
    setScore(0)
    setTimeLeft(90)
    setQuestionsAnswered(0)
    setCorrectAnswers(0)
    generateQuestion()
  }

  // Verificar resposta
  const checkAnswer = () => {
    const userNum = parseFloat(userAnswer)
    const tolerance = currentQuestion.difficulty === 3 ? 0.2 : 0.1
    const correct = Math.abs(userNum - currentQuestion.answer) <= tolerance
    
    setQuestionsAnswered(prev => prev + 1)
    
    if (correct) {
      const points = difficultyLevels[difficultyLevel - 1].timeBonus
      setScore(prev => prev + points)
      setCorrectAnswers(prev => prev + 1)
      setFeedback(`Correto! 🎉 (+${points} pontos)`)
      setIsCorrect(true)
    } else {
      setFeedback(`Errou! A resposta era ${currentQuestion.answer}`)
      setIsCorrect(false)
    }

    // Mostrar explicação
    setTimeout(() => {
      setFeedback(prev => prev + `\n💡 ${currentQuestion.explanation}`)
    }, 500)

    // Gerar nova pergunta após 2 segundos
    setTimeout(() => {
      generateQuestion()
    }, 2000)
  }

  // Finalizar jogo
  const finishGame = () => {
    setGameState('finished')
    
    // Salvar no ranking
    const newScore = {
      name: playerName,
      score: score,
      questionsAnswered: questionsAnswered,
      correctAnswers: correctAnswers,
      accuracy: questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0,
      date: new Date().toLocaleDateString('pt-BR')
    }

    const updatedRankings = [...rankings, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10) // Top 10

    setRankings(updatedRankings)
    localStorage.setItem('statsball-desafio-rankings', JSON.stringify(updatedRankings))
  }

  // Reiniciar jogo
  const resetGame = () => {
    setGameState('menu')
    setPlayerName('')
    setScore(0)
    setTimeLeft(90)
    setQuestionsAnswered(0)
    setCorrectAnswers(0)
    setFeedback('')
    setIsCorrect(null)
  }

  // Mensagem de incentivo baseada na pontuação de MÉDIAS
  const getEncouragementMessage = () => {
    const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0
    
    if (score >= 30) return "🏆 MESTRE DAS MÉDIAS! Você dominou todos os tipos!"
    if (score >= 25) return "🔥 IMPRESSIONANTE! Expert em cálculos estatísticos!"
    if (score >= 20) return "⚡ EXCELENTE! Suas médias estão acima da média!"
    if (score >= 15) return "💪 MUITO BOM! Você entende bem de médias!"
    if (score >= 10) return "🎯 BOM TRABALHO! Continue praticando!"
    if (score >= 5) return "📊 COMEÇANDO BEM! As médias estão melhorando!"
    if (accuracy >= 80) return "🎪 PRECISÃO MATEMÁTICA! Poucos erros!"
    return "📈 Continue tentando! As médias vão melhorar!"
  }

  // Enviar resposta com Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      checkAnswer()
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="section-title mb-6">
            Desafio das <span className="gradient-text">Médias Matemáticas</span>
          </h1>
          <div className="w-24 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-extralight text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Teste seus conhecimentos em médias! Aritmética, geométrica, harmônica e ponderada. 
            3 níveis de dificuldade e apenas 90 segundos. Seja o mestre das médias!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Área do Jogo */}
          <div className="lg:col-span-2">
            
            {/* Menu Inicial */}
            {gameState === 'menu' && (
              <div className="card text-center">
                <div className="mb-8">
                  <Target className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Pronto para o Desafio das Médias?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                    90 segundos de cálculos de médias! Aritmética, geométrica, harmônica e ponderada. 
                    Escolha sua dificuldade e teste seus conhecimentos estatísticos!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seu Nome:
                    </label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Digite seu nome..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && startGame()}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nível de Dificuldade:
                    </label>
                    <select
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {difficultyLevels.map(level => (
                        <option key={level.level} value={level.level}>
                          {level.name} (+{level.timeBonus} pts por acerto)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Tipos de Médias no Desafio:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                      {mediaTypes.map(type => (
                        <div key={type.type} className="flex items-center gap-2">
                          <span className="font-mono bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                            {type.symbol}
                          </span>
                          <span>{type.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Começar Desafio das Médias!
                </button>
              </div>
            )}

            {/* Jogo Ativo */}
            {gameState === 'playing' && (
              <div className="card">
                
                {/* Timer e Score */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <Clock className={`h-6 w-6 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`} />
                    <span className={timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                    <Trophy className="h-6 w-6" />
                    {score} pontos
                  </div>
                </div>

                {/* Pergunta */}
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      difficultyLevel === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      difficultyLevel === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {currentQuestion.mediaName} - {difficultyLevels[difficultyLevel - 1].name}
                    </span>
                  </div>
                  
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {currentQuestion.questionText}
                  </div>
                  
                  {/* Feedback */}
                  {feedback && (
                    <div className={`text-lg font-semibold mb-4 whitespace-pre-line ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {feedback}
                    </div>
                  )}
                </div>

                {/* Input e Botão */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <input
                    ref={inputRef}
                    type="number"
                    step="0.1"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite a média..."
                    className="w-full sm:w-48 px-4 py-3 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar
                  </button>
                </div>

                {/* Estatísticas */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{questionsAnswered}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Perguntas</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Precisão</div>
                  </div>
                </div>
              </div>
            )}

            {/* Resultado Final */}
            {gameState === 'finished' && (
              <div className="card text-center">
                <div className="mb-8">
                  <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Tempo Esgotado!
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {getEncouragementMessage()}
                  </p>
                </div>

                {/* Estatísticas Finais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600">{score}</div>
                    <div className="text-sm text-blue-800 dark:text-blue-300">Pontos</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-sm text-green-800 dark:text-green-300">Acertos</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-600">{questionsAnswered}</div>
                    <div className="text-sm text-purple-800 dark:text-purple-300">Total</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-600">
                      {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
                    </div>
                    <div className="text-sm text-yellow-800 dark:text-yellow-300">Precisão</div>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Jogar Novamente
                </button>
              </div>
            )}
          </div>

          {/* Ranking */}
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Ranking Top 10
              </h3>
            </div>

            {rankings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Seja o primeiro no ranking!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rankings.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-300 dark:border-yellow-700'
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'
                        : index === 2
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-500 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {player.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {player.accuracy}% precisão
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {player.score}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {player.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesafioContas
