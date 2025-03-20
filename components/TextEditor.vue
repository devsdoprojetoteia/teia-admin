<template>
  <div class="mb-3 text-editor elevation-3">
    <QuillEditor
      @update:content="changed"
      v-model:content="content"
      class=""
      :toolbar="toolbar"
      contentType="html"
      :placeholder="label"
    />
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  modelValue: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const toolbar = [
  [
    { header: [1, 2, 3, 4, false] },
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    "link",
    "clean",
  ],
];
const content = ref("");

const changed = (value: string) => {
  content.value = value;
  emit("update:modelValue", value);
};
</script>
<style lang="scss">
$color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
$backgroundColor: rgb(var(--v-theme-surface));
.text-editor {
  .ql-toolbar {
    background-color: $backgroundColor;
    color: #fff !important;
    border: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .ql-stroke {
      stroke: $color;
    }
    .ql-picker-options,
    .ql-picker-label {
      background-color: $backgroundColor !important;
      border: none !important;
      color: $color;
      .ql-picker-item {
        background-color: $backgroundColor;
        color: $color;
        &.ql-selected {
          color: $color;
        }
      }
    }
    button.ql-active,
    button:hover {
      background-color: $backgroundColor;
    }
  }
  .ql-container {
    background-color: $backgroundColor;
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: 1rem;
    .ql-editor {
      min-height: 200px;
      &.ql-blank::before {
        color: var(--v-theme-on-surface);
        opacity: var(--v-medium-emphasis-opacity);
        font-style: normal;
      }
    }
  }
  .ql-tooltip input[type="text"] {
    color: #000;
  }
}
</style>
