# API do Chatbot — TEIA Admin

> Documento gerado a partir do código em `server/api/chatbot/` e revisado em 14/10/2026.
> Demais endpoints: [docs/API.md](./docs/API.md). Segurança: [docs/SEGURANCA.md](./docs/SEGURANCA.md).

**URL base (produção):** `https://teia.ipe.org.br`

O chatbot do TEIA é construído no **Typebot** (self-hosted em `teia-typebot.ipe.org.br`) e conversa com os alunos pelo **WhatsApp**. A lógica da conversa (mensagens, perguntas, desvios) fica no fluxo do Typebot; o TEIA Admin fornece os dados de cursos e registra progresso e respostas por meio dos endpoints abaixo.

## Diagrama de sequência da integração Typebot ↔ TEIA

O diagrama de sequência da integração, com as quatro fases como chamadas independentes, os caminhos de erro e os guardrails da API, está em [docs/arquitetura_aplicacao.md](./docs/arquitetura_aplicacao.md#sequência-de-interação-do-chatbot).

## Autenticação e escopo

- Header obrigatório: `Authorization: Bearer <BOT_TOKEN>`.
- `BOT_TOKEN` é um token fixo configurado na variável de ambiente do servidor. Se a variável não estiver definida, o acesso via token do bot fica desativado.
- **O token do bot só é aceito nas rotas `/api/chatbot/*`.** Em qualquer outra rota ele é recusado com **403** — ele não dá acesso à API administrativa (usuários, criação/edição de cursos, uploads etc.).
- Dentro de `/api/chatbot/*`, o token do bot tem o papel `chatbot`. Usuários com papel `administrador` (JWT do painel) também podem chamar essas rotas.

## Identificação do aluno

O aluno é identificado pelo telefone (`userPhone`/`phone`), fornecido pelo Typebot a partir da sessão do WhatsApp. O servidor normaliza o número para o formato `(11) 11111-1111`, aceitando:

- `(11) 11111-1111`
- `11111111111`
- `5511111111111` (com código do país, como vem do WhatsApp)

O telefone deve ser string ou número; objetos são rejeitados com 400.

> Como o token do bot pode ler e gravar dados de qualquer aluno informando o telefone, ele deve ser tratado como credencial sensível: guardado apenas nas variáveis do Typebot, com acesso restrito ao workspace, e trocado periodicamente. Ver [SEGURANCA.md](./docs/SEGURANCA.md).

## Erros

```json
{ "statusCode": 400, "message": "Descrição do erro" }
```

| Código | Quando ocorre |
|---|---|
| 400 | Parâmetro obrigatório ausente ou inválido; aluno ou curso não encontrado |
| 401 | Token ausente ou inválido |
| 403 | Token sem permissão para a rota |

O fluxo do Typebot deve tratar respostas diferentes de 2xx (ver [diagrama de sequência](./docs/arquitetura_aplicacao.md#sequência-de-interação-do-chatbot)).

---

## Usuários

### Listar alunos
```
GET /api/chatbot/users
```
**Parâmetros (query, opcionais):**
- `phone`: telefone do aluno
- `course`: ID do curso — retorna apenas alunos com progresso nesse curso
- `user`: ID do aluno

Retorna apenas usuários com papel `estudante`. Se nenhum aluno corresponder aos filtros, retorna `[]`.

**Retorno:**
```json
[
  {
    "id": "string",
    "name": "string",
    "phone": "string",
    "courseProgresses": [
      {
        "_id": "string",
        "user": "string",
        "course": { "_id": "string", "name": "string" },
        "modules": [{ "module": "string", "createdAt": "Date" }],
        "topics": [{ "module": "string", "topic": "string", "createdAt": "Date" }],
        "createdAt": "Date",
        "updatedAt": "Date"
      }
    ]
  }
]
```

## Cursos

### Listar cursos
```
GET /api/chatbot/courses
```
**Parâmetros (query, opcionais):**
- `published`: `"true"` para retornar apenas cursos publicados

**Retorno:** lista de cursos (mesmo objeto `Course` de [docs/API.md](./docs/API.md#cursos)), ordenada por nome.

### Obter curso completo
```
GET /api/chatbot/courses/[id]
```
**Retorno:** `Course` com `modules[]`, e cada módulo com `topics[]` (conteúdo e questionários), ordenados por `order`.

**Erros:** 400 se o curso não existir.

### Progresso dos alunos em um curso
```
GET /api/chatbot/courses/[id]/progress
```
**Parâmetros (query, opcionais):**
- `userPhone`: telefone do aluno

Sem `userPhone`, retorna o progresso de todos os alunos do curso. Com `userPhone`, retorna apenas o progresso daquele aluno — e **retorna `[]` se o telefone não pertencer a nenhum usuário** (nunca devolve o progresso de outros alunos).

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

## Progresso

### Avançar o aluno para o próximo módulo
```
POST /api/chatbot/progress
```
**Body:**
```json
{ "courseId": "string", "userPhone": "string" }
```

**Comportamento:**
1. Localiza o aluno pelo telefone (400 se não existir).
2. Cria o registro de progresso do aluno no curso, se ainda não houver.
3. Marca como concluído o **primeiro módulo ainda não concluído** (na ordem do curso) e todos os seus tópicos.
4. Se todos os módulos já estiverem concluídos, não altera nada e retorna o progresso atual.

Cada chamada avança no máximo um módulo.

**Retorno:**
```json
{
  "_id": "string",
  "user": "string",
  "course": "string",
  "modules": [{ "module": "string", "createdAt": "Date" }],
  "topics": [{ "module": "string", "topic": "string", "createdAt": "Date" }],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Erros:** 400 se `courseId` ou `userPhone` estiverem ausentes/inválidos ou se o aluno não existir.

## Respostas

### Registrar resposta do aluno
```
POST /api/chatbot/answers
```
**Body:**
```json
{ "courseId": "string", "userPhone": "string", "question": "string", "answer": "string" }
```

**Comportamento:** localiza o aluno pelo telefone (400 se não existir) e acrescenta a pergunta/resposta ao registro de respostas do aluno no curso, criando o registro se necessário. As respostas aparecem no relatório de atividades do painel (`GET /api/reports/answers`).

**Retorno:**
```json
{
  "_id": "string",
  "user": "string",
  "course": "string",
  "answers": [{ "question": "string", "answer": "string", "createdAt": "Date" }],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Erros:** 400 se `courseId` ou `userPhone` estiverem ausentes/inválidos ou se o aluno não existir. `question` e `answer` são obrigatórios no banco: se vierem vazios, a gravação falha com erro 500.
