<template>
  <Field
    :value="initialValue"
    @input="updateValue"
    :name="name"
    :rules="validate ? props.rules : ''"
    v-slot="{ field, errorMessage, value, handleInput, handleChange, errors }"
    :label="props.label"
    :type="props.type || 'text'"
  >
    {{ validate }}
    <ContentEditor
      v-if="componentType === 'content-editor'"
      :model-value="value || []"
      @update:model-value="handleInput"
      :prefix="props.prefix"
      :label="props.label"
    />
    <ButtonSelect
      v-if="componentType === 'button-select'"
      :model-value="value"
      :items="props.items!"
      :item-title="props.itemTitle"
      :item-value="props.itemValue"
      @update:model-value="handleInput"
      :error-messages="errorMessage"
      :label="props.label"
      v-bind="field"
    />

    <component
      v-else
      clearable
      :is="componentType"
      :model-value="value"
      @update:model-value="handleInput"
      v-bind="field"
      :type="inputType"
      :label="props.label"
      :error-messages="errorMessage"
      variant="solo"
      :rows="props.rows"
      :auto-grow="props.autoGrow"
      :readonly="props.readonly"
      :max-rows="props.maxRows"
      :items="props.items"
      @change="handleChange"
    >
      <template v-slot:append-inner v-if="props.type === 'password'">
        <Icon
          @click="showPassword = !showPassword"
          :color="showPassword ? 'success' : ''"
          icon="mdi-eye"
        />
      </template>
    </component>
  </Field>
</template>
<script setup lang="ts">
import { Field } from "vee-validate";
import { FormField } from "~~/models/dynamic-form";
import { StringMap } from "~~/models/utils";

const { props, validate, name } = defineProps<{
  name: string;
  props: FormField;
  validate: Boolean;
}>();

const attrs = useAttrs();

const showPassword = ref(false);

let initialValue: any = null;

if (props.value != undefined) {
  initialValue = props.value;
}
if (props.default != undefined) {
  initialValue = props.default;
}

const inputType = computed(() => {
  if (props.type === "password" && showPassword.value) {
    return "text";
  }

  return props.type || "text";
});

const emit = defineEmits(["update:modelValue"]);

const ContentEditor = resolveComponent("content-editor");

const componentTypeMap: StringMap = {
  textarea: "v-textarea",
  select: "v-select",
  "button-select": "button-select",
  editor: "content-editor",
};

const componentType = computed(() => {
  if (!props.type) return "v-text-field";
  return componentTypeMap[props.type] || "v-text-field";
});

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
