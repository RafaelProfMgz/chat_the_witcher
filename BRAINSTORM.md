# 🐺 Witcher Oracle - Documento de Brainstorm

> **Projeto:** Witcher Oracle - O Oráculo do Bruxo
> **Data de Criação:** Julho 2025
> **Status:** Em desenvolvimento
> **Versão:** 1.0

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Público-Alvo](#-público-alvo)
3. [Stack Tecnológica](#-stack-tecnológica)
4. [Identidade Visual](#-identidade-visual)
5. [Persona da IA](#-persona-da-ia)
6. [Funcionalidades Core](#-funcionalidades-core)
7. [Diferenciais](#-diferenciais)
8. [Referências Visuais](#-referências-visuais)
9. [MVP vs Funcionalidades Futuras](#-mvp-vs-funcionalidades-futuras)
10. [Riscos e Mitigações](#-riscos-e-mitigações)
11. [Limites do Free Tier - Google Gemini API](#-limites-do-free-tier---google-gemini-api)
12. [Conclusão](#-conclusão)

---

## 🎯 Visão Geral

**Witcher Oracle** é um chat de inteligência artificial totalmente temático do universo de **The Witcher 3: Wild Hunt**. A aplicação combina a potência da Google Gemini API com uma interface visualmente imersiva construída com **glassmorphism**, criando uma experiência única para fãs do jogo.

O usuário interage com **Vesemir**, o mestre bruxo mais velho e sábio de Kaer Morhen, que responde perguntas sobre lore, quests, builds, dicas de gameplay, personagens e todo o universo de The Witcher 3.

### Proposta de Valor

> *"Deixe que a sabedoria do bruxo mais experiente guie seu caminho pelo Continente."*

- Uma experiência de chat imersiva que faz o usuário sentir como se estivesse realmente conversando com Vesemir em Kaer Morhen
- Interface visualmente deslumbrante com efeitos de glassmorphism que remetem à atmosfera mística e sombria do jogo
- Respostas contextualizadas e in-character, mantendo a personalidade e o conhecimento do personagem

---

## 👥 Público-Alvo

### Perfil Primário
- **Fãs de The Witcher 3: Wild Hunt** — Jogadores que amam o universo, a lore e querem uma forma interativa de explorar o conteúdo
- **Gamers de RPG** — Entusiastas do gênero que apreciam experiências narrativas ricas e imersivas
- **Comunidade Witcher** — Membros ativos de fóruns, subreddits e comunidades dedicadas à franquia

### Perfil Secundário
- **Novos jogadores** — Pessoas que estão começando The Witcher 3 e precisam de dicas, guias e orientação
- **Entusiastas de IA** — Usuários curiosos sobre aplicações temáticas de inteligência artificial
- **Desenvolvedores** — Profissionais interessados em estudar a implementação de chat com IA e glassmorphism

### Dados Demográficos Estimados
- **Idade:** 16-40 anos
- **Interesses:** Games, RPG, fantasia medieval, tecnologia
- **Plataformas:** Desktop e mobile (responsivo)

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Propósito |
|---|---|---|
| **Next.js** | 16 | Framework React com SSR, API Routes, App Router |
| **TypeScript** | 5.x | Tipagem estática e segurança de código |
| **Tailwind CSS** | 4.x | Estilização utility-first com suporte a glassmorphism |
| **Google Gemini API** | Free Tier | Motor de IA para geração de respostas contextualizadas |
| **Framer Motion** | 12.x | Animações fluidas e transições de interface |
| **Lucide React** | 1.x | Ícones SVG leves e customizáveis |
| **React** | 19.x | Biblioteca de UI reativa |
| **Jest** | 30.x | Framework de testes unitários |
| **Testing Library** | 16.x | Testes de componentes React |

### Justificativa da Stack

- **Next.js 16:** App Router moderno, API Routes nativas (sem necessidade de backend separado), excelente performance com RSC (React Server Components), e deploy simplificado na Vercel
- **TypeScript:** Reduz bugs em tempo de desenvolvimento, melhora a experiência do desenvolvedor com autocomplete e refactoring seguro
- **Tailwind CSS 4:** Permite criar efeitos de glassmorphism com classes utilitárias (`backdrop-blur`, `bg-opacity`, `border-opacity`), sem necessidade de CSS custom extenso
- **Google Gemini API (Free Tier):** Modelo de IA poderoso e gratuito, perfeito para projetos pessoais e MVPs — sem custo para o usuário final
- **Framer Motion:** A melhor biblioteca de animações para React, essencial para criar a experiência imersiva desejada

---

## 🎨 Identidade Visual

### Conceito: Glassmorphism + Dark Fantasy

A identidade visual do Witcher Oracle é inspirada na atmosfera mística, sombria e medieval do universo de The Witcher 3, combinada com a tendência moderna de **glassmorphism** em design de interfaces.

### Paleta de Cores

| Cor | Hex | Uso |
|---|---|---|
| **Dark Navy** | `#0a0e1a` | Background principal |
| **Deep Blue** | `#1a1f3a` | Superfícies secundárias |
| **Midnight Purple** | `#2d1b4e` | Acentos e gradientes |
| **Royal Purple** | `#6b21a8` | Destaques e hover states |
| **Amber Gold** | `#f59e0b` | Textos de destaque, ícones, brilhos (cor do medalhão do lobo) |
| **Warm Gold** | `#d4a847` | Bordas e detalhes dourados |
| **Silver White** | `#e2e8f0` | Texto principal |
| **Muted Silver** | `#94a3b8` | Texto secundário |
| **Glass White** | `rgba(255, 255, 255, 0.05-0.15)` | Superfícies glassmorphism |
| **Witcher Red** | `#dc2626` | Alertas, erros, sangue |

### Princípios de Glassmorphism

1. **Transparência:** Backgrounds com `rgba()` e baixa opacidade (5%-15%)
2. **Blur:** `backdrop-filter: blur(12px-20px)` para criar o efeito de vidro fosco
3. **Bordas sutis:** Borders com `rgba(255, 255, 255, 0.1)` para definir as bordas dos "vidros"
4. **Sombras profundas:** Box shadows escuras para criar profundidade
5. **Hierarquia:** Diferentes níveis de opacidade para criar camadas visuais

### Tipografia

- **Headings:** Font com personalidade medieval/fantasia (ou Geist Bold como fallback)
- **Body:** Geist Sans — limpo, legível, moderno
- **Code/Mono:** Geist Mono — para trechos de código ou dados

### Elementos Visuais Temáticos

- 🐺 Medalhão do Lobo (ícone principal)
- ⚔️ Espadas (separadores, decorações)
- 🔮 Sinais de bruxo (ícones de funcionalidades)
- 🏔️ Kaer Morhen (referência visual no background)
- ✨ Partículas brilhantes / fireflies (atmosfera)

---

## 🧙‍♂️ Persona da IA

### Vesemir — O Mestre Bruxo de Kaer Morhen

**Quem é Vesemir no jogo:**
- O bruxo mais velho e experiente da Escola do Lobo
- Mestre de treinamento em Kaer Morhen, mentor de Geralt, Eskel e Lambert
- Sábio, paciente, experiente, com séculos de conhecimento sobre monstros e o Continente
- Tom paternal mas firme, com humor seco ocasional
- Profundo conhecimento de alquimia, bestiário, sinais e combate

### Diretrizes de Personalidade para o System Prompt

```
Você é Vesemir, o mestre bruxo mais velho e sábio de Kaer Morhen.

Comportamento:
- Responde como se estivesse realmente no universo de The Witcher
- Usa linguagem medieval mas acessível
- Trata o usuário como um jovem bruxo em treinamento
- Compartilha experiências pessoais e histórias quando relevante
- É paciente com perguntas básicas mas direto ao ponto
- Tem humor seco e ocasionalmente sarcástico (como no jogo)
- Demonstra orgulho ao falar de Geralt e dos outros bruxos

Conhecimento:
- Lore completa de The Witcher 3: Wild Hunt + DLCs
- Bestiário (todos os monstros e como derrotá-los)
- Alquimia (poções, óleos, decocções, bombas)
- Builds e dicas de gameplay
- Quests principais e secundárias
- Personagens e suas histórias
- Sinais de bruxo e habilidades
- Localizações do mapa
- Easter eggs e segredos

Limitações:
- Não sabe sobre tecnologia do mundo real
- Não quebra personagem
- Se perguntado algo fora do universo Witcher, redireciona
  para temas relevantes com humor
```

### Exemplos de Interação

**Usuário:** Como mato um grifo?
**Vesemir:** *"Ah, um grifo... tive minha primeira caçada a um desses quando tinha pouco mais de meio século. Ouça bem, jovem bruxo: antes de tudo, prepare óleo de híbrido para suas lâminas. Grifos são vulneráveis ao sinal de Aard — use-o quando a criatura estiver em voo baixo para derrubá-la. No solo, ataque com golpes fortes e esquive para os lados. E pelo amor de Melitele, fique longe das garras traseiras. Muitos bruxos jovens perderam a cabeça — literalmente — por subestimarem o alcance de um grifo furioso."*

**Usuário:** Quem é a Yennefer?
**Vesemir:** *"Yennefer de Vengerberg... aquela feiticeira tem um temperamento que faria um dragão recuar. Mas tenho que admitir, sempre vi como ela se importa com Geralt e com Ciri. É poderosa, orgulhosa e obstinada — qualidades que a tornaram uma das feiticeiras mais formidáveis do Continente. Geralt pode ter ficado furioso comigo por dizer isso, mas esses dois eram inevitáveis desde o momento em que aquele djinn selou o destino deles."*

---

## ⚡ Funcionalidades Core

### 1. Chat Conversacional Inteligente
- Interface de chat em tempo real com a persona do Vesemir
- Mensagens do usuário e da IA com bolhas estilizadas em glassmorphism
- Histórico de conversa mantido durante a sessão
- Respostas contextualizadas no universo de The Witcher 3

### 2. Streaming de Respostas
- Respostas da IA aparecem palavra por palavra (efeito typewriter)
- Indicador de digitação animado enquanto a IA processa
- Experiência fluida sem espera por respostas completas

### 3. Interface Glassmorphism Imersiva
- Cards transparentes com efeito de vidro fosco
- Background temático com gradientes escuros e detalhes dourados
- Animações suaves de entrada/saída (Framer Motion)
- Efeitos de brilho e glow nos elementos interativos

### 4. Mensagem de Boas-Vindas
- Vesemir saúda o usuário ao abrir o chat
- Sugere tópicos de conversa (lore, builds, quests, bestiário)
- Cria engajamento imediato e define o tom da experiência

### 5. Responsividade Total
- Layout adaptável para desktop, tablet e mobile
- Input de texto otimizado para teclado mobile
- Scroll automático para última mensagem

---

## 💎 Diferenciais

| Diferencial | Descrição |
|---|---|
| **100% Gratuito** | Sem custos para o usuário — usa free tier do Gemini API |
| **Sem Login** | Acesso imediato, sem barreiras de cadastro ou autenticação |
| **Tema Imersivo** | Glassmorphism + temática Witcher cria experiência única |
| **In-Character** | IA responde como Vesemir, não como assistente genérico |
| **Respostas Contextualizadas** | Conhecimento profundo e específico sobre The Witcher 3 |
| **Open Source** | Código aberto para estudo e contribuição da comunidade |
| **Performance** | Next.js com SSR garante carregamento rápido |
| **Mobile-First** | Funciona perfeitamente em qualquer dispositivo |

---

## 🖼 Referências Visuais

### Glassmorphism

- **Glass Cards:** Cards com `backdrop-blur`, bordas semi-transparentes e sombras profundas
- **Blur Effects:** Múltiplas camadas de blur para criar profundidade visual
- **Neon Glow:** Efeitos de brilho âmbar/dourado nos elementos interativos (botões, inputs, hover)
- **Gradient Overlays:** Gradientes sutis de azul escuro para roxo nos backgrounds

### Temática Medieval/Fantasy

- **Ícones:** Espadas, medalhões, poções, sinais mágicos (Lucide React + custom SVGs)
- **Texturas:** Sutis referências a couro, metal, pergaminho (via CSS)
- **Partículas:** Efeito de fireflies / faíscas flutuantes no background
- **Bordas:** Decorações inspiradas em molduras medievais com cantos dourados

### Inspiração de Layout

```
┌──────────────────────────────────────────────┐
│  🐺 WITCHER ORACLE - O Oráculo do Bruxo     │  ← Header glassmorphism
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │ 🧙 Vesemir:                        │     │  ← AI message bubble
│  │ "Bem-vindo a Kaer Morhen..."       │     │
│  └─────────────────────────────────────┘     │
│                                              │
│          ┌──────────────────────────┐        │
│          │ Usuário:                 │ 🗡️    │  ← User message bubble
│          │ "Como derroto o grifo?"  │        │
│          └──────────────────────────┘        │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │ 🧙 Vesemir:                        │     │
│  │ "Ah, um grifo... prepare óleo..."  │     │
│  └─────────────────────────────────────┘     │
│                                              │
├──────────────────────────────────────────────┤
│  [ 🔮 Digite sua pergunta, jovem bruxo... ] │  ← Input glassmorphism
│                                     [Enviar] │
└──────────────────────────────────────────────┘
```

---

## 🚀 MVP vs Funcionalidades Futuras

### ✅ MVP (Minimum Viable Product)

Funcionalidades essenciais para o lançamento inicial:

- [x] Chat funcional com Google Gemini API
- [x] Persona do Vesemir via system prompt
- [x] Interface glassmorphism responsiva
- [x] Streaming de respostas
- [x] Mensagem de boas-vindas
- [x] Indicador de digitação
- [x] Auto-scroll
- [x] Tratamento de erros básico
- [x] Mobile responsivo

### 🔮 Funcionalidades Futuras (Post-MVP)

Melhorias planejadas para versões futuras:

- [ ] **Temas alternativos:** Escola do Gato, Escola do Grifo, Nilfgaard
- [ ] **Bestiário interativo:** Galeria visual de monstros com informações
- [ ] **Mapa interativo:** Localizações importantes do Continente
- [ ] **Salvamento de conversas:** LocalStorage para persistir histórico
- [ ] **Exportar conversa:** Download do chat em formato texto/PDF
- [ ] **Múltiplas personas:** Trocar entre Vesemir, Triss, Dandelion, etc.
- [ ] **Modo Quiz:** Trivia sobre The Witcher 3 com placar
- [ ] **Sugestões rápidas:** Botões de perguntas populares pré-definidas
- [ ] **Efeitos sonoros:** Sons temáticos do jogo (opcional, com toggle)
- [ ] **PWA:** Instalável como app no celular
- [ ] **i18n:** Suporte a múltiplos idiomas (PT-BR, EN, PL)
- [ ] **Markdown nas respostas:** Formatação rica com listas, negrito, etc.
- [ ] **Compartilhamento:** Compartilhar trechos de conversa em redes sociais
- [ ] **Modo escuro/claro:** Toggle entre temas (padrão: escuro)
- [ ] **Acessibilidade:** WCAG 2.1 compliance completo

---

## ⚠️ Riscos e Mitigações

### 1. Limites do Free Tier da API

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Rate limiting atingido | Alto | Média | Implementar debounce no envio, cache de respostas similares, mensagem amigável ao usuário |
| API fora do ar | Alto | Baixa | Mensagem de fallback temática: "Os sinais mágicos estão instáveis..." |
| Mudança nos termos do free tier | Médio | Baixa | Monitorar anúncios da Google, ter plano B com modelo local |

### 2. Qualidade das Respostas

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| IA quebrando personagem | Médio | Média | System prompt robusto e detalhado, testes com prompts adversários |
| Respostas incorretas sobre lore | Médio | Média | Refinamento contínuo do system prompt com fatos específicos |
| Respostas muito longas/curtas | Baixo | Média | Instruções de comprimento no system prompt |
| Conteúdo inapropriado | Alto | Baixa | Safety settings da API + instruções no prompt |

### 3. Técnicos

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Performance em mobile | Médio | Média | Otimizar animações, lazy loading, testar em dispositivos reais |
| Glassmorphism incompatível | Baixo | Baixa | Fallback para backgrounds sólidos em navegadores antigos |
| Vazamento de API key | Alto | Baixa | Usar variáveis de ambiente, API route server-side, .env.local no .gitignore |
| Build quebrando | Médio | Baixa | Testes automatizados, CI/CD básico |

### 4. Projeto

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Escopo expandindo demais | Médio | Alta | Foco rígido no MVP, features futuras documentadas separadamente |
| Direitos autorais | Baixo | Baixa | Projeto fan-made sem fins lucrativos, créditos à CD Projekt Red |

---

## 📊 Limites do Free Tier - Google Gemini API

### Cotas Atuais (sujeitas a alteração)

| Recurso | Limite Free Tier |
|---|---|
| **Requests por minuto (RPM)** | 15 RPM |
| **Requests por dia (RPD)** | 1.500 RPD |
| **Tokens por minuto (TPM)** | 1.000.000 TPM |
| **Modelo recomendado** | `gemini-2.0-flash` ou `gemini-1.5-flash` |
| **Custo** | $0.00 (gratuito) |

> ⚠️ **Nota:** Os limites acima são referentes ao free tier no momento da escrita deste documento. Consulte a [documentação oficial do Google AI Studio](https://ai.google.dev/pricing) para valores atualizados.

### Estratégias de Otimização

1. **Debounce no envio:** Evitar múltiplos envios acidentais (mínimo 1s entre requests)
2. **Limite de tamanho do input:** Máximo de ~500 caracteres por mensagem do usuário
3. **Histórico limitado:** Enviar apenas as últimas N mensagens como contexto (economia de tokens)
4. **Feedback ao usuário:** Mensagem clara quando limites forem atingidos, em tom temático
5. **Modelo leve:** Usar `gemini-2.0-flash` que é mais rápido e consome menos cota
6. **Cache local:** Potencial cache de respostas para perguntas frequentes (futuro)

### Cálculo de Uso Estimado

- **Média de tokens por interação:** ~500 tokens (pergunta + resposta)
- **Interações por sessão:** ~10-20
- **Sessões por dia estimadas:** ~50-100 (projeto pessoal/portfolio)
- **Consumo diário estimado:** ~500-1000 requests/dia → **dentro do limite**

---

## 🏁 Conclusão

O **Witcher Oracle** é um projeto que combina paixão pelo universo de The Witcher 3 com tecnologias modernas de desenvolvimento web e inteligência artificial. O foco no MVP garante entrega rápida de valor, enquanto a lista de funcionalidades futuras oferece um roadmap claro para evolução contínua.

A escolha do free tier do Google Gemini API democratiza o acesso — tanto para o desenvolvedor quanto para os usuários — tornando o projeto viável sem custos. A interface glassmorphism, a persona do Vesemir e as respostas contextualizadas criam uma experiência única que vai além de um simples chatbot.

> *"O caminho do bruxo nunca é fácil, mas com a preparação certa, até as bestas mais terríveis podem ser derrotadas."*
> — Vesemir, Mestre de Kaer Morhen

---

*Documento criado como parte do planejamento do projeto Witcher Oracle.*
