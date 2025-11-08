<template>
    <v-container class="py-6">
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold mb-2">Atividades Chatbot</h1>
                <p class="text-body-1 text-medium-emphasis">
                    Visualize e acompanhe respostas de alunos
                </p>
            </div>
            <Button @click="downloadCSV" color="success" variant="elevated" :disabled="loading || answers.length === 0"
                prepend-icon="mdi-download">
                Baixar CSV
            </Button>
        </div>

        <!-- Filtros -->
        <v-card class="mb-6" elevation="2">
            <v-card-text>
                <v-row class="align-center">
                    <v-col cols="12" md="4">
                        <v-select v-model="filters.courseId" :items="filterOptions.courses" item-title="name"
                            item-value="id" label="Curso" clearable prepend-icon="mdi-book-open"
                            @update:model-value="loadData" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select v-model="filters.userId" :items="filterOptions.users" item-title="name"
                            item-value="id" label="Usuário" clearable prepend-icon="mdi-account"
                            @update:model-value="loadData" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="4">
                        <DynamicInput name="search" :props="{
                            label: 'Buscar',
                            'hide-details': 'auto',
                            prependIcon: 'mdi-magnify',
                        }" v-model="filters.search" clearable block :validate="false"
                            @update:model-value="searchChanged" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <div v-if="!filters.courseId && !filters.userId && !filters.search" class="pa-4 text-center">
            <Alert>Selecione um curso ou estudante para visualizar os relatórios</Alert>
        </div>

        <!-- Tabela de Relatórios -->
        <v-card elevation="2" v-else>
            <v-card-text>
                <div class="d-flex justify-center pa-10" v-if="loading">
                    <Loading />
                </div>
                <div v-if="!loading">
                    <div v-if="answers.length === 0" class="pa-4 text-center">
                        <Alert>Nenhuma atividade encontrada</Alert>
                    </div>

                    <div v-for="answer in answers" :key="answer.id">
                        <v-row class="mb-2">
                            <v-col cols="12" md="4">
                                <strong>Curso:</strong> {{ answer.course.name }}
                            </v-col>
                            <v-col cols="12" md="4">
                                <strong>Estudante:</strong> {{ answer.user.name }}
                            </v-col>
                            <v-col cols="12" md="4">
                                <strong>Data:</strong> {{ $utils.formatDate(answer.createdAt) }}
                            </v-col>
                        </v-row>
                        <div class="mb-4"><strong>Questão:</strong> {{ answer.question }}</div>
                        <div><strong>Resposta:</strong> {{ answer.answer }}</div>
                    </div>

                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">

import { useDebounceFn } from '@vueuse/core';
import type { FilterOptions, AnswerFilters, ReportData, AnswerReportData } from '~/repository/modules/reports';

const { $api } = useNuxtApp();

definePageMeta({
    middleware: ["authenticated"],
    layout: "authenticated",
});

useHead({
    title: "Relatórios de atividades",
});



// Reactive data
const loading = ref(false);
const exporting = ref(false);
const answers = ref<AnswerReportData[]>([]);

const filterOptions = ref<FilterOptions>({
    courses: [],
    users: [],
});

// query params
const route = useRoute();

// Filters
const filters = reactive<AnswerFilters>({
    courseId: route.query.courseId as string | undefined,
    userId: route.query.userId as string | undefined,
    search: route.query.search as string | undefined,
});

const { $utils } = useNuxtApp();


const loadFilters = async () => {
    filterOptions.value = await $api.reports.answerFilters();
};

const loadData = async () => {
    if (!filters.courseId && !filters.userId && !filters.search) {
        answers.value = [];
        return;
    }
    loading.value = true;
    answers.value = await $api.reports.answers(filters);
    loading.value = false;
};

const debouncedLoadData = useDebounceFn(loadData, 500);

const searchChanged = () => {
    debouncedLoadData();
};

const downloadCSV = async () => {
    const csv = [["Curso", "Estudante", "Questão", "Resposta", "Data"]];
    for (const answer of answers.value) {
        csv.push([answer.course.name, answer.user.name, answer.question, answer.answer, $utils.formatDate(answer.createdAt)]);
    }
    let filename = 'teia-relatorio-atividades';
    if (filters.courseId) {
        const course = filterOptions.value.courses.find(course => course.id === filters.courseId);
        filename += '-' + course?.name;
    }
    if (filters.userId) {
        const user = filterOptions.value.users.find(user => user.id === filters.userId);
        filename += '-' + user?.name;
    }
    $utils.downloadCSV(csv, filename + '-' + $utils.formatDate(new Date(), 'DD-MM-YYYY'));
    console.log(csv);
};

// Load data on mount
onMounted(async () => {
    await loadFilters();
    if (filters.courseId || filters.userId || filters.search) {
        await loadData();
    }
});
</script>
