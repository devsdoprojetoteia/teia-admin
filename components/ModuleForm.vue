<template>
  <Dialog @close="close" :title="title">
    <div v-if="courseName" class="mb-2">
      <Text variant="h6">Curso: {{ courseName }}</Text>
    </div>
    <DynamicForm :form="form" v-if="!notification" />
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
import useModules from "~/composables/useModules";
import type { FormProps, FormValues } from "~/models/dynamic-form";
import Module from "~/models/module";
import type { NotificationProps } from "~~/models/notification";

const { createModule, updateModule } = useModules();

const { module, courseId, courseName } = defineProps<{
  module?: Module | null;
  courseId?: string;
  courseName?: string;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return module ? "Editar módulo" : "Cadastrar módulo";
});

const emit = defineEmits(["close", "created", "updated"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        name: {
          label: "Nome do módulo",
          rules: "required",
          value: module?.name ?? "",
        },
        description: {
          label: "Descrição do módulo",
          value: module?.description ?? "",
          type: "textarea",
        },
      },
    },
  ],
  submitLabel: "Salvar módulo",
  wizard: !module,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (!module) {
      try {
        await createModule({ ...values, course: courseId, courseId });
        notification.value = {
          title: "Módulo cadastrado com sucesso",
          onContinue: close,
        };
        emit("created");
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateModule(module.id!, values);
        notification.value = {
          title: "O módulo foi atualizado",
          onContinue: close,
        };
        emit("updated");
      } catch (error) {
        notifyError(errorMessage(error));
      }
    }
  },
};

const close = () => {
  emit("close");
};
</script>
