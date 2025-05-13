# Divisão de Módulos

Esta tabela detalha os módulos do sistema, incluindo seu tipo, prioridade e status atual.

## 1 - CRUD Alunos
**Descrição:** Gerenciamento completo da entidade Aluno

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 2 - CRUD Administradores
**Descrição:** Gerenciamento completo da entidade Admin

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 3 - CRUD Cursos
**Descrição:** Gerenciamento completo da entidade Curso

- Tipo: CRUD
- Prioridade: 0 - Indispensável
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

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
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

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
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 6 - Integração com Mensageiro
**Descrição:** - Componente responsável por enviar e receber mensagens através do canal mensageiro escolhido (a princípio, apenas Telegram e WhatsApp)

- Tipo: Envio de Mensagens
- Prioridade: 0 - Indispensável
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 7 - Montagem dinâmica do Portal do Aluno
**Descrição:** - Subsistema responsável por pré-renderizar as páginas web nas quais os Conteúdos (entidades de sistema) serão disponibilizados para que os alunos acessem
- Apenas o conteúdo estático deve ser pré-renderizado pelo sistema, comentários e exercícios (quando implementados) serão carregados dinamicamente

- Tipo: Portal do Aluno
- Prioridade: 1 - Alta
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 8 - CRUD Progresso do aluno
**Descrição:** Gerenciamento completo da entidade Progresso do aluno

- Tipo: CRUD
- Prioridade: 1 - Alta
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 9 - Execução da Jornada do Chatbot
**Descrição:** - Subsistema responsável por identificar o nó da jornada

- Tipo: Chatbot
- Prioridade: 1 - Alta
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 10 - CRUD Conteúdo do módulo
**Descrição:** Gerenciamento completo da entidade Conteúdo do módulo

- Tipo: CRUD
- Prioridade: 1 - Alta
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 11 - CRUD Módulos do curso
**Descrição:** Gerenciamento completo da entidade Módulo do curso

- Tipo: CRUD
- Prioridade: 2 - Média
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 12 - CRUD Exercícios do conteúdo
**Descrição:** Gerenciamento completo da entidade Exercício do conteúdo

- Tipo: CRUD
- Prioridade: 2 - Média
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 13 - PWA do Portal do Aluno
**Descrição:** Inclusão do manifesto PWA em cada página de conteúdo servida pelo portal, com o intuito de disponibilizá-las para donwload individualmente

- Tipo: Portal do Aluno
- Prioridade: 2 - Média
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 14 - CRUD Respostas dos exercícios
**Descrição:** Gerenciamento completo da entidade Resposta do exercício

- Tipo: CRUD
- Prioridade: 2 - Média
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 15 - CRUD Tutores
**Descrição:** Gerenciamento completo da entidade Tutor

- Tipo: CRUD
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 16 - CRUD Atendentes de Suporte
**Descrição:** Gerenciamento completo da entidade Atendente de Suporte

- Tipo: CRUD
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 17 - CRUD Chamados de Suporte
**Descrição:** Gerenciamento completo da entidade Chamado de Suporte

- Tipo: CRUD
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 18 - CRUD Comentários do conteúdo
**Descrição:** Gerenciamento completo da entidade Comentário do conteúdo

- Tipo: CRUD
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 19 - Exportação de Relatórios
**Descrição:** Mínimo esperado:
- Emissão de certificado de conclusão do curso de maneira automatizada constando o nome do aluno, o nome do curso, a data de formação e quaisquer informações extras necessárias

Desejável:
- Conversão das páginas pré-renderizadas de conteúdos para PDF
- Relatórios de uso da plataforma em CSV (a definir)

- Tipo: Exportação de Relatórios
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 20 - Agendamento de Jobs
**Descrição:** Mínimo Esperado:
- Agendamento do envio de mensagens pré-programadas através do Chatbot (WhatsApp)

Desejável:
- Encerramento automático do curso + envio de certificados na data pré-programada

- Tipo: Job
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

## 21 - Envio de e-mails
**Descrição:** - Boas-vindas ao curso
- Certificado de conclusão
- Redefinição de senha

- Tipo: Envio de Mensagens
- Prioridade: 3 - Baixa
- Status: Não iniciado
- Iniciado em: Não iniciado
- Finalizado em: Não finalizado

