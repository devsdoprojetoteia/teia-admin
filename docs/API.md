# Contratos da API REST — TEIA Admin

> Documento gerado a partir do código em `server/api/` e revisado em 14/10/2026.
> Endpoints exclusivos do chatbot estão em [CHATBOT-API.md](../CHATBOT-API.md).
> Regras de autenticação, tokens e uploads estão detalhadas em [SEGURANCA.md](./SEGURANCA.md).

**URL base (produção):** `https://teia.ipe.org.br`

## Convenções

- Autenticação: header `Authorization: Bearer <token>`, onde `<token>` é o JWT retornado por `/api/login` ou `/api/register`.
- Papéis (`role`): `administrador`, `tutor`, `estudante`. O token fixo do chatbot só vale em `/api/chatbot/*` (ver [CHATBOT-API.md](../CHATBOT-API.md)).
- Erros seguem o formato padrão do Nitro/h3:
  ```json
  { "statusCode": 400, "message": "Descrição do erro" }
  ```
  | Código | Quando ocorre |
  |---|---|
  | 400 | Parâmetro ausente ou inválido; também usado em vários endpoints para "registro não encontrado" |
  | 401 | Token ausente, inválido ou expirado |
  | 403 | Token válido, mas sem o papel exigido |
  | 404 | Módulo/tópico não encontrado |
  | 413 | Arquivo de upload acima do limite |
  | 500 | Erro interno (inclusive `SECRET_KEY` não configurada) |
- Campos de texto recebidos no body que são usados em consultas (telefone, código, IDs) precisam ser **strings**; objetos são rejeitados com 400.
- Telefones de usuários são armazenados no formato `(11) 11111-1111`. **O login é feito por telefone e senha** — não há login por e-mail.
- Respostas nunca incluem hash de senha nem dados de recuperação de senha.

### Resumo de permissões

| Recurso | Público | Estudante | Tutor | Administrador |
|---|---|---|---|---|
| Cadastro, login, recuperação de senha | ✅ | ✅ | ✅ | ✅ |
| Listar cursos publicados / ver curso publicado | ✅ | ✅ | ✅ | ✅ |
| Ver curso não publicado | — | — | ✅ | ✅ |
| Listar cursos, módulos, tópicos | — | — | ✅ | ✅ |
| Criar/editar/excluir cursos, módulos, tópicos | — | — | — | ✅ |
| Gerenciar usuários | — | — | ✅ (apenas estudantes) | ✅ (todos) |
| Definir papel de usuário | — | — | — | ✅ |
| Relatórios e progresso | — | — | ✅ | ✅ |
| Registrar progresso (`/api/users/progress`) | — | ✅ (o próprio) | ✅ (qualquer) | ✅ (qualquer) |
| Uploads | — | — | ✅ | ✅ |

---

## Autenticação

### Cadastrar usuário
```
POST /api/register
```
**Permissão:** Público. Cria sempre um usuário com papel `estudante`.

**Body:**
```json
{ "name": "string", "phone": "string", "password": "string" }
```
**Retorno:**
```json
{
  "token": "string (JWT, validade de 1 ano)",
  "user": { "id": "string", "name": "string", "phone": "string", "role": "estudante", "createdAt": "Date", "updatedAt": "Date" }
}
```
**Erros:** 400 se algum campo estiver ausente ou o telefone já estiver cadastrado.

### Login
```
POST /api/login
```
**Permissão:** Público.

**Body:**
```json
{ "phone": "string", "password": "string" }
```
**Retorno:** igual ao de `/api/register`.

**Erros:** 400 se campos ausentes/inválidos; 401 se telefone ou senha estiverem incorretos.

### Solicitar código de recuperação de senha
```
POST /api/forgot-password
```
**Permissão:** Público.

**Body:**
```json
{ "phone": "string" }
```
**Retorno:**
```json
{ "message": "Código de recuperação enviado" }
```
**Comportamento:** gera um código de 6 dígitos, válido por **30 minutos**, com no máximo **5 tentativas**. Um novo pedido substitui o código anterior.

> ⚠️ **Limitação atual:** o código ainda **não é enviado** ao usuário (WhatsApp/SMS/e-mail); ele é registrado apenas no log do servidor.

**Erros:** 400 se o telefone não estiver cadastrado.

### Redefinir senha com código
```
POST /api/recover-password
```
**Permissão:** Público.

**Body:**
```json
{ "phone": "string", "code": "string", "password": "string" }
```
**Retorno:**
```json
{ "message": "Senha alterada com sucesso" }
```
**Erros:** 400 se algum campo estiver ausente, se o código for inválido, estiver expirado, já tiver sido usado ou se as tentativas tiverem se esgotado.

---

## Usuários

Objeto `User` retornado pelos endpoints abaixo:
```json
{ "_id": "string", "name": "string", "phone": "string", "role": "administrador | tutor | estudante", "createdAt": "Date", "updatedAt": "Date" }
```

### Listar usuários
```
GET /api/users
```
**Permissão:** Administrador (todos os usuários), Tutor (apenas estudantes).

**Retorno:** `User[]` ordenado por nome.

### Criar usuário
```
POST /api/users/create
```
**Permissão:** Administrador, Tutor.

**Body:**
```json
{ "name": "string", "phone": "string", "password": "string", "role": "string (considerado apenas quando o autor é administrador)" }
```
Quando o autor é tutor, o usuário é sempre criado como `estudante`.

**Retorno:**
```json
{ "statusCode": 201, "body": { "id": "string", "name": "string", "phone": "string", "role": "string", "createdAt": "Date", "updatedAt": "Date" } }
```
**Erros:** 400 se o telefone já estiver cadastrado.

### Atualizar usuário
```
PUT /api/users/[id]
```
**Permissão:** Administrador (qualquer usuário), Tutor (apenas estudantes).

**Body:**
```json
{ "name": "string", "phone": "string", "role": "string (obrigatório quando o autor é administrador)" }
```
**Retorno:** `{ "statusCode": 201, "body": <dados públicos do usuário> }`

**Erros:** 400 se a conta não existir (ou não estiver acessível ao tutor) ou se o telefone pertencer a outra conta.

### Alterar senha de um usuário
```
PUT /api/users/password/[id]
```
**Permissão:** Administrador (qualquer usuário), Tutor (apenas estudantes).

**Body:**
```json
{ "password": "string" }
```
**Retorno:** `{ "statusCode": 201, "body": <dados públicos do usuário> }`

### Excluir usuário
```
DELETE /api/users/[id]
```
**Permissão:** Administrador (qualquer usuário), Tutor (apenas estudantes).

**Retorno:** `{ "statusCode": 201 }`

### Registrar progresso em um tópico
```
POST /api/users/progress
```
**Permissão:** Administrador, Tutor, Estudante.

**Body:**
```json
{ "courseId": "string", "moduleId": "string", "topicId": "string", "userId": "string (usado apenas quando o autor não é estudante)" }
```
Estudantes registram o próprio progresso; administradores e tutores informam `userId`.

**Retorno:** objeto `UserCourseProgress` (ver [Progresso de um curso](#progresso-dos-alunos-em-um-curso)).

> ⚠️ **Problema conhecido:** este endpoint não é usado pelo Portal TEIA (o portal guarda os tópicos vistos apenas no navegador) e, quando chamado por um estudante, não identifica o usuário corretamente. O progresso oficial hoje é registrado pelo chatbot via `POST /api/chatbot/progress`.

---

## Cursos

Objeto `Course`:
```json
{
  "id": "string",
  "name": "string (único)",
  "description": "string",
  "phone": "string (telefone do chatbot do curso — não é único)",
  "published": "boolean",
  "duration": "string",
  "learning": ["string"],
  "requirements": ["string"],
  "team": [{ "avatar": "string", "name": "string", "role": "string", "linkedin": "string" }],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Listar cursos
```
GET /api/courses
```
**Permissão:** Administrador, Tutor.

**Retorno:** `Course[]` ordenado por nome.

### Listar cursos publicados
```
GET /api/courses/list-published
```
**Permissão:** Público.

**Retorno:** `Course[]` com `published: true`, ordenado por nome.

### Obter curso completo
```
GET /api/courses/[id]
```
**Permissão:** Público se o curso estiver publicado (usado pelo Portal TEIA); Administrador ou Tutor se não estiver.

**Retorno:** `Course` com `modules[]`, e cada módulo com `topics[]`, ordenados por `order`.

**Erros:** 400 se o curso não existir; 401/403 se o curso não estiver publicado e não houver token de administrador/tutor.

### Criar curso
```
POST /api/courses/create
```
**Permissão:** Administrador.

**Body:**
```json
{ "name": "string", "description": "string", "phone": "string", "published": "boolean" }
```
Os demais campos (`duration`, `learning`, `requirements`, `team`) são preenchidos pela atualização.

**Retorno:** `{ "statusCode": 201, "body": Course }`

**Erros:** 400 se já existir curso com o mesmo nome.

### Atualizar curso
```
PUT /api/courses/[id]
```
**Permissão:** Administrador.

**Body:** todos os campos editáveis de `Course` (`name`, `description`, `phone`, `published`, `duration`, `learning`, `requirements`, `team`).

**Retorno:** `{ "statusCode": 201, "body": Course }`

**Erros:** 400 se o curso não existir ou se o novo nome já for usado por outro curso.

### Excluir curso
```
DELETE /api/courses/[id]
```
**Permissão:** Administrador.

**Retorno:** `{ "statusCode": 201 }`

> Observação: a exclusão remove apenas o curso; módulos, tópicos e progresso vinculados não são removidos.

### Listar módulos de um curso
```
GET /api/courses/[id]/modules
```
**Permissão:** Administrador, Tutor.

**Retorno:** `Module[]` ordenado por `order`, cada um com `topics[]`.

### Progresso dos alunos em um curso
```
GET /api/courses/[id]/progress
```
**Permissão:** Administrador, Tutor.

**Retorno:**
```json
[
  {
    "_id": "string",
    "user": { "_id": "string", "name": "string", "phone": "string" },
    "course": "string",
    "modules": [{ "module": "string", "createdAt": "Date" }],
    "topics": [{ "module": "string", "topic": "string", "createdAt": "Date" }],
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

---

## Módulos

Objeto `Module`:
```json
{ "_id": "string", "name": "string", "description": "string", "course": "string", "order": "number", "createdAt": "Date", "updatedAt": "Date" }
```

> Não existe endpoint para obter um módulo isolado. Use `GET /api/courses/[id]/modules` ou `GET /api/courses/[id]`.

### Criar módulo
```
POST /api/modules/create
```
**Permissão:** Administrador.

**Body:**
```json
{ "name": "string", "description": "string", "course": "string" }
```
A ordem é definida automaticamente (último + 1).

**Retorno:** `Module`. **Erros:** 400 se `name` ou `course` estiverem ausentes.

### Atualizar módulo
```
PUT /api/modules/[id]
```
**Permissão:** Administrador.

**Body (todos opcionais):**
```json
{ "name": "string", "description": "string", "course": "string", "order": "number" }
```
**Retorno:** `{ "statusCode": 200, "body": Module }`. **Erros:** 404 se o módulo não existir.

### Excluir módulo
```
DELETE /api/modules/[id]
```
**Permissão:** Administrador.

**Retorno:** `{ "statusCode": 200, "message": "Módulo removido com sucesso" }`. **Erros:** 404.

### Reordenar módulo
```
POST /api/modules/reorder
```
**Permissão:** Administrador.

**Body:**
```json
{ "moduleId": "string", "direction": "up | down" }
```
**Retorno:** `{ "success": true }`. **Erros:** 400 se não for possível mover nessa direção; 404 se o módulo não existir.

---

## Tópicos (conteúdo do módulo)

Objeto `Topic`:
```json
{
  "_id": "string",
  "title": "string",
  "type": "lesson | questionnaire",
  "content": [{ "type": "text | image | video | audio | document", "content": "string", "order": "number" }],
  "questions": [{ "question": "string", "options": ["string"], "correctAnswer": "number (índice da opção correta)" }],
  "module": "string",
  "order": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
Tópicos do tipo `lesson` usam `content`; tópicos do tipo `questionnaire` usam `questions` (múltipla escolha).

> Não existe endpoint para obter um tópico isolado. Use `GET /api/topics?module=[id]` ou `GET /api/courses/[id]`.

### Listar tópicos
```
GET /api/topics?module=[moduleId]
```
**Permissão:** Administrador, Tutor. Sem `module`, retorna todos os tópicos.

**Retorno:** `Topic[]` ordenado por `order`.

### Criar tópico
```
POST /api/topics/create
```
**Permissão:** Administrador.

**Body:**
```json
{ "title": "string", "module": "string", "type": "lesson | questionnaire", "content": [], "questions": [] }
```
A ordem é definida automaticamente.

**Retorno:** `Topic`. **Erros:** 400 se `title` ou `module` estiverem ausentes.

### Atualizar tópico
```
PUT /api/topics/[id]
```
**Permissão:** Administrador.

**Body (todos opcionais):** `title`, `content`, `order`, `type`, `questions`.

**Retorno:** `Topic`. **Erros:** 404.

### Excluir tópico
```
DELETE /api/topics/[id]
```
**Permissão:** Administrador.

**Retorno:** `{ "statusCode": 200 }`. **Erros:** 404.

### Reordenar tópico
```
POST /api/topics/reorder
```
**Permissão:** Administrador.

**Body:**
```json
{ "topicId": "string", "direction": "up | down" }
```
**Retorno:** `{ "success": true }`.

---

## Relatórios

Todos exigem **Administrador** ou **Tutor**.

### Relatório de progresso por módulo
```
GET /api/reports/progress?courseId=&userId=
```
**Retorno:** uma linha por combinação curso × módulo × estudante:
```json
[{ "user": { "id": "string", "name": "string" }, "course": { "id": "string", "name": "string" }, "module": { "id": "string", "name": "string" }, "completed": "boolean" }]
```
O painel permite exportar este relatório em CSV.

### Opções de filtro do relatório de progresso
```
GET /api/reports/progress-filters
```
**Retorno:**
```json
{ "courses": [{ "id": "string", "name": "string" }], "users": [{ "id": "string", "name": "string" }] }
```

### Relatório de respostas
```
GET /api/reports/answers?courseId=&userId=&search=
```
Lista as respostas registradas pelo chatbot (`POST /api/chatbot/answers`). `search` filtra por nome do aluno, nome do curso ou texto da pergunta.

**Retorno:**
```json
[{ "user": { "_id": "string", "name": "string" }, "course": { "_id": "string", "name": "string" }, "question": "string", "answer": "string", "createdAt": "Date" }]
```

### Opções de filtro do relatório de respostas
```
GET /api/reports/answer-filters
```
**Retorno:** mesmo formato de `/api/reports/progress-filters`.

---

## Uploads

**Permissão:** Administrador, Tutor.

Todos recebem `multipart/form-data` com o arquivo no campo `file`. O nome do arquivo armazenado é **gerado pelo servidor** (o nome original não é usado como chave, evitando sobrescrita). Os arquivos são gravados no DigitalOcean Spaces com leitura pública, e a URL retornada é relativa ao bucket (`FILES_URL`).

| Endpoint | Tipos aceitos | Tamanho máximo | Retorno |
|---|---|---|---|
| `POST /api/upload/image` | `image/*`, exceto SVG | 15 MB | `{ "type": "image", "url", "thumb", "average" }` (miniatura 400×400 e versão até 1920 px de largura) |
| `POST /api/upload/video` | `video/*` | 500 MB | `{ "type": "video", "url" }` |
| `POST /api/upload/audio` | `audio/*` | 50 MB | `{ "type": "audio", "url" }` |
| `POST /api/upload/document` | PDF, Word, Excel, PowerPoint, OpenDocument, ZIP, TXT, CSV | 50 MB | `{ "type": "document", "title", "url" }` (`title` = nome original sem extensão) |

**Erros:** 400 se nenhum arquivo for enviado ou se o tipo não for permitido; 401/403 sem token válido; 413 se o arquivo exceder o limite.
