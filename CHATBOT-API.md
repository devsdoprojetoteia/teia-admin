# DESCRIÇÃO DOS ENDPOINTS DA API DO CHATBOT

## Usuários

### Diagrama de sequência da integração TYPEBOT <-> TEIA (este sistema)

<img width="7874" height="8192" alt="Course Progression via-2026-09-23-132024" src="https://github.com/user-attachments/assets/628ff6bc-fbd9-48cc-947b-51fb88c5586f" />

<details>
<summary>
  Diagrama criado no https://mermaid.ai/play
</summary>

```
---
config:
  theme: default
  themeVariables:
    background: #fff
    dardMode: false
---
sequenceDiagram
    autonumber
    actor Aluno as Aluno (WhatsApp)
    participant ZAP as WhatsApp<br/>(canal do Typebot)
    participant TB as Typebot<br/>(teia-typebot.ipe.org.br)
    participant API as TEIA Admin API<br/>(Nuxt/Nitro /api/chatbot/*)
    participant DB as MongoDB<br/>(User, Course, Module, Topic, Progress, Answer)

    Aluno->>ZAP: Envia mensagem / escolhe opção
    ZAP->>TB: Evento da conversa (telefone + texto)
    activate TB
    Note over TB: Executa a jornada do curso<br/>vinculado ao número (Course.phone)

    rect rgb(240,248,255)
    Note over TB,API: Fase 1 - Identificar aluno
    TB->>API: GET /api/chatbot/users?phone=...
    activate API
    API->>API: authorize() valida Bearer <BOT_TOKEN>
    API->>DB: User.find({role:"estudante", phone})
    DB-->>API: Usuário(s) + courseProgresses
    API-->>TB: [{id,name,phone,courseProgresses}]
    deactivate API
    end

    rect rgb(245,255,245)
    Note over TB,API: Fase 2 - Listar e abrir conteúdo
    TB->>API: GET /api/chatbot/courses?published=true
    API->>DB: Course.find({published:true})
    DB-->>API: Cursos
    API-->>TB: [{id,name,description,phone,published}]

    TB->>API: GET /api/chatbot/courses/:id
    API->>DB: Course + Module.find(order) + Topic.find(order)
    DB-->>API: Curso, módulos, tópicos, content[]
    API-->>TB: Curso completo (módulos->tópicos->conteúdo)
    end

    rect rgb(255,250,240)
    Note over TB,API: Fase 3 - Consultar progresso
    TB->>API: GET /api/chatbot/courses/:id/progress?userPhone=...
    API->>API: Normaliza telefone -> "(XX) XXXXX-XXXX"
    API->>DB: User.findOne({phone}) + UserCourseProgress.find({user,course})
    alt Aluno encontrado
        DB-->>API: Progresso (módulos, tópicos)
        API-->>TB: [{user,course,topics,modules}]
    else Não encontrado
        API-->>TB: 400 "Usuário não encontrado"
    end
    end

    rect rgb(255,240,245)
    Note over TB,API: Fase 4 - Registrar avanço e respostas
    TB->>API: POST /api/chatbot/progress {courseId,userPhone}
    API->>DB: Progress.find/create + push próximo módulo + tópicos
    DB-->>API: Progresso atualizado
    API-->>TB: {id,user,course,topics,modules}

    TB->>API: POST /api/chatbot/answers {courseId,userPhone,question,answer}
    API->>DB: Answer.find/create + push {question,answer}
    DB-->>API: Respostas atualizadas
    API-->>TB: {id,user,course,answers[]}
    end

    Note over TB: Formata mensagem rica<br/>(texto, link, imagem, vídeo, áudio, documento)
    TB-->>ZAP: Resposta formatada do fluxo
    ZAP-->>Aluno: Entrega no WhatsApp
    deactivate TB
```

</details>

### Listar Usuários para Chatbot
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/users
```
**Permissão:** Administrador, Tutor  
**Parâmetros:**  
- `phone` (opcional): Número de telefone do usuário (formato: "(11) 11111-1111" ou "11111111111")
- `course` (opcional): ID do curso para filtrar usuários que tem progresso naquele curso
- `user` (opcional): ID específico do usuário

**Retorno:**  
```json
[
  {
    "id": "string",
    "name": "string",
    "phone": "string",
    "courseProgresses": [
      {
        "id": "string",
        "user": "string",
        "course": {
          "id": "string",
          "name": "string"
        },
        "topics": [
          {
            "module": "string",
            "topic": "string",
            "createdAt": "Date"
          }
        ],
        "createdAt": "Date",
        "updatedAt": "Date"
      }
    ]
  }
]
```

## Cursos

### Listar Cursos para Chatbot
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/courses
```
**Permissão:** Administrador  
**Parâmetros:**  
- `published` (opcional): "true" para filtrar apenas cursos publicados

**Retorno:**  
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "phone": "string",
    "published": "boolean",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Obter Curso Completo para Chatbot
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/courses/[id]
```
**Permissão:** Administrador  
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "phone": "string",
  "published": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date",
  "modules": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "course": "string",
      "order": "number",
      "createdAt": "Date",
      "updatedAt": "Date",
      "topics": [
        {
          "id": "string",
          "title": "string",
          "content": [
            {
              "type": "string (text | image | video | audio | document)",
              "content": "string",
              "order": "number"
            }
          ],
          "module": "string",
          "order": "number",
          "createdAt": "Date",
          "updatedAt": "Date"
        }
      ]
    }
  ]
}
```

### Obter Progresso dos Usuários em um Curso para Chatbot
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/courses/[id]/progress
```
**Permissão:** Administrador  
**Parâmetros:**  
- `userPhone` (opcional): Número de telefone do usuário para filtrar o progresso (formato: "(11) 11111-1111" ou "11111111111")

**Retorno:**  
```json
[
  {
    "id": "string",
    "user": {
      "id": "string",
      "name": "string",
      "phone": "string"
    },
    "course": "string",
    "topics": [
      {
        "module": "string",
        "topic": "string",
        "createdAt": "Date"
      }
    ],
    "modules": [
      {
        "module": "string",
        "createdAt": "Date"
      }
    ],
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Avançar Progresso do Usuário em um Curso para Chatbot
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/progress
```
**Permissão:** Administrador  
**Body:**  
```json
{
  "courseId": "string",
  "userPhone": "string"
}
```

**Parâmetros do Body:**  
- `courseId` (obrigatório): ID do curso
- `userPhone` (obrigatório): Número de telefone do usuário (formato: "(11) 11111-1111" ou "11111111111")

**Retorno:**  
```json
{
  "id": "string",
  "user": "string",
  "course": "string",
  "topics": [
    {
      "module": "string",
      "topic": "string",
      "createdAt": "Date"
    }
  ],
  "modules": [
    {
      "module": "string",
      "createdAt": "Date"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Descrição:**  
Avança o progresso do usuário no curso especificado (hardcoded no chatbot), adicionando o próximo módulo e todos os seus tópicos ao progresso do usuário. Se o usuário não possui progresso no curso, cria um novo registro. Se o usuário não for encontrado, retorna erro 400.

### Salvar Resposta do Usuário em um Curso para Chatbot
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/answers
```
**Permissão:** Administrador  
**Body:**  
```json
{
  "courseId": "string",
  "userPhone": "string",
  "question": "string",
  "answer": "string"
}
```

**Parâmetros do Body:**  
- `courseId` (obrigatório): ID do curso
- `userPhone` (obrigatório): Número de telefone do usuário (formato: "(11) 11111-1111" ou "11111111111")
- `question` (opcional): Pergunta relacionada ao curso
- `answer` (opcional): Resposta do usuário à pergunta

**Retorno:**  
```json
{
  "id": "string",
  "user": "string",
  "course": "string",
  "answers": [
    {
      "question": "string",
      "answer": "string",
      "createdAt": "Date"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Descrição:**  
Salva uma resposta do usuário relacionada a um curso. O telefone do usuário é formatado automaticamente para o padrão "(XX) XXXXX-XXXX" se necessário. Se o usuário não for encontrado, retorna erro 400. Se não existir um registro de respostas para o usuário e curso, cria um novo registro. Caso contrário, adiciona a nova pergunta/resposta ao array de respostas existente.

## Autenticação e Autorização

### Tokens
- Todos os endpoints do chatbot requerem autenticação
- O token deve ser enviado no header: `Authorization: Bearer <token>`

### Permissões por Endpoint
- **Todas as rotas**: Apenas Administradores (token fixo para o chatbot)
