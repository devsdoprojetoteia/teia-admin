<template>
  <Portal class="d-flex align-center">

    <h1 class="text-center mb-6 text-primary font-weight-regular">Informe seus dados para entrar</h1>
    <DynamicForm :form="form" @updated="changed" />
    <div class="pt-4">
      <!-- <Button to="/cadastrar" class="mb-4" size="small"> Cadastre-se </Button>
      <br /> -->
      <Button to="/recuperar-senha" class="mb-4 text-primary text-decoration-underline" size="small" variant="text">
        Esqueci minha senha
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

const form: FormProps = {
  steps: [
    {
      fields: {
        phone: {
          label: "Telefone (WhatsApp)",
          type: "phone",
          rules: "required|length:15",
          mask: ["(##) #####-####"],
        },
        password: {
          label: "Senha",
          type: "password",
          rules: "required",
        },
      },
    },
  ],
  submitLabel: "Entrar",
  wizard: false,
  onSubmit: async (values: FormValues) => {
    const { login } = useApiAuth();
    const loginResult = await login(values.phone, values.password);
    if (loginResult) {
      redirectSuccessLogin();
    }
  },
};

const redirectSuccessLogin = () => {
  return navigateTo({ path: "/painel" });
};

const changed = (values: FormValues) => { };
</script>
