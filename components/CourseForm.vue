<template>
  <Dialog @close="close" :title="title">
    <div v-if="!notification">
      <DynamicForm :form="form" />
      <div class="text-center pt-5">
        <Button v-if="course" size="small" @click="remove" class="mr-1 mb-1">Remover curso</Button>
      </div>
    </div>

    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
/* placeholder */
import type { FormProps, FormValues } from "~/models/dynamic-form";
import Course from "~/models/course";
import type { NotificationProps } from "~~/models/notification";

const { createCourse, updateCourse } = useCourses();

const auth = useAuth();
const { course } = defineProps<{
  course?: Course | null;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return course ? "Editar curso" : "Cadastrar curso";
});

const emit = defineEmits(["close", "created", "updated", "remove"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        phone: {
          label: "WhatsApp do Chatbot",
          rules: "required|length:15",
          mask: ["(##) #####-####"],
          value: course?.phone ?? "",
        },
        name: {
          label: "Nome do curso",
          rules: "required",
          value: course?.name ?? "",
        },
        description: {
          label: "Descrição do curso",
          value: course?.description ?? "",
          type: "textarea",
        },
        duration: {
          label: "Duração do curso",
          value: course?.duration ?? "",
          hint: "Ex: 10 horas",
        },
        learning: {
          label: "O que você aprenderá?",
          value: course?.learning ?? [],
          type: "text-list",
        },
        requirements: {
          label: "Requisitos",
          value: course?.requirements ?? [],
          type: "text-list",
        },
        team: {
          label: "Equipe",
          value: course?.team ?? [],
          type: "team-list",
          prefix: "team-members",
        },
        published: {
          label: "Curso publicado",
          type: "switch",
          value: course?.published ?? false,
        },
      },
    },
  ],
  submitLabel: "Salvar curso",
  wizard: !course,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (!course) {
      try {
        await createCourse(values);
        notification.value = {
          title: "Curso cadastrado com sucesso",
          onContinue: close,
        };
        created();
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        console.log("update");
        console.log(values);
        console.log(course.id);
        await updateCourse(course.id!, values);
        notification.value = {
          title: "O curso foi atualizado",
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
  // eslint-disable-next-line no-alert
  if (confirm("Deseja realmente remover este curso?")) {
    // eslint-disable-next-line no-alert
    emit("remove");
  }
};

</script>
