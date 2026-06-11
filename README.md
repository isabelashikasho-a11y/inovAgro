[README.md](https://github.com/user-attachments/files/28856331/README.md)
# inovAgro# 🌱 InovaGro

> **Tecnologia e Sustentabilidade para o Futuro da Agricultura**

Site educacional sobre sustentabilidade, agricultura de precisão, inovação no campo e preservação ambiental. Desenvolvido com HTML, CSS e JavaScript puro — sem frameworks ou dependências externas.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Como Usar](#como-usar)
- [Seções do Site](#seções-do-site)
- [Quiz](#quiz)
- [Tecnologias](#tecnologias)
- [Responsividade](#responsividade)

---

## Sobre o Projeto

O **InovaGro** é um espaço educacional criado para mostrar como tecnologia e inovação podem transformar a agricultura em uma atividade mais sustentável e harmoniosa com o meio ambiente. O conteúdo abrange temas como uso consciente da água, energia renovável, agricultura de precisão e monitoramento ambiental.

---

## Funcionalidades

- ✅ Navegação suave entre seções (scroll behavior)
- ✅ Menu responsivo com hambúrguer para mobile
- ✅ Ilustração SVG animada na seção inicial
- ✅ Cards informativos com efeito hover
- ✅ Quiz interativo com 10 perguntas de múltipla escolha
- ✅ Barra de progresso e pontuação em tempo real no quiz
- ✅ Resultado final com mensagem personalizada
- ✅ Alternância entre modo claro e escuro
- ✅ Preferência de tema salva no `localStorage`
- ✅ Respeita `prefers-color-scheme` do sistema operacional
- ✅ Animações CSS suaves (sem JavaScript)
- ✅ Layout responsivo para celular, tablet e desktop

---

## Estrutura de Arquivos

```
InovaGro/
├── index.html   # Estrutura semântica do site
├── style.css    # Estilos, variáveis CSS, modo escuro e responsividade
└── script.js    # Quiz, tema claro/escuro e menu mobile
```

---

## Como Usar

1. Baixe ou clone os três arquivos (`index.html`, `style.css`, `script.js`) para uma mesma pasta.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Nenhuma instalação, servidor ou dependência externa é necessária.

```bash
# Exemplo com servidor local simples (opcional)
cd InovaGro
python -m http.server 8000
# Acesse http://localhost:8000
```

---

## Seções do Site

### Início
Apresentação do projeto com ilustração SVG animada de um campo agrícola, painel solar e irrigação. Explica a importância da agricultura sustentável.

### Sustentabilidade
Quatro cards informativos cobrindo:
- 💧 Uso Consciente da Água
- ☀️ Energia Renovável
- 🌍 Preservação do Solo
- ♻️ Redução de Desperdícios

### Agricultura
Quatro cards sobre inovação no campo:
- 🛰️ Agricultura de Precisão
- 💦 Irrigação Inteligente
- 🤖 Tecnologias de Produção
- 📡 Monitoramento Ambiental

---

## Quiz

Sistema interativo com as seguintes regras:

| Item | Detalhe |
|---|---|
| Total de perguntas | 10 |
| Alternativas por pergunta | 4 (apenas 1 correta) |
| Exibição | Uma pergunta por vez |
| Progresso | Barra visual + contador |
| Pontuação | Atualizada em tempo real |

### Mensagens de resultado

| Aproveitamento | Mensagem |
|---|---|
| 0 – 40% | Continue aprendendo! |
| 41 – 70% | Bom trabalho! |
| 71 – 100% | Excelente conhecimento sobre sustentabilidade e agricultura! |

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura (`header`, `nav`, `main`, `section`, `footer`) |
| CSS3 com variáveis | Estilos, temas, animações e responsividade |
| JavaScript (ES6+) | Quiz, alternância de tema, menu mobile |
| SVG inline | Ilustração do campo agrícola |
| localStorage | Persistência da preferência de tema |

Nenhum framework, biblioteca ou CDN externo foi utilizado.

---

## Responsividade

O layout se adapta a três faixas de tela:

| Faixa | Largura |
|---|---|
| Desktop | acima de 900px |
| Tablet | até 900px |
| Mobile | até 600px |

No mobile, o menu de navegação é substituído por um ícone hambúrguer com painel colapsável.

---

*InovaGro — Conteúdo educacional de acesso livre.*
