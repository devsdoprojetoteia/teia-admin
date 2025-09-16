# DESCRIÇÃO DOS ENDPOINTS DA API DO CHATBOT

## Usuários

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
Nenhum.

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
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Obter Progresso ATUAL de um Usuário em um Curso para Chatbot
O `[id]` vai ficar _hard-codded_ no TypeBot.

Busca o registro marcado como ATUAL na collection `UserCourseProgress` para o usuário `[phone]` no curso `[id]`.
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/courses/[id]/progress/user/[phone]
```
**Permissão:** Administrador  
**Parâmetros:** 
Nenhum.

**Retorno:**  
```json
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
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Avançar o Progresso dos Usuários em um Curso para Chatbot
O `[id]` vai ficar _hard-codded_ no TypeBot.

Atualiza o registro da collection `UserCourseProgress` para apontar para o id do próximo módulo do curso informado no path `[id]` para o `user`.

```
POST https://teia-admin-2rphc.ondigitalocean.app/api/chatbot/courses/[id]/progress
```
**Permissão:** Administrador  
**Body:**  
```json
{
  "user": "string"
}
```

**Retorno:**  
Status: `202 - Accepted`

## Autenticação e Autorização

### Tokens
- Todos os endpoints do chatbot requerem autenticação
- O token deve ser enviado no header: `Authorization: Bearer <token>`

### Permissões por Endpoint
- **Todas as rotas**: Apenas Administradores (token fixo para o chatbot)
