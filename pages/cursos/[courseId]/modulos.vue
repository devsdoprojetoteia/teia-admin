<template>
  <div>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <Text variant="h4">Módulos do curso {{ course?.name }}</Text>
        <Button
          color="primary"
          @click="showAddModule = true"
          size="large"
          class="mb-8 mt-4"
          icon
        >
          <Icon icon="mdi-plus" />
        </Button>
      </div>

      <DynamicInput
        name="search"
        :props="{ label: 'Buscar' }"
        v-model="search"
        label="Buscar"
        clearable
        block
        class="mb-4"
        :validate="false"
      />
      <div>
        <v-card>
          <div v-if="filteredModules">
            <div v-if="filteredModules.length === 0" class="pa-4 text-center">
              <Alert> Nenhum módulo encontrado </Alert>
            </div>
            <v-list v-else>
              <template v-for="(module, moduleIndex) in filteredModules">
                <v-list-item @click="openModule(module)">
                  <div class="d-flex justify-space-between align-center py-1">
                    <div>
                      <Text>{{ module.name }}</Text>
                      <br />
                      <Text emphasis="medium" variant="small">
                        {{ module.description }}
                      </Text>
                    </div>
                  </div>
                </v-list-item>
                <v-divider v-if="moduleIndex < filteredModules.length - 1" />
              </template>
            </v-list>
          </div>
          <Loading v-else />
        </v-card>
      </div>
      <ModuleForm
        v-if="showAddModule"
        @created="moduleCreated"
        @updated="moduleUpdated"
        @close="showAddModule = false"
        :module="activeModule"
        :course-id="route.params.courseId"
        :course-name="course?.name"
      />
      <ModuleInfo
        v-if="activeModule"
        :module="activeModule"
        @updated="moduleUpdated"
        @close="closeModule"
        @edit="showAddModule = true"
        @remove="removeModule"
      />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import slugify from "slugify";
import useModules from "~/composables/useModules";
import type Course from "~/models/course";
import Module from "~~/models/module";

definePageMeta({
  middleware: ["authenticated"],
  layout: "authenticated",
});

useHead({
  title: "Módulos",
});

const route = useRoute();

const filteredModules = computed(() => {
  let list = modules.value ?? [];
  if (search.value) {
    list = list.filter((module: Module) =>
      slugify(module.name + " " + module.description, { lower: true }).includes(
        slugify(search.value, { lower: true })
      )
    );
  }
  return list;
});

const {
  modules,
  loadModules,
  showAddModule,
  hasModules,
  openModule,
  closeModule,
  activeModule,
  deleteModule,
} = useModules();

const { getCourse } = useCourses();

const search = ref("");

const course = ref<Course | null>(null);

// load modules on mounted
onMounted(async () => {
  course.value = await getCourse(route.params.courseId as string);
  await loadModules();
});

const moduleCreated = async (module: Module) => {
  await loadModules();
};

const moduleUpdated = async (module: Module) => {
  await loadModules();
};

const removeModule = async () => {
  if (activeModule.value) {
    await deleteModule(activeModule.value!.id!);
    closeModule();
    await loadModules();
    const { notifySuccess } = useNotify();
    notifySuccess("Módulo removido com sucesso");
  }
};
</script>
