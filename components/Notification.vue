<template>
  <div class="text-center">
    <div class="mb-3">
      <Icon v-bind="iconData" size="120" />
    </div>
    <Text variant="h5" v-if="title">
      {{ title }}
    </Text>
    <Text type="p" variant="subtitle-1" emphasis="medium" v-if="subtitle">
      {{ subtitle }}
    </Text>
    <Text type="p" v-if="description">
      {{ description }}
    </Text>
    <br />
    <Button @click="onContinue" v-if="onContinue" color="success">
      {{ buttonLabel || "Continuar" }}
    </Button>
  </div>
</template>
<script setup lang="ts">
export interface NotificationProps {
  type?: "success" | "error" | "warning" | "info";
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onContinue?: () => void;
}

const { type, icon, title, subtitle, description, buttonLabel, onContinue } =
  defineProps<NotificationProps>();

const t = type || "success";

const iconData = computed(() => {
  const typeIcons = {
    success: "mdi-check",
    error: "mdi-close",
    warning: "mdi-alert",
    info: "mdi-information",
  };

  return {
    icon: icon || typeIcons[t],
    color: t,
  };
});
</script>
