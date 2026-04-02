# 🗓️ Witcher Oracle - Plano de Sprints

> Planejamento detalhado de desenvolvimento do projeto Witcher Oracle.
> Cada sprint possui tarefas com checkboxes, estimativa de tempo e critérios de aceitação.

---

## 📊 Visão Geral dos Sprints

| Sprint | Descrição | Estimativa | Status |
|--------|-----------|------------|--------|
| Sprint 0 | Brainstorm & Planejamento | 2h | ✅ Concluído |
| Sprint 1 | Setup do Projeto & Configuração | 2h | ✅ Concluído |
| Sprint 2 | UI Foundation - Glassmorphism Theme | 4h | ✅ Concluído |
| Sprint 3 | Chat Interface | 4h | ✅ Concluído |
| Sprint 4 | AI Integration - Google Gemini | 4h | ✅ Concluído |
| Sprint 5 | Integração & Polish | 5h | ✅ Concluído |
| Sprint 6 | Testes & Finalização | 3h | ✅ Concluído |
| Sprint 6.1 | Hotfix - Fallback de Modelos & Retry | 2h | ✅ Concluído |
| **Sprint 7** | **Persistência & Exportação** | **3h** | ✅ Concluído |
| **Sprint 8** | **Múltiplas Personas & Markdown** | **4h** | ✅ Concluído |
| **Sprint 9** | **Temas Alternativos & Bestiário** | **5h** | ✅ Concluído |
| **Total** | | **~38h** | |

---

## Sprints Concluídos (0–6.1)

<details>
<summary>📦 Clique para expandir sprints anteriores</summary>

### Sprint 0: Brainstorm & Planejamento ✅
- [x] Task 0.1: Criar documento de brainstorm (`BRAINSTORM.md`)
- [x] Task 0.2: Criar plano de sprints (`SPRINTS.md`)
- [x] Task 0.3: Documentar README do projeto (`README.md`)

### Sprint 1: Setup do Projeto & Configuração ✅
- [x] Task 1.1: Inicializar Next.js com TypeScript e Tailwind
- [x] Task 1.2: Configurar variáveis de ambiente (`.env.local`)
- [x] Task 1.3: Configurar Jest para testes unitários
- [x] Task 1.4: Criar estrutura de pastas

### Sprint 2: UI Foundation - Glassmorphism Theme ✅
- [x] Task 2.1: Criar global styles com tema Witcher glassmorphism
- [x] Task 2.2: Criar componente `GlassCard` reutilizável
- [x] Task 2.3: Criar layout principal com background temático animado
- [x] Task 2.4: Criar componente `Header` com logo/título

### Sprint 3: Chat Interface ✅
- [x] Task 3.1: Criar componente `ChatMessage` (user + AI bubbles)
- [x] Task 3.2: Criar componente `ChatInput` com glassmorphism
- [x] Task 3.3: Criar componente `ChatContainer`
- [x] Task 3.4: Criar `TypingIndicator` animado
- [x] Task 3.5: Criar `WelcomeMessage` com sugestões de perguntas

### Sprint 4: AI Integration - Google Gemini ✅
- [x] Task 4.1: Criar API route `/api/chat`
- [x] Task 4.2: Configurar Google Gemini com system prompt do Vesemir
- [x] Task 4.3: Error handling e rate limiting básico

### Sprint 5: Integração & Polish ✅
- [x] Task 5.1: Conectar frontend ao backend via `useChat` hook
- [x] Task 5.2: Implementar auto-scroll e UX improvements
- [x] Task 5.3: Responsividade mobile
- [x] Task 5.4: Animações com Framer Motion

### Sprint 6: Testes & Finalização ✅
- [x] Task 6.1: 45 testes unitários passando (7 suites)
- [x] Task 6.2: Build de produção compilando

### Sprint 6.1: Hotfix - Fallback de Modelos & Retry ✅
- [x] Task 6.1.1: Cadeia de fallback de modelos Gemini (flash → flash-lite → 1.5-flash)
- [x] Task 6.1.2: Retry com exponential backoff
- [x] Task 6.1.3: Error classes customizadas (`GeminiRateLimitError`, `GeminiConfigError`)
- [x] Task 6.1.4: Botão "Tentar novamente" no frontend
- [x] Task 6.1.5: Testes atualizados (45 passando)

</details>

---

## Sprint 7: Persistência & Exportação 🔲

**Estimativa:** ~3 horas
**Objetivo:** Permitir que o usuário salve conversas no navegador e exporte o histórico como arquivo.
**Custo:** 🟢 Zero (LocalStorage + Blob API nativa do browser)

### Tarefas

- [x] **Task 7.1:** Salvamento de conversas no LocalStorage
  - Criar hook `useConversations` para gerenciar múltiplas conversas
  - Salvar automaticamente no `localStorage` a cada nova mensagem
  - Listar conversas anteriores em um sidebar/drawer glassmorphism
  - Permitir criar nova conversa, renomear e deletar
  - Cada conversa armazena: `id`, `title` (auto-gerado da 1ª mensagem), `messages[]`, `createdAt`, `updatedAt`, `persona`
  - Limite de ~50 conversas (para não estourar LocalStorage ~5MB)
  - Migração segura: se o schema mudar, não perder dados antigos

- [x] **Task 7.2:** Exportar conversa em formato texto
  - Botão "Exportar" no header da conversa (ícone `Download` do lucide-react)
  - Exportar como `.txt` formatado com nomes (Você / Vesemir) e timestamps
  - Exportar como `.md` (Markdown) com formatação rica
  - Usar `Blob` + `URL.createObjectURL` + `<a download>` (zero dependências)
  - Nome do arquivo: `witcher-oracle-{titulo}-{data}.txt`

- [x] **Test 7:** Testes unitários (23 testes de exportação passando)
  - Teste do hook `useConversations` (CRUD de conversas no localStorage)
  - Teste da função de exportação (geração do conteúdo .txt e .md)
  - Teste do sidebar de conversas (renderização, clique, delete)

### Critérios de Aceitação
- [x] Conversas persistem após reload da página
- [x] Usuário consegue alternar entre conversas anteriores
- [x] Botão de exportar gera download do arquivo corretamente
- [x] LocalStorage não ultrapassa limite razoável
- [x] Testes passando (68 → 94 testes totais)

---

## Sprint 8: Múltiplas Personas & Markdown 🔲

**Estimativa:** ~4 horas
**Objetivo:** Permitir trocar a persona da IA e melhorar a renderização de respostas com Markdown completo.
**Custo:** 🟢 Zero (system prompts diferentes + parser Markdown puro)

### Tarefas

- [x] **Task 8.1:** Sistema de múltiplas personas
  - Criar arquivo `src/lib/personas.ts` com definições:
    - 🐺 **Vesemir** (padrão) — Mestre bruxo, sábio e paciente
    - 🔥 **Triss Merigold** — Feiticeira calorosa, especialista em magia e alquimia
    - 🎵 **Dandelion (Jaskier)** — Bardo dramático, especialista em histórias e personagens
    - ⚔️ **Yennefer de Vengerberg** — Feiticeira poderosa, direta e sarcástica
  - Cada persona tem: `id`, `name`, `icon`, `description`, `systemPrompt`, `greeting`, `color` (accent)
  - Atualizar `gemini.ts` para receber `personaId` e usar o prompt correto
  - Atualizar API route para aceitar `persona` no body da request

- [x] **Task 8.2:** UI do seletor de persona
  - Criar componente `PersonaSelector` — grid/lista glassmorphism com as personas
  - Acessível via botão no `Header` (ícone `Users` do lucide-react)
  - Modal/Drawer glassmorphism com cards de cada persona
  - Cada card mostra: ícone, nome, descrição curta, cor accent
  - Ao trocar persona: limpa o chat e mostra a greeting da nova persona
  - Persona ativa indicada visualmente no Header (badge com nome/ícone)
  - Armazenar persona selecionada no `localStorage`

- [x] **Task 8.3:** Markdown avançado nas respostas da IA
  - Criar componente `MarkdownRenderer` para renderizar respostas
  - Suporte a: `**bold**`, `*italic*`, `# headings`, `- listas`, `` `code` ``, ``` code blocks ```
  - Estilizar code blocks com glassmorphism (fundo escuro, border sutil)
  - Listas com bullet points estilizados (dourados)
  - Links estilizados com cor gold
  - Sem dependência externa — parser regex customizado leve
  - Substituir o `formatContent` atual do `ChatMessage` pelo novo renderer

- [x] **Test 8:** Testes unitários (26 testes do MarkdownRenderer passando)
  - Teste das definições de persona (todas as personas têm campos obrigatórios)
  - Teste do `PersonaSelector` (renderiza personas, dispara callback ao selecionar)
  - Teste do `MarkdownRenderer` (bold, italic, code, listas, headings)

### Critérios de Aceitação
- [x] Usuário consegue alternar entre 4 personas
- [x] Cada persona tem voz e estilo distintos nas respostas
- [x] Persona selecionada persiste no reload
- [x] Respostas renderizam Markdown corretamente (bold, italic, code, listas)
- [x] Code blocks têm estilo glassmorphism temático
- [x] Testes passando (94 testes totais)

---

## Sprint 9: Temas Alternativos & Bestiário 🔲

**Estimativa:** ~5 horas
**Objetivo:** Adicionar temas visuais de escolas de bruxo e uma página de bestiário interativo.
**Custo:** 🟢 Zero (CSS custom properties + dados estáticos hardcoded)

### Tarefas

- [x] **Task 9.1:** Sistema de temas alternativos
  - Criar arquivo `src/lib/themes.ts` com definições de temas:
    - 🐺 **Escola do Lobo** (padrão) — Tons escuros, dourado/âmbar, roxo
    - 🐱 **Escola do Gato** — Verde esmeralda, preto, prata
    - 🦅 **Escola do Grifo** — Azul royal, branco, dourado claro
    - ☀️ **Nilfgaard** — Dourado imperial, preto profundo, vermelho sangue
  - Cada tema define: `id`, `name`, `icon`, CSS custom properties (cores, glows, gradients)
  - Aplicar temas via troca de CSS variables no `<html>` (zero re-render)
  - Criar hook `useTheme` para gerenciar tema ativo (salva no localStorage)

- [x] **Task 9.2:** UI do seletor de tema
  - Criar componente `ThemeSelector` — acessível via botão no Header (ícone `Palette`)
  - Dropdown/popover glassmorphism com preview de cada tema (mini color swatches)
  - Transição suave entre temas (CSS transition em custom properties)
  - Background animado se adapta ao tema selecionado (orbs mudam de cor)

- [x] **Task 9.3:** Bestiário interativo
  - Criar rota `/bestiary` com Next.js App Router (`src/app/bestiary/page.tsx`)
  - Criar arquivo de dados `src/data/bestiary.ts` com 20 monstros icônicos:
    - Nome, categoria (Relictos, Espectros, Vampiros, Insectóides, etc.)
    - Descrição curta (lore)
    - Fraquezas (sinais, óleos, bombas)
    - Nível de dificuldade (⭐ a ⭐⭐⭐⭐⭐)
    - Localização onde encontrar
    - Dica de combate do Vesemir
  - UI: Grid de cards glassmorphism com filtro por categoria
  - Cada card expande ao clicar mostrando detalhes completos
  - Barra de busca glassmorphism para filtrar por nome
  - Navegação: link no Header para o Bestiário (ícone `BookOpen`)
  - Link de volta ao Chat no Bestiário

- [x] **Task 9.4:** Navegação entre páginas
  - Atualizar `Header` com links de navegação: Chat | Bestiário
  - Indicador visual da página ativa (usePathname)
  - Transições suaves entre páginas

- [x] **Test 9:** Testes unitários
  - Teste do hook `useTheme` (troca de tema, persistência)
  - Teste do `ThemeSelector` (renderiza temas, aplica ao clicar)
  - Teste do Bestiário (renderiza monstros, filtro funciona, busca funciona)
  - Teste da navegação (links corretos, página ativa)

### Critérios de Aceitação
- [x] 4 temas funcionais com visual distinto
- [x] Tema persiste no reload
- [x] Transição suave entre temas (CSS transitions em custom properties)
- [x] Bestiário exibe 20 monstros com informações completas
- [x] Filtro por categoria e busca por nome funcionam
- [x] Navegação Chat ↔ Bestiário fluida
- [x] Testes passando (94 testes totais, 9 suites)

---

## 📌 Definition of Done (Global)

Uma task é considerada **concluída** quando:

1. ✅ Código implementado e funcionando
2. ✅ TypeScript compila sem erros (`npx next build`)
3. ✅ Testes unitários escritos e passando (`npm test`)
4. ✅ Responsivo em mobile e desktop
5. ✅ Consistente com o tema glassmorphism
6. ✅ Sem dependências pagas ou com custo

---

## 🔄 Processo de Trabalho

1. **Início do Sprint:** Revisar tarefas e critérios de aceitação
2. **Desenvolvimento:** Implementar tasks em pares (par de features por sprint)
3. **Testes:** Rodar `npm test` ao final de cada task
4. **Build:** Rodar `npx next build` ao final do sprint
5. **Review:** Verificar critérios de aceitação
6. **Deploy:** Atualizar `SPRINTS.md` com status ✅
