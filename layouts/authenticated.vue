<template>
  <v-app full-height>
    <v-app-bar flat style="width: 100%" class="bg-primary">
      <v-app-bar-title style="width: 200px; margin-inline-end: 20px;" class="d-flex align-center justify-center">
        <NuxtLink to="/painel" class="text-decoration-none d-flex align-center">
          <img src="/img/logo-horizontal.png" alt="Projeto TEIA" class="logo" />
        </NuxtLink>
      </v-app-bar-title>
      <template v-slot:prepend>
        <div class="d-flex align-center">
          <v-app-bar-nav-icon variant="text" @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
        </div>
      </template>
      <template v-slot:append>
        <div style="width: 80px;">

        </div>
      </template>
    </v-app-bar>
    <div class="d-flex" style="min-height: calc(100vh);">
      <v-navigation-drawer class="sidebar bg-primary" :width="220" v-model="sidebar">

        <div class="text-white px-2 pt-4">

          <NuxtLink to="/painel" class="sidebar-link" :class="{ 'active': $route.path.startsWith('/painel') }">
            <Icon icon="mdi-home" />
            <span>Início</span>
          </NuxtLink>
          <NuxtLink to="/cursos" v-if="notStudent" class="sidebar-link"
            :class="{ 'active': $route.path.startsWith('/cursos') }">
            <Icon icon="mdi-book-open" />
            <span>Cursos</span>
          </NuxtLink>
          <NuxtLink to="/relatorios" v-if="notStudent" class="sidebar-link"
            :class="{ 'active': $route.path.startsWith('/relatorios') }">
            <Icon icon="mdi-chart-bar" />
            <span>Relatórios</span>
          </NuxtLink>
          <NuxtLink to="/atividades" v-if="notStudent" class="sidebar-link"
            :class="{ 'active': $route.path.startsWith('/atividades') }">
            <Icon icon="mdi-message-text" />
            <span>Atividades</span>
          </NuxtLink>
          <NuxtLink to="/contas" v-if="notStudent" class="sidebar-link"
            :class="{ 'active': $route.path.startsWith('/contas') }">
            <Icon icon="mdi-account-multiple" />
            <span>Contas</span>
          </NuxtLink>
          <NuxtLink href="https://teia-typebot.ipe.org.br" target="_blank" class="sidebar-link" v-if="notStudent">
            <Icon icon="mdi-robot" />
            <span>Chatbot</span>
          </NuxtLink>
          <NuxtLink @click="logout" class="sidebar-link">
            <Icon icon="mdi-logout" />
            <span>Sair</span>
          </NuxtLink>
        </div>
      </v-navigation-drawer>
      <v-main>
        <NuxtPage />
      </v-main>
    </div>
    <Snackbar />
  </v-app>
</template>
<script lang="ts" setup>

const auth = useAuth();
const sidebar = ref(false);
function logout() {
  auth.logout();
  window.location.reload();
}

const notStudent = computed(() => auth.user.value?.role !== "estudante");
const { isMobile } = useBreakpoints();
// after 1 second, close the sidebar
setTimeout(() => {
  if (isMobile.value) {
    sidebar.value = false;
  } else {
    sidebar.value = true;
  }
}, 500);

</script>
<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #fff !important;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>