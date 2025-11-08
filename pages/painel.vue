<template>
  <v-container class="px-3 py-6 fill-height d-flex align-center">
    <div v-if="auth.user.value?.role !== 'estudante'" class="w-100">
      <div class="mb-8">
        <h1 class="text-h3 font-weight-bold mb-4">Painel Administrativo</h1>
        <p class="text-body-1 text-medium-emphasis">
          <small>Gerencie suas contas, cursos, módulos, tópicos e conteúdos dos cursos do projeto TEIA.</small>
        </p>
      </div>

      <v-row justify="start" class="mt-8">
        <v-col cols="12" md="6">
          <NuxtLink to="/cursos"
            class="mx-auto d-block h-100 pa-4 border elevation-1 rounded-lg bg-white text-decoration-none">
            <div class="d-flex align-center justify-start h-100">
              <div class="mr-4">
                <v-avatar color="primary" size="64">
                  <Icon icon="mdi-book-open" size="32" />
                </v-avatar>
              </div>
              <div>
                <h5 class="text-h5 mb-1">Cursos</h5>
                <p class="text-body-1 text-medium-emphasis mb-0">Gerencie cursos e conteúdos educacionais</p>
              </div>
            </div>
          </NuxtLink>
        </v-col>
        <v-col cols="12" md="6">
          <NuxtLink to="/contas"
            class="mx-auto d-block h-100 pa-4 border elevation-1 rounded-lg bg-white text-decoration-none">
            <div class="d-flex align-center justify-start h-100">
              <div class="mr-4">
                <v-avatar color="primary" size="64">
                  <Icon icon="mdi-account-multiple" size="32" />
                </v-avatar>
              </div>
              <div>
                <h5 class="text-h5 mb-1">Contas</h5>
                <p class="text-body-1 text-medium-emphasis mb-0">Gerencie usuários e permissões do sistema</p>
              </div>
            </div>
          </NuxtLink>

        </v-col>
        <v-col cols="12" md="6">
          <NuxtLink to="/relatorios"
            class="mx-auto d-block h-100 pa-4 border elevation-1 rounded-lg bg-white text-decoration-none">
            <div class="d-flex align-center justify-start h-100">
              <div class="mr-4">
                <v-avatar color="primary" size="64">
                  <Icon icon="mdi-chart-bar" size="32" />
                </v-avatar>
              </div>
              <div>
                <h5 class="text-h5 mb-1">Progresso</h5>
                <p class="text-body-1 text-medium-emphasis mb-0">Gerencie relatórios de progresso dos alunos no chatbot
                </p>
              </div>
            </div>
          </NuxtLink>

        </v-col>
        <v-col cols="12" md="6">
          <NuxtLink to="/atividades"
            class="mx-auto d-block h-100 pa-4 border elevation-1 rounded-lg bg-white text-decoration-none">
            <div class="d-flex align-center justify-start h-100">
              <div class="mr-4">
                <v-avatar color="primary" size="64">
                  <Icon icon="mdi-message-text" size="32" />
                </v-avatar>
              </div>
              <div>
                <h5 class="text-h5 mb-1">Atividades</h5>
                <p class="text-body-1 text-medium-emphasis mb-0">Visualize e acompanhe respostas de estudantes no
                  chatbot</p>
              </div>
            </div>
          </NuxtLink>

        </v-col>
        <v-col cols="12" md="6">
          <NuxtLink to="/chatbot"
            class="mx-auto d-block h-100 pa-4 border elevation-1 rounded-lg bg-white text-decoration-none">
            <div class="d-flex align-center justify-start h-100">
              <div class="mr-4">
                <v-avatar color="primary" size="64">
                  <Icon icon="mdi-robot" size="32" />
                </v-avatar>
              </div>
              <div>
                <h5 class="text-h5 mb-1">Chatbot</h5>
                <p class="text-body-1 text-medium-emphasis mb-0">Gerencie os fluxos do chatbot</p>
              </div>
            </div>
          </NuxtLink>
        </v-col>

      </v-row>

      <br>

    </div>

    <div v-if="auth.user.value?.role === 'estudante'" class="w-100">
      <v-card class="mx-auto" max-width="500">
        <v-card-item>
          <Alert color="error" icon="mdi-information" class="mb-4">
            Você não tem permissão para acessar esse recurso.
          </Alert>
          <Button @click="logout" block color="primary" variant="elevated">
            Sair
          </Button>
        </v-card-item>
      </v-card>
    </div>
  </v-container>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  layout: "authenticated",
});

const auth = useAuth();
useHead({
  title: "Painel administrativo",
});

function logout() {
  useAuth().logout();
  window.location.reload();
}
</script>
