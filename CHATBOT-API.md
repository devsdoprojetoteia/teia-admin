# DESCRIÇÃO DOS ENDPOINTS DA API DO CHATBOT

## Usuários

### Listar Usuários para Chatbot
```
GET https://teia.ipe.org.br/api/chatbot/users
```
**Permissão:** Administrador, Tutor  
**Parâmetros:**  
- `phone` (opcional): Número de telefone do usuário (formato: "(11) 11111-1111" ou "11111111111")
- `course` (opcional): ID do curso para filtrar usuários
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
GET https://teia.ipe.org.br/api/chatbot/courses
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
GET https://teia.ipe.org.br/api/chatbot/courses/[id]
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
GET https://teia.ipe.org.br/api/chatbot/courses/[id]/progress
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

## Autenticação e Autorização

### Tokens
- Todos os endpoints do chatbot requerem autenticação
- O token deve ser enviado no header: `Authorization: Bearer <token>`

### Roles (Papéis)
- **estudante**: Não tem acesso aos endpoints do chatbot
- **tutor**: Acesso limitado (apenas listar usuários)
- **administrador**: Acesso completo aos endpoints do chatbot

### Permissões por Endpoint
- **Listar Usuários**: Administradores e tutores
- **Listar Cursos**: Apenas administradores
- **Obter Curso Completo**: Apenas administradores
- **Obter Progresso dos Usuários**: Apenas administradores

**Observações:**
- Os endpoints do chatbot são específicos para integração com sistemas de chatbot
- O endpoint de listar usuários retorna informações completas de progresso dos usuários
- O endpoint de obter curso completo retorna o curso com todos os módulos e tópicos aninhados
- O endpoint de progresso retorna dados populados com informações do usuário
- Os filtros por telefone são formatados automaticamente para o padrão "(11) 11111-1111"
- Todos os dados são ordenados alfabeticamente (usuários e cursos) ou por ordem (módulos e tópicos) 