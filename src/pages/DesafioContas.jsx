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
  
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  // Operações baseadas no conteúdo do site (médias matemáticas)
  const operators = [
    { symbol: '+', name: 'Soma', difficulty: 1 },
    { symbol: '-', name: 'Subtração', difficulty: 1 },
    { symbol: '×', name: 'Multiplicação', difficulty: 2 },
    { symbol: '÷', name: 'Divisão', difficulty: 3 }
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

  // Gerar nova pergunta HARDCORE - muito mais difícil
  const generateQuestion = () => {
    const operator = operators[Math.floor(Math.random() * operators.length)]
    let num1, num2, correctAnswer

    switch (operator.symbol) {
      case '+':
        // Soma HARDCORE: números grandes de 100 a 999
        num1 = Math.floor(Math.random() * 900) + 100
        num2 = Math.floor(Math.random() * 900) + 100
        correctAnswer = num1 + num2
        break
      case '-':
        // Subtração HARDCORE: números grandes, resultado pode ser negativo
        num1 = Math.floor(Math.random() * 800) + 200
        num2 = Math.floor(Math.random() * 600) + 100
        correctAnswer = num1 - num2
        break
      case '×':
        // Multiplicação HARDCORE: números de 15 a 99
        num1 = Math.floor(Math.random() * 85) + 15
        num2 = Math.floor(Math.random() * 85) + 15
        correctAnswer = num1 * num2
        break
      case '÷':
        // Divisão HARDCORE: resultados com decimais ou grandes
        correctAnswer = Math.floor(Math.random() * 150) + 10
        num2 = Math.floor(Math.random() * 25) + 5
        num1 = correctAnswer * num2
        // Às vezes fazer divisão com resultado decimal
        if (Math.random() > 0.7) {
          num1 = Math.floor(Math.random() * 2000) + 100
          num2 = Math.floor(Math.random() * 50) + 3
          correctAnswer = Math.floor(num1 / num2)
        }
        break
      default:
        num1 = 1
        num2 = 1
        correctAnswer = 2
    }

    setCurrentQuestion({ num1, num2, operator: operator.symbol, answer: correctAnswer })
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
    const userNum = parseInt(userAnswer)
    const correct = userNum === currentQuestion.answer
    
    setQuestionsAnswered(prev => prev + 1)
    
    if (correct) {
      setScore(prev => prev + 1)
      setCorrectAnswers(prev => prev + 1)
      setFeedback('Correto! 🎉')
      setIsCorrect(true)
    } else {
      setFeedback(`Errou! A resposta era ${currentQuestion.answer}`)
      setIsCorrect(false)
    }

    // Gerar nova pergunta após 1 segundo
    setTimeout(() => {
      generateQuestion()
    }, 1000)
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

  // Mensagem de incentivo baseada na pontuação HARDCORE
  const getEncouragementMessage = () => {
    const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0
    
    if (score >= 25) return "🏆 LENDÁRIO! Você dominou o modo HARDCORE!"
    if (score >= 20) return "🔥 IMPRESSIONANTE! Matemática de elite!"
    if (score >= 15) return "⚡ EXCELENTE! Velocidade e precisão!"
    if (score >= 10) return "💪 FORTE! Resistiu ao desafio HARDCORE!"
    if (score >= 5) return "🎯 BOM COMEÇO! Continue treinando!"
    if (accuracy >= 80) return "🎪 PRECISÃO CIRÚRGICA! Poucos erros!"
    return "🚀 HARDCORE é difícil mesmo! Tente novamente!"
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
          <div className="text-6xl mb-6">🧮</div>
          <h1 className="section-title mb-6">
            Desafio das <span className="gradient-text">Contas HARDCORE</span>
          </h1>
          <div className="w-24 h-0.5 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-extralight text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Desafio matemático extremo! Operações complexas, números grandes e apenas 90 segundos. 
            Apenas os mais habilidosos conseguem pontuações altas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Área do Jogo */}
          <div className="lg:col-span-2">
            
            {/* Menu Inicial */}
            {gameState === 'menu' && (
              <div className="card text-center">
                <div className="mb-8">
                  <Target className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Pronto para o Desafio HARDCORE?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                    90 segundos de matemática extrema! Números grandes, operações complexas. 
                    Apenas os mais rápidos e precisos conseguem altas pontuações.
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Seu Nome:
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Digite seu nome..."
                    className="w-full max-w-sm mx-auto px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && startGame()}
                  />
                </div>

                <button
                  onClick={startGame}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Começar Desafio HARDCORE!
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
                  <div className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                    {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
                  </div>
                  
                  {/* Feedback */}
                  {feedback && (
                    <div className={`text-xl font-semibold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {feedback}
                    </div>
                  )}
                </div>

                {/* Input e Botão */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <input
                    ref={inputRef}
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Sua resposta..."
                    className="w-full sm:w-48 px-4 py-3 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
