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

const { topic, module, type } = defineProps<{
  topic?: Topic | null;
  type: 'lesson' | 'questionnaire';
  module: Module;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  if (topic) {
    if (type === 'lesson') {
      return "Editar aula";
    }
    return "Editar questionário";
  }
  if (type === 'lesson') {
    return "Cadastrar aula";
  }
  return "Cadastrar questionário";
});

const emit = defineEmits(["close", "created", "updated"]);


const form: FormProps = {
  steps: [
    {
      fields: type === 'lesson' ? {
        title: {
          label: "Título da aula",
          rules: "required",
          value: topic?.title ?? "",
        },
        content: {
          label: "Conteúdo da aula",
          type: "editor",
          value: topic?.content ?? [],
        },
      } : {
        title: {
          label: "Título do questionário",
          rules: "required",
          value: topic?.title ?? "Questionário",
        },
        questions: {
          label: "Questões",
          type: "questions",
          value: topic?.questions ?? [],
        },
      },
    },
  ],
  submitLabel: type === 'lesson' ? "Salvar aula" : "Salvar questionário",
  wizard: !topic,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (type === 'questionnaire' && values.questions.length === 0) {
      notifyError('Adicione pelo menos uma questão')
      return
    }
    if (!topic) {
      try {
        const data = { ...values, module: module.id, content: (values.content || []).filter((item: any) => item.content), type }
        await createTopic(data);
        notification.value = {
          title: type === 'lesson' ? "Aula cadastrada com sucesso" : "Questionário cadastrado com sucesso",
          onContinue: close,
        };
        created();
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateTopic(topic.id!, { ...values, content: (values.content || []).filter((item: any) => item.content), type });
        notification.value = {
          title: type === 'lesson' ? "Aula atualizada com sucesso" : "Questionário atualizado com sucesso",
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