<template>
  <v-snackbar
    v-if="notifyMessage"
    v-model="show"
    :color="notifyMessage?.type || 'info'"
    app
    :timeout="notifyMessage?.type === 'success' ? 2000 : 10000"
  >
    <div class="d-flex align-center">
      <Icon start :icon="icon" />
      {{ notifyMessage?.message }}
    </div>
    <template v-slot:actions>
      <v-btn icon @click="show = false">
        <Icon size="small" icon="mdi-close" />
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
const show = ref(false);

const icon = computed(() => {
  switch (notifyMessage?.value?.type) {
    case "success":
      return "mdi-check-circle";
    case "warning":
      return "mdi-alert";
    case "error":
      return "mdi-alert-circle";
    default:
      return "mdi-information";
  }
});

const { notifyMessage } = useNotify();
watch(notifyMessage, (val) => {
  if (val) {
    show.value = true;
  }
});
</script>
