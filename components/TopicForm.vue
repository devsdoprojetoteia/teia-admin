<template>
  <Dialog @close="close" :title="title">
    <div v-if="!notification">
      <DynamicForm :form="form" />
      <div class="text-center pt-5">
        <Button v-if="topic" size="small" @click="remove" class="mr-1 mb-1">Remover tópico</Button>
      </div>
    </div>
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
import type { FormProps, FormValues } from "~/models/dynamic-form";
import Topic from "~/models/topic";
import Module from "~/models/module";
import type { NotificationProps } from "~~/models/notification";

const { createTopic, updateTopic } = useTopics();

const { topic, module } = defineProps<{
  topic?: Topic | null;
  module: Module;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return topic ? "Editar tópico" : "Cadastrar tópico";
});

const emit = defineEmits(["close", "created", "updated", "remove"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        title: {
          label: "Título do tópico",
          rules: "required",
          value: topic?.title ?? "",
        },
        content: {
          label: "Conteúdo do tópico",
          value: topic?.content ?? "",
          type: "textarea",
          rows: 5,
          autoGrow: true,
        },
        order: {
          label: "Ordem",
          type: "text",
          value: topic?.order?.toString() ?? "0",
        },
      },
    },
  ],
  submitLabel: "Salvar tópico",
  wizard: !topic,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (!topic) {
      try {
        await createTopic({ ...values, module: module.id, order: parseInt(values.order) });
        notification.value = {
          title: "Tópico cadastrado com sucesso",
          onContinue: close,
        };
        created();
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateTopic(topic.id!, { ...values, order: parseInt(values.order) });
        notification.value = {
          title: "O tópico foi atualizado",
          onContinue: close,
        };
        updated();
      } catch (error) {
        notifyError(errorMessage(error));
      }
    }
  },
};

const close = () => {
  emit("close");
};

const created = () => {
  emit("created");
};

const updated = () => {
  emit("updated");
};

const remove = () => {
  if (confirm("Deseja realmente remover este tópico?")) {
    emit("remove");
  }
};
</script> 