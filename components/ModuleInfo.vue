<template>
  <Dialog @close="close" title="Dados do módulo">
    <div>
      <Text weight="bold">{{ module.name }}</Text>
    </div>
    <div class="mb-3">
      <Text emphasis="low">{{ module.description }}</Text>
    </div>
    <div>
      <Button size="small" @click="remove" class="mr-1 mb-1">Remover</Button>
      <Button size="small" @click="edit" class="mr-1 mb-1" color="primary">
        Editar
      </Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Module from "~~/models/module";

const { module } = defineProps<{ module: Module }>();

const emit = defineEmits(["close", "remove", "edit"]);

const close = () => {
  emit("close");
};

const remove = () => {
  if (confirm("Deseja realmente remover este módulo?")) {
    emit("remove");
  }
};

const edit = () => {
  emit("edit");
};
</script>
