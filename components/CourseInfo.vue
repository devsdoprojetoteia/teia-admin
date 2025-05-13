<template>
  <Dialog @close="close" title="Dados do curso">
    <div>
      <Text class="d-flex align-center justify-space-between">
        {{ course.name }}
        <Chip v-if="course.published" color="success" label="Curso publicado" size="x-small">
          Publicado
        </Chip>
        <Chip v-else color="error" label="Curso não publicado" size="x-small">
          Não publicado
        </Chip>
      </Text>
    </div>
    <div class="mb-3">
      <Text emphasis="low">{{ course.phone }}</Text>
    </div>

    <div class="mb-3">
      <Text class="preserve-line-breaks">{{ course.description }}</Text>
    </div>

    <div v-if="auth.user.value?.role === 'administrador'">
      <Button size="small" @click="remove" class="mr-1 mb-1">Remover</Button>
      
      <Button size="small" :to="'/cursos/' + course.id + '/modulos'" class="mr-1 mb-1" color="primary">
        Gerenciar módulos
      </Button>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Course from "~~/models/course";

import { useAuth } from "~~/composables/useAuth";

const auth = useAuth();

const { course } = defineProps<{ course: Course }>();

const emit = defineEmits(["close", "remove", "edit"]);

const close = () => {
  emit("close");
};

const remove = () => {
  // eslint-disable-next-line no-alert
  if (confirm("Deseja realmente remover este curso?")) {
    // eslint-disable-next-line no-alert
    emit("remove");
  }
};

const edit = () => {
  emit("edit");
};
</script>
