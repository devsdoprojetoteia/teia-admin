<template>
  <div class="mb-4">
    <p v-if="label" class="caption">{{ label }}</p>
    <v-btn
      v-for="item in items"
      @click="selectItem(item)"
      class="mb-1 mr-1"
      :variant="selected === extractValue(item) ? 'elevated' : 'outlined'"
      :color="selected === extractValue(item) ? 'success' : ''"
    >
      {{ extractTitle(item) }}
    </v-btn>
    <div v-if="errorMessages" class="text-error caption">
      <small>{{ errorMessages }}</small>
    </div>
  </div>
</template>
<script setup lang="ts">
interface ButtonSelectProps {
  items: any[];
  label?: string;
  itemTitle?: string;
  itemValue?: string;
  modelValue?: any;
  errorMessages?: string;
}
const { items, label, itemTitle, itemValue, modelValue } =
  defineProps<ButtonSelectProps>();

const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();

const selected = ref(null);

if (modelValue) {
  selected.value = modelValue;
}

const selectItem = (item: any) => {
  const value = extractValue(item);
  selected.value = value;
  console.log(value);

  emit("update:modelValue", value);
};

const extractValue = (item: any) => {
  if (itemValue) {
    return item[itemValue];
  }
  return item;
};

const extractTitle = (item: any) => {
  if (itemTitle) {
    return item[itemTitle];
  }
  return item;
};
</script>
