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

const auth = useAuth();
const { user } = defineProps<{
  user?: User | null;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return user ? "Editar conta" : "Cadastrar conta";
});

const emit = defineEmits(["close", "created", "updated"]);

const form: FormProps = {
  steps: [
    {
      fields: {
        role: {
          label: "Tipo de conta",
          type: "select",
          items:
            auth.user.value?.role === "administrador"
              ? User.roles
              : User.roles.filter((role) => role.value == "estudante"),
          rules: "required",
          default: "estudante",
          value: user?.role ?? "estudante",
        },
        name: {
          label: "Nome completo",
          rules: "required",
          value: user?.name ?? "",
        },
        phone: {
          label: "Telefone",
          rules: "required",
          mask: ["(##) ####-####", "(##) #####-####"],
          value: user?.phone ?? "",
        },
        password: {
          label: "Senha",
          type: !user ? "password" : "hidden",
          rules: "required",
        },
        passwordConfirmation: {
          label: "Confirme sua senha",
          type: !user ? "password" : "hidden",
          rules: "required",
        },
      },
    },
  ],
  submitLabel: "Salvar conta",
  wizard: !user,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (values.password !== values.passwordConfirmation) {
      return notifyError("As senhas não conferem");
    }
    if (!user) {
      try {
        await createUser(values);
        notification.value = {
          title: "Conta cadastrada com sucesso",
          subtitle: values.name.split(" ")[0] + " já pode acessar o sistema",
          onContinue: close,
        };
        created();
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateUser(user.id!, values);
        notification.value = {
          title: "A conta foi atualizada",
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
