<template>
  <v-dialog
    :model-value="true"
    :fullscreen="isFullscreen"
    :persistent="isFullscreen"
    @afterLeave="close"
    :max-width="isFullscreen ? '100%' : '600px'"
  >
    <v-card>
      <div class="bg-white">
        <v-container class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-start">
            <Button
              icon
              @click="close"
              class="mr-4"
              size="small"
              v-if="isFullscreen"
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
            v-if="!isFullscreen"
          >
            <Icon icon="mdi-close" />
          </Button>
        </v-container>
      </div>
      <v-divider />
      <v-container class="d-flex align-center flex-grow-1">
        <div class="w-100">
          <slot></slot>
        </div>
      </v-container>

      <div class="bg-white" v-if="canShowFooter">
        <v-divider />
        <v-container>
          <div class="text-center">
            <Button size="small" @click="close">Voltar</Button>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(["close"]);
const { title, fullscreen, showFooter } = defineProps({
  title: {
    type: String,
  },
  fullscreen: {
    type: Boolean,
    default: null,
  },
  showFooter: {
    type: Boolean,
    default: null,
  },
});

const isMobile = computed(() => window.innerWidth < 600);
const isFullscreen = computed(() =>
  fullscreen != null ? fullscreen : isMobile.value
);
const canShowFooter = computed(() =>
  showFooter != null ? showFooter : isFullscreen.value
);

const close = () => {
  emit("close");
};
</script>
