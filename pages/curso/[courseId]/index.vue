<template>
  <div class="course-page container py-8 px-4">
    <div v-if="pending">
      <Loading />
    </div>
    <div v-else-if="error">
      <div class="text-center">
        <Text variant="h6" class="mb-2">Erro ao carregar o curso</Text>
        <Button @click="refresh" color="primary">Tentar novamente</Button>
      </div>
    </div>
    <div v-else-if="course">
      <div class="mb-4 text-caption text-medium-emphasis">
        <NuxtLink to="/" class="text-primary">Início</NuxtLink> /
        <NuxtLink to="/#cursos" class="text-primary">Cursos</NuxtLink> /
        <span class="text-medium-emphasis">{{ course.name }}</span>
      </div>
      <h1 class="mb-2">{{ course.name }}</h1>
      <div class="d-flex align-center mb-4 ">
        <Icon icon="mdi-play-circle-outline" class="mr-1" />
        <span class="mr-4">{{ totalTopics }} aulas</span>
        <Icon icon="mdi-clock-outline" class="mr-1" />
        <span>{{ course.duration }}</span>
      </div>

      <!-- O que você aprenderá -->
      <div class="mb-6">
        <div class="border rounded-lg pa-4 px-8 bg-white">
          <Text variant="h6" weight="bold" class="mb-6">O que você aprenderá</Text>
          <Row class="mb-3">
            <Col v-for="item in course.learning || []" :key="item" cols="12" lg="6" class="py-1">
            <div class="d-flex align-center">
              <Icon icon="mdi-check" size="14" class="mr-2" />
              <span>{{ item }}</span>
            </div>
            </Col>
          </Row>
        </div>
      </div>

      <!-- Requisitos -->
      <div class="mb-4">
        <h3>Requisitos</h3>
        <ul class="pl-4">
          <li v-for="item in course.requirements || []" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Descrição -->
      <div class="mb-6">
        <h3>Descrição</h3>
        <p>{{ course.description }}</p>
      </div>


      <Button v-if="firstTopic" color="primary" class="mb-8" size="large"
        :to="`/curso/${courseId}/${firstTopic.id}`">Iniciar
        Curso</Button>

      <!-- Equipe Pedagógica (mock) -->
      <div class="border rounded-lg pa-4 px-8 bg-white mb-8" v-if="course.team && course.team.length > 0">
        <h3>Equipe Pedagógica</h3>
        <Row>
          <Col class="d-flex align-center" v-for="(member, idx) in course.team" :key="idx" cols="12" sm="6">
          <div class="mr-3">

            <img :src="filesURL + member.avatar" alt="avatar" class="rounded-circle"
              style="width:48px;height:48px;object-fit:cover;" v-if="member.avatar" />
            <div class="rounded-circle bg-white d-flex align-center justify-center" style="width:48px;height:48px;"
              v-else>
              <Icon icon="mdi-account" />
            </div>
          </div>
          <div>
            <div class="font-weight-bold">{{ member.name }}</div>
            <div class="text-caption">{{ member.role }}</div>
            <a :href="member.linkedin" target="_blank" class="text-primary text-caption">LinkedIn</a>
          </div>
          </Col>
        </Row>
      </div>

      <!-- Módulos e Aulas -->
      <div class="mb-8">
        <h3>Módulos e Aulas</h3>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="module in course.modules || []" :key="module.id" rounded="lg">
            <v-expansion-panel-title hide-actions>
              <template #default="{ expanded }">
                <div class="d-flex align-center">
                  <Icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-2" />
                  <span>{{ module.name }}</span>
                </div>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="d-flex flex-column gap-2">
                <NuxtLink v-for="topic in module.topics || []" :key="topic.id" :to="`/curso/${courseId}/${topic.id}`"
                  class="d-flex align-center text-decoration-none d-block mb-2">
                  <Icon :icon="viewedTopics.includes(topic.id!) ? 'mdi-check-circle' : 'mdi-play-circle-outline'"
                    class="mr-2" size="18" :color="viewedTopics.includes(topic.id!) ? 'success' : 'black'" />
                  <span>{{ topic.title }}</span>
                </NuxtLink>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <!-- <pre>
      {{ course }}
    </pre> -->
    </div>
  </div>
</template>

<script setup lang="ts">
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
const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;

// Função auxiliar para serializar dados de forma segura
const serializeCourse = (courseData: any) => {
  if (!courseData) return null;

  // Converte ObjectIds para strings e datas para ISO strings
  return JSON.parse(JSON.stringify(courseData, (key, value) => {
    if (value && typeof value === 'object' && value.$oid) {
      return value.$oid;
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }));
};

// Carrega os dados antes da renderização (SSR)
const { data: course, pending, error, refresh } = await useAsyncData(
  `course-${courseId}`,
  async () => {
    const courseData = await getCourse(courseId as string);
    return serializeCourse(courseData);
  }
);

// total topics
const totalTopics = computed(() => {
  return course.value?.modules?.reduce((acc: number, module: any) => acc + (module.topics?.length || 0), 0) || 0;
});

const firstTopic = computed(() => {
  return course.value?.modules?.[0]?.topics?.[0];
});


const viewedTopics = ref<string[]>([]);

onMounted(() => {
  viewedTopics.value = JSON.parse(localStorage.getItem('viewedTopics') || '[]');
});

</script>

<style scoped>
.course-page {
  max-width: 900px;
  margin: 0 auto;
}
</style>