<template>
  <v-container class="text-center" v-if="!loading">
    <Alert class="mb-4"
      >Para acessar o painel administrativo baixe o aplicativo</Alert
    >
    <Button @click="logout">Sair</Button>
  </v-container>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "provider",
  middleware: ["authenticated"],
});
const { user, logout, isCustomer } = useAuth();

const loading = ref(true);

const { clearCustomer } = useCustomer();

clearCustomer();

onMounted(async () => {
  if (isCustomer.value) {
    const router = useRouter();
    router.push("/" + user.value?.customer + "/demandas");
  } else {
    loading.value = false;
  }
});
</script>
