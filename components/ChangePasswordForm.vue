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

const { updatePassword } = useUsers();

const { user } = defineProps<{
  user: User;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return "Alterar senha";
});

const emit = defineEmits(["close", "created", "updated"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        password: {
          label: "Nova senha",
          type: "password",
          rules: "required",
        },
        passwordConfirmation: {
          label: "Confirme a nova senha",
          type: "password",
          rules: "required",
        },
      },
    },
  ],
  submitLabel: "Salvar nova senha",
  wizard: !user,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (values.password !== values.passwordConfirmation) {
      return notifyError("As senhas não conferem");
    }
    try {
      await updatePassword(user.id!, values);
      notification.value = {
        title: "Senha atualizada com sucesso",
        onContinue: close,
      };
      updated();
    } catch (error) {
      notifyError(errorMessage(error));
    }
  },
};

const close = () => {
  emit("close");
};

const updated = () => {
  emit("updated");
};
</script>
