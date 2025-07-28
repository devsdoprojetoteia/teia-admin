<template>


  <div style="max-width: 1446px; margin: 0 auto;" class="bg-white">
    <v-responsive :aspect-ratio="16 / 9" class="d-none d-sm-flex">
      <div class="hero-banner d-flex flex-column align-center justify-center text-center "
        style="width: 100%; height: 100%;">
        <div class="hero-overlay">
          <Text variant="h3" weight="bold" class="mb-6" style="color: #fff;">
            Teia: Inclusão Digital para <br />Conservação da Amazônia
          </Text>
          <Text variant="h6" class="mb-4" style="color: #fff;">
            Educação digital como ferramenta estratégica para a <br />conservação socioambiental da Amazônia
          </Text>
          <div class="d-flex flex-row align-center justify-center gap-4">
            <img src="/img/logo-financiadores.svg" alt="Financiadores" style="max-width: 50%;" />
          </div>
        </div>
      </div>
    </v-responsive>

    <!-- Versão para telas pequenas -->
    <v-responsive :aspect-ratio="4 / 4" class="d-flex d-sm-none">
      <div class="hero-banner d-flex flex-column align-center justify-center text-center pa-3"
        style="width: 100%; height: 100%;">
        <div class="hero-overlay">
          <Text variant="h3" weight="bold" class="mb-4" style="color: #fff;">
            Teia: Inclusão Digital para Conservação da Amazônia
          </Text>
          <Text variant="h6" class="mb-2" style="color: #fff;">
            Educação digital como ferramenta estratégica para a conservação socioambiental da Amazônia
          </Text>
          <div class="d-flex flex-row align-center justify-center gap-4">
            <img src="/img/logo-financiadores.svg" alt="Financiadores" style="max-width: 200px;" />
          </div>
        </div>
      </div>
    </v-responsive>
  </div>
  <div style="background-image: url('/img/background-about.png'); background-repeat: repeat-x;" class="bg-white">
    <v-container>
      <!-- Sobre o LIRA -->
      <section class="py-12" id="sobre">
        <Text variant="h3" weight="bold" class="mb-6 text-center" color="primary">Sobre o LIRA</Text>
        <div class="mb-6">
          <Text class="text-center mb-8" variant="h6">
            O LIRA - Legado Integrado da Região Amazônica surgiu em 2019, uma iniciativa com abordagem integrativa
            criada
            para fomentar projetos colaborativos intersetoriais. Conheça:
          </Text>
        </div>
        <div class="d-flex justify-center mb-6">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/NFfMBSbGb-U" title="YouTube video player"
            frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 12px;"></iframe>
        </div>
        <Text class="text-center" weight="bold">
          O LIRA é mais do que uma iniciativa, é uma jornada contínua pela sustentabilidade e conservação da maior
          floresta tropical do mundo. Acreditamos no valor da incrível teia de relações biológicas e sociais que
          sustentam
          o bioma amazônico.
        </Text>
      </section>
    </v-container>
  </div>

  <div class="bg-white pt-12">
    <v-container>
      <!-- Cursos -->
      <section id="cursos">
        <Text variant="h3" weight="bold" class="mb-8 text-center" style="color: #215c2e;">Cursos</Text>
        <Row class="mb-8" style="gap: 32px 0;">
          <Col v-for="course in courses" :key="course.id" cols="12" md="6">
          <Card class="course-card pa-6 d-flex flex-column justify-space-between rounded-0">
            <div>
              <Text variant="h5" weight="bold" class="mb-2">{{ course.name }}</Text>
              <Text class="mb-4" style="min-height: 48px;">{{ course.description }}</Text>
            </div>
            <div class="d-flex align-center justify-space-between my-4">
              <div class="d-flex align-center gap-2">
                <Chip v-if="course.published">
                  <Icon icon="mdi-certificate" class="mr-1" />
                  Certificado
                </Chip>
                <Icon icon="mdi-clock-outline" class="ml-2 mr-1" />
                <small>2h 30min duração</small>
              </div>


            </div>
            <Button color="#00A77E" :to="`/curso/${course.id}`" rounded="lg">Ver Detalhes</Button>
          </Card>
          </Col>
        </Row>
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

definePageMeta({
  layout: "public",
});

onMounted(async () => {
  courses.value = await getPublishedCourses();
});
</script>

<style scoped>
.hero-banner {

  background: url('/img/background-home.png');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-card {
  background: #215c2e;
  color: #fff;
  border-radius: 16px;
  min-height: 220px;
}
</style>
