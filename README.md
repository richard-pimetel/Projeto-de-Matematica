# 🏀 StatsBall - Matemática em Jogo

Um projeto educacional interativo que demonstra como as três principais médias matemáticas (aritmética, geométrica e ponderada) são aplicadas na análise de desempenho esportivo.

![StatsBall](https://img.shields.io/badge/StatsBall-Matemática%20em%20Jogo-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.2.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2.7-blue?style=for-the-badge&logo=tailwindcss)

## 🎯 Objetivo

Tornar o aprendizado de matemática mais visual e divertido, mostrando aplicações práticas das médias matemáticas através de dados esportivos reais e simulados.

## ✨ Funcionalidades

### 🏀 Média Aritmética (Basquete - NBA)
- Comparação entre dois jogadores da NBA
- Análise de pontos, rebotes, assistências e porcentagens
- Gráfico radar interativo
- Integração com BallDontLie API
- Cálculo automático da média aritmética

### ⚽ Média Geométrica (Futebol)
- Análise de aproveitamento de gols
- Comparação de até 4 jogadores
- Gráfico de evolução da eficiência
- Demonstração da consistência vs. média simples
- Dados simulados de jogadores famosos

### 🏆 Média Ponderada (Rankings)
- Classificação de times com pesos customizáveis
- Comparação entre ranking tradicional vs. ponderado
- Controles interativos para ajustar pesos
- Dados de Premier League, La Liga e Brasileirão
- Visualização do impacto dos pesos no ranking

### 📚 Recursos Educacionais
- Explicações detalhadas de cada tipo de média
- Fórmulas matemáticas com exemplos práticos
- Comparação entre os três tipos de média
- Casos de uso no mundo real
- Interface intuitiva com tooltips explicativos

### 🎨 Interface e UX
- Design moderno e responsivo
- Modo escuro/claro alternável
- Animações suaves e transições
- Gráficos interativos com Recharts
- Navegação intuitiva entre seções

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca para interfaces de usuário
- **Vite 4.2.0** - Build tool rápido e moderno
- **React Router DOM 6.8.1** - Roteamento para SPA

### Estilização
- **Tailwind CSS 3.2.7** - Framework CSS utility-first
- **Lucide React 0.323.0** - Ícones SVG modernos

### Gráficos e Visualização
- **Recharts 2.5.0** - Biblioteca de gráficos para React
- Gráficos radar, barras e linhas interativos

### APIs e Dados
- **Axios 1.3.4** - Cliente HTTP para requisições
- **BallDontLie API** - Dados da NBA (gratuita)
- **Football-Data.org** - Dados de futebol (com fallback para dados simulados)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/statsball-matematica.git
cd statsball-matematica
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx      # Barra de navegação
│   └── Footer.jsx      # Rodapé
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── Aritmetica.jsx  # Média aritmética (NBA)
│   ├── Geometrica.jsx  # Média geométrica (Futebol)
│   ├── Ponderada.jsx   # Média ponderada (Rankings)
│   ├── Explicacoes.jsx # Explicações matemáticas
│   └── Creditos.jsx    # Créditos da equipe
├── App.jsx             # Componente principal
├── main.jsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎓 Conceitos Matemáticos Abordados

### 1. Média Aritmética
**Fórmula:** `(a₁ + a₂ + ... + aₙ) / n`

**Quando usar:** Dados homogêneos sem valores extremos

**Exemplo esportivo:** Desempenho médio de jogadores de basquete

### 2. Média Geométrica
**Fórmula:** `ⁿ√(x₁ × x₂ × ... × xₙ)`

**Quando usar:** Taxas de crescimento, porcentagens, dados multiplicativos

**Exemplo esportivo:** Consistência do aproveitamento de gols

### 3. Média Ponderada
**Fórmula:** `Σ(valor × peso) / Σ(pesos)`

**Quando usar:** Quando alguns valores são mais importantes que outros

**Exemplo esportivo:** Rankings que consideram diferentes aspectos do jogo

## 🌐 APIs Utilizadas

### BallDontLie API (NBA)
- **URL:** `https://www.balldontlie.io/api/v1/`
- **Uso:** Dados de jogadores da NBA
- **Limitação:** API gratuita com dados básicos
- **Fallback:** Dados simulados quando a API não está disponível

### Football-Data.org (Futebol)
- **URL:** `https://api.football-data.org/v2/`
- **Uso:** Dados de campeonatos de futebol
- **Requer:** Token de API gratuito
- **Fallback:** Dados simulados de Premier League, La Liga e Brasileirão

## 🎨 Paleta de Cores

```css
/* Cores principais */
--primary-black: #1a1a1a
--primary-orange: #ff6b35
--primary-green: #4caf50
--primary-white: #ffffff

/* Cores de apoio */
--blue-accent: #2196f3
--purple-accent: #9c27b0
--yellow-accent: #ffc107
```

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- 📱 **Mobile:** 320px - 768px
- 📟 **Tablet:** 768px - 1024px
- 💻 **Desktop:** 1024px+

## ♿ Acessibilidade

- Contraste adequado entre cores
- Navegação por teclado
- Labels descritivos para screen readers
- Modo escuro para reduzir fadiga visual
- Tooltips explicativos para termos técnicos

## 🔧 Configuração de Desenvolvimento

### ESLint
```json
{
  "extends": ["eslint:recommended", "@vitejs/eslint-config-react"],
  "rules": {
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#1a1a1a',
          orange: '#ff6b35',
          green: '#4caf50'
        }
      }
    }
  }
}
```

## 🚀 Deploy

### Netlify (Recomendado)
1. Conecte o repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`
4. Deploy automático a cada push

### Vercel
1. Conecte o repositório ao Vercel
2. Configure automaticamente detecta Vite
3. Deploy automático

### GitHub Pages
```bash
npm run build
npm run preview
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Ana Silva** - Desenvolvedora Frontend
- **Carlos Santos** - Matemático & Analista
- **Marina Costa** - Designer & Pesquisadora
- **Pedro Oliveira** - Desenvolvedor Full Stack

## 📞 Contato

- **Email:** statsball@matematica.edu.br
- **GitHub:** [github.com/statsball-matematica](https://github.com/statsball-matematica)
- **LinkedIn:** [StatsBall Matemática](https://linkedin.com/company/statsball)

## 🙏 Agradecimentos

- Universidade Federal de Matemática Aplicada
- BallDontLie API pela disponibilização gratuita de dados da NBA
- Football-Data.org pelos dados de futebol
- Comunidade open source pelas ferramentas utilizadas

---

**Feito com ❤️ para a educação matemática**

*Este projeto foi desenvolvido como trabalho acadêmico para demonstrar aplicações práticas da matemática através de visualizações interativas e dados esportivos.*
#   P r o j e t o - d e - M a t e m a t i c a  
 