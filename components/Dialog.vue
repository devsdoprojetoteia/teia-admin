<template>
  <v-dialog :model-value="true" fullscreen persistent>
    <v-card class="py-4 fill-height" style="width: 100%">
      <v-container class="d-flex align-center justify-start">
        <Button icon @click="close" class="mr-4" size="small">
          <Icon icon="mdi-chevron-left" />
        </Button>
        <Text variant="h6" v-if="title" class="mb-0" align="center">
          <strong>{{ title }} </strong>
        </Text>
      </v-container>
      <v-container class="d-flex align-center flex-grow-1">
        <div class="w-100">
          <slot></slot>
        </div>
      </v-container>
      <v-container>
        <div class="text-center my-4">
          <Button size="small" @click="close">Fechar</Button>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(["close"]);
const { title } = defineProps({
  title: {
    type: String,
  },
});

const close = () => {
  emit("close");
};
</script>
