<template>
  <Dialog @close="close" title="Dados do curso">
    <Text weight="bold">{{ course.name }}</Text>
    <br />
    <Text emphasis="low">{{ course.phone }}</Text>
    <br />
    <Text emphasis="medium" class="preserve-line-breaks">{{
      course.description
    }}</Text>
    <br />
    <Chip
      v-if="course.published"
      class="mt-2"
      color="success"
      label="Curso publicado"
    >
      Publicado
    </Chip>
    <Chip v-else class="mt-2" color="error" label="Curso não publicado">
      Não publicado
    </Chip>
    <br />
    <br />
    <Button size="small" @click="remove" class="mr-1 mb-1">Remover</Button>
    <Button size="small" @click="edit" class="mr-1 mb-1" color="primary"
      >Editar</Button
    >
  </Dialog>
</template>
<script lang="ts" setup>
import Course from "~~/models/course";

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
