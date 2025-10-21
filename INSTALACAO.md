# 🚀 Guia de Instalação - StatsBall

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
  - Download: https://nodejs.org/
  - Verifique a instalação: `node --version`

- **npm** (geralmente vem com Node.js)
  - Verifique a instalação: `npm --version`

## Passo a Passo

### 1. Navegue até a pasta do projeto
```bash
cd c:\Users\richa\Downloads\matematica
```

### 2. Instale as dependências
```bash
npm install
```

Este comando irá instalar todas as dependências listadas no `package.json`:
- React 18.2.0
- Vite 4.2.0
- Tailwind CSS 3.2.7
- Recharts 2.5.0
- Lucide React 0.323.0
- Axios 1.3.4
- React Router DOM 6.8.1

### 3. Execute o projeto
```bash
npm run dev
```

### 4. Abra no navegador
O projeto estará disponível em: `http://localhost:5173`

## Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Criar build para produção
npm run build

# Visualizar build de produção
npm run preview

# Executar linting
npm run lint
```

## Estrutura de Arquivos Criados

```
matematica/
├── public/
│   └── basketball.svg          # Ícone do projeto
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Barra de navegação
│   │   └── Footer.jsx         # Rodapé
│   ├── pages/
│   │   ├── Home.jsx           # Página inicial
│   │   ├── Aritmetica.jsx     # Média aritmética (NBA)
│   │   ├── Geometrica.jsx     # Média geométrica (Futebol)
│   │   ├── Ponderada.jsx      # Média ponderada (Rankings)
│   │   ├── Explicacoes.jsx    # Explicações matemáticas
│   │   └── Creditos.jsx       # Créditos da equipe
│   ├── App.jsx                # Componente principal
│   ├── main.jsx              # Ponto de entrada
│   └── index.css             # Estilos globais
├── package.json              # Dependências e scripts
├── vite.config.js           # Configuração do Vite
├── tailwind.config.js       # Configuração do Tailwind
├── postcss.config.js        # Configuração do PostCSS
├── index.html               # Template HTML
├── .eslintrc.cjs           # Configuração do ESLint
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Documentação completa
└── INSTALACAO.md           # Este arquivo
```

## Funcionalidades Implementadas

### ✅ Páginas Principais
- [x] Home com introdução e navegação
- [x] Média Aritmética (comparação de jogadores NBA)
- [x] Média Geométrica (aproveitamento no futebol)
- [x] Média Ponderada (rankings de times)
- [x] Explicações matemáticas detalhadas
- [x] Créditos da equipe

### ✅ Recursos Interativos
- [x] Modo escuro/claro alternável
- [x] Gráficos interativos (radar, barras, linhas)
- [x] Busca de jogadores
- [x] Geração de dados aleatórios
- [x] Configuração de pesos para média ponderada
- [x] Tooltips explicativos
- [x] Animações e transições suaves

### ✅ Responsividade
- [x] Design responsivo para mobile, tablet e desktop
- [x] Navegação mobile com menu hambúrguer
- [x] Gráficos adaptativos

### ✅ Matemática
- [x] Cálculos corretos das três médias
- [x] Fórmulas matemáticas exibidas
- [x] Exemplos práticos de aplicação
- [x] Comparações entre diferentes tipos de média

## Possíveis Problemas e Soluções

### Erro: "npm não é reconhecido"
**Solução:** Instale o Node.js do site oficial

### Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente

### Porta 5173 já em uso
**Solução:** O Vite automaticamente tentará a próxima porta disponível

### Gráficos não aparecem
**Solução:** Verifique se o Recharts foi instalado corretamente

## Próximos Passos

1. **Teste todas as funcionalidades**
   - Navegue por todas as páginas
   - Teste o modo escuro/claro
   - Experimente os gráficos interativos

2. **Personalize conforme necessário**
   - Ajuste cores no `tailwind.config.js`
   - Modifique dados dos jogadores/times
   - Adicione novos recursos

3. **Deploy (opcional)**
   - Netlify: conecte o repositório
   - Vercel: deploy automático
   - GitHub Pages: `npm run build`

## Suporte

Se encontrar algum problema:
1. Verifique se todos os pré-requisitos estão instalados
2. Consulte a documentação no README.md
3. Verifique os logs de erro no terminal
4. Entre em contato com a equipe

---

**Projeto criado com sucesso! 🎉**

*Agora você pode explorar como a matemática se aplica no mundo dos esportes de forma visual e interativa.*
