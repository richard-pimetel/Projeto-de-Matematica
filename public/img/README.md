# 📁 Pasta de Imagens dos Integrantes

## 📸 Como Adicionar Fotos da Equipe

### Estrutura de Arquivos:
```
public/
├── img/
│   ├── richard.jpg
│   ├── gustavo.jpg
│   ├── joao.jpg
│   ├── kauan.jpg
│   └── vitor.jpg
```

### 📋 Instruções:

1. **Adicione as fotos** dos integrantes nesta pasta
2. **Nomes dos arquivos** devem ser exatamente:
   - `richard.jpg` - Richard (Desenvolvedor Principal)
   - `GUSTAVO ZUMBA.jpg` - Gustavo (Idealizador do Projeto)
   - `JAMAL.jpg` - João (Auxiliar do Projeto)
   - `kauan.jpg` - Kauan (Apresentação e Suporte)
   - `vitor.jpg` - Vitor (Apresentação e Suporte)
   - `gabriel.jpg` - Gabriel (Suporte e Apresentação)

3. **Formatos aceitos**: .jpg, .jpeg, .png, .webp
4. **Tamanho recomendado**: 400x400px (quadrado)
5. **Qualidade**: Boa resolução, fundo neutro

### ✅ Após adicionar as fotos:
- As imagens aparecerão automaticamente na página de Integrantes
- Fallback: Se não houver foto, aparecerá apenas o ícone
- Responsivo: Imagens se adaptam a diferentes tamanhos de tela

### 🎯 Exemplo de uso no código:
```jsx
<img 
  src="/img/richard.jpg" 
  alt="Richard - Desenvolvedor Principal"
  className="w-24 h-24 rounded-full object-cover"
/>
```
