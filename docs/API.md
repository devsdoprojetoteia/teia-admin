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

