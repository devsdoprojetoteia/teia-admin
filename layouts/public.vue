<template>
  <v-app>
    <v-app-bar flat style="width: 100%">
      <v-app-bar-title>
        <NuxtLink to="/" class="text-decoration-none d-flex align-center">
          <img
            v-if="provider.logo"
            :src="filesURL + provider.logo"
            class="logo"
          />
          <span class="ml-4 text-subtitle-1">{{ provider.name }}</span>
        </NuxtLink>
      </v-app-bar-title>
      <template v-slot:append>
        <div class="d-flex align-center">
          <div class="d-none d-lg-block">
            <v-btn
              v-if="provider.about"
              class="font-weight-light"
              text
              size="small"
              href="#presentation"
              >Sobre nós</v-btn
            >
            <v-btn class="font-weight-light" text size="small" href="#services"
              >Serviços</v-btn
            >
            <v-btn class="font-weight-light" text size="small" href="#portfolio"
              >Portfólio</v-btn
            >
          </div>
          <SwitchTheme />
          <v-btn
            to="/atendimento"
            size="small"
            color="primary"
            variant="elevated"
          >
            <Icon start class="d-none d-lg-inline" icon="mdi-account-box" />
            Atendimento
          </v-btn>
        </div>
        <!-- <v-app-bar-naIcon></v-app-bar-naIcon> -->
      </template>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
    <Snackbar />
    <v-divider />
    <v-footer class="pa-4 justify-center">
      <div class="text-center pt-6">
        <Text variant="h4">Fale com a gente</Text>
        <p>
          <small>
            Nossa equipe está sempre pronta para responder às suas perguntas e
            ajudá-lo a encontrar a solução perfeita para a sua empresa.</small
          >
        </p>
        <div class="text-center">
          <Text type="p">Fale com a gente pelo WhatsApp:</Text>
          <v-btn
            v-if="provider.phone"
            color="success"
            x-large
            target="_blank"
            :href="`https://api.whatsapp.com/send?phone=55${provider.phone.replace(
              /\D/g,
              ''
            )}`"
            class="text-decoration-none mb-4"
          >
            <Icon start icon="mdi-whatsapp" />
            {{ provider.phone }}
          </v-btn>
          <div v-if="provider.email">
            <p class="pt-4">Ou envie um email para:</p>
            <p>
              <a
                class="dark text-decoration-none"
                @click="copy(provider?.email || '')"
              >
                <strong>{{ provider.email }}</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
const { provider } = useProvider();
const { $config } = useNuxtApp();
const { notifySuccess } = useNotify();
const filesURL = $config.public.filesURL;

async function copy(value: string) {
  if (!value) return;
  await navigator.clipboard.writeText(value);
  notifySuccess("Email copiado!");
}
</script>
