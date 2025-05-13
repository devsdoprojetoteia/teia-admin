<template>
  <div>
    <v-container v-if="courses">
      <div class="d-flex justify-space-between align-center">
        <Text variant="h4">Cursos</Text>
        <Button
          v-if="auth.user.value?.role === 'administrador'"
          color="primary"
          @click="showAddCourse = true"
          size="large"
          class="mb-8 mt-4"
          icon
        >
          <Icon icon="mdi-plus" />
        </Button>
      </div>

      <DynamicInput
        name="search"
        :props="{
          label: 'Buscar',
        }"
        v-model="search"
        label="Buscar"
        clearable
        block
        class="mb-4"
        :validate="false"
      />
      <div>
        <v-card>
          <div v-if="filteredCourses">
            <div v-if="filteredCourses.length === 0" class="pa-4 text-center">
              <Alert> Nenhum curso encontrado </Alert>
            </div>
            <v-list v-else>
              <template v-for="(course, courseIndex) in filteredCourses">
                <v-list-item @click="openCourse(course)">
                  <div class="d-flex justify-space-between align-center py-1">
                    <div>
                      <Text>{{ course.name }}</Text>
                      <br />
                      <Text emphasis="medium" variant="small">
                        {{ course.phone }}
                      </Text>
                      <br />
                      <Chip
                        v-if="course.published"
                        class="mt-2"
                        color="success"
                        label="Curso publicado"
                      >
                        Publicado
                      </Chip>
                      <Chip
                        v-else
                        class="mt-2"
                        color="error"
                        label="Curso não publicado"
                      >
                        Não publicado
                      </Chip>
                    </div>
                  </div>
                </v-list-item>
                <v-divider v-if="courseIndex < filteredCourses.length - 1" />
              </template>
            </v-list>
          </div>
          <Loading v-else />
        </v-card>
      </div>
      <CourseForm
        v-if="showAddCourse"
        @created="courseCreated"
        @updated="courseUpdated"
        @close="showAddCourse = false"
        :course="activeCourse"
      />
      <CourseInfo
        v-if="activeCourse"
        :course="activeCourse"
        @updated="courseUpdated"
        @close="closeCourse"
        @edit="showAddCourse = true"
        @remove="removeCourse"
        @changePassword="showChangePassword = true"
      />
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import slugify from "slugify";
import Course from "~~/models/course";

definePageMeta({
  middleware: ["authenticated"],
  layout: "authenticated",
});

useHead({
  title: "Cursos",
});

const filteredCourses = computed(() => {
  let list = courses.value ?? [];

  if (search.value) {
    list = list.filter((course: Course) =>
      slugify(
        course.name +
          " " +
          course.phone +
          " " +
          course.phone.replace(/[^0-9]/g, ""),
        { lower: true }
      ).includes(slugify(search.value, { lower: true }))
    );
  }
  return list;
});

const auth = useAuth();
const {
  courses,
  loadCourses,
  showAddCourse,
  hasCourses,
  openCourse,
  closeCourse,
  activeCourse,
  deleteCourse,
} = useCourses();

const filterRole = ref("");
const search = ref("");
const showChangePassword = ref(false);

// load courses on mounted
onMounted(async () => {
  await loadCourses();
});

const courseCreated = async (course: Course) => {
  await loadCourses();
};

const courseUpdated = async (course: Course) => {
  await loadCourses();
};

const removeCourse = async () => {
  if (activeCourse.value) {
    await deleteCourse(activeCourse.value!.id!);
    closeCourse();
    await loadCourses();
    const { notifySuccess } = useNotify();
    notifySuccess("Curso removido com sucesso");
  }
};
</script>
