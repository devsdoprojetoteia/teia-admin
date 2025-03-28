<template>
  <Dialog @close="close" title="Dados da conta">
    <Text weight="bold">{{ user.name }}</Text>
    <br />
    <Text>{{ user.roleLabel }}</Text>
    <br />
    <Text emphasis="medium">{{ user.phone }}</Text>
    <br />
    <br />
    <Button size="small" @click="remove" class="mr-1 mb-1">Remover</Button>
    <Button size="small" @click="edit" class="mr-1 mb-1" color="success"
      >Editar</Button
    >
    <Button
      size="small"
      @click="changePassword"
      class="mr-1 mb-1"
      color="success"
      >Alterar senha</Button
    >
  </Dialog>
</template>
<script lang="ts" setup>
import User from "~~/models/user";

const { user } = defineProps<{ user: User }>();

const emit = defineEmits(["close", "remove", "edit", "changePassword"]);

const close = () => {
  emit("close");
};

const remove = () => {
  // eslint-disable-next-line no-alert
  if (confirm("Deseja realmente remover esta conta?")) {
    // eslint-disable-next-line no-alert
    emit("remove");
  }
};

const edit = () => {
  emit("edit");
};

const changePassword = () => {
  emit("changePassword");
};
</script>
