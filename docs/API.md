# DESCRIÇÃO DOS ENDPOINTS DA API

## Usuários

### Listar Usuários
```
GET https://teia.ipe.org.br/api/users
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
[
  {
    "id": "string",
    "name": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Criar Usuário
```
POST https://teia.ipe.org.br/api/users/create
```
**Parâmetros:**  
```json
{
  "name": "string",
  "phone": "string",
  "password": "string",
  "role": "string (apenas para administradores)"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "role": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Atualizar Usuário
```
PUT https://teia.ipe.org.br/api/users/[id]
```
**Parâmetros:**  
```json
{
  "name": "string",
  "phone": "string",
  "role": "string (opcional, apenas para administradores)"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "role": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Alterar Senha do Usuário
```
PUT https://teia.ipe.org.br/api/users/password/[id]
```
**Parâmetros:**  
```json
{
  "password": "string"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "role": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Deletar Usuário
```
DELETE https://teia.ipe.org.br/api/users/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 201
}
```

### Registrar Progresso do Usuário
```
POST https://teia.ipe.org.br/api/users/progress
```
**Parâmetros:**  
```json
{
  "courseId": "string",
  "moduleId": "string",
  "topicId": "string",
  "userId": "string (opcional, apenas para administradores e tutores)"
}
```

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
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Autenticação

### Registrar Usuário
```
POST https://teia.ipe.org.br/api/register
```
**Parâmetros:**  
```json
{
  "name": "string",
  "phone": "string",
  "password": "string"
}
```

**Retorno:**  
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### Login
```
POST https://teia.ipe.org.br/api/login
```
**Parâmetros:**  
```json
{
  "phone": "string",
  "password": "string"
}
```

**Retorno:**  
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### Esqueci a Senha
```
POST https://teia.ipe.org.br/api/forgot-password
```
**Parâmetros:**  
```json
{
  "phone": "string"
}
```

**Retorno:**  
```json
{
  "message": "Código de recuperação enviado"
}
```

### Recuperar Senha
```
POST https://teia.ipe.org.br/api/recover-password
```
**Parâmetros:**  
```json
{
  "phone": "string",
  "code": "string",
  "password": "string"
}
```

**Retorno:**  
```json
{
  "message": "Senha alterada com sucesso"
}
```

## Cursos

### Listar Cursos
```
GET https://teia.ipe.org.br/api/courses
```
**Parâmetros:**  
Nenhum.

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

### Listar Cursos Publicados
```
GET https://teia.ipe.org.br/api/courses/list-published
```
**Parâmetros:**  
Nenhum.

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

### Obter Curso
```
GET https://teia.ipe.org.br/api/courses/[id]
```
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
  "updatedAt": "Date"
}
```

### Criar Curso
```
POST https://teia.ipe.org.br/api/courses/create
```
**Parâmetros:**  
```json
{
  "name": "string",
  "description": "string",
  "phone": "string",
  "published": "boolean"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "phone": "string",
  "published": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Atualizar Curso
```
PUT https://teia.ipe.org.br/api/courses/[id]
```
**Parâmetros:**  
```json
{
  "name": "string",
  "description": "string",
  "phone": "string",
  "published": "boolean"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "phone": "string",
  "published": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Deletar Curso
```
DELETE https://teia.ipe.org.br/api/courses/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 201
}
```

### Obter Progresso dos Usuários em um Curso
```
GET https://teia.ipe.org.br/api/courses/[id]/progress
```
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

## Módulos

### Listar Módulos de um Curso
```
GET https://teia.ipe.org.br/api/courses/[id]/modules
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "course": "string",
    "order": "number",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Obter Módulo
```
GET https://teia.ipe.org.br/api/modules/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "course": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Criar Módulo
```
POST https://teia.ipe.org.br/api/modules/create
```
**Parâmetros:**  
```json
{
  "name": "string",
  "description": "string",
  "course": "string",
  "order": "number"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "course": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Atualizar Módulo
```
PUT https://teia.ipe.org.br/api/modules/[id]
```
**Parâmetros:**  
```json
{
  "name": "string",
  "description": "string",
  "course": "string",
  "order": "number"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "course": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Deletar Módulo
```
DELETE https://teia.ipe.org.br/api/modules/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 200,
  "message": "Módulo removido com sucesso"
}
```

### Reordenar Módulo
```
POST https://teia.ipe.org.br/api/modules/reorder
```
**Parâmetros:**  
```json
{
  "moduleId": "string",
  "direction": "string (up | down)"
}
```

**Retorno:**  
```json
{
  "success": true
}
```

## Tópicos

### Listar Tópicos de um Módulo
```
GET https://teia.ipe.org.br/api/topics?module=[moduleId]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
[
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
```

### Obter Tópico
```
GET https://teia.ipe.org.br/api/topics/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
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
```

### Criar Tópico
```
POST https://teia.ipe.org.br/api/topics/create
```
**Parâmetros:**  
```json
{
  "title": "string",
  "content": [
    {
      "type": "string (text | image | video | audio | document)",
      "content": "string",
      "order": "number"
    }
  ],
  "module": "string",
  "order": "number"
}
```

**Retorno:**  
```json
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
```

### Atualizar Tópico
```
PUT https://teia.ipe.org.br/api/topics/[id]
```
**Parâmetros:**  
```json
{
  "title": "string",
  "content": [
    {
      "type": "string (text | image | video | audio | document)",
      "content": "string",
      "order": "number"
    }
  ],
  "order": "number"
}
```

**Retorno:**  
```json
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
```

### Deletar Tópico
```
DELETE https://teia.ipe.org.br/api/topics/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 200
}
```

### Reordenar Tópico
```
POST https://teia.ipe.org.br/api/topics/reorder
```
**Parâmetros:**  
```json
{
  "topicId": "string",
  "direction": "string (up | down)"
}
```

**Retorno:**  
```json
{
  "success": true
}
```

## Uploads

### Upload de Imagem
```
POST https://teia.ipe.org.br/api/upload/image
```
**Parâmetros:**  
FormData com o arquivo no campo 'file'

**Retorno:**  
```json
{
  "type": "image",
  "url": "string",
  "thumb": "string",
  "average": "string"
}
```

### Upload de Vídeo
```
POST https://teia.ipe.org.br/api/upload/video
```
**Parâmetros:**  
FormData com o arquivo no campo 'file'

**Retorno:**  
```json
{
  "type": "video",
  "url": "string"
}
```

### Upload de Áudio
```
POST https://teia.ipe.org.br/api/upload/audio
```
**Parâmetros:**  
FormData com o arquivo no campo 'file'

**Retorno:**  
```json
{
  "type": "audio",
  "url": "string"
}
```

### Upload de Documento
```
POST https://teia.ipe.org.br/api/upload/document
```
**Parâmetros:**  
FormData com o arquivo no campo 'file'

**Retorno:**  
```json
{
  "type": "document",
  "title": "string",
  "url": "string"
}
```

## Autenticação e Autorização

### Tokens
- Todos os endpoints (exceto login, register, forgot-password e recover-password) requerem autenticação
- O token deve ser enviado no header: `Authorization: Bearer <token>`

### Roles (Papéis)
- **estudante**: Acesso básico aos cursos e módulos
- **tutor**: Acesso de monitoramento e gerenciamento de progresso
- **administrador**: Acesso completo ao sistema

### Permissões por Endpoint
- **Criação/Edição/Exclusão de Cursos**: Apenas administradores
- **Criação/Edição/Exclusão de Módulos**: Apenas administradores
- **Criação/Edição/Exclusão de Tópicos**: Apenas administradores
- **Gerenciamento de Usuários**: Apenas administradores
- **Visualização de Progresso**: Administradores e tutores
- **Registro de Progresso**: Todos os usuários autenticados

**Observações:**
- Todos os endpoints de upload aceitam arquivos via FormData
- O campo do arquivo deve ser nomeado como 'file'
- Para imagens, são geradas versões em miniatura (thumb) e tamanho médio (average)
- Os arquivos são armazenados no S3 e as URLs retornadas são públicas
- Tipos de arquivo aceitos:
  - Imagem: image/*
  - Vídeo: video/*
  - Áudio: audio/*
  - Documento: application/pdf e outros tipos de documento
- O campo `phone` nos cursos é único e serve como identificador
- O progresso dos usuários é rastreado por tópico dentro de cada módulo
- Os tópicos podem conter múltiplos tipos de conteúdo (texto, imagem, vídeo, áudio, documento)

