<template>
  <v-container class="px-3 py-6 fill-height justify-center">
    <div v-if="auth.user.value?.role !== 'estudante'">
      <v-btn
        to="/contas"
        variant="elevated"
        size="large"
        color="primary"
        class="mb-4"
      >
        <Icon icon="mdi-account-multiple" start />
        Contas
      </v-btn>
      <br />
      <v-btn
        to="/cursos"
        variant="elevated"
        size="large"
        color="primary"
        class="mb-4"
      >
        <Icon icon="mdi-book-open" start />
        Cursos
      </v-btn>
    </div>
    <div v-if="auth.user.value?.role === 'estudante'">
      <Alert color="error" icon="mdi-information">
        Você não tem permissão para acessar esse recurso.
      </Alert>
      <br />
      <Button @click="logout" block> Sair </Button>
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
