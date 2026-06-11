/* =====================================================
   InovaGro – Script Principal
   Responsabilidades:
     1. Alternância de tema claro / escuro
     2. Menu mobile (hambúrguer)
     3. Quiz interativo (10 perguntas)
        - Exibição de uma pergunta por vez
        - Barra de progresso
        - Pontuação em tempo real
        - Feedback de acerto / erro
        - Resultado final com mensagem personalizada
   ===================================================== */

/* ─────────────────────────────────────────
   1. BANCO DE PERGUNTAS DO QUIZ
   Cada objeto contém:
     - question  : texto da pergunta
     - options   : array com 4 alternativas
     - answer    : índice (0–3) da alternativa correta
───────────────────────────────────────── */
const questions = [
  {
    question: "Qual técnica de irrigação é considerada a mais eficiente no uso da água?",
    options: [
      "Irrigação por inundação",
      "Irrigação por aspersão convencional",
      "Irrigação por gotejamento",
      "Irrigação por sulcos"
    ],
    answer: 2
  },
  {
    question: "O que é agricultura de precisão?",
    options: [
      "Plantar culturas em fileiras retas usando régua",
      "Usar tecnologias como GPS e sensores para gerenciar variações no campo",
      "Praticar a agricultura exclusivamente em pequenas propriedades",
      "Produzir apenas um tipo de cultura por fazenda"
    ],
    answer: 1
  },
  {
    question: "Qual das práticas abaixo contribui mais para a preservação do solo?",
    options: [
      "Queima da palha após a colheita",
      "Uso excessivo de agrotóxicos",
      "Plantio direto com cobertura do solo",
      "Remoção total da vegetação nativa"
    ],
    answer: 2
  },
  {
    question: "Qual fonte de energia é considerada renovável e muito utilizada no campo?",
    options: [
      "Carvão mineral",
      "Petróleo",
      "Energia solar fotovoltaica",
      "Energia nuclear"
    ],
    answer: 2
  },
  {
    question: "O que faz um biodigestor em uma propriedade rural?",
    options: [
      "Filtra água da chuva para consumo humano",
      "Transforma resíduos orgânicos em biogás e adubo",
      "Produz pesticidas naturais a partir de plantas",
      "Detecta pragas por meio de sensores"
    ],
    answer: 1
  },
  {
    question: "Qual é o principal benefício da rotação de culturas?",
    options: [
      "Aumentar o uso de fertilizantes químicos",
      "Reduzir a necessidade de mão de obra",
      "Melhorar a fertilidade e saúde do solo",
      "Facilitar o uso de máquinas pesadas"
    ],
    answer: 2
  },
  {
    question: "Drones na agricultura são usados principalmente para:",
    options: [
      "Transportar trabalhadores entre lavouras",
      "Monitorar lavouras e aplicar insumos com precisão",
      "Realizar a colheita de grãos automaticamente",
      "Irrigar grandes áreas por aspersão"
    ],
    answer: 1
  },
  {
    question: "Quanto do total de alimentos produzidos no mundo é desperdiçado, aproximadamente?",
    options: [
      "5%",
      "10%",
      "33%",
      "60%"
    ],
    answer: 2
  },
  {
    question: "O que é monitoramento ambiental na agricultura?",
    options: [
      "Controlar o preço dos alimentos no mercado",
      "Acompanhar variáveis como qualidade do ar, água e solo para decisões sustentáveis",
      "Registrar o número de trabalhadores rurais por região",
      "Fiscalizar o transporte de produtos agrícolas"
    ],
    answer: 1
  },
  {
    question: "Qual prática contribui diretamente para a redução das emissões de carbono no campo?",
    options: [
      "Aumentar o desmatamento para ampliar áreas de plantio",
      "Usar apenas combustíveis fósseis nas máquinas agrícolas",
      "Integrar lavoura, pecuária e floresta no mesmo sistema produtivo",
      "Eliminar a cobertura vegetal entre safras"
    ],
    answer: 2
  }
];

/* ─────────────────────────────────────────
   2. ESTADO DO QUIZ
───────────────────────────────────────── */
let currentQuestion = 0;   // índice da pergunta atual
let score           = 0;   // total de acertos
let answered        = false; // impede múltiplos cliques na mesma pergunta

/* ─────────────────────────────────────────
   3. REFERÊNCIAS AOS ELEMENTOS DO DOM
───────────────────────────────────────── */
const body          = document.body;
const themeToggle   = document.getElementById('theme-toggle');
const themeIcon     = document.getElementById('theme-icon');
const menuToggle    = document.getElementById('menu-toggle');
const navMobile     = document.getElementById('nav-mobile');

// Quiz
const quizHeader    = document.getElementById('quiz-header');
const quizCounter   = document.getElementById('quiz-counter');
const quizScoreLive = document.getElementById('quiz-score-live');
const progressFill  = document.getElementById('progress-fill');
const progressBar   = document.querySelector('.progress-bar');
const quizQuestion  = document.getElementById('quiz-question');
const quizOptions   = document.getElementById('quiz-options');
const quizFeedback  = document.getElementById('quiz-feedback');
const btnNext       = document.getElementById('btn-next');
const quizResult    = document.getElementById('quiz-result');
const quizQArea     = document.getElementById('quiz-question-area');
const resultIcon    = document.getElementById('result-icon');
const resultTitle   = document.getElementById('result-title');
const resultScore   = document.getElementById('result-score');
const resultMessage = document.getElementById('result-message');
const btnRestart    = document.getElementById('btn-restart');

/* ─────────────────────────────────────────
   4. TEMA CLARO / ESCURO
───────────────────────────────────────── */

/**
 * Aplica o tema ao body e atualiza o ícone do botão.
 * @param {'light'|'dark'} theme
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Ativar modo claro');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
  }
  // Persiste preferência no localStorage
  localStorage.setItem('inovagro-theme', theme);
}

// Ao clicar no botão, alterna o tema
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  applyTheme(isDark ? 'light' : 'dark');
});

// Carrega tema salvo (ou respeita preferência do sistema)
(function initTheme() {
  const saved = localStorage.getItem('inovagro-theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

/* ─────────────────────────────────────────
   5. MENU MOBILE
───────────────────────────────────────── */
menuToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha o menu ao clicar em qualquer link dentro dele
navMobile.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ─────────────────────────────────────────
   6. QUIZ – FUNÇÕES PRINCIPAIS
───────────────────────────────────────── */

/**
 * Renderiza a pergunta e as alternativas do índice atual.
 */
function renderQuestion() {
  const q = questions[currentQuestion];
  answered = false;

  // Atualiza contador e pontuação no cabeçalho
  quizCounter.textContent   = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  quizScoreLive.textContent = `Pontuação: ${score}`;

  // Atualiza barra de progresso
  const pct = (currentQuestion / questions.length) * 100;
  progressFill.style.width = `${pct}%`;
  progressBar.setAttribute('aria-valuenow', currentQuestion);

  // Texto da pergunta
  quizQuestion.textContent = q.question;

  // Limpa alternativas anteriores
  quizOptions.innerHTML = '';

  // Cria botão para cada alternativa
  q.options.forEach((option, index) => {
    const li  = document.createElement('li');
    const btn = document.createElement('button');
    btn.className   = 'quiz-option';
    btn.textContent = option;
    btn.setAttribute('aria-label', `Alternativa ${index + 1}: ${option}`);

    btn.addEventListener('click', () => selectOption(btn, index));

    li.appendChild(btn);
    quizOptions.appendChild(li);
  });

  // Reseta feedback e esconde botão "Próxima"
  quizFeedback.textContent = '';
  quizFeedback.className   = 'quiz-feedback';
  btnNext.style.display    = 'none';
}

/**
 * Processa a escolha do usuário.
 * @param {HTMLButtonElement} selectedBtn - botão clicado
 * @param {number}            index       - índice da alternativa
 */
function selectOption(selectedBtn, index) {
  // Bloqueia se já respondeu ou não há pergunta carregada
  if (answered) return;
  answered = true;

  const correct = questions[currentQuestion].answer;

  // Desabilita todos os botões de opção
  quizOptions.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
  });

  if (index === correct) {
    // Resposta correta
    score++;
    selectedBtn.classList.add('correct');
    quizFeedback.textContent = '✅ Correto! Muito bem!';
    quizFeedback.className   = 'quiz-feedback ok';
  } else {
    // Resposta errada — marca errada e destaca a correta
    selectedBtn.classList.add('wrong');
    const allBtns = quizOptions.querySelectorAll('.quiz-option');
    allBtns[correct].classList.add('correct');
    quizFeedback.textContent = `❌ Incorreto! A resposta certa era: "${questions[currentQuestion].options[correct]}"`;
    quizFeedback.className   = 'quiz-feedback fail';
  }

  // Atualiza pontuação em tempo real
  quizScoreLive.textContent = `Pontuação: ${score}`;

  // Exibe botão para avançar
  btnNext.style.display = 'inline-flex';
}

/**
 * Avança para a próxima pergunta ou exibe o resultado final.
 */
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

/**
 * Exibe o painel de resultado final com acertos, porcentagem e mensagem.
 */
function showResult() {
  // Oculta área de pergunta e cabeçalho do quiz
  quizQArea.style.display   = 'none';
  quizHeader.style.display  = 'none';
  quizFeedback.style.display = 'none';
  btnNext.style.display     = 'none';

  // Progresso 100%
  progressFill.style.width = '100%';
  progressBar.setAttribute('aria-valuenow', questions.length);

  const total = questions.length;
  const pct   = Math.round((score / total) * 100);

  // Ícone e título conforme desempenho
  let icon, title, message;

  if (pct <= 40) {
    icon    = '📚';
    title   = 'Continue Aprendendo!';
    message = 'Continue aprendendo!';
  } else if (pct <= 70) {
    icon    = '👍';
    title   = 'Bom Trabalho!';
    message = 'Bom trabalho!';
  } else {
    icon    = '🏆';
    title   = 'Parabéns!';
    message = 'Excelente conhecimento sobre sustentabilidade e agricultura!';
  }

  resultIcon.textContent    = icon;
  resultTitle.textContent   = title;
  resultScore.textContent   = `Você acertou ${score} de ${total} perguntas — ${pct}% de aproveitamento.`;
  resultMessage.textContent = message;

  // Exibe painel de resultado
  quizResult.style.display = 'block';
}

/**
 * Reinicia o quiz do zero.
 */
function restartQuiz() {
  currentQuestion = 0;
  score           = 0;
  answered        = false;

  // Restaura visibilidade dos elementos
  quizQArea.style.display    = 'block';
  quizHeader.style.display   = 'flex';
  quizFeedback.style.display = 'block';
  quizResult.style.display   = 'none';

  renderQuestion();
}

/* ─────────────────────────────────────────
   7. EVENTOS DO QUIZ
───────────────────────────────────────── */
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', restartQuiz);

/* ─────────────────────────────────────────
   8. INICIALIZAÇÃO
───────────────────────────────────────── */
// Carrega a primeira pergunta ao abrir a página
renderQuestion();
