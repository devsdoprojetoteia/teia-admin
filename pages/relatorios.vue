<template>
    <v-container class="py-6">
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
                <h1 class="text-h4 font-weight-bold mb-2">Relatórios de progresso</h1>
                <p class="text-body-1 text-medium-emphasis">
                    Acompanhe o progresso das pessoas estudantes nos cursos
                </p>
            </div>
            <Button @click="downloadCSV" color="success" variant="elevated" :disabled="loading"
                prepend-icon="mdi-download">
                Baixar CSV
            </Button>
        </div>

        <!-- Filtros -->
        <v-card class="mb-6" elevation="2">
            <v-card-text>
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <v-select v-model="filters.courseId" :items="filterOptions.courses" item-title="name"
                            item-value="id" label="Curso" clearable prepend-icon="mdi-book-open"
                            @update:model-value="loadData" hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select v-model="filters.userId" :items="filterOptions.users" item-title="name"
                            item-value="id" label="Usuário" clearable prepend-icon="mdi-account"
                            @update:model-value="loadData" hide-details="auto" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <div v-if="!filters.courseId && !filters.userId" class="pa-4 text-center">
            <Alert>Selecione um curso ou estudante para visualizar os relatórios</Alert>
        </div>

        <!-- Tabela de Relatórios -->
        <v-card elevation="2" v-else>
            <v-card-text>
                <div class="d-flex justify-center pa-10" v-if="loading">
                    <Loading />
                </div>
                <v-table v-if="!loading">
                    <thead>
                        <tr>
                            <th>Curso</th>
                            <th>Módulo</th>
                            <th>Estudante</th>
                            <th class="text-right">Completado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in reports" :key="report.user.id">
                            <td>{{ report.course.name }}</td>
                            <td>{{ report.module.name }}</td>
                            <td>{{ report.user.name }}</td>
                            <td class="text-right"
                                :class="{ 'text-green font-weight-bold': report.completed, 'text-disabled': !report.completed }">
                                {{
                                    report.completed ? 'Sim' : 'Não' }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import slugify from 'slugify';
import type { FilterOptions, ProgressFilters, ReportData } from '~/repository/modules/reports';

const { $api } = useNuxtApp();

definePageMeta({
    middleware: ["authenticated"],
    layout: "authenticated",
});

useHead({
    title: "Relatórios de Progresso",
});



// Reactive data
const loading = ref(false);
const exporting = ref(false);
const reports = ref<ReportData[]>([]);

const filterOptions = ref<FilterOptions>({
    courses: [],
    users: [],
});

// query params
const route = useRoute();

// Filters
const filters = reactive<ProgressFilters>({
    courseId: route.query.courseId as string | undefined,
    userId: route.query.userId as string | undefined,
});

const loadFilters = async () => {
    filterOptions.value = await $api.reports.progressFilters();
};

const loadData = async () => {
    console.log(filters);
    loading.value = true;
    reports.value = await $api.reports.progress(filters);
    loading.value = false;
};


const downloadCSV = async () => {
    const csv = ["Curso,Módulo,Estudante,Completado"];
    for (const report of reports.value) {
        csv.push(`${report.course.name},${report.module.name},${report.user.name},${report.completed ? "Sim" : "Não"}`);
    }
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    let courseName = '';
    let userName = '';
    if (filters.courseId) {
        const course = filterOptions.value.courses.find(course => course.id === filters.courseId);
        courseName = course?.name || "";
    }
    if (filters.userId) {
        const user = filterOptions.value.users.find(user => user.id === filters.userId);
        userName = user?.name || "";
    }
    let filename = `teia-relatorio-progresso`;
    if (courseName) {
        filename += `-${courseName}`;
    }
    if (userName) {
        filename += `-${userName}`;
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    filename += `-${day}-${month}-${year}`;
    filename += ".csv";
    a.download = slugify(filename, { lower: true });
    a.click();
};

// Load data on mount
onMounted(async () => {
    await loadFilters();
    if (filters.courseId || filters.userId) {
        await loadData();
    }
});
</script>
