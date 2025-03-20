<template>
  <Dialog @close="close" :title="demand.title">
    {{demand}}
  </Dialog>
</template>
<script lang="ts" setup>
import Demand from '~~/models/demand';

const { demand } = defineProps<{ demand: Demand }>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>