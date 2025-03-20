<template>
  <section id="cover" class="d-flex justify-center align-center page-cover">
    <v-container>
      <div class="text-center cover">
        <div>
          <img
            v-if="provider.logo"
            :src="filesURL + provider.logo"
            class="logo mb-4"
            style="width: 150px"
          />
          <Text variant="h6" v-if="provider.name" class="mb-12">
            <strong>{{ provider.name }}</strong>
          </Text>
          <p v-if="provider.description" class="mb-12 text--secondary">
            {{ provider.description }}
          </p>
        </div>
        <div class="text-center">
          <v-btn color="primary" href="#presentation" class="mb-4" large>
            <Icon start icon="mdi-chevron-double-down" /> Quero conhecer mais
          </v-btn>
          <br />
          <v-btn color="primary" to="/atendimento" class="mb-4">
            <Icon start icon="mdi-login" /> Já sou cliente
          </v-btn>
          <div class="pt-10 mb-10" v-if="provider.phone">
            <v-btn
              color="success"
              :href="`https://api.whatsapp.com/send?phone=55${provider.phone.replace(
                /\D/g,
                ''
              )}`"
              target="_blank"
            >
              <Icon start icon="mdi-whatsapp" />
              Fale com a gente
            </v-btn>
          </div>
          <v-btn icon fab class="nav-btn" href="#presentation">
            <Icon icon="mdi-chevron-double-down" />
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
</template>
<script setup lang="ts">
const { provider } = useProvider();
const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;
</script>
