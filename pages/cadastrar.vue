<template>
  <Portal>
    <div>
      <DynamicForm :form="form" />
    </div>
    <div class="pt-12">
      <Button to="/entrar" class="mb-4" size="small">
        Já tenho cadastro
      </Button>
      <br />
    </div>
  </Portal>
</template>

<script lang="ts" setup>
import type { FormProps, FormValues } from "~~/models/dynamic-form";

definePageMeta({
  layout: "public",
});

// get url query param "cliente"
const route = useRoute();

const form: FormProps = {
  steps: [
    {
      description: "Informe seus dados para continuar seu cadastro",
      fields: {
        name: {
          label: "Seu nome completo",
          rules: "required",
        },
        phone: {
          label: "Telefone (WhatsApp)",
          rules: "required|length:15",
          mask: ["(##) #####-####"],
        },
        password: {
          label: "Senha",
          type: "password",
          rules: "required",
        },
        passwordConfirmation: {
          label: "Confirme sua senha",
          type: "password",
          rules: "required",
        },
      },
    },
  ],
  submitLabel: "Continuar",
  wizard: true,
  onSubmit: async (values: FormValues) => {
    // validate password confirmation
    if (values.password !== values.passwordConfirmation) {
      const { notifyError } = useNotify();
      return notifyError("As senhas não conferem");
    }
    const { register } = useApiAuth();
    const registerResult = await register(
      values.name,
      values.phone,
      values.password
    );
    if (registerResult) {
      redirectSuccessRegister();
    }
  },
};

const redirectSuccessRegister = () => {
  return navigateTo({ path: "/painel" });
};
</script>
