<template>
  <Form
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
    @onUpdated="updated"
    v-slot="data"
    :initial-values="initialValues"
    :keepValues="true"
  >
    <template v-for="(step, stepIndex) in form.steps">
      <Transition name="slide-up">
        <div v-show="!form.wizard || currentStep === stepIndex || true">
          <div v-if="step.title || step.description || step.subtitle">
            <Text variant="h4">
              {{ step.title }}
            </Text>
            <Text variant="h5" emphasis="medium">
              {{ step.subtitle }}
            </Text>
            <Text type="p">
              {{ step.description }}
            </Text>
          </div>
          <v-row class="my-0">
            <template v-for="(field, fieldName) in step.fields">
              <v-col
                v-if="field.type !== 'hidden'"
                :cols="field.cols || 12"
                :lg="field.lgCols || 12"
                class="py-0"
              >
                <div>
                  <DynamicInput
                    :name="fieldName.toString()"
                    :props="field"
                    :validate="!form.wizard || currentStep === stepIndex"
                  />
                </div>
              </v-col>
            </template>
          </v-row>
          <div class="mb-6 text-center" v-if="form.wizard && currentStep !== 0">
            <Button size="small" @click="previous">
              <Icon icon="mdi-arrow-left" start /> Voltar
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              size="large"
              @click="
                () => {
                  data.validate();
                  data.meta.valid ? next() : null;
                }
              "
              :disabled="
                (data.errors && Object.keys(data.errors).length > 0) || sending
              "
              v-if="form.wizard && currentStep !== form.steps.length - 1"
              block
            >
              {{ nextLabel }}
            </Button>
            <Button
              v-else-if="stepIndex === form.steps.length - 1"
              type="submit"
              color="primary"
              size="x-large"
              block
              :disabled="
                (data.errors && Object.keys(data.errors).length > 0) || sending
              "
            >
              <v-progress-circular
                indeterminate
                v-if="sending"
                start
                size="small"
                class="mr-4"
              />
              <span v-if="sending"> Enviando... </span>
              <span v-else>
                {{ form.submitLabel ?? "Salvar" }}
              </span>
            </Button>
          </div>
        </div>
      </Transition>
    </template>

    <div v-if="log">
      <pre class="text-left pt-6">{{ data }}</pre>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form, useFormValues } from "vee-validate";
import type { FormProps, FormValues } from "../models/dynamic-form";

const { notifyError } = useNotify();

const { form, log } = defineProps<{ form: FormProps; log?: boolean }>();

const initialValues: FormValues = {};
form.steps.forEach((step) => {
  Object.keys(step.fields).forEach((key) => {
    const field = step.fields[key];
    initialValues[key] = field.value;
  });
});

const emit = defineEmits<{
  (e: "submit", value: FormValues): void;
  (e: "updated", value: FormValues): void;
}>();

const currentStep = ref(0);
const sending = ref(false);

const nextLabel = computed(() => {
  const step = form.steps[currentStep.value];
  if (step && step.nextLabel) {
    return step.nextLabel;
  }
  return form.nextLabel ?? "Continuar";
});

async function onSubmit(values: any) {
  sending.value = true;
  if (form.onSubmit) {
    await form.onSubmit(values as FormValues);
  }

  emit("submit", values as FormValues);
  sending.value = false;
}

function updated(values: any) {
  emit("updated", values as FormValues);
}

function onInvalidSubmit({ values, errors, results }: any) {
  notifyError("Preencha todos os campos corretamente antes de enviar");
}

function next() {
  emit("updated", useFormValues().value as FormValues);

  currentStep.value++;
}

function previous() {
  currentStep.value--;
}
</script>

<style lang="scss">
.slide-up-enter-active {
  transition: all 0.5s ease-in;
}
.slide-up-leave-active {
  transition: all 0s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
