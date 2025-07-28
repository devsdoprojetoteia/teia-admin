# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado
- Sistema de progresso dos alunos em módulos e tópicos
- Página inicial pública com acesso sem autenticação
- Tela de detalhes do curso
- Lista de cursos publicados na home
- Novos campos no formulário de curso:
  - Duração do curso
  - Aprendizado esperado
  - Requisitos prévios
  - Equipe pedagógica
- Componentes especializados:
  - `TeamListForm.vue` para gerenciar equipe pedagógica
  - `TextListForm.vue` para listas de texto dinâmicas
  - `CourseProgress.vue` para visualização de progresso
- Token de autorização fixo para usuário do bot
- Suporte CORS para rotas da API
- Documentação da API atualizada

### Modificado
- Lógica de autenticação para permitir acesso público à tela inicial
- Componentes dinâmicos (`DynamicForm.vue`, `DynamicInput.vue`) aprimorados
- Formulário de curso com campos expandidos
- Modelos de dados para suportar novas funcionalidades

### Corrigido
- Redirecionamentos de autenticação
- Estrutura de rotas públicas

## [2025-07-09] - Formulário de Curso Aprimorado

### Adicionado
- Novos campos ao formulário de curso:
  - Duração do curso
  - Aprendizado esperado
  - Requisitos prévios
  - Equipe pedagógica
- Componente `TeamListForm.vue` para gerenciar equipe pedagógica
- Componente `TextListForm.vue` para listas de texto dinâmicas
- Campos adicionais no modelo de curso
- Atualizações na documentação da API

### Modificado
- `CourseForm.vue` com novos campos
- `DynamicForm.vue` e `DynamicInput.vue` aprimorados
- `UploadImage.vue` otimizado
- Página de detalhes do curso atualizada
- Endpoint de atualização de curso

## [2025-07-07] - Documentação e Detalhes do Curso

### Adicionado
- Documentação completa da API atualizada
- Tela de detalhes do curso (`pages/curso/[courseId]/index.vue`)
- Funcionalidade para visualizar informações completas do curso

### Modificado
- Modelos de curso expandidos
- Repositório de cursos atualizado
- Endpoint de busca de curso individual

## [2025-07-07] - Página Inicial Pública

### Adicionado
- Página inicial pública (`pages/index.vue`)
- Imagens de fundo e logo dos financiadores
- Layout público atualizado
- Assets visuais para a home

### Modificado
- Layout público para suportar página inicial
- Estilos CSS para nova página

## [2025-07-04] - Lista de Cursos Publicados

### Adicionado
- Rota para listar cursos publicados na home
- Endpoint `/courses/list-published.get.ts`
- Métodos no composable `useCourses.ts`
- Funcionalidade no repositório de cursos

## [2025-07-04] - Autenticação Pública

### Adicionado
- Lógica de autenticação para permitir acesso público
- Página inicial acessível sem login

### Modificado
- Middleware público atualizado
- Redirecionamentos de autenticação
- Páginas de cadastro e login ajustadas
- Painel administrativo reorganizado

## [2025-06-24] - Sistema de Progresso dos Alunos

### Adicionado
- Componente `CourseProgress.vue` para visualização de progresso
- Modelo `user-course-progress.ts` para gerenciar dados de progresso
- Endpoint `/courses/[id]/progress.get.ts` para buscar progresso
- Funcionalidades no composable `useCourses.ts`
- Métodos no repositório de cursos

### Modificado
- Página de módulos do curso com progresso
- Modelos de dados para suportar progresso

## [2025-06-XX] - Melhorias de Segurança

### Adicionado
- Token de autorização fixo para usuário do bot
- Suporte CORS para rotas da API

---

## Notas de Desenvolvimento

### Arquivos Principais Modificados
- `components/CourseForm.vue` - Formulário de curso aprimorado
- `components/CourseProgress.vue` - Visualização de progresso
- `components/TeamListForm.vue` - Gerenciamento de equipe pedagógica
- `components/TextListForm.vue` - Listas de texto dinâmicas
- `pages/index.vue` - Página inicial pública
- `pages/curso/[courseId]/index.vue` - Detalhes do curso
- `composables/useCourses.ts` - Funcionalidades de curso
- `server/api/courses/` - Endpoints de curso
- `models/course.ts` - Modelo de dados do curso

### Estatísticas de Desenvolvimento
- **Total de commits**: 10 commits principais
- **Arquivos modificados**: 40+ arquivos
- **Linhas adicionadas**: 1000+ linhas
- **Funcionalidades principais**: 6 grandes funcionalidades
- **Componentes criados**: 3 novos componentes
- **Endpoints adicionados**: 3 novos endpoints 