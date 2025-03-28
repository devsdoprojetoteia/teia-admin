<template>
  <v-app-bar flat style="width: 100%">
    <v-app-bar-title>
      <NuxtLink to="/" class="text-decoration-none d-flex align-center">
        <img src="/img/logo-horizontal.png" alt="Projeto teia" class="logo" />
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
            <v-list-item to="/contas" v-if="notStudent">
              <v-list-item-title>Contas</v-list-item-title>
            </v-list-item>
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
const config = useRuntimeConfig();
const filesURL = config.public.filesURL;
const auth = useAuth();
function logout() {
  auth.logout();
  window.location.reload();
}

// computed
const notStudent = computed(() => auth.user.value?.role !== "estudante");
</script>
