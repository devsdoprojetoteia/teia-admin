<template>
  <Field :value="initialValue" @input="updateValue" :name="name" :rules="validate ? props.rules : ''"
    v-slot="{ field, errorMessage, value, handleInput, handleChange, errors }" :label="props.label"
    :type="props.type || 'text'">
    <ContentEditor v-if="componentType === 'content-editor'" :model-value="value || []"
      @update:model-value="handleInput" :prefix="props.prefix" :label="props.label" />
    <QuestionsEditor v-if="componentType === 'questions-editor'" :model-value="value || []"
      @update:model-value="handleInput" />
    <ButtonSelect v-if="componentType === 'button-select'" :model-value="value" :items="props.items!"
      :item-title="props.itemTitle" :item-value="props.itemValue" @update:model-value="handleInput"
      :error-messages="errorMessage" :label="props.label" v-bind="field" />
    <TextListForm v-if="componentType === 'text-list'" :model-value="value" @update:model-value="handleInput"
      :error-messages="errorMessage" :label="props.label" v-bind="field" />
    <TeamListForm v-if="componentType === 'team-list'" :model-value="value" @update:model-value="handleInput"
      :error-messages="errorMessage" :label="props.label" v-bind="field" />
    <div v-if="componentType === 'upload'" class="mb-4 text-center">
      <div v-if="props.uploadType === 'image' && value" class="d-flex justify-center">
        <div>
          <v-img :src="filesURL + value" alt="upload" width="100" height="100" cover
            class="rounded-circle border mb-1" />
        </div>
      </div>
      <div v-else-if="props.uploadType === 'video' && value">
        <video :src="value" class="w-100" controls></video>
      </div>
      <div v-else-if="props.uploadType === 'audio' && value">
        <audio :src="value" controls></audio>
      </div>
      <div v-else-if="value">
        <div class="text-caption">{{ filesURL + value }}</div>
      </div>

      <Upload :model-value="value" aria-label="upload" @uploaded="(url) => handleInput(url)"
        :error-messages="errorMessage" :label="props.label" button :type="props.uploadType || 'file'"
        :prefix="props.prefix" />
    </div>


    <component v-else-if="props.mask" :clearable="attrs.clearable || props.clearable" :is="componentType"
      :placeholder="props.placeholder" :model-value="value" @update:model-value="handleInput" v-bind="field"
      v-mask="props.mask" :type="inputType" :label="props.label" :hint="props.hint" :error-messages="errorMessage"
      variant="solo" :rows="props.rows" :auto-grow="props.autoGrow" :readonly="props.readonly" :max-rows="props.maxRows"
      :items="props.items" @change="handleChange" @click:clear="handleClear">
      <template v-slot:append-inner v-if="props.type === 'password'">
        <Icon @click="showPassword = !showPassword" :color="showPassword ? 'success' : ''" icon="mdi-eye" />
      </template>
    </component>
    <component v-else :clearable="attrs.clearable != null || props.clearable" :is="componentType"
      :placeholder="props.placeholder" :model-value="value" @update:model-value="handleInput" v-bind="field"
      :type="inputType" :label="props.label" :hint="props.hint" :error-messages="errorMessage" variant="solo"
      :rows="props.rows" :auto-grow="props.autoGrow" :readonly="props.readonly" :max-rows="props.maxRows"
      :items="props.items" @change="handleChange" @click:clear="handleClear">
      <template v-slot:append-inner v-if="props.type === 'password'">
        <Icon @click="showPassword = !showPassword" :color="showPassword ? 'success' : ''" icon="mdi-eye" />
      </template>
    </component>
  </Field>
</template>
<script setup lang="ts">
import { Field } from "vee-validate";
import type { FormField } from "~~/models/dynamic-form";
import type { StringMap } from "~~/models/utils";
const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;

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
} else if (props.default != undefined) {
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
const QuestionsEditor = resolveComponent("questions-editor");
const componentTypeMap: StringMap = {
  textarea: "v-textarea",
  select: "v-select",
  "button-select": "button-select",
  editor: "content-editor",
  questions: "questions-editor",
  'text-list': "text-list",
  'team-list': "team-list",
  'upload': "upload",
};

const componentType = computed(() => {
  if (!props.type) return "v-text-field";
  return componentTypeMap[props.type] || "v-text-field";
});

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};

const handleClear = () => {
  console.log("clear");
  emit("update:modelValue", "");
};

const handleUpload = (event: any) => {
  console.log("handleUpload", event);
  console.log("upload", event);

};
</script>
