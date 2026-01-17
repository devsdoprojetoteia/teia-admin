<template>
  <Portal>
    <div>
      <h1 class="text-center mb-6 text-primary font-weight-regular">Cadastre-se</h1>
      <DynamicForm :form="form" />
    </div>
    <div class="pt-12">
      <Button to="/entrar" size="small" variant="text" class="text-primary text-decoration-underline mb-4">
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
