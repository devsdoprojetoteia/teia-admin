<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    v-if="provider.about"
    id="presentation"
    class="py-16 d-flex align-center alternative-bg"
  >
    <v-container class="py-16">
      <Text variant="h2">Sobre nós</Text>
      <div v-html="provider.about"></div>
    </v-container>
  </section>
</template>
<script setup lang="ts">
const { provider } = useProvider();
</script>
