<template>
  <div class="text-center">
    <v-progress-circular indeterminate :size="size"></v-progress-circular>
  </div>
</template>
<script lang="ts" setup>
const { size } = defineProps({
  size: {
    type: Number,
    default: 40,
  },
});
</script>
