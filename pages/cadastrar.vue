<template>
  <Portal>
    <div>
      <DynamicForm :form="form" v-if="customerId" />
      <Alert v-else
        >É necessário um código de cadastro para continuar. Por favor, entre em
        contato com nossa equipe e peça o link de cadastro.</Alert
      >
    </div>
    <div class="pt-12">
      <Button to="/entrar" class="mb-4" size="small">
        Já tenho cadastro
      </Button>
      <br />
      <Button @click="loginWithGoogle" class="mb-4" size="small">
        Fale conosco
      </Button>
    </div>
  </Portal>
</template>

<script lang="ts" setup>
import { FormProps, FormValues } from "~~/models/dynamic-form";

definePageMeta({
  layout: "public",
});

// get url query param "cliente"
const route = useRoute();
const customerId = route.query.cliente;

const form: FormProps = {
  steps: [
    {
      description: "Informe seus dados para continuar seu cadastro",
      fields: {
        name: {
          label: "Seu nome completo",
          rules: "required",
        },
        email: {
          label: "E-mail",
          type: "email",
          rules: "required|email",
        },
        password: {
          label: "Senha",
          type: "password",
          rules: "required",
        },
        password_confirmation: {
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
    const { login } = useFirebaseAuth();
    const loginResult = await login(values.email, values.password);
    if (loginResult) {
      redirectSuccessLogin();
    }
  },
};

const loginWithGoogle = async () => {
  const { loginWithGoogle } = useFirebaseAuth();
  const loginResult = await loginWithGoogle();
  if (loginResult) {
    redirectSuccessLogin();
  }
};

const redirectSuccessLogin = () => {
  return navigateTo({ name: "atendimento" });
};
</script>
