<template>
  <div>
    <v-container v-if="courses">
      <div class="d-flex justify-space-between align-center mb-8 mt-4">
        <div class="d-flex align-center">
          <Button to="/"  icon class="mr-2" >
            <Icon icon="mdi-chevron-left" />
          </Button>
          <Text variant="h4" class="mb-0">Cursos</Text>
          
        </div>
        <Button
          v-if="auth.user.value?.role === 'administrador'"
          color="primary"
          @click="showAddCourse = true"
          
          
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
        <div>
          <div v-if="filteredCourses">
            <div v-if="filteredCourses.length === 0" class="pa-4 text-center">
              <Alert> Nenhum curso encontrado </Alert>
            </div>
            <div v-else>
              <template v-for="(course, courseIndex) in filteredCourses"  :key="courseIndex">
                <v-card class="mb-4">
                  <v-card-title>
                    <Text class="d-flex align-center justify-space-between">
                      {{ course.name }} 
                      <Chip
                        v-if="course.published"
                        
                        color="success"
                        label="Curso publicado"
                        size="x-small"
                      >
                        Publicado
                      </Chip>
                      <Chip
                        v-else
                        color="error"
                        label="Curso não publicado"
                        size="x-small"
                      >
                        Não publicado
                      </Chip>
                    </Text>
                  </v-card-title>
                  <v-card-text>
                    <Text emphasis="medium">{{ course.description }}</Text>
                  </v-card-text>
                  <v-card-actions>
                    <Button color="primary" :to="`/cursos/${course.id}/modulos`">
                      <Icon icon="mdi-view-list" class="mr-2" />
                      Gerenciar módulos
                    </Button>
                    <Button color="primary" @click="editCourse(course)">
                      <Icon icon="mdi-pencil" class="mr-2" />
                      Editar
                    </Button>
                  </v-card-actions>
                </v-card>
                
              </template>
            </div>
          </div>
          <Loading v-else />
        </div>
      </div>
      <CourseForm
        v-if="showAddCourse || activeCourse"
        @created="courseCreated"
        @updated="courseUpdated"
        @remove="removeCourse"
        @close="closeCourseForm"
        :course="activeCourse"
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
  editCourse,
  closeCourse,
  activeCourse,
  deleteCourse,
} = useCourses();

const filterRole = ref("");
const search = ref("");

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
    showAddCourse.value = false;
    const { notifySuccess } = useNotify();
    notifySuccess("Curso removido com sucesso");
  }
};

const closeCourseForm = () => {
  showAddCourse.value = false;
  closeCourse();
};
</script>
