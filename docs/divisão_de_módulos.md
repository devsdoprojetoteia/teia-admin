# Divisão de Módulos

Esta é a divisão de módulos definida no planejamento do projeto, com o tipo, a prioridade e a **situação atual de cada módulo, conferida no código em 14/10/2026**.

Os requisitos abaixo são os do planejamento original. Quando a implementação seguiu outro caminho, a diferença aparece em **Divergências em relação ao planejado**.

## Resumo

| # | Módulo | Prioridade | Situação |
|---|---|---|---|
| 1 | CRUD Alunos | 0 - Indispensável | ✅ Concluído |
| 2 | CRUD Administradores | 0 - Indispensável | ✅ Concluído |
| 3 | CRUD Cursos | 0 - Indispensável | ✅ Concluído |
| 4 | Gerenciamento de Sessão/Login | 0 - Indispensável | 🟡 Parcial |
| 5 | CRUD Jornadas do Chatbot | 0 - Indispensável | 🔁 Atendido pelo Typebot |
| 6 | Integração com Mensageiro | 0 - Indispensável | 🔁 Atendido pelo Typebot (WhatsApp) |
| 7 | Montagem dinâmica do Portal do Aluno | 1 - Alta | ✅ Concluído |
| 8 | CRUD Progresso do aluno | 1 - Alta | 🟡 Parcial |
| 9 | Execução da Jornada do Chatbot | 1 - Alta | 🔁 Atendido pelo Typebot |
| 10 | CRUD Conteúdo do módulo | 1 - Alta | ✅ Concluído |
| 11 | CRUD Módulos do curso | 2 - Média | ✅ Concluído |
| 12 | CRUD Exercícios do conteúdo | 2 - Média | 🟡 Parcial |
| 13 | PWA do Portal do Aluno | 2 - Média | 🟡 Parcial |
| 14 | CRUD Respostas dos exercícios | 2 - Média | 🟡 Parcial |
| 15 | CRUD Tutores | 3 - Baixa | ✅ Concluído |
| 16 | CRUD Atendentes de Suporte | 3 - Baixa | ⬜ Não iniciado |
| 17 | CRUD Chamados de Suporte | 3 - Baixa | ⬜ Não iniciado |
| 18 | CRUD Comentários do conteúdo | 3 - Baixa | ⬜ Não iniciado |
| 19 | Exportação de Relatórios | 3 - Baixa | 🟡 Parcial |
| 20 | Agendamento de Jobs | 3 - Baixa | ⬜ Não iniciado |
| 21 | Envio de e-mails | 3 - Baixa | ⬜ Não iniciado |

**Legenda:**

| Símbolo | Situação |
|---|---|
| ✅ | Concluído |
| 🟡 | Parcial: parte do escopo está implementada |
| 🔁 | Atendido por ferramenta externa (Typebot), em vez de desenvolvimento próprio |
| ⬜ | Não iniciado |

---

## 1 - CRUD Alunos
**Descrição:** Gerenciamento completo da entidade Aluno

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- **Situação: ✅ Concluído**
- **Implementação:** usuários com papel `estudante`. A gestão fica na tela "Contas" e em `/api/users/*`. Administradores e tutores podem criar, editar, alterar a senha e excluir alunos.

## 2 - CRUD Administradores
**Descrição:** Gerenciamento completo da entidade Admin

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- **Situação: ✅ Concluído**
- **Implementação:** usuários com papel `administrador`, gerenciados na mesma tela "Contas". Só administradores podem criar outros administradores ou alterar papéis.

## 3 - CRUD Cursos
**Descrição:** Gerenciamento completo da entidade Curso

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- **Situação: ✅ Concluído**
- **Implementação:** tela "Cursos" e `/api/courses/*`. Cada curso tem nome (único), descrição, telefone do chatbot, publicação, duração, aprendizados, requisitos e equipe pedagógica.
- **Divergências em relação ao planejado:** o caso de uso 2 pede telefone único entre cursos ativos, mas hoje essa unicidade não é exigida.

## 4 - Gerenciamento de Sessão/Login
**Descrição:** Mínimo esperado:
- Criação de usuário (exclusivamente pelo admin)
- Login com e-mail e senha
- Redefinição de senha
- Autenticação de rotas do backend

Desejável:
- Log de chamadas (url, headers e payload) processadas por usuário
- Gerenciamento de permissões do admin

- Tipo: Segurança
- Prioridade: 0 - Indispensável
- **Situação: 🟡 Parcial**
- **Implementação:**
  - **Login com telefone e senha.** A autenticação usa JWT.
  - **As rotas do backend são autenticadas por papel:** administrador, tutor, estudante e o papel restrito do chatbot. Ver [SEGURANCA.md](./SEGURANCA.md).
  - **A redefinição de senha funciona por código:** ele expira em 30 min e aceita no máximo 5 tentativas.
- **Divergências em relação ao planejado:**
  - O login é por **telefone**, não por e-mail. O público-alvo usa o WhatsApp como canal principal e nem sempre tem e-mail.
  - A criação de usuários **não é exclusiva do admin.** Existe cadastro público de alunos (`/api/register`, tela "Cadastrar"), e tutores também podem criar alunos.
- **Pendente:**
  - enviar o código de redefinição ao usuário (hoje ele fica só no log do servidor);
  - log de chamadas por usuário;
  - gerenciamento de permissões configurável (os papéis hoje são fixos).

## 5 - CRUD Jornadas do Chatbot
**Descrição:** Construção do fluxo de conversação, composto de:
- Início: ponteiro que marca a raíz do fluxo, ou seja, o ponto de partida único e não deletável
- Mensagem: nó que sinaliza ao chatbot que ele deve enviar uma mensagem contendo texto rico (Markdown que aceite links, imagens e vídeos em anexo)
- Entrada de Texto: nó que sinaliza ao chatbot que ele deve aguardar um input de texto do usuário
- Decisão: nó que sinaliza que o chatbot deve tomar caminhos alternativos dependendo da escolha feita direta ou indiretamente pelo usuário
>>> Decisões Diretas: quando o usuário tem um conjunto pré-estabelecido de escolhas que afetam o curso da conversa
>>> Decisões Indireta: quando alguma informação obtida previamente é usada para mudar o curso da conversa
- Classificação: nó que sinaliza que o chatbot deve "etiquetar" a conversa com alguma informação relevante (ex.: "Ticket finalizado", "Aluno aprovado", "Avaliação iniciada" etc)
- Integração: nó que sinaliza que o chatbot deve disparar uma requisição para uma API rest e aguardar a resposta

Ao fim da construção, o admin deve ser capaz de:
- Salvar a jornada para que possa ser lida pelo Chatbot como um tipo de script de conversação
- Recuperar uma jornada salva anteriormente para que possa ser editada
- Listar todas as jornadas de um curso
- Ativar e desativar jornadas

- Tipo: Chatbot
- Prioridade: 0 - Indispensável
- **Situação: 🔁 Atendido pelo Typebot**
- **Implementação:**
  - Em vez de um construtor próprio, o projeto adotou o **Typebot**, uma ferramenta open source, self-hosted em `teia-typebot.ipe.org.br`. O painel tem um atalho "Chatbot" que leva até ele.
  - O editor do Typebot cobre os tipos de nó planejados: início, mensagem com texto rico e mídia, entrada de texto, decisões diretas (botões) e indiretas (condições sobre variáveis) e requisições HTTP. A classificação da conversa é feita com variáveis. Também permite salvar, editar, listar, publicar e despublicar fluxos.
  - A integração com o TEIA Admin é feita pelos endpoints de [CHATBOT-API.md](../CHATBOT-API.md).

## 6 - Integração com Mensageiro
**Descrição:** - Componente responsável por enviar e receber mensagens através do canal mensageiro escolhido (a princípio, apenas Telegram e WhatsApp)

- Tipo: Envio de Mensagens
- Prioridade: 0 - Indispensável
- **Situação: 🔁 Atendido pelo Typebot (WhatsApp)**
- **Implementação:** o WhatsApp é integrado pelo próprio Typebot.
- **Pendente:** integração com o Telegram.

## 7 - Montagem dinâmica do Portal do Aluno
**Descrição:** - Subsistema responsável por pré-renderizar as páginas web nas quais os Conteúdos (entidades de sistema) serão disponibilizados para que os alunos acessem
- Apenas o conteúdo estático deve ser pré-renderizado pelo sistema, comentários e exercícios (quando implementados) serão carregados dinamicamente

- Tipo: Portal do Aluno
- Prioridade: 1 - Alta
- **Situação: ✅ Concluído**
- **Implementação:** o Portal TEIA monta as páginas dos cursos publicados a partir do conteúdo cadastrado: a home (`/`), o curso (`/curso/[id]`) e os tópicos (`/curso/[id]/[tópico]`).
- **Divergências em relação ao planejado:** as páginas são renderizadas sob demanda pelo servidor (SSR do Nuxt), e não pré-renderizadas em arquivos estáticos.

## 8 - CRUD Progresso do aluno
**Descrição:** Gerenciamento completo da entidade Progresso do aluno

- Tipo: CRUD
- Prioridade: 1 - Alta
- **Situação: 🟡 Parcial**
- **Implementação:**
  - O chatbot registra o progresso por módulo e por tópico (`POST /api/chatbot/progress`).
  - O painel exibe o progresso por curso e tem um relatório por módulo com exportação em CSV.
- **Pendente:**
  - edição e remoção manual do progresso pelo painel;
  - enviar ao servidor o progresso do Portal web, que hoje fica só no navegador do aluno.

## 9 - Execução da Jornada do Chatbot
**Descrição:** - Subsistema responsável por identificar o nó da jornada

- Tipo: Chatbot
- Prioridade: 1 - Alta
- **Situação: 🔁 Atendido pelo Typebot**
- **Implementação:**
  - O motor do Typebot executa os fluxos e controla em que ponto da conversa o aluno está.
  - A posição do aluno no curso (módulos concluídos) fica salva no TEIA Admin.

## 10 - CRUD Conteúdo do módulo
**Descrição:** Gerenciamento completo da entidade Conteúdo do módulo

- Tipo: CRUD
- Prioridade: 1 - Alta
- **Situação: ✅ Concluído**
- **Implementação:**
  - Os conteúdos são **tópicos** dentro dos módulos, e cada tópico tem blocos de texto, imagem, vídeo, áudio e documento.
  - A ordem dos tópicos é configurável.
  - As mídias ficam no DigitalOcean Spaces, com versões otimizadas das imagens.

## 11 - CRUD Módulos do curso
**Descrição:** Gerenciamento completo da entidade Módulo do curso

- Tipo: CRUD
- Prioridade: 2 - Média
- **Situação: ✅ Concluído**
- **Implementação:** tela de módulos do curso e `/api/modules/*`, incluindo reordenação.

## 12 - CRUD Exercícios do conteúdo
**Descrição:** Gerenciamento completo da entidade Exercício do conteúdo

- Tipo: CRUD
- Prioridade: 2 - Média
- **Situação: 🟡 Parcial**
- **Implementação:** tópicos do tipo **questionário**, com perguntas de múltipla escolha e indicação da resposta correta. Eles são cadastrados no painel e exibidos no Portal.
- **Pendente:** outros formatos de exercício, como resposta aberta.

## 13 - PWA do Portal do Aluno
**Descrição:** Inclusão do manifesto PWA em cada página de conteúdo servida pelo portal, com o intuito de disponibilizá-las para donwload individualmente

- Tipo: Portal do Aluno
- Prioridade: 2 - Média
- **Situação: 🟡 Parcial**
- **Implementação:** o Portal inteiro é um PWA instalável, com manifesto e service worker para cache.
- **Pendente:** download individual por página de conteúdo.

## 14 - CRUD Respostas dos exercícios
**Descrição:** Gerenciamento completo da entidade Resposta do exercício

- Tipo: CRUD
- Prioridade: 2 - Média
- **Situação: 🟡 Parcial**
- **Implementação:**
  - As respostas dadas no chatbot são gravadas (`POST /api/chatbot/answers`).
  - Elas podem ser consultadas, com filtros e busca, na tela "Atividades Chatbot" do painel, com exportação em CSV.
- **Pendente:**
  - enviar ao servidor as respostas dos questionários do Portal web, que hoje ficam só no navegador do aluno;
  - edição e remoção das respostas pelo painel.

## 15 - CRUD Tutores
**Descrição:** Gerenciamento completo da entidade Tutor

- Tipo: CRUD
- Prioridade: 3 - Baixa
- **Situação: ✅ Concluído**
- **Implementação:** usuários com papel `tutor`, gerenciados pelo administrador na tela "Contas". O tutor gerencia alunos e acessa relatórios, mas não edita cursos.

## 16 - CRUD Atendentes de Suporte
**Descrição:** Gerenciamento completo da entidade Atendente de Suporte

- Tipo: CRUD
- Prioridade: 3 - Baixa
- **Situação: ⬜ Não iniciado**

## 17 - CRUD Chamados de Suporte
**Descrição:** Gerenciamento completo da entidade Chamado de Suporte

- Tipo: CRUD
- Prioridade: 3 - Baixa
- **Situação: ⬜ Não iniciado**

## 18 - CRUD Comentários do conteúdo
**Descrição:** Gerenciamento completo da entidade Comentário do conteúdo

- Tipo: CRUD
- Prioridade: 3 - Baixa
- **Situação: ⬜ Não iniciado**

## 19 - Exportação de Relatórios
**Descrição:** Mínimo esperado:
- Emissão de certificado de conclusão do curso de maneira automatizada constando o nome do aluno, o nome do curso, a data de formação e quaisquer informações extras necessárias

Desejável:
- Conversão das páginas pré-renderizadas de conteúdos para PDF
- Relatórios de uso da plataforma em CSV (a definir)

- Tipo: Exportação de Relatórios
- Prioridade: 3 - Baixa
- **Situação: 🟡 Parcial**
- **Implementação:** relatórios exportáveis em CSV: progresso por curso, módulo e aluno (tela "Relatórios de progresso") e respostas do chatbot (tela "Atividades Chatbot").
- **Pendente:**
  - emissão automática de certificados (é o requisito mínimo deste módulo);
  - conversão de conteúdo para PDF.

## 20 - Agendamento de Jobs
**Descrição:** Mínimo Esperado:
- Agendamento do envio de mensagens pré-programadas através do Chatbot (WhatsApp)

Desejável:
- Encerramento automático do curso + envio de certificados na data pré-programada

- Tipo: Job
- Prioridade: 3 - Baixa
- **Situação: ⬜ Não iniciado** (no TEIA Admin)

## 21 - Envio de e-mails
**Descrição:** - Boas-vindas ao curso
- Certificado de conclusão
- Redefinição de senha

- Tipo: Envio de Mensagens
- Prioridade: 3 - Baixa
- **Situação: ⬜ Não iniciado**
- **Observação:** como o login é por telefone, o envio do código de redefinição de senha tende a ser feito por WhatsApp ou SMS, e não por e-mail.
