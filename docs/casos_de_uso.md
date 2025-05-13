# Casos de Uso

A seguir estão descritos os principais casos de uso do sistema, organizados por módulo e tipo de usuário.

## Caso 1 - ser capaz de redefinir a minha senha
**Módulo:** Gerenciamento de Sessão/Login, Envio de e-mails

**Ator:** Administrador

**Condição:** Quando deslogado

**Objetivo:** possa fazer o login novamente

## Caso 2 - ser capaz de criar cursos, informando um número de telefone para o chatbot
**Módulo:** Integração com Mensageiro, CRUD Cursos, CRUD Jornadas do Chatbot

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** possa associar tutores e alunos em um curso

**Restrições:** O número de telefone precisa ser único entre os cursos ativos

## Caso 3 - ser capaz de cadastrar tutores via tela (individualmente)
**Módulo:** CRUD Tutores

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 4 - ser capaz de cadastrar outros administradores
**Módulo:** CRUD Administradores

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 5 - ser capaz de cadastrar uma organização 
**Módulo:** nan

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** possa associar cursos e turmas

## Caso 6 - ser capaz de gerenciar e supervisionar o progresso dos alunos
**Módulo:** CRUD Progresso do aluno

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 7 - ser capaz de gerar relatórios em CSV dos dados do curso (acesso, evasão, etc.)
**Módulo:** CRUD Progresso do aluno, Exportação de Relatórios, Envio de e-mails

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 11 - ser capaz de excluir comentários indesejados
**Módulo:** CRUD Comentários do conteúdo

**Ator:** Administrador

**Condição:** Quando nan

**Objetivo:** Não especificado

## Caso 28 - ser capaz de castrar novos alunos via importação de CSV (em lotes)
**Módulo:** CRUD Alunos

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

**Restrições:** O CPF e o número de telefone precisam ser únicos.

## Caso 29 - ser capaz de castrar novos alunos via tela (individualmente)
**Módulo:** CRUD Alunos

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

**Restrições:** O CPF e o número de telefone precisam ser únicos.

## Caso 32 - ser capaz de ver uma lista de chamados e seus estados (aberto, em andamento, fechado...)
**Módulo:** CRUD Chamados de Suporte

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 35 - ser capaz de encerrar um curso, manualmente ou via agendamento
**Módulo:** CRUD Cursos, Agendamento de Jobs

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

**Restrições:** Pedir uma autenticação antes de consolidar a ação.

## Caso 36 - ser capaz de ver uma lista de alunos do curso e seus respectivos progressos
**Módulo:** CRUD Alunos, CRUD Cursos, CRUD Progresso do aluno

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** possa emitir certificados de conclusão e relatórios

## Caso 37 - ser capaz de enviar avisos em massa para os alunos via Chatbot
**Módulo:** Agendamento de Jobs, Integração com Mensageiro, Execução da Jornada do Chatbot, CRUD Jornadas do Chatbot

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 42 - ser capaz de redirecionar o chamado para o suporte ou para o tutor
**Módulo:** CRUD Chamados de Suporte

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 46 - visualizar um dashboard com estatísticas de uso da plataforma na tela inicial
**Módulo:** CRUD Alunos, CRUD Progresso do aluno, CRUD Cursos, Gerenciamento de Sessão/Login

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 47 - ser capaz de criar uma jornada para o Chatbot vinculado ao curso
**Módulo:** CRUD Jornadas do Chatbot

**Ator:** Administrador

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 26 - ser capaz de cadastrar novos alunos via chamada de API
**Módulo:** CRUD Alunos

**Ator:** Sistema Terceiro

**Condição:** Quando autenticado

**Objetivo:** Não especificado

## Caso 43 - ser capaz de receber chamadas informando o progresso do aluno
**Módulo:** CRUD Progresso do aluno

**Ator:** Sistema Terceiro

**Condição:** Quando autenticado

**Objetivo:** Não especificado

## Caso 44 - ser capaz de consultar o progresso do aluno
**Módulo:** CRUD Progresso do aluno

**Ator:** Sistema Terceiro

**Condição:** Quando autenticado

**Objetivo:** Não especificado

## Caso 30 - ser notificado imediatamente quando um aluno estiver precisando de ajuda
**Módulo:** CRUD Chamados de Suporte

**Ator:** Suporte

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 31 - ser capaz de encerrar o chamado em caso de inatividade ou se o aluno indicar que o problema foi resolvido
**Módulo:** CRUD Chamados de Suporte

**Ator:** Suporte

**Condição:** Quando em atendimento

**Objetivo:** Não especificado

**Restrições:** Quando não houver atendentes disponíveis, o sistema deve deixar o chamado em aberto e notificar o administrador.

## Caso 34 - ser capaz de redefinir a minha senha
**Módulo:** Gerenciamento de Sessão/Login, Envio de e-mails

**Ator:** Suporte

**Condição:** Quando deslogado

**Objetivo:** possa fazer o login novamente

## Caso 40 - ser capaz de redirecionar o chamado para o tutor
**Módulo:** CRUD Chamados de Suporte

**Ator:** Suporte

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 45 - ser capaz de interagir com o aluno, com o intermédio do Chatbot
**Módulo:** CRUD Chamados de Suporte, Execução da Jornada do Chatbot, Integração com Mensageiro

**Ator:** Suporte

**Condição:** Quando em atendimento

**Objetivo:** Não especificado

## Caso 8 - ser capaz de gerenciar o curso
**Módulo:** CRUD Cursos

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 9 - ser capaz de editar conteúdos e módulos 
**Módulo:** CRUD Conteúdo do módulo, CRUD Módulos do curso

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

**Restrições:** Módulos são sub-categorias de curso e precisam ser ordenados.

## Caso 10 - ser capaz de acessar e analisar o progresso dos alunos no curso
**Módulo:** CRUD Progresso do aluno

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 12 - ser capaz de excluir comentários indesejados
**Módulo:** CRUD Comentários do conteúdo

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 13 - ser capaz de integrar links de formulários e vídeos de outras plataformas
**Módulo:** CRUD Jornadas do Chatbot, CRUD Conteúdo do módulo, CRUD Exercícios do conteúdo

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 25 - receber dúvidas específicas dos alunos 
**Módulo:** CRUD Comentários do conteúdo, CRUD Respostas dos exercícios, CRUD Chamados de Suporte

**Ator:** Tutor

**Condição:** Quando em cursos com tutoria

**Objetivo:** Não especificado

## Caso 33 - ser capaz de redefinir a minha senha
**Módulo:** Gerenciamento de Sessão/Login, Envio de e-mails

**Ator:** Tutor

**Condição:** Quando deslogado

**Objetivo:** possa fazer o login novamente

## Caso 38 - ser capaz de enviar avisos em massa para os alunos via Chatbot
**Módulo:** Agendamento de Jobs, Integração com Mensageiro, Execução da Jornada do Chatbot, CRUD Jornadas do Chatbot

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 41 - ser capaz de redirecionar o chamado para o suporte
**Módulo:** CRUD Chamados de Suporte

**Ator:** Tutor

**Condição:** Quando logado

**Objetivo:** Não especificado

## Caso 14 - ser capaz de receber e visualizar conteúdo no meu número de telefone
**Módulo:** Integração com Mensageiro, CRUD Exercícios do conteúdo, Execução da Jornada do Chatbot

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 15 - ser capaz de retomar o conteúdo de onde parei a qualquer momento
**Módulo:** CRUD Progresso do aluno, Integração com Mensageiro, CRUD Jornadas do Chatbot, Montagem dinâmica do Portal do Aluno

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** possa acompanhar o meu progresso no AVA

## Caso 16 - ser capaz de interagir e testar meus conhecimentos por meio do envio de atividades no AVA ou via enquetes no Chatbot 
**Módulo:** CRUD Respostas dos exercícios, Integração com Mensageiro, Execução da Jornada do Chatbot

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 17 - ser capaz de acessar o conteúdo já visto recentemente off-line
**Módulo:** Montagem dinâmica do Portal do Aluno, PWA do Portal do Aluno

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 18 - ser capaz de acessar o curso mesmo quando estiver com uma conexão instável 
**Módulo:** Montagem dinâmica do Portal do Aluno, PWA do Portal do Aluno

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 19 - ser capaz de manter a comunicação a respeito do meu avanço no curso via Chatbot 
**Módulo:** CRUD Progresso do aluno, Integração com Mensageiro, Execução da Jornada do Chatbot

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 20 - ser capaz de solicitar atendimento humano a qualquer momento via Chatbot
**Módulo:** Execução da Jornada do Chatbot, CRUD Chamados de Suporte, Integração com Mensageiro

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** possa falar com meu tutor ou com o suporte

## Caso 21 - ser notificado das minhas atividades via Chatbot periodicamente 
**Módulo:** Agendamento de Jobs, CRUD Exercícios do conteúdo, CRUD Progresso do aluno, Integração com Mensageiro, Execução da Jornada do Chatbot

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 22 - obter certificado ao final da formação
**Módulo:** CRUD Progresso do aluno, Exportação de Relatórios, Envio de e-mails

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 23 - ser notificado via Chatbot sobre quanto tempo resta para eu finalizar o curso, em dias
**Módulo:** Agendamento de Jobs, Integração com Mensageiro, Execução da Jornada do Chatbot

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 24 - ser capaz de receber feedbacks das minhas atividades 
**Módulo:** Integração com Mensageiro, Execução da Jornada do Chatbot, Agendamento de Jobs

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 27 - ser notificado via Chatbot a respeito da minha matrícula no curso
**Módulo:** Integração com Mensageiro, Execução da Jornada do Chatbot, CRUD Alunos

**Ator:** Tutorado/Aluno

**Condição:** Quando recém cadastrado em um novo curso

**Objetivo:** Não especificado

## Caso 39 - ser capaz de fazer comentários na página web do conteúdo
**Módulo:** CRUD Comentários do conteúdo, Montagem dinâmica do Portal do Aluno

**Ator:** Tutorado/Aluno

**Condição:** Quando cadastrado no curso

**Objetivo:** Não especificado

## Caso 48 - ser capaz de ver e navegar no conteúdo dos cursos, sem necessariamente registrar meu progresso ou exigir certificado
**Módulo:** Montagem dinâmica do Portal do Aluno

**Ator:** Anônimo 

**Condição:** Quando deslogado

**Objetivo:** Não especificado