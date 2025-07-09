<template>
  <v-container class="px-3 py-6 fill-height d-flex align-center">
    <div v-if="auth.user.value?.role !== 'estudante'" class="w-100">
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold mb-4">Painel Administrativo</h1>
        <p class="text-body-1 text-medium-emphasis">
          Gerencie suas contas, cursos, módulos, tópicos e conteúdos dos cursos do projeto Teia.
        </p>
      </div>

      <v-row justify="center" class="mt-8">
        <v-col cols="12" sm="6" md="4">
          <v-card to="/cursos" class="mx-auto h-100 pt-3" elevation="2" hover>
            <v-card-item class="d-flex flex-column align-center text-center">
              <v-avatar color="primary" size="64" class="mb-4">
                <Icon icon="mdi-book-open" size="32" />
              </v-avatar>
              <v-card-title class="text-h5 mb-2">Cursos</v-card-title>
              <v-card-subtitle class="text-center">Gerencie cursos e conteúdos educacionais</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card to="/contas" class="mx-auto h-100 pt-3" elevation="2" hover>
            <v-card-item class="d-flex flex-column align-center text-center">
              <v-avatar color="primary" size="64" class="mb-4">
                <Icon icon="mdi-account-multiple" size="32" />
              </v-avatar>
              <v-card-title class="text-h5 mb-2">Contas</v-card-title>
              <v-card-subtitle class="text-center">Gerencie usuários e permissões do sistema</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>

      </v-row>
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
