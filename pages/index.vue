<template>
  <div>
    <!-- {{ provider }} -->
    <!-- <Cover />
    <Presentation />
    <Services />
    <v-divider></v-divider>
    <Portfolio /> -->
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  layout: "provider",
});

const { provider } = useProvider();
useHead({
  title: provider.value?.description || provider.value?.name,
});
</script>
