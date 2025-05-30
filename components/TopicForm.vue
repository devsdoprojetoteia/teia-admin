<template>
  <Dialog @close="close" :title="title">

    <div v-if="!notification">
      <DynamicForm :form="form" />
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

const emit = defineEmits(["close", "created", "updated"]);

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
          type: "editor",
          value: topic?.content ?? [],
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
        await createTopic({ ...values, module: module.id, content: values.content.filter((item: any) => item.content) });
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
        await updateTopic(topic.id!, { ...values, content: values.content.filter((item: any) => item.content) });
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


</script>