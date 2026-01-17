<template>
  <v-app>
    <!-- Link para pular para o conteúdo principal (WCAG 2.4.1) -->
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
    
    <v-main id="main-content" tabindex="-1">
      <div class=" bg-white">
        <div style="width: 100%; max-width: 1446px; margin: 0 auto;"
          class="d-flex justify-space-between align-center pa-4">
          <div>
            <NuxtLink to="/" class="text-decoration-none d-flex align-center">
              <img src="/img/logo-horizontal.png" alt="Projeto TEIA" class="logo" />
            </NuxtLink>
          </div>
          <div class="flex-grow-1 d-sm-flex justify-space-around d-none" style="max-width: 500px;">
            <NuxtLink to="/#cursos" class="text-decoration-none text-primary font-weight-bold">
              Cursos
            </NuxtLink>
            <NuxtLink to="/#sobre" class="text-decoration-none text-primary font-weight-bold">
              Sobre o TEIA
            </NuxtLink>
            <NuxtLink to="/#contato" class="text-decoration-none text-primary font-weight-bold">
              Fale conosco
            </NuxtLink>
          </div>
          <div style="width: 80px;" class="d-none d-sm-block"></div>
          <div class="d-sm-none d-block">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" elevation="0" aria-label="Abrir menu de navegação principal">
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
                    Sobre o TEIA
                  </NuxtLink>
                </v-list-item>
                <v-list-item>
                  <NuxtLink to="/#contato" class="text-decoration-none text-primary font-weight-bold">
                    Fale conosco
                  </NuxtLink>
                </v-list-item>
                <!-- <v-list-item>
                  <v-btn to="/painel" color="primary" variant="elevated" class="w-100">
                    Painel administrativo
                  </v-btn>
                </v-list-item> -->
              </v-list>

            </v-menu>
          </div>
        </div>
      </div>

      <NuxtPage />
    </v-main>
    <!-- Slot para footer fora do main (ARIA11 - WCAG) -->
    <div id="footer-teleport-target"></div>
    <Snackbar />
    <v-divider />
    <!-- <v-footer
      class="pa-4 justify-center bg-white"
      style="background-color: #ffffff !important"
    >
      <div class="text-center pt-6">
        <div>
          <img src="/img/logo-horizontal.png" alt="Projeto TEIA" class="logo" />
        </div>
      </div>
    </v-footer> -->
  </v-app>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const { notifySuccess } = useNotify();
const { isAuthenticated } = useAuth();
const config = useRuntimeConfig();
const filesURL = config.public.filesURL;
const route = useRoute();
const currentPath = route.path;
async function copy(value: string) {
  if (!value) return;
  await navigator.clipboard.writeText(value);
  notifySuccess("Email copiado!");
}

useHead({
  title: "TEIA",
});
</script>
