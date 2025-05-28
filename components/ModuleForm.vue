<template>
  <Dialog @close="close" :title="title">
    <div v-if="course && !notification" class="mb-2">
      <Text variant="h6">{{ course.name }}</Text>
      <DynamicForm :form="form" />
      <div class="text-center pt-5">
        <Button v-if="module" size="small" @click="remove" class="mr-1 mb-1">Remover módulo</Button>
      </div>
    </div>
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
import useModules from "~/composables/useModules";
import type { FormProps, FormValues } from "~/models/dynamic-form";
import Module from "~/models/module";
import Course from "~/models/course";
import type { NotificationProps } from "~~/models/notification";

const { createModule, updateModule } = useModules();

const { module, course } = defineProps<{
  module?: Module | null;
  course?: Course | null;

}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return module ? "Editar módulo" : "Cadastrar módulo";
});

const emit = defineEmits(["close", "created", "updated", "remove"]);

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
          type: "textarea",
          value: module?.description ?? "",
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
        await createModule({ ...values, course: course.id });
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

const remove = () => {
  if (confirm("Deseja realmente remover este módulo?")) {
    emit("remove");
  }
};

</script>
