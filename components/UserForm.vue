<template>
  <Dialog @close="close" :title="title">
    <DynamicForm :form="form" v-if="!notification" />
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
/* placeholder */
import type { FormProps, FormValues } from "~/models/dynamic-form";
import User from "~/models/user";
import type { NotificationProps } from "~~/models/notification";

const { createUser, updateUser } = useUsers();

const { user } = defineProps<{
  user?: User | null;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return user ? "Editar conta" : "Cadastrar conta";
});

const emit = defineEmits(["close"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        type: {
          label: "Tipo de conta",
          type: "select",
          items: User.roles,
          rules: "required",
        },
        name: {
          label: "Nome completo",
          rules: "required",
        },
        phone: {
          label: "Telefone",

          rules: "required",
          mask: ["(##) ####-####", "(##) #####-####"],
        },
      },
    },
  ],
  submitLabel: "Salvar conta",
  wizard: !user,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (!user) {
      try {
        await createUser(values);
        notification.value = {
          title: "Conta atualizada!",
          onContinue: close,
        };
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateUser(user.id!, values);
        notification.value = {
          title: "A conta foi atualizada!",
          onContinue: close,
        };
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
