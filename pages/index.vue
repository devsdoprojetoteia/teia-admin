<template>
  <v-container class="px-3 py-6 fill-height justify-center">
    <v-btn
      to="/contas"
      variant="elevated"
      size="large"
      color="primary"
      v-if="auth.user.value?.role !== 'estudante'"
    >
      <Icon icon="mdi-account-multiple" start />
      Contas
    </v-btn>
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
