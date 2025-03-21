<template>
  <v-app-bar flat style="width: 100%">
    <v-app-bar-title>
      <NuxtLink to="/" class="text-decoration-none d-flex align-center">
        <img src="/img/logo.png" alt="Projeto teia" class="logo" />
      </NuxtLink>
    </v-app-bar-title>
    <template v-slot:append>
      <div class="d-flex align-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <Icon icon="mdi-menu" />
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
const { provider } = useProvider();
const config = useRuntimeConfig();
const filesURL = config.public.filesURL;
function logout() {
  useAuth().logout();
  window.location.reload();
}
</script>
