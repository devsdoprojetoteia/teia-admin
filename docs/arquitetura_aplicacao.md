# Arquitetura da Aplicação TEIA

> Revisado em 14/10/2026.

O ecossistema TEIA tem três frentes:

- **TEIA Admin** (este repositório): painel administrativo, Portal TEIA (portal público do aluno) e API REST, numa única aplicação Nuxt 3.
- **Chatbot**: fluxos de conversa construídos no **Typebot** (ferramenta open source, self-hosted em `teia-typebot.ipe.org.br`) e entregues aos alunos pelo **WhatsApp**.
- **Infraestrutura** na DigitalOcean: App Platform, MongoDB gerenciado e Spaces.

## Visão de Arquitetura (Aplicação + Infraestrutura)

```mermaid
flowchart TB
  %% Atores
  Staff[Administrador]
  Tutor[Tutor]
  Student[Aluno]

  %% Canais
  WhatsApp[WhatsApp]
  Portal[Portal TEIA<br/>Web/PWA]

  %% DigitalOcean
  subgraph DO[DigitalOcean]
    direction TB

    subgraph AppPlatform[App Platform]
      AdminApp[teia-admin<br/>Nuxt 3 + Nitro<br/>painel + Portal TEIA]
      ApiRoutes[API REST<br/>server/api]
      AdminApp --> ApiRoutes
    end

    subgraph DB[Managed Database]
      Mongo[(MongoDB<br/>teia)]
    end

    subgraph ObjectStorage[Spaces]
      Spaces[(Bucket teia<br/>mídias e documentos)]
    end

    subgraph Compute[Droplet]
      Typebot[Typebot self-hosted<br/>teia-typebot.ipe.org.br]
    end

    Domain[Domínio / DNS<br/>ipe.org.br]
  end

  %% Acesso de usuários
  Staff --> AdminApp
  Tutor --> AdminApp
  Staff -->|Edita fluxos| Typebot
  Student --> Portal
  Portal --- AdminApp

  %% Fluxo do chatbot
  Student <--> WhatsApp
  WhatsApp <--> Typebot
  Typebot -->|HTTPS + BOT_TOKEN<br/>somente /api/chatbot/*| ApiRoutes

  %% Persistência
  ApiRoutes <--> Mongo
  ApiRoutes -->|Upload de arquivos| Spaces
  Portal -->|Consome mídia| Spaces

  %% Roteamento
  Domain --> AdminApp
  Domain --> Typebot
```

## Componentes Principais

| Componente | Onde roda | Responsabilidade |
|---|---|---|
| `teia-admin` | App Platform | Painel administrativo (cursos, módulos, tópicos, usuários, relatórios), Portal TEIA e API REST |
| API REST (`server/api`) | App Platform (mesmo app) | Autenticação, CRUDs, uploads, relatórios e endpoints do chatbot. Contratos em [API.md](./API.md) e [CHATBOT-API.md](../CHATBOT-API.md) |
| Portal TEIA | App Platform (mesmo app) | Páginas públicas dos cursos publicados (`/curso/[id]`), renderizadas sob demanda e instaláveis como PWA |
| Typebot | Droplet (`teia-typebot.ipe.org.br`) | Construção e execução dos fluxos de conversa; integração com o WhatsApp |
| MongoDB | Managed Database | Usuários, cursos, módulos, tópicos, progresso e respostas |
| Spaces | Object Storage | Imagens (original, miniatura e média), vídeos, áudios e documentos |

## Responsabilidades: Typebot × TEIA Admin

O Typebot **não é uma LLM**: os fluxos são determinísticos, desenhados no editor visual do Typebot pela equipe. A divisão de responsabilidades é:

| Responsabilidade | Typebot | TEIA Admin (API) |
|---|---|---|
| Enviar mensagens, mídias e perguntas ao aluno | ✅ | — |
| Decidir o próximo passo da conversa (desvios, repetições, validação da resposta digitada) | ✅ | — |
| Fornecer o conteúdo do curso (módulos, tópicos, questionários) | — | ✅ |
| Identificar o aluno pelo telefone e validar se ele existe | — | ✅ |
| Persistir progresso e respostas | — | ✅ |
| Autenticar o bot e limitar seu acesso às rotas do chatbot | — | ✅ |
| Tratar falhas da API (fallback para o aluno) | ✅ | Retorna códigos de erro explícitos |

## Sequência de interação do chatbot

Cada etapa abaixo é uma chamada independente à API: o Typebot faz uma requisição por etapa e só segue para a próxima depois de receber a resposta. Não há uma chamada única que execute todas as fases.

```mermaid
sequenceDiagram
  autonumber
  actor Aluno
  participant WA as WhatsApp
  participant TB as Typebot
  participant API as TEIA Admin API
  participant DB as MongoDB

  Note over Aluno,DB: Fase 1 — Identificação do aluno
  Aluno->>WA: Envia mensagem
  WA->>TB: Mensagem + telefone do remetente
  TB->>API: GET /api/chatbot/users?phone=...
  API->>API: Valida BOT_TOKEN e escopo /api/chatbot/*
  API->>DB: Busca estudante pelo telefone normalizado
  DB-->>API: Resultado
  alt Aluno cadastrado
    API-->>TB: 200 [aluno + progresso por curso]
  else Telefone não cadastrado
    API-->>TB: 200 []
    TB-->>WA: Fallback: orienta o cadastro / encaminha à equipe
  end

  Note over Aluno,DB: Fase 2 — Carregar curso e posição do aluno
  TB->>API: GET /api/chatbot/courses/{id}
  API->>DB: Curso + módulos + tópicos
  API-->>TB: 200 curso completo (ou 400 se o curso não existir)
  TB->>API: GET /api/chatbot/courses/{id}/progress?userPhone=...
  API-->>TB: 200 progresso do aluno ([] se ainda não iniciou)
  TB->>TB: Define o próximo módulo a partir do progresso

  Note over Aluno,DB: Fase 3 — Entrega do conteúdo e coleta de respostas
  loop Para cada tópico do módulo
    TB-->>WA: Conteúdo (texto, imagem, áudio, vídeo, documento)
    WA-->>Aluno: Exibe conteúdo
    opt Tópico com pergunta
      TB-->>WA: Pergunta
      Aluno->>WA: Resposta
      WA->>TB: Resposta
      TB->>API: POST /api/chatbot/answers {courseId, userPhone, question, answer}
      API->>DB: Acrescenta resposta
      API-->>TB: 200 registro de respostas
    end
  end

  Note over Aluno,DB: Fase 4 — Conclusão do módulo
  TB->>API: POST /api/chatbot/progress {courseId, userPhone}
  API->>DB: Marca o próximo módulo pendente e seus tópicos
  API-->>TB: 200 progresso atualizado
  TB-->>WA: Confirma a conclusão / apresenta o próximo módulo

  Note over TB,API: Em qualquer chamada: 400 (dados inválidos ou aluno/curso inexistente),<br/>401/403 (token inválido ou fora do escopo). O fluxo do Typebot deve<br/>tratar respostas diferentes de 2xx e informar o aluno, sem avançar o progresso.
```

### Guardrails do lado da API

- **Escopo do token:** o `BOT_TOKEN` só funciona em `/api/chatbot/*`; não acessa usuários, cadastros nem uploads.
- **Identificação do aluno:** progresso e respostas só são gravados para telefones de usuários existentes (400 caso contrário). Consultas com telefone inexistente retornam vazio, nunca dados de outros alunos.
- **Validação de entrada:** IDs e telefones precisam ser strings; objetos são rejeitados (proteção contra NoSQL injection).
- **Avanço controlado:** cada `POST /api/chatbot/progress` avança no máximo um módulo, sempre na ordem do curso, e não altera nada quando o curso já foi concluído.

### Fallbacks no Typebot

O tratamento de erros e os caminhos alternativos da conversa são configurados nos fluxos do Typebot. Para cada bloco HTTP, o fluxo deve prever o caminho de erro (resposta diferente de 2xx ou tempo esgotado) com uma mensagem ao aluno, sem avançar o progresso. A exportação dos fluxos (`.json` do Typebot) é o documento de referência dessa lógica.

## Endpoints de integração do chatbot

| Método | Rota | Uso |
|---|---|---|
| GET | `/api/chatbot/users` | Identificar o aluno pelo telefone |
| GET | `/api/chatbot/courses` | Listar cursos |
| GET | `/api/chatbot/courses/:id` | Conteúdo completo do curso |
| GET | `/api/chatbot/courses/:id/progress` | Progresso do aluno no curso |
| POST | `/api/chatbot/progress` | Concluir o próximo módulo |
| POST | `/api/chatbot/answers` | Registrar resposta do aluno |

Todos exigem `Authorization: Bearer <BOT_TOKEN>`. Detalhes em [CHATBOT-API.md](../CHATBOT-API.md).
