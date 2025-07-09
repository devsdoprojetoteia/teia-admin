<template>
  <div class="mb-4">
    <div class="mb-2">
      <div v-if="label" class="caption">{{ label }}</div>
    </div>
    <div v-for="(item, index) in items" :key="item"
      class="d-sm-flex align-center justify-space-between pl-2 py-1 mb-2 rounded bg-white">
      <Text class="mb-0" variant="body-2">
        {{ item }}
      </Text>
      <div class="ml-sm-4">
        <Button size="x-small" variant="text" class="mr-1" :disabled="index === 0" @click="reorderItem(item, 'up')">
          <Icon icon="mdi-chevron-up" />
        </Button>
        <Button size="x-small" variant="text" :disabled="index === items.length - 1" @click="reorderItem(item, 'down')">
          <Icon icon="mdi-chevron-down" />
        </Button>
        <Button @click="removeItem(index)" size="small" variant="text">
          <Icon icon="mdi-delete" />
        </Button>
      </div>
    </div>
    <Button @click="openForm" class="mb-2" size="small">
      <Icon icon="mdi-plus" />
      Adicionar
    </Button>
    <Dialog @close="closeForm" title="Adicionar item" v-if="showForm">
      <DynamicInput name="item" :props="{ type: 'text', label: label, rules: 'required' }" :validate="true"
        v-model="item" />
      <Button @click="submit" color="primary" block>Adicionar</Button>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
const { modelValue } = defineProps<{
  modelValue?: string[];
  label?: string;
}>();

const showForm = ref(false);
const item = ref("");
const items = ref<string[]>(modelValue || []) as Ref<string[]>;

const emit = defineEmits(["close", "created", "updated", "update:modelValue"]);

const openForm = () => {
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const submit = () => {
  items.value = [...items.value, item.value as string];
  emit("update:modelValue", items.value as string[]);
  item.value = "";
  closeForm();

};

const removeItem = (index: number) => {
  items.value = items.value.filter((i: string, iIndex: number) => iIndex !== index);
  emit("update:modelValue", items.value as string[]);
};

const reorderItem = (item: string, direction: "up" | "down") => {
  const index = items.value.indexOf(item);
  if (direction === "up" && index > 0) {
    items.value = [...items.value.slice(0, index - 1), item, items.value[index - 1], ...items.value.slice(index + 1)];
  } else if (direction === "down" && index < items.value.length - 1) {
    items.value = [...items.value.slice(0, index), items.value[index + 1], item, ...items.value.slice(index + 2)];
  }
  emit("update:modelValue", items.value as string[]);
};
</script>