<template>
  <v-dialog
    :model-value="true"
    :fullscreen="fullscreen"
    :persistent="fullscreen"
    @afterLeave="close"
    :max-width="fullscreen ? '100%' : '600px'"
  >
    <v-card>
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center justify-start">
          <Button
            icon
            @click="close"
            class="mr-4"
            size="small"
            v-if="fullscreen"
          >
            <Icon icon="mdi-chevron-left" />
          </Button>
          <Text variant="h6" v-if="title" class="mb-0" align="center">
            <strong>{{ title }} </strong>
          </Text>
        </div>
        <Button
          icon
          @click="close"
          class="ml-4"
          size="small"
          v-if="!fullscreen"
        >
          <Icon icon="mdi-close" />
        </Button>
      </v-container>
      <v-divider />
      <v-container class="d-flex align-center flex-grow-1">
        <div class="w-100">
          <slot></slot>
        </div>
      </v-container>
      <v-divider />
      <v-container>
        <div class="text-center">
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
  fullscreen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  emit("close");
};
</script>
