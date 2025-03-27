<template>
  <Dialog @close="close" :title="user.name">
    <div>
      <Text>{{ user.name }}</Text>
      <br />
      <Text>{{ user.roleLabel }}</Text>
      <br />
      <Text>{{ user.phone }}</Text>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import User from "~~/models/user";

const { user } = defineProps<{ user: User }>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
