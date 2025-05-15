# DESCRIÇÃO DOS ENDPOINTS DA API

## Usuários

### Listar Usuários
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/users
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/users/create
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
PUT https://teia-admin-2rphc.ondigitalocean.app/api/users/[id]
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
PUT https://teia-admin-2rphc.ondigitalocean.app/api/users/password/[id]
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
DELETE https://teia-admin-2rphc.ondigitalocean.app/api/users/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 201
}
```

## Autenticação

### Registrar Usuário
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/register
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/login
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/forgot-password
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/recover-password
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
GET https://teia-admin-2rphc.ondigitalocean.app/api/courses
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

### Criar Curso
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/courses/create
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
PUT https://teia-admin-2rphc.ondigitalocean.app/api/courses/[id]
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
DELETE https://teia-admin-2rphc.ondigitalocean.app/api/courses/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 201
}
```

## Módulos

### Listar Módulos de um Curso
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/courses/[id]/modules
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
GET https://teia-admin-2rphc.ondigitalocean.app/api/modules/[id]
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/modules/create
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
PUT https://teia-admin-2rphc.ondigitalocean.app/api/modules/[id]
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
DELETE https://teia-admin-2rphc.ondigitalocean.app/api/modules/[id]
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

## Tópicos

### Listar Tópicos de um Módulo
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/topics?module=[moduleId]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "module": "string",
    "order": "number",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Obter Tópico
```
GET https://teia-admin-2rphc.ondigitalocean.app/api/topics/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "module": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Criar Tópico
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/topics/create
```
**Parâmetros:**  
```json
{
  "title": "string",
  "content": "string",
  "module": "string",
  "order": "number"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "module": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Atualizar Tópico
```
PUT https://teia-admin-2rphc.ondigitalocean.app/api/topics/[id]
```
**Parâmetros:**  
```json
{
  "title": "string",
  "content": "string",
  "order": "number"
}
```

**Retorno:**  
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "module": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Deletar Tópico
```
DELETE https://teia-admin-2rphc.ondigitalocean.app/api/topics/[id]
```
**Parâmetros:**  
Nenhum.

**Retorno:**  
```json
{
  "statusCode": 200
}
```

## Uploads

### Upload de Imagem
```
POST https://teia-admin-2rphc.ondigitalocean.app/api/upload/image
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/upload/video
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/upload/audio
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
POST https://teia-admin-2rphc.ondigitalocean.app/api/upload/document
```
**Parâmetros:**  
FormData com o arquivo no campo 'file'

**Retorno:**  
```json
{
  "type": "document",
  "title": "string",
  "url": "string",
  "thumb": "string",
  "average": "string"
}
```

**Observações:**
- Todos os endpoints de upload aceitam arquivos via FormData
- O campo do arquivo deve ser nomeado como 'file'
- Para imagens e documentos, são geradas versões em miniatura (thumb) e tamanho médio (average)
- Os arquivos são armazenados no S3 e as URLs retornadas são públicas
- Tipos de arquivo aceitos:
  - Imagem: image/*
  - Vídeo: video/*
  - Áudio: audio/*
  - Documento: application/pdf e outros tipos de documento

