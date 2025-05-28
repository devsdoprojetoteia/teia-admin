<template>
  <div>
    <v-container>

      <div class="d-flex justify-space-between align-center mb-8 mt-4">
        <div class="d-flex align-center">
          <Button to="/cursos" icon class="mr-2">
            <Icon icon="mdi-chevron-left" />
          </Button>
          <div>
            <Text variant="h6" class="mb-0">{{ course?.name }}</Text>
            <Text emphasis="medium">Gestão de módulos</Text>
          </div>

        </div>
        <Button color="primary" @click="showAddModule = true" size="large" class="mb-8 mt-4" icon>
          <Icon icon="mdi-plus" />
        </Button>
      </div>

      <DynamicInput name="search" :props="{ label: 'Buscar' }" v-model="search" label="Buscar" clearable block
        class="mb-4" :validate="false" />
      <div>
        <div>
          <div v-if="filteredModules">
            <div v-if="filteredModules.length === 0" class="pa-4 text-center">
              <Alert> Nenhum módulo encontrado </Alert>
            </div>
            <div v-else>
              <template v-for="(module, moduleIndex) in filteredModules.sort((a, b) => a.order - b.order)">
                <v-card class="mb-4">

                  <v-card-text>
                    <v-row no-gutters class="mb-3">
                      <v-col cols="12" sm="8">
                        <div>
                          <strong>{{ module.order }} - {{ module.name }}</strong>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="4" class="d-flex justify-sm-end mt-2 mt-sm-0">
                        <Button size="x-small" variant="tonal" class="mr-1"
                          :disabled="moduleIndex === 0 || loadingStates[`module-${module.id}-up`]"
                          @click="reorderModule(module, 'up')">
                          <Icon v-if="!loadingStates[`module-${module.id}-up`]" icon="mdi-chevron-up" />
                          <Icon v-else icon="mdi-loading" class="mdi-spin" />
                        </Button>
                        <Button size="x-small" variant="tonal"
                          :disabled="moduleIndex === filteredModules.length - 1 || loadingStates[`module-${module.id}-down`]"
                          @click="reorderModule(module, 'down')">
                          <Icon v-if="!loadingStates[`module-${module.id}-down`]" icon="mdi-chevron-down" />
                          <Icon v-else icon="mdi-loading" class="mdi-spin" />
                        </Button>
                      </v-col>
                    </v-row>
                    <Text emphasis="medium">{{ module.description }}</Text>
                    <!-- lista de topicos gestão de tópicos -->
                    <div class="mt-4" v-if="module.topics && module.topics.length > 0">
                      <div class="topics-list">
                        <div v-for="(topic, topicIndex) in module.topics.sort((a, b) => a.order - b.order)"
                          :key="topic.id" class="topic-item pa-3 mb-2 rounded-lg bg-grey-lighten-4">
                          <v-row>
                            <v-col cols="12" sm="8" class="d-flex align-center">
                              <div class="bg-white rounded-circle d-flex justify-center align-center mr-2"
                                style="width: 30px; height: 30px;">
                                {{ topic.order }}
                              </div>
                              <Text class="font-weight-medium">{{ topic.title }}</Text>
                            </v-col>
                            <v-col cols="12" sm="4" class="d-flex justify-sm-end pt-0 pt-md-4">
                              <div class="d-flex align-center">
                                <Button size="x-small" variant="tonal" class="mr-1"
                                  :disabled="topicIndex === 0 || loadingStates[`topic-${topic.id}-up`]"
                                  @click="reorderTopic(topic, 'up')">
                                  <Icon v-if="!loadingStates[`topic-${topic.id}-up`]" icon="mdi-chevron-up" />
                                  <Icon v-else icon="mdi-loading" class="mdi-spin" />
                                </Button>
                                <Button size="x-small" variant="tonal" class="mr-1"
                                  :disabled="topicIndex === module.topics.length - 1 || loadingStates[`topic-${topic.id}-down`]"
                                  @click="reorderTopic(topic, 'down')">
                                  <Icon v-if="!loadingStates[`topic-${topic.id}-down`]" icon="mdi-chevron-down" />
                                  <Icon v-else icon="mdi-loading" class="mdi-spin" />
                                </Button>
                                <Button color="primary" size="x-small" @click="editTopic(topic)" variant="tonal"
                                  class="mr-1">
                                  <Icon icon="mdi-pencil" />
                                </Button>
                                <Button color="error" size="x-small" @click="removeTopic(topic)" variant="tonal">
                                  <Icon icon="mdi-delete" />
                                </Button>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </div>
                    <TopicForm v-if="activeTopic && activeTopic.module === module.id" @close="closeTopicForm"
                      :module="module" :topic="activeTopic" @updated="topicUpdated" @remove="removeTopic" />
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <Button color="primary" @click="editModule(module)">
                      <Icon icon="mdi-pencil" class="mr-2" />
                      Editar
                    </Button>
                    <Button color="primary" @click="addTopic(module)">
                      <Icon icon="mdi-plus" class="mr-2" />
                      Adicionar tópico
                    </Button>
                  </v-card-actions>
                </v-card>

              </template>
            </div>
          </div>
          <Loading v-else />
        </div>
      </div>

      <ModuleForm v-if="showAddModule || activeModule" @created="moduleCreated" @updated="moduleUpdated"
        @close="closeForm" :module="activeModule" :course="course" @remove="removeModule" />
      <TopicForm v-if="showAddTopic" @close="closeTopicForm" :module="showAddTopic" @created="topicCreated" />


    </v-container>
  </div>
</template>

<script lang="ts" setup>
import slugify from "slugify";
import useModules from "~/composables/useModules";
import type Course from "~/models/course";
import Module from "~~/models/module";
import Topic from "~~/models/topic";
import useTopics from "~/composables/useTopics";
import { useNuxtApp } from "#app";

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
  editModule,
  closeModule,
  activeModule,
  deleteModule,
} = useModules();

const { getCourse } = useCourses();

const search = ref("");

const course = ref<Course | undefined>(undefined);

const {
  topics,
  activeTopic,
  showAddTopic,
  hasTopics,
  loadTopics,
  editTopic,
  closeTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} = useTopics();

const { $api } = useNuxtApp();

const loadingStates = ref<Record<string, boolean>>({});

// load modules on mounted
onMounted(async () => {
  course.value = await getCourse(route.params.courseId as string);
  console.log(course.value);
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

const addTopic = (module: Module) => {
  showAddTopic.value = module;
};

const closeForm = () => {
  showAddModule.value = false;
  closeModule();
};

const closeTopicForm = () => {
  showAddTopic.value = null;
  activeTopic.value = null;
};

const topicCreated = async () => {
  await loadModules();
};

const topicUpdated = async () => {
  await loadModules();
};

const removeTopic = async (topic: Topic) => {
  if (confirm("Deseja realmente remover este tópico?")) {
    await deleteTopic(topic.id!);
    await loadModules();
    const { notifySuccess } = useNotify();
    notifySuccess("Tópico removido com sucesso");
  }
};

const reorderModule = async (module: Module, direction: 'up' | 'down') => {
  try {
    const loadingKey = `module-${module.id}-${direction}`;
    loadingStates.value[loadingKey] = true;
    await $api.modules.reorder(module.id!, direction);
    await loadModules();
  } catch (error) {
    const { notifyError } = useNotify();
    notifyError(errorMessage(error));
  } finally {
    const loadingKey = `module-${module.id}-${direction}`;
    loadingStates.value[loadingKey] = false;
  }
};

const reorderTopic = async (topic: Topic, direction: 'up' | 'down') => {
  try {
    const loadingKey = `topic-${topic.id}-${direction}`;
    loadingStates.value[loadingKey] = true;
    await $api.topics.reorder(topic.id!, direction);
    await loadModules();
  } catch (error) {
    const { notifyError } = useNotify();
    notifyError(errorMessage(error));
  } finally {
    const loadingKey = `topic-${topic.id}-${direction}`;
    loadingStates.value[loadingKey] = false;
  }
};
</script>
