<template>
  <v-app>

    <v-main>
      <div class=" bg-white">
        <div style="width: 100%; max-width: 1446px; margin: 0 auto;"
          class="d-flex justify-space-between align-center pa-4">
          <div>
            <NuxtLink to="/" class="text-decoration-none d-flex align-center">
              <img src="/img/logo-horizontal.png" alt="Projeto teia" class="logo" />
            </NuxtLink>
          </div>
          <div class="flex-grow-1 d-sm-flex justify-space-around d-none" style="max-width: 500px;">
            <NuxtLink to="/#cursos" class="text-decoration-none text-primary font-weight-bold">
              Cursos
            </NuxtLink>
            <NuxtLink to="/#sobre" class="text-decoration-none text-primary font-weight-bold">
              Sobre o lira
            </NuxtLink>
            <NuxtLink to="/#contato" class="text-decoration-none text-primary font-weight-bold">
              Fale conosco
            </NuxtLink>
          </div>
          <div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" elevation="0">
                  <Icon icon="mdi-menu" />
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <NuxtLink to="/#cursos" class="text-decoration-none text-primary font-weight-bold">
                    Cursos
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink to="/#sobre" class="text-decoration-none text-primary font-weight-bold">
                    Sobre o lira
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink to="/#contato" class="text-decoration-none text-primary font-weight-bold">
                    Fale conosco
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/painel" color="primary" variant="elevated" class="w-100">
                    Painel administrativo
                  </v-btn>
                </v-list-item>
              </v-list>

            </v-menu>
          </div>
        </div>
      </div>

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

useHead({
  title: "Teia",
});
</script>
