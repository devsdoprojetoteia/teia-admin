<template>
  <Portal>
    <div v-if="phoneSent">
      <h1 class="text-center mb-6 text-primary font-weight-regular">Recuperar a senha</h1>
      <DynamicForm :form="recoverPasswordForm" />
    </div>
    <div v-if="!phoneSent">
      <h1 class="text-center mb-6 text-primary font-weight-regular">Informe o código enviado para o seu WhatsApp</h1>
      <DynamicForm :form="forgotPasswordForm" />
    </div>
    <div class="pt-12">
      <Button to="/entrar" size="small" variant="text" class="text-primary text-decoration-underline mb-4"> Voltar
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

const phoneSent = ref(false);
const phone = ref("");

// get url query param "cliente"
const route = useRoute();

const forgotPasswordForm: FormProps = {
  steps: [
    {
      fields: {
        phone: {
          label: "Telefone (WhatsApp)",
          rules: "required|length:15",
          mask: ["(##) #####-####"],
        },
      },
    },
  ],
  submitLabel: "Continuar",
  wizard: true,
  onSubmit: async (values: FormValues) => {
    const { forgotPassword } = useApiAuth();
    const forgotPasswordResult = await forgotPassword(values.phone);
    if (forgotPasswordResult) {
      phone.value = values.phone;
      phoneSent.value = true;
    }
  },
};

const recoverPasswordForm = {
  steps: [
    {
      fields: {
        code: {
          label: "Código de recuperação",
          rules: "required",
        },
        password: {
          label: "Nova senha",
          type: "password",
          rules: "required",
        },
        passwordConfirmation: {
          label: "Confirme a senha",
          type: "password",
          rules: "required",
        },
      },
    },
  ],
  submitLabel: "Recuperar",
  wizard: true,
  onSubmit: async (values: FormValues) => {
    const { notifyError, notifySuccess } = useNotify();
    if (values.password !== values.passwordConfirmation) {
      return notifyError("As senhas não conferem");
    }
    // validate password confirmation
    const { recoverPassword } = useApiAuth();
    const recoverPasswordResult = await recoverPassword(
      phone.value,
      values.code,
      values.password
    );
    if (recoverPasswordResult) {
      notifySuccess("Sua senha foi alterada com sucesso");
      redirectSuccess();
    }
  },
};

const redirectSuccess = () => {
  return navigateTo({ path: "/entrar" });
};
</script>
