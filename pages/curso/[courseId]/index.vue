<template>
  <div class="course-page container py-8">
    <div class="mb-4 text-caption text-medium-emphasis">
      Início / Cursos / Curso de {{ course?.name || '...' }}
    </div>
    <h1 class="mb-2">{{ course?.name }}</h1>
    <div class="d-flex align-center mb-4 text-medium-emphasis">
      <Icon icon="mdi-play-circle-outline" class="mr-1" />
      <span class="mr-4">{{ totalTopics }} aulas</span>
      <Icon icon="mdi-clock-outline" class="mr-1" />
      <span>2h 30min duração</span>
    </div>

    <!-- O que você aprenderá -->
    <div class="mb-6">
      <div class="border rounded pa-4 px-8 bg-grey-lighten-4">
        <h3 class="mb-2">O que você aprenderá</h3>
        <div class="row">
          <div class="col-12 col-md-6">
            <ul>
              <li>Fundamentos da Inclusão Digital</li>
              <li>Tecnologias aplicadas à conservação</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <ul>
              <li>Comunicação digital e cidadania</li>
              <li>Integração entre saberes locais e inovação</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Requisitos -->
    <div class="mb-4">
      <h3>Requisitos</h3>
      <ul class="pl-4">
        <li>Noções básicas de informática</li>
        <li>Interesse em aprender sobre tecnologia e meio ambiente</li>
        <li>Acesso a um celular, tablet ou computador com internet</li>
      </ul>
    </div>

    <!-- Descrição -->
    <div class="mb-6">
      <h3>Descrição</h3>
      <p>{{ course?.description }}</p>
    </div>

    <Button color="success" class="mb-8">Iniciar Curso</Button>

    <!-- Equipe Pedagógica (mock) -->
    <div class="mb-8">
      <h3>Equipe Pedagógica</h3>
      <div class="d-flex flex-column flex-md-row gap-4">
        <div class="d-flex align-center" v-for="(member, idx) in team" :key="idx">
          <img :src="member.avatar" alt="avatar" class="rounded-circle mr-3"
            style="width:48px;height:48px;object-fit:cover;" />
          <div>
            <div class="font-weight-bold">{{ member.name }}</div>
            <div class="text-caption">{{ member.role }}</div>
            <a :href="member.linkedin" target="_blank" class="text-primary text-caption">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Módulos e Aulas -->
    <div class="mb-8">
      <h3>Módulos e Aulas</h3>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="module in course?.modules || []" :key="module.id">
          <v-expansion-panel-title>{{ module.name }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul class="mb-0">
              <li v-for="topic in module.topics || []" :key="topic.id">
                {{ topic.title }}
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- <pre>
      {{ course }}
    </pre> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useCourses from '~/composables/useCourses';
import Button from '~/components/Button.vue';
import Icon from '~/components/Icon.vue';
import type Course from '~/models/course';
definePageMeta({
  layout: "public",
});
const { courseId } = useRoute().params as { courseId: string };
const { getCourse } = useCourses();


const course = ref<Course | null>(null);

// Mock equipe pedagógica
const team = [
  {
    name: 'Maria Alice de Souza Lopes',
    role: 'Coordenadora de Curso',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    linkedin: 'https://www.linkedin.com/in/maria-alice/',
  },
  {
    name: 'Maria Alice de Souza Lopes',
    role: 'Conteudista',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    linkedin: 'https://www.linkedin.com/in/maria-alice/',
  },
];

onMounted(async () => {
  course.value = await getCourse(courseId as string);

});

// total topics
const totalTopics = computed(() => {
  return course.value?.modules?.reduce((acc, module) => acc + (module.topics?.length || 0), 0) || 0;
});
</script>

<style scoped>
.course-page {
  max-width: 900px;
  margin: 0 auto;
}
</style>