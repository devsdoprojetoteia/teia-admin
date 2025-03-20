<template>
  <Portal class="d-flex align-center">
    <div class="mb-8">
      <Button color="white" @click="loginWithGoogle">
        <img src="~/assets/img/g-google.png" width="18" class="mr-4" />
        Entrar com o google
      </Button>
    </div>
    <DynamicForm :form="form" @updated="changed" />
    <div class="pt-12">
      <Button to="/cadastrar" class="mb-4" size="small"> Cadastre-se </Button>
      <br />
      <Button to="/recuperar-senha" class="mb-4" size="small">
        Recupere sua senha
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

const form: FormProps = {
  steps: [
    {
      fields: {
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
      },
    },
  ],
  submitLabel: "Entrar",
  wizard: false,
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

const changed = (values: FormValues) => {
  console.log("Changed values: ", values);
};
</script>
