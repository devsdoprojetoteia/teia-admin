# Arquitetura da Aplicação TEIA

Este diagrama representa a arquitetura atual do ecossistema TEIA com base na documentação do projeto e na infraestrutura em produção na DigitalOcean.

## Visão de Arquitetura (Aplicação + Infraestrutura)

```mermaid
flowchart TB
  %% Atores
  Staff[Staff / Administrador]
  Support[Suporte]
  Tutor[Tutor]
  Student[Aluno]

  %% Canais
  WhatsApp[Mensageiro<br/>WhatsApp]
  Portal[Portal do Aluno<br/>Web/PWA]

  %% DigitalOcean
  subgraph DO[DigitalOcean]
    direction TB

    subgraph AppPlatform[App Platform]
      AdminApp[teia-admin<br/>Nuxt 3 + Nitro]
      ApiRoutes[API REST interna<br/>NodeJS]
      AdminApp --> ApiRoutes
    end

    subgraph DB[Managed Database]
      Mongo[(MongoDB Cluster<br/>teia)]
    end

    subgraph ObjectStorage[Spaces]
      Spaces[(Bucket teia<br/>uploads de mídia/documentos)]
    end

    subgraph Compute[Droplet]
      ChatbotSvc[teia-chatbot<br/>Serviço de chatbot]
    end

    Domain[Domínio / DNS<br/>ipe.org.br]
  end

  %% Acesso de usuários
  Staff --> AdminApp
  Support --> AdminApp
  Tutor --> AdminApp
  Student --> Portal

  %% Fluxo de integração
  Student --> WhatsApp
  WhatsApp --> ChatbotSvc
  ChatbotSvc -->|Autentica, consulta cursos,<br/>progresso e respostas| ApiRoutes
  ApiRoutes --> ChatbotSvc

  %% Persistência
  ApiRoutes <--> Mongo
  ApiRoutes -->|Upload de arquivos| Spaces
  Portal -->|Consome conteúdos e mídia| Spaces

  %% Roteamento
  Domain --> AdminApp
  Domain --> Portal
  Domain --> ChatbotSvc
```

## Componentes Principais

- `teia-admin` (App Platform): aplicação Nuxt 3 que entrega frontend administrativo e endpoints server-side.
- API interna (`server/api`): centraliza autenticação, CRUDs de domínio, upload e integração do chatbot.
- MongoDB (Managed Database): persistência principal de usuários, cursos, módulos, tópicos, progresso e respostas.
- Spaces: armazenamento de arquivos enviados (imagens, thumbnails, documentos e mídias).
- `teia-chatbot` (Droplet): serviço de conversação que consome endpoints `/api/chatbot/*` do `teia-admin`.
- Portal do Aluno (Web/PWA): experiência do aluno para consumo de conteúdo.

## Endpoints de Integração do Chatbot

Os principais endpoints usados na integração do chatbot são:

- `GET /api/chatbot/users`
- `GET /api/chatbot/courses`
- `GET /api/chatbot/courses/:id`
- `GET /api/chatbot/courses/:id/progress`
- `POST /api/chatbot/progress`
- `POST /api/chatbot/answers`

Todos requerem `Authorization: Bearer <token>`.
