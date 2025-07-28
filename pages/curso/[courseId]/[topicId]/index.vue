<template>
    <div class="topic-page py-3">
        <div v-if="pending" class="d-flex justify-center align-center h-100">
            <Loading />
        </div>
        <div v-else-if="error">
            <div class="text-center">
                <Text variant="h6" class="mb-2">Erro ao carregar o curso</Text>
                <Button @click="refresh" color="primary">Tentar novamente</Button>
            </div>
        </div>
        <div v-else-if="course">
            <Row>
                <Col cols="12" lg="4" class="bg-primary px-6 py-6">
                <Text variant="h5" weight="bold" class="mb-6">Módulos e Aulas</Text>
                <div v-for="module in course.modules" :key="module.id" class="mb-6">
                    <div class="mb-4">
                        <small>
                            <Text weight="bold" class="text-white">{{ module.name }}</Text>
                        </small>
                    </div>
                    <div v-for="topic in module.topics || []" :key="topic.id" class="pl-4">
                        <NuxtLink :to="`/curso/${courseId}/${topic.id}`"
                            class="text-decoration-none d-block mb-2 text-white">
                            <Icon icon="mdi-play-circle-outline" class="mr-2" size="18" />
                            <small>
                                <span>{{ topic.title }}</span>
                            </small>
                        </NuxtLink>
                    </div>
                </div>
                </Col>
                <Col cols="12" lg="8" class="px-4 py-6">
                <!-- Breadcrumbs -->
                <div class="mb-6 text-caption text-medium-emphasis">
                    <NuxtLink to="/" class="text-primary">Início</NuxtLink> /
                    <NuxtLink to="/#cursos" class="text-primary">Cursos</NuxtLink> /
                    <NuxtLink :to="`/curso/${courseId}`" class="text-primary">{{ course.name }}</NuxtLink> /
                    <span class="text-medium-emphasis">{{ topic?.title }}</span>
                </div>

                <div class="rounded-lg pa-4 px-8 bg-white mb-6">

                    <!-- Título do Módulo e Aula -->
                    <div class="mb-3">
                        <Text>{{ module?.name }}</Text>
                    </div>
                    <div class="mb-4">
                        <Text variant="h5" weight="bold">{{ topic?.title }}</Text>
                    </div>

                    <!-- Navegação entre aulas -->
                    <div class="d-flex justify-space-between mb-4">
                        <Button v-if="prevTopic" :to="`/curso/${courseId}/${prevTopic.id}`" color="primary" outlined>
                            <Icon icon="mdi-chevron-left" class="mr-1" /> Aula Anterior
                        </Button>
                        <Button v-if="nextTopic" :to="`/curso/${courseId}/${nextTopic.id}`" color="primary" outlined>
                            Próxima Aula
                            <Icon icon="mdi-chevron-right" class="ml-1" />
                        </Button>
                    </div>

                    <!-- Player de Vídeo -->
                    <!-- <div v-if="videoUrl" class="mb-6">
            <video controls style="width:100%; max-height:400px; background:#ccc;">
                <source :src="videoUrl" type="video/mp4" />
                Seu navegador não suporta vídeo.
            </video>
        </div> -->

                    <!-- Descrição/Introdução -->
                    <!-- <div class="mb-6 border rounded pa-4 bg-grey-lighten-4">
            <Text variant="h6" weight="bold" class="mb-2">Introdução ao Ensino Digital</Text>
            <div>{{ introText }}</div>
        </div> -->

                    <!-- Download de Arquivo -->
                    <!-- <div v-if="documentUrl" class="mb-4">
            <Text variant="subtitle1" weight="bold">Nome do Arquivo</Text>
            <Button :href="documentUrl" target="_blank" color="success" class="ml-2">
                <Icon icon="mdi-download" class="mr-1" /> Baixar Arquivo
            </Button>
        </div> -->

                    <!-- Player de Áudio -->
                    <!-- <div v-if="audioUrl" class="mb-6">
            <Text variant="subtitle1" weight="bold">Título do Áudio</Text>
            <audio controls style="width:100%;">
                <source :src="audioUrl" type="audio/mpeg" />
                Seu navegador não suporta áudio.
            </audio>
        </div> -->

                    <!-- Imagem do Tópico -->
                    <!-- <div v-if="imageUrl" class="mb-6">
            <Text variant="subtitle1" weight="bold">Figura 01</Text>
            <img :src="imageUrl" alt="Figura do tópico" style="max-width:100%; border-radius:8px;" />
        </div> -->
                </div>
                <!-- Área de Comentários (mock) -->
                <div class="mb-8 border rounded pa-4 bg-grey-lighten-4">
                    <Text variant="h5" weight="bold" class="mb-4">Comentários</Text>
                    <div class="mb-4 d-flex align-center">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="avatar"
                            class="rounded-circle mr-2" style="width:40px;height:40px;object-fit:cover;" />
                        <input type="text" class="form-control flex-grow-1" placeholder="Digite seu comentário..."
                            style="margin-right: 8px;" />
                        <Button color="success">Comentar</Button>
                    </div>
                    <div class="mt-4">
                        <div class="d-flex align-center mb-2">
                            <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="avatar"
                                class="rounded-circle mr-2" style="width:32px;height:32px;object-fit:cover;" />
                            <div>
                                <div class="font-weight-bold">Nome da Pessoa</div>
                                <div class="text-caption">O ensino digital tem se tornado uma ferramenta essencial na
                                    educação
                                    contemporânea...</div>
                            </div>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import useCourses from '~/composables/useCourses';
import useTopics from '~/composables/useTopics';
import Button from '~/components/Button.vue';
import Icon from '~/components/Icon.vue';
import Text from '~/components/Text.vue';
import Course from '~/models/course';
import type Topic from '~/models/topic';
definePageMeta({
    layout: "public",
});
const route = useRoute();
const { courseId, topicId } = route.params as { courseId: string, topicId: string };
const { getCourse } = useCourses();
const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;

// Carrega os dados antes da renderização (SSR)
const { data: course, pending, error, refresh } = await useAsyncData<Course>(
    `course-${courseId}`,
    async () => {
        const courseData = await getCourse(courseId as string);
        console.log("get coursssse");
        console.log(courseData);

        return courseData.toJson();
    }
);

const topic = computed(() => {
    return course.value?.modules?.find((module) => module.topics.some((topic) => topic.id === topicId))?.topics.find((topic) => topic.id === topicId) || null;
});

const module = computed(() => {
    return course.value?.modules?.find((module) => module.topics.some((topic) => topic.id === topicId)) || null;
});

const allTopics = computed(() => {
    return course.value?.modules?.flatMap((module) => module.topics) || [];
});

const nextTopic = computed(() => {
    const index = allTopics.value.findIndex((topic) => topic.id === topicId);
    return allTopics.value[index + 1] || null;
});

const prevTopic = computed(() => {
    const index = allTopics.value.findIndex((topic) => topic.id === topicId);
    return allTopics.value[index - 1] || null;
});

</script>

<style scoped>
.topic-page {
    max-width: 1460px;
    margin: 0 auto;
}

.form-control {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 1rem;
}
</style>
