<template>
  <div class="px-3 py-6">
    <v-btn to="/usuarios" block variant="elevated" size="large" color="success">
      <Icon icon="mdi-account-multiple" start />
      Usuários
    </v-btn>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  layout: "provider",
});

useHead({
  title: "Usuários",
});
</script>
