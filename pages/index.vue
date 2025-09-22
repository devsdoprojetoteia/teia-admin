<template>



  <div style="background-image: url('/img/background-about.png'); background-size: cover;">
    <div style="max-width: 1446px; margin: 0 auto;" class="bg-white">
      <v-responsive :aspect-ratio="16 / 9" class="d-none d-sm-flex">
        <div class="hero-banner d-flex flex-column justify-space-between justify-center text-center py-12"
          style="width: 100%; height: 100%;">
          <!-- Vídeo de fundo para desktop -->
          <video class="hero-video" autoplay muted loop playsinline>
            <source src="/videos/background-home.mp4" type="video/mp4">
          </video>

          <!-- Camada escura sobre o vídeo -->
          <div class="hero-dark-overlay"></div>

          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-8">
              <img src="/img/logo-ipe-home.svg" alt="Financiadores" style="max-width: 100%;" />
            </div>

            <Text variant="h6" class="mb-4" style="color: #fff; max-width: 600px;" weight="bold">
              Inclusão digital para conservar a Amazônia. O TEIA conecta pessoas, saberes e tecnologias para disseminar
              boas práticas e fortalecer quem cuida da floresta.
            </Text>
          </div>
          <div class="px-6 hero-overlay ">
            <div class="mb-4">
              <Text style="color: #fff; max-width: 600px;">
                Parceiros Financiadores
              </Text>
            </div>

            <img src="/img/logo-financiadores.svg" alt="Financiadores" style="max-width: 560px;" />
          </div>
        </div>
      </v-responsive>

      <!-- Versão para telas pequenas -->
      <v-responsive :aspect-ratio="4 / 4" class="d-flex d-sm-none">
        <div class="hero-banner d-flex flex-column justify-space-between justify-center text-center pa-3 py-12"
          style="width: 100%; height: 100%;">
          <!-- Vídeo de fundo para mobile -->
          <video class="hero-video" autoplay muted loop playsinline>
            <source src="/videos/background-home.mp4" type="video/mp4">
          </video>

          <!-- Camada escura sobre o vídeo -->
          <div class="hero-dark-overlay"></div>

          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-4">
              <img src="/img/logo-ipe-home.svg" alt="Financiadores" style="max-width: 200px;" />
            </div>
            <Text class="mb-2" style="color: #fff; ">
              Inclusão digital para conservar a Amazônia. O TEIA conecta pessoas, saberes e tecnologias para disseminar
              boas práticas e fortalecer quem cuida da floresta.
            </Text>
          </div>
          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-4">
              <Text style="color: #fff; font-size: 12px;">
                Parceiros Financiadores
              </Text>
            </div>
            <div class="d-flex flex-row align-center justify-center gap-4">
              <img src="/img/logo-financiadores.svg" alt="Financiadores" style="max-width: 200px;" />
            </div>
          </div>
        </div>
      </v-responsive>
    </div>
    <div class="bg-transparent">
      <v-container>
        <!-- Sobre o LIRA -->
        <section class="py-12" id="sobre">
          <Text variant="h4" weight="bold" class="mb-6 text-center" color="primary">Sobre o TEIA</Text>
          <div class="mb-6">
            <Text class="text-center mb-8" variant="h6">
              O TEIA é uma tecnologia social em educação criada pelo IPÊ para levar cursos a comunidades com baixo
              acesso
              à internet. A plataforma combina um Portal de Cursos e um chatbot acessível por aplicativos de mensagem,
              facilitando o aprendizado mesmo em regiões com infraestrutura limitada.
            </Text>
          </div>
          <div class="mb-6">
            <Text class="text-center mb-8" variant="h6">
              Desenvolvido com base em tecnologias abertas, o TEIA foi pensado para fortalecer pessoas e organizações
              que
              atuam pela conservação da Amazônia e promover ambientes digitais mais leves, acessíveis e acolhedores.
            </Text>
          </div>
          <div class="mb-6">
            <Text class="text-center mb-8" variant="h6">
              Selecionado entre os 20 projetos da chamada Mover-se na Web, uma iniciativa do Comitê Gestor da Internet
              no
              Brasil (CGI.br), o TEIA é executado pelo NIC.br por meio do Ceweb.br, com apoio do projeto LIRA/IPÊ, que
              atualmente desenvolve a Trilha Formativa das Organizações do Fundo LIRA, voltada ao desenvolvimento
              institucional das organizações apoiadas. </Text>
          </div>
        </section>
      </v-container>
    </div>

    <div class="bg-transparent pt-12">
      <v-container>
        <!-- Cursos -->
        <section id="cursos">
          <Text variant="h4" weight="bold" class="mb-8 text-center" style="color: #215c2e;">Cursos</Text>
          <Row class="mb-8">
            <Col v-for="(course, index) in courses" :key="course.id" cols="12" md="6">
            <Card class="course-card pa-6 d-flex flex-column justify-space-between rounded-0"
              :color="index % 2 === 0 ? '#235A33' : '#00644A'">
              <div class="mb-4">
                <Text variant="h5" weight="bold" class="mb-4 text-center">{{ course.name }}</Text>
                <div class="d-flex align-center justify-start" style="width: 100%;">
                  <Text style="
                      font-size: 14px;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      min-height: calc(1.5em * 3);
                      line-height: 1.5em;
                      max-height: calc(1.5em * 3);
                      white-space: normal;
                    ">{{ course.description }}</Text>
                </div>
              </div>
              <div class="text-center">
                <div class="mb-4" v-if="course.duration">
                  <Icon icon="mdi-clock-outline" class="mr-1" />
                  <small>{{ course.duration }}</small>
                </div>
                <Button :to="`/curso/${course.id}`" rounded="lg">Ver Detalhes</Button>
              </div>

            </Card>
            </Col>
          </Row>
        </section>
      </v-container>
    </div>
  </div>

  <div style="background-color: #235A33;" class="py-12 text-white">
    <v-container>
      <section id="cursos">
        <Text variant="h4" weight="bold" class="mb-8 text-center" style="color: #fff;">Faça parte dessa TEIA</Text>
        <div style="max-width: 700px; margin: 0 auto;" class="text-center">
          <Text weight="bold" class="mb-8 text-center" style="color: #fff;">
            Sua organização quer desenvolver cursos para públicos com acesso limitado à internet?
            Escreva para teia.cursos@ipe.org.br e venha tecer essa rede com a gente.
          </Text>
        </div>

      </section>
    </v-container>
  </div>

  <div style="background-color: #242424;" id="contato">
    <v-container>
      <!-- Newsletter e Rodapé -->
      <v-footer class="footer-section pa-8 mt-8 text-white" style="background-color: #242424;">
        <section>
          <Row>
            <Col cols="12" md="4" class="mb-6 mb-md-0">
            <Text variant="h6" weight="bold" class="mb-2">Onde estamos</Text>
            <div>
              <strong>
                Sede Nazaré
              </strong>
              <br />Rod. Dom Pedro I, km 47<br />Nazaré Paulista, SP, Brasil<br />Caixa Postal 47 –
              12960-000<br />Tel: +55 (11) 3590-0341
            </div>
            <div class="mt-2">
              <a href="https://ipe.org.br/?page_id=6064" class="text-primary font-weight-bold text-decoration-none">Mapa
                para o
                IPÊ</a>
              <br>
              <a href="https://ipe.org.br/?page_id=6064"
                class="text-primary font-weight-bold text-decoration-none">Escritórios</a>
            </div>
            </Col>
            <Col cols="12" md="4" class="mb-6 mb-md-0" style="background-color: #111111;">
            <div class="text-center">
              <Text variant="h6" weight="bold" class="mb-2">News IPÊ</Text>
              <div class="mb-2">Cadastre-se para ficar por dentro das novidades!</div>
            </div>
            <v-form action="https://cta-redirect.rdstation.com/v2/conversions" method="post">
              <v-text-field label="Nome" variant="solo" class="mb-2" density="compact" hide-details />
              <v-text-field label="Email" variant="solo" class="mb-2" density="compact" hide-details />
              <Button color="success" block>Quero me inscrever :)</Button>
            </v-form>
            <div class="mt-2" style="font-size: 0.8rem; color: #bbb;">
              Prometemos não utilizar suas informações de contato para enviar qualquer tipo de SPAM.
            </div>
            </Col>
            <Col cols="12" md="4">
            <Text variant="h6" weight="bold" class="mb-2">Redes Sociais</Text>
            <div class="d-flex flex-column gap-2">
              <a href="https://www.facebook.com/ipe.instituto.pesquisas.ecologicas" target="_blank" style="color: #fff;"
                class="text-decoration-none">
                <Icon icon="mdi-facebook" class="mr-2" />
                Facebook
              </a>
              <a href="https://twitter.com/InstitutoIPE" target="_blank" style="color: #fff;"
                class="text-decoration-none">
                <Icon icon="mdi-twitter" class="mr-2" />
                Twitter
              </a>
              <a href="https://www.instagram.com/institutoipe/" target="_blank" style="color: #fff;"
                class="text-decoration-none">
                <Icon icon="mdi-instagram" class="mr-2" />
                Instagram
              </a>
              <a href="https://www.youtube.com/channel/UCxsLeAueuL-eMIJy6qif9_g/videos" target="_blank"
                style="color: #fff;" class="text-decoration-none">
                <Icon icon="mdi-youtube" class="mr-2" />
                Youtube
              </a>
              <a href="https://www.linkedin.com/company/ip%C3%AA---instituto-de-pesquisas-ecol%C3%B3gicas"
                target="_blank" style="color: #fff;" class="text-decoration-none">
                <Icon icon="mdi-linkedin" class="mr-2" />
                Linkedin
              </a>
            </div>
            </Col>
          </Row>
          <v-divider class="my-6" />
          <div class="text-center" style="font-size: 0.9rem; color: #bbb;">
            <a href="#" class="text-decoration-none text-white">Termos de Uso</a>
            | <a href="https://ipe.org.br/downloads/programa-de-privacidade.pdf" target="_blank"
              class="text-decoration-none text-white">Política de privacidade</a> | <a
              href="https://ipe.org.br/?page_id=8937" target="_blank"
              class="text-decoration-none text-white">Contate-nos</a><br />
            Copyright © IPÊ – Instituto de Pesquisas Ecológicas.<br />
            Email: redelira@ipe.org.br
          </div>
        </section>
      </v-footer>
    </v-container>
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useCourses from '~/composables/useCourses';
import Text from '~/components/Text.vue';
import Button from '~/components/Button.vue';
import Card from '~/components/Card.vue';
import Row from '~/components/Row.vue';
import Col from '~/components/Col.vue';
import Chip from '~/components/Chip.vue';
import Icon from '~/components/Icon.vue';
import type Course from '~/models/course';

const courses = ref<Course[]>([]);
const { getPublishedCourses } = useCourses();

// Configuração do vídeo de fundo
// Para usar vídeo do YouTube, substitua VIDEO_ID pelo ID do vídeo desejado
// Exemplo: se o link for https://www.youtube.com/watch?v=abc123, use VIDEO_ID = "abc123"
const youtubeVideoId = "VIDEO_ID"; // Substitua pelo ID do seu vídeo do YouTube

definePageMeta({
  layout: "public",
});

onMounted(async () => {
  courses.value = await getPublishedCourses();
});
</script>

<style scoped>
.hero-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-video-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-overlay {
  position: relative;
  z-index: 2;
}

.hero-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Ajuste a opacidade da camada escura alterando o último valor (0.4) */
  /* Valores: 0 = transparente, 1 = totalmente preto */
  /* Recomendado: entre 0.3 e 0.6 para boa legibilidade */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  /* Entre o vídeo (z-index: 1) e o conteúdo (z-index: 2) */
}

.course-card {
  background: #215c2e;
  color: #fff;
  border-radius: 16px;
  min-height: 220px;
}
</style>
