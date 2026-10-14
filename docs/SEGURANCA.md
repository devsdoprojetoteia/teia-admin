# Segurança — TEIA Admin

> Revisado em 14/10/2026. Descreve os controles implementados no código (`server/utils/authorize.ts`, `server/utils/input.ts`, `server/utils/upload-guard.ts`) e as pendências conhecidas.

## Variáveis de ambiente obrigatórias

| Variável | Uso | Se ausente |
|---|---|---|
| `SECRET_KEY` | Assina e valida os JWT de login | Login e rotas autenticadas retornam 500. Não há valor padrão. |
| `BOT_TOKEN` | Token fixo do chatbot (Typebot) | O acesso pelo chatbot fica desativado. Não há valor padrão. |
| `MONGO_URI` | Conexão com o MongoDB | — |
| `SPACES_KEY`, `SPACES_SECRET`, `SPACES_REGION`, `SPACES_BUCKET` | Armazenamento de arquivos | Uploads falham |

Os valores ficam apenas nas variáveis de ambiente do App Platform (DigitalOcean) e no arquivo `.env` local, que é ignorado pelo git.

## Autenticação de usuários

- Login por **telefone e senha**. As senhas são armazenadas com bcrypt (custo 10).
- O login retorna um JWT (HS256) com validade de 1 ano, enviado no header `Authorization: Bearer <token>`.
- Papéis: `administrador`, `tutor`, `estudante`. Cada endpoint declara os papéis aceitos; a matriz completa está em [API.md](./API.md#resumo-de-permissões).
- O cadastro público (`/api/register`) cria apenas usuários `estudante`. Somente administradores definem papéis.
- Respostas da API nunca incluem hash de senha nem dados de recuperação de senha (o modelo `User` remove esses campos na serialização).

### Recuperação de senha

- Código de 6 dígitos gerado com gerador criptográfico (`crypto.randomInt`).
- Validade de 30 minutos; no máximo 5 tentativas por código; o código é invalidado após o uso.
- Sem um código gerado e válido, a redefinição é sempre recusada.

## Token do chatbot

- O Typebot autentica com o token fixo `BOT_TOKEN`.
- **Escopo mínimo:** o token só é aceito nas rotas `/api/chatbot/*`. Em qualquer outra rota é recusado com 403, de modo que um vazamento do token não dá acesso à administração (usuários, cursos, uploads).
- A comparação do token é feita em tempo constante.
- Dentro do seu escopo, o token permite consultar cursos e registrar progresso/respostas de qualquer aluno informando o telefone. Por isso:
  - o token deve ficar apenas nas variáveis do Typebot, com acesso ao workspace restrito à equipe;
  - deve ser trocado periodicamente e sempre que alguém deixar a equipe ou houver suspeita de vazamento (basta alterar `BOT_TOKEN` no servidor e no Typebot).
- Toda a comunicação entre Typebot e API é feita por HTTPS.

## Validação de entrada

- Campos usados em consultas ao banco (telefone, senha, código, IDs) precisam ser strings. Objetos como `{"$ne": null}` são rejeitados com 400, o que impede *NoSQL injection* nos filtros do MongoDB.
- Telefones são normalizados para `(11) 11111-1111`.

## Uploads

- Restritos a administradores e tutores.
- Lista de tipos permitidos por endpoint. SVG e HTML são recusados (evita scripts servidos a partir do bucket).
- Limites de tamanho: imagem 15 MB, áudio 50 MB, documento 50 MB, vídeo 500 MB.
- O nome do arquivo no bucket é gerado pelo servidor (timestamp + valor aleatório), o que impede sobrescrever arquivos existentes.
- Os arquivos são públicos para leitura, pois são conteúdo dos cursos.

## Acesso público

Sem autenticação, só estão disponíveis:
- cadastro, login e recuperação de senha;
- lista de cursos publicados e conteúdo completo de cursos **publicados** (Portal TEIA).

Cursos não publicados exigem login de administrador ou tutor.

## Pendências conhecidas

| Item | Risco | Situação |
|---|---|---|
| Código de recuperação de senha não é enviado ao usuário (fica só no log do servidor) | Funcional: o usuário não consegue recuperar a senha sozinho | Pendente: integrar envio por WhatsApp/SMS |
| JWT com validade de 1 ano e papel embutido no token | Usuário removido ou rebaixado mantém acesso até o token expirar | Pendente: reduzir a validade e/ou validar o usuário no banco a cada requisição |
| Sem limite de requisições (*rate limiting*) em login e cadastro | Tentativas de senha por força bruta | Pendente: aplicar no proxy/App Platform ou na aplicação |
| Sem log de auditoria de chamadas por usuário | Rastreabilidade | Pendente (módulo 4, item desejável) |
| CORS liberado para qualquer origem em `/api/**` | Baixo: a autenticação é por header, não por cookie | Avaliar restrição aos domínios do projeto |
