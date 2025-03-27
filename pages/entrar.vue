<template>
  <Portal class="d-flex align-center">
    <h4 class="text-center mb-6">Informe seus dados para entrar</h4>
    <DynamicForm :form="form" @updated="changed" />
    <div class="pt-12">
      <!-- <Button to="/cadastrar" class="mb-4" size="small"> Cadastre-se </Button>
      <br /> -->
      <Button to="/recuperar-senha" class="mb-4" size="small">
        Recupere sua senha
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
          label: "Telefone",
          type: "phone",
          rules: "required",
          mask: ["(##) ####-####", "(##) #####-####"],
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
  return navigateTo({ path: "/" });
};

const changed = (values: FormValues) => {
  console.log("Changed values: ", values);
};
</script>
