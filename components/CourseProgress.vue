<template>
  <Dialog @close="close" title="Progresso dos estudantes">

    <div v-if="course && userCourseProgress && modules" class="mb-2">
      <Text variant="h6">{{ course.name }}</Text>
      <div v-for="module in modules" :key="module.id">
        <div class="d-flex justify-space-between align-items-center mb-2 bg-white pa-2 rounded cursor-pointer"
          @click="toggleModule(module.id!)">
          <strong variant="h6">{{ module.name }}</strong>
          <div>
            <small class="text-medium-emphasis">{{userCourseProgress.filter(p => p.topics.some(t => t.module.toString()
              ===
              module.id)).length}} estudantes</small>
            <Icon icon="mdi-chevron-down" class="ml-2" />
          </div>
        </div>
        <div v-if="showModuleProgress === module.id" class="pa-2">
          <div v-for="topic in module.topics" :key="topic.id" @click="toggleTopic(topic.id!)">
            <div class="d-flex justify-space-between align-items-center mb-2 bg-white pa-2 rounded cursor-pointer">
              <span>{{ topic.title }}</span>
              <div>
                <small class="text-medium-emphasis">{{userCourseProgress.filter(p => p.topics.some(t =>
                  t.topic.toString() ===
                  topic.id)).length}} estudantes</small>
                <Icon icon="mdi-chevron-down" class="ml-2" />
              </div>
            </div>
            <div v-if="showTopicProgress === topic.id" class="pa-2">
              <div v-for="user in userCourseProgress.filter(p => p.topics.some(t => t.topic.toString() ===
                topic.id))" :key="user.id">
                <span>{{ user.user.name }}</span>
              </div>
              <div v-if="userCourseProgress.filter(p => p.topics.some(t => t.topic.toString() ===
                topic.id)).length == 0">
                <Alert>Nenhum estudante</Alert>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
import useModules from "~/composables/useModules";
import Course from "~/models/course";
import type { NotificationProps } from "~~/models/notification";

const { userCourseProgress } = useCourses();
const { modules } = useModules();

// props
const { course } = defineProps<{
  course: Course;
}>();

const notification: Ref<NotificationProps | null> = ref(null);
const showModuleProgress: Ref<String | null> = ref(null);
const showTopicProgress: Ref<String | null> = ref(null);

const emit = defineEmits(["close", "created", "updated", "remove"]);


const close = () => {
  emit("close");
};

const toggleModule = (moduleId: string) => {
  if (showModuleProgress.value === moduleId) {
    showModuleProgress.value = null;
  } else {
    showModuleProgress.value = moduleId;
  }
};

const toggleTopic = (topicId: string) => {
  if (showTopicProgress.value === topicId) {
    showTopicProgress.value = null;
  } else {
    showTopicProgress.value = topicId;
  }
};
</script>
