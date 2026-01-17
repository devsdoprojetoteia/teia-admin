<template>



  <div style="background-image: url('/img/background-about.png'); background-size: cover;">
    <div style="max-width: 1446px; margin: 0 auto;" class="bg-white">
      <v-responsive :aspect-ratio="16 / 9" class="d-none d-sm-flex">
        <div class="hero-banner d-flex flex-column justify-space-between justify-center text-center py-12"
          style="width: 100%; height: 100%;">
          <!-- Vídeo de fundo para desktop -->
          <video class="hero-video" autoplay muted loop playsinline
            aria-label="Vídeo de fundo decorativo mostrando a natureza amazônica">
            <source src="/videos/background-home.mp4" type="video/mp4">
          </video>

          <!-- Camada escura sobre o vídeo -->
          <div class="hero-dark-overlay"></div>

          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-8">
              <img src="/img/logo-ipe-home.svg" alt="Logo do IPÊ - Instituto de Pesquisas Ecológicas"
                style="max-width: 100%;" />
            </div>

            <h1 class="mb-4" style="color: #fff; max-width: 600px; font-weight: bold; font-size: 1.25rem;">
              Inclusão digital para conservar a Amazônia. O TEIA conecta pessoas, saberes e tecnologias para disseminar
              boas práticas e fortalecer quem cuida da floresta.
            </h1>
          </div>
          <div class="px-6 hero-overlay ">
            <div class="mb-4">
              <Text style="color: #fff; max-width: 600px;">
                Parceiros Financiadores
              </Text>
            </div>

            <img src="/img/logo-financiadores.svg"
              alt="Gráfico horizontal exibindo os logos dos parceiros e financiadores do projeto TEIA. As organizações representadas são: Mover-se na Web, uma iniciativa do Comitê Gestor da Internet no Brasil (CGI.br) executada pelo Núcleo de Informação e Coordenação do Ponto BR (NIC.br) através do Centro de Estudos sobre Tecnologias Web (Ceweb.br), LIRA/IPÊ - Instituto de Pesquisas Ecológicas, e Gordon and Betty Moore Foundation"
              style="max-width: 560px;" />
          </div>
        </div>
      </v-responsive>

      <!-- Versão para telas pequenas -->
      <v-responsive :aspect-ratio="4 / 4" class="d-flex d-sm-none">
        <div class="hero-banner d-flex flex-column justify-space-between justify-center text-center pa-3 py-12"
          style="width: 100%; height: 100%;">
          <!-- Vídeo de fundo para mobile -->
          <video class="hero-video" autoplay muted loop playsinline
            aria-label="Vídeo de fundo decorativo mostrando a natureza amazônica">
            <source src="/videos/background-home.mp4" type="video/mp4">
          </video>

          <!-- Camada escura sobre o vídeo -->
          <div class="hero-dark-overlay"></div>

          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-4">
              <img src="/img/logo-ipe-home.svg" alt="Logo do IPÊ - Instituto de Pesquisas Ecológicas"
                style="max-width: 200px;" />
            </div>
            <h1 class="mb-2" style="color: #fff; font-size: 1rem; font-weight: normal;">
              Inclusão digital para conservar a Amazônia. O TEIA conecta pessoas, saberes e tecnologias para disseminar
              boas práticas e fortalecer quem cuida da floresta.
            </h1>
          </div>
          <div class="hero-overlay text-center d-flex flex-column align-center justify-center">
            <div class="mb-4">
              <Text style="color: #fff; font-size: 12px;">
                Parceiros Financiadores
              </Text>
            </div>
            <div class="d-flex flex-row align-center justify-center gap-4">
              <img src="/img/logo-financiadores.svg"
                alt="Gráfico horizontal exibindo os logos dos parceiros e financiadores do projeto TEIA. As organizações representadas são: Mover-se na Web, uma iniciativa do Comitê Gestor da Internet no Brasil (CGI.br) executada pelo Núcleo de Informação e Coordenação do Ponto BR (NIC.br) através do Centro de Estudos sobre Tecnologias Web (Ceweb.br), LIRA/IPÊ - Instituto de Pesquisas Ecológicas, e Gordon and Betty Moore Foundation"
                style="max-width: 200px;" />
            </div>
          </div>
        </div>
      </v-responsive>
    </div>
    <div class="bg-transparent">
      <v-container style="max-width: 1024px;">
        <!-- Sobre o TEIA -->
        <section class="py-12" id="sobre">
          <h2 class="mb-6 text-center" style="color: #00592d; font-weight: bold; font-size: 2rem;">Sobre o TEIA</h2>
          <div class="mb-6 text-center ">
            <Text class="mb-8 text-h6">
              O TEIA é uma tecnologia social em educação criada pelo IPÊ para levar cursos a comunidades com baixo
              acesso
              à internet. A plataforma combina um Portal de Cursos e um chatbot acessível por aplicativos de mensagem,
              facilitando o aprendizado mesmo em regiões com infraestrutura limitada.
            </Text>
          </div>
          <div class="mb-6 text-center ">
            <Text class="mb-8 text-h6">
              Desenvolvido com base em tecnologias abertas, o TEIA foi pensado para fortalecer pessoas e organizações
              que
              atuam pela conservação da Amazônia e promover ambientes digitais mais leves, acessíveis e acolhedores.
            </Text>
          </div>
          <div class="mb-6 text-center ">
            <Text class="mb-8 text-h6">
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
      <v-container style="max-width: 1024px;">
        <!-- Cursos -->
        <section id="cursos">
          <h2 class="mb-8 text-center" style="color: #215c2e; font-weight: bold; font-size: 2rem;">Cursos</h2>
          <Row class="mb-8">
            <Col v-for="(course, index) in courses" :key="course.id" cols="12" md="6">
              <Card class="course-card pa-6 d-flex flex-column justify-space-between rounded-0 h-100"
                :color="(Math.floor(index / 2) + index) % 2 === 0 ? '#235A33' : '#00644A'">
                <div class="mb-4">
                  <h3 class="mb-4 text-center" style="font-weight: bold; font-size: 1.5rem;">{{ course.name }}</h3>
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
                  <Button :to="`/curso/${course.id}`" rounded="lg"
                    :aria-label="`Ver detalhes completos da trilha informativa: ${course.name}. Acesse informações sobre módulos, aulas, requisitos e equipe pedagógica`">Ver
                    Detalhes</Button>
                </div>

              </Card>
            </Col>
          </Row>
        </section>
      </v-container>
    </div>
  </div>

  <div style="background-color: #235A33;" class="py-12 text-white">
    <v-container style="max-width: 1024px;">
      <section id="participe">
        <h2 class="mb-8 text-center" style="color: #fff; font-weight: bold; font-size: 2rem;">Faça parte dessa TEIA</h2>
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
    <v-container style="max-width: 1024px;">
      <!-- Newsletter e Rodapé -->
      <v-footer class="footer-section pa-8 mt-8 text-white" style="background-color: #242424;" role="contentinfo">
        <div>
          <Row>
            <Col cols="12" md="4" class="mb-6 mb-md-0">
              <h3 class="mb-2" style="font-weight: bold; font-size: 1.25rem;">Onde estamos</h3>
              <address style="font-style: normal;">
                <strong>
                  Sede Nazaré
                </strong>
                <div>Rod. Dom Pedro I, km 47</div>
                <div>Nazaré Paulista, SP, Brasil</div>
                <div>Caixa Postal 47 - 12960-000</div>
                <div>Tel: <a href="tel:+551135900341" class="text-white text-decoration-none">+55 (11) 3590-0341</a>
                </div>
              </address>
              <div class="mt-2">
                <div>
                  <a href="https://ipe.org.br/?page_id=6064"
                    class="text-white font-weight-bold text-decoration-none">Mapa para o IPÊ</a>
                </div>
                <div>
                  <a href="https://ipe.org.br/?page_id=6064"
                    class="text-white font-weight-bold text-decoration-none">Escritórios</a>
                </div>
              </div>
            </Col>
            <Col cols="12" md="4" class="mb-6 mb-md-0" style="background-color: #111111;">
              <div class="text-center">
                <h3 class="mb-2" style="font-weight: bold; font-size: 1.25rem;">News IPÊ</h3>
                <div class="mb-2">Cadastre-se para ficar por dentro das novidades!</div>
              </div>
              <!-- <v-form action="https://cta-redirect.rdstation.com/v2/conversions" method="post"> -->
              <!-- <v-text-field label="Nome" variant="solo" class="mb-2" density="compact" hide-details />
              <v-text-field label="Email" variant="solo" class="mb-2" density="compact" hide-details /> -->
              <Button color="success" block href="https://ipe.org.br#conversion-form-newsletter-rodape-site"
                target="_blank"
                aria-label="Quero me inscrever :). Ir para página de cadastro na newsletter do IPÊ para receber novidades">Quero
                me inscrever :)</Button>
              <!-- </v-form> -->
              <div class="mt-2" style="font-size: 0.8rem; color: #bbb;">
                Prometemos não utilizar suas informações de contato para enviar qualquer tipo de SPAM.
              </div>
            </Col>
            <Col cols="12" md="4">
              <h3 class="mb-2" style="font-weight: bold; font-size: 1.25rem;">Redes Sociais</h3>
              <div class="d-flex flex-column gap-2">
                <a href="https://www.facebook.com/ipe.instituto.pesquisas.ecologicas" target="_blank"
                  style="color: #fff;" class="text-decoration-none"
                  aria-label="Acesse a página do IPÊ no Facebook (abre em nova aba)">
                  <Icon icon="mdi-facebook" class="mr-2" />
                  Facebook
                </a>
                <a href="https://twitter.com/InstitutoIPE" target="_blank" style="color: #fff;"
                  class="text-decoration-none" aria-label="Acesse a página do IPÊ no Twitter (abre em nova aba)">
                  <Icon icon="mdi-twitter" class="mr-2" />
                  Twitter
                </a>
                <a href="https://www.instagram.com/institutoipe/" target="_blank" style="color: #fff;"
                  class="text-decoration-none" aria-label="Acesse a página do IPÊ no Instagram (abre em nova aba)">
                  <Icon icon="mdi-instagram" class="mr-2" />
                  Instagram
                </a>
                <a href="https://www.youtube.com/channel/UCxsLeAueuL-eMIJy6qif9_g/videos" target="_blank"
                  style="color: #fff;" class="text-decoration-none"
                  aria-label="Acesse o canal do IPÊ no YouTube (abre em nova aba)">
                  <Icon icon="mdi-youtube" class="mr-2" />
                  Youtube
                </a>
                <a href="https://www.linkedin.com/company/ip%C3%AA---instituto-de-pesquisas-ecol%C3%B3gicas"
                  target="_blank" style="color: #fff;" class="text-decoration-none"
                  aria-label="Acesse a página do IPÊ no LinkedIn (abre em nova aba)">
                  <Icon icon="mdi-linkedin" class="mr-2" />
                  Linkedin
                </a>
              </div>
            </Col>
          </Row>
          <v-divider class="my-6" />
          <div class="text-center" style="font-size: 0.9rem; color: #bbb;">
            <a href="/termos-de-uso.html" class="text-decoration-none text-white" target="_blank">Termos de Uso</a>
            | <a href="/politica-de-privacidade.html" target="_blank" class="text-decoration-none text-white">Política
              de privacidade</a> | <a href="https://ipe.org.br/?page_id=8937" target="_blank"
              class="text-decoration-none text-white">Contate-nos</a><br />
            Copyright © IPÊ - Instituto de Pesquisas Ecológicas.<br />
            Email: redelira@ipe.org.br
          </div>
        </div>
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

/* Melhorias de contraste para textos sobre o vídeo de fundo */
.hero-overlay .text-h6,
.hero-overlay Text {
  /* Sombra de texto para garantir legibilidade mesmo em áreas claras do vídeo */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6);
  color: #ffffff !important;
}

/* Texto pequeno precisa de mais contraste */
.hero-overlay Text[style*="font-size: 12px"] {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 6px rgba(0, 0, 0, 0.7);
  font-weight: 600 !important;
}

.hero-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Opacidade ajustada para equilibrar visibilidade do vídeo e contraste do texto */
  /* As sombras de texto garantem contraste WCAG AA mesmo com opacidade menor */
  /* Valores: 0 = transparente, 1 = totalmente preto */
  background-color: rgba(0, 0, 0, 0.55);
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
