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
                <div class="d-flex align-center justify-space-between">
                    <Text variant="h5" weight="bold" class="mb-0">Módulos e Aulas</Text>
                    <Button variant="tonal" @click="toggleMenu" outlined class="d-block d-lg-none">
                        <Icon icon="mdi-menu" class="mr-1" />
                    </Button>
                </div>
                <div v-for="module in course.modules" :key="module.id" class="mb-6 d-none d-lg-block mt-6"
                    :class="{ 'd-block': menu }">
                    <div class="mb-4">
                        <small>
                            <Text weight="bold" class="text-white">{{ module.name }}</Text>
                        </small>
                    </div>
                    <div v-for="topic in module.topics || []" :key="topic.id" class="pl-4">
                        <NuxtLink :to="`/curso/${courseId}/${topic.id}`"
                            class="text-decoration-none d-block mb-2 text-white">
                            <Icon
                                :icon="viewedTopics.includes(topic.id!) ? 'mdi-check-circle' : 'mdi-play-circle-outline'"
                                class="mr-2" size="18"
                                :color="viewedTopics.includes(topic.id!) ? 'success' : 'white'" />
                            <small>
                                <span :class="topicId == topic.id ? 'font-weight-bold' : ''">{{
                                    topic.title }}</span>
                            </small>
                        </NuxtLink>
                    </div>
                </div>
                </Col>
                <Col cols="12" lg="8" class="px-6 py-6">
                <!-- Breadcrumbs -->
                <div class="mb-6 text-caption text-medium-emphasis">
                    <NuxtLink to="/" class="text-primary">Início</NuxtLink> /
                    <NuxtLink to="/#cursos" class="text-primary">Cursos</NuxtLink> /
                    <NuxtLink :to="`/curso/${courseId}`" class="text-primary">{{ course.name }}</NuxtLink> /
                    <span class="text-medium-emphasis">{{ topic?.title }}</span>
                </div>

                <div class="rounded-lg py-6 px-4 bg-white mb-6">

                    <div style="max-width: 720px; margin: 0 auto;">
                        <!-- Título do Módulo e Aula -->
                        <div class="mb-3">
                            <Text>{{ module?.name }}</Text>
                        </div>
                        <div class="mb-4">
                            <Text variant="h5" weight="bold">{{ topic?.title }}</Text>
                        </div>


                        <div class="mb-6">
                            <div v-for="content in topic?.content || []" :key="content.id">
                                <div v-if="content.type === 'text'" class="mb-4">
                                    <div v-html="content.content"></div>
                                </div>
                                <div v-if="content.type === 'image'" class="mb-4">
                                    <img :src="getFileUrl(content.content)" :alt="topic?.title || ''"
                                        style="max-width: 100%; " />
                                </div>
                                <div v-if="content.type === 'video'" class="mb-4">
                                    <v-responsive :aspect-ratio="16 / 9">
                                        <video :src="getFileUrl(content.content)" controls
                                            style="width:100%; height:100%;"></video>
                                    </v-responsive>
                                </div>
                                <div v-if="content.type === 'audio'" class="mb-4">
                                    <audio :src="getFileUrl(content.content)" controls style="width:100%;"></audio>
                                </div>
                                <div v-if="content.type === 'document'"
                                    class="mb-4 border rounded-lg border-primary bg-grey-lighten-5">
                                    <div class="d-flex align-center pa-3">
                                        <div class="px-2">
                                            <Icon icon="mdi-download" size="24" class="mr-2" color="primary" />
                                        </div>
                                        <div class="d-flex flex-column">
                                            <a :href="getFileUrl(content.content)" target="_blank"
                                                class="text-decoration-none text-primary">
                                                {{ getFileName(content.content) }}
                                            </a>
                                            <span class="text-caption text-medium-emphasis">
                                                Baixar arquivo
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <!-- Navegação entre aulas -->
                        <div class="d-flex justify-end mb-4">
                            <Button v-if="prevTopic" :to="`/curso/${courseId}/${prevTopic.id}`" color="primary"
                                size="small" class="mr-2" outlined>
                                <Icon icon="mdi-chevron-left" class="mr-1" /> Aula Anterior
                            </Button>
                            <Button v-if="nextTopic" :to="`/curso/${courseId}/${nextTopic.id}`" color="primary"
                                size="small" @click="markTopicAsViewed" outlined>
                                Próxima Aula
                                <Icon icon="mdi-chevron-right" class="ml-1" />
                            </Button>
                        </div>
                    </div>


                </div>
                <!-- Área de Comentários (mock) -->
                <!-- <div class="mb-8 border rounded pa-4 bg-grey-lighten-4">
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
                </div> -->
                </Col>
            </Row>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
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

const getFileUrl = (url: string) => {
    if (url.startsWith('http')) {
        return url
    }
    return filesURL + url
}

const getFileName = (url: string) => {
    const fileName = url.split('/').pop() || ''
    return decodeURIComponent(fileName)
}

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

// Função para marcar tópico como visualizado
const markTopicAsViewed = async () => {
    try {
        // Salva no localStorage independente da autenticação
        viewedTopics.value = JSON.parse(localStorage.getItem('viewedTopics') || '[]');
        const topicKey = `${topicId}`;

        if (!viewedTopics.value.includes(topicKey)) {
            viewedTopics.value.push(topicKey);
            localStorage.setItem('viewedTopics', JSON.stringify(viewedTopics.value));
        }

        console.log('Tópico marcado como visualizado:', topicId);
    } catch (error) {
        console.error('Erro ao marcar tópico como visualizado:', error);
    }
};
const viewedTopics = ref<string[]>([]);

// Timer para marcar como visualizado após 10 segundos
let viewTimer: NodeJS.Timeout | null = null;

onMounted(() => {
    viewedTopics.value = JSON.parse(localStorage.getItem('viewedTopics') || '[]');
    // Inicia o timer apenas se o tópico não foi visualizado anteriormente
    if (!viewedTopics.value.includes(`${topicId}`)) {
        // Inicia o countdown
        viewTimer = setTimeout(() => {
            markTopicAsViewed();
        }, 30000);
    }
});

onUnmounted(() => {
    // Limpa os timers se o componente for desmontado
    if (viewTimer) {
        clearTimeout(viewTimer);
    }
});

const menu = ref(false);

const toggleMenu = () => {
    menu.value = !menu.value;
};

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
