<template>
  <div class="text-caption">
    <span v-if="item.estimateInDays > 0" class="text-medium-emphasis">
      <span v-if="item.billable">
        {{ $utils.plural(item.estimateInDays, "dia útil") }}
      </span>
      <span v-else>
        {{ $utils.plural(item.estimateInDays, "dia útil") }}
      </span>
    </span>
    <span v-else-if="item.estimated" class="text-disabled"
      >Não será estimada</span
    >
    <span v-else="item.estimated" class="text-medium-emphasis"
      >Aguardando estimativa</span
    >
  </div>
</template>
<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: null,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
});

const { $utils } = useNuxtApp();
</script>
