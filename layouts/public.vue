<template>
  <v-app>
    <v-app-bar flat style="width: 100%">
      <v-app-bar-title>
        <NuxtLink to="/" class="text-decoration-none d-flex align-center">
          <img src="/img/logo-horizontal.png" alt="Projeto teia" class="logo" />
        </NuxtLink>
      </v-app-bar-title>
      <template v-slot:append>
        <div class="d-flex align-center">
          <div class="d-none d-lg-block"></div>
          <v-btn to="/entrar" color="primary" variant="elevated" class="mr-3">
            Entrar
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
    <Snackbar />
    <v-divider />
    <!-- <v-footer
      class="pa-4 justify-center bg-white"
      style="background-color: #ffffff !important"
    >
      <div class="text-center pt-6">
        <div>
          <img src="/img/logo-horizontal.png" alt="Projeto teia" class="logo" />
        </div>
      </div>
    </v-footer> -->
  </v-app>
</template>
<script setup lang="ts">
const { $config } = useNuxtApp();
const { notifySuccess } = useNotify();
const filesURL = $config.public.filesURL;
const { isAuthenticated } = useAuth();
import { useRoute } from "vue-router";
const route = useRoute();
const currentPath = route.path;
async function copy(value: string) {
  if (!value) return;
  await navigator.clipboard.writeText(value);
  notifySuccess("Email copiado!");
}
</script>
