<template>
  <div>
    <v-container>

      <div class="d-flex justify-space-between align-center mb-8 mt-4">
        <div class="d-flex align-center">
          <Button to="/cursos" icon class="mr-2">
            <Icon icon="mdi-chevron-left" />
          </Button>
          <div>
            <Text variant="h4" class="mb-0">Módulos</Text>
            <Text>{{ course?.name }}</Text>
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
              <template v-for="(module, moduleIndex) in filteredModules">
                <v-card  class="mb-4">
                  <v-card-title>
                    <Text>{{ module.name }}</Text>
                  </v-card-title>
                  <v-card-text>
                    <Text emphasis="medium">{{ module.description }}</Text>
                    <!-- lista de topicos gestão de tópicos -->
                    <div class="mt-4" v-if="module.topics && module.topics.length > 0" >
                      <div class="topics-list">
                        <div v-for="(topic, topicIndex) in module.topics.sort((a, b) => a.order - b.order)" :key="topic.id" 
                             class="topic-item pa-3 mb-2 rounded-lg bg-grey-lighten-4">
                          <div class="d-flex justify-space-between align-center">
                            <div class="d-flex align-center">
                              <div class="bg-white rounded-circle d-flex justify-center align-center mr-2" style="width: 30px; height: 30px;">
                                {{ topic.order }}
                              </div>
                              <Text class="font-weight-medium">{{ topic.title }}</Text>
                            </div>
                            <div class="d-flex">
                              <Button color="primary" size="small" @click="editTopic(topic)" class="mr-1" variant="text">
                                <Icon icon="mdi-pencil" />
                              </Button>
                              <Button color="error" size="small" @click="removeTopic(topic)" variant="text">
                                <Icon icon="mdi-delete" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TopicForm v-if="activeTopic || showAddTopic" @close="closeTopicForm" :module="module" :topic="activeTopic" @updated="topicUpdated" @created="topicCreated" @remove="removeTopic" />
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <!-- divider -->
                    
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
  showAddTopic.value = true;
  
};

const closeForm = () => {
  showAddModule.value = false;
  closeModule();
};

const closeTopicForm = () => {
  showAddTopic.value = false;
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
</script>
