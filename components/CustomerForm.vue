<template>
  <v-dialog :value="true" fullscreen persistent>
    <v-card>
      <!-- <DialogHeader @close="close" /> -->
      <v-container class="pt-6">
        <DynamicForm :form="form" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { FormProps, FormValues } from "~~/models/dynamic-form";

const form: FormProps = {
  steps: [
    {
      fields: {
        name: {
          label: "Nome da empresa",
          rules: "required",
        },
        corporate_name: {
          label: "Razão social",
        },
        cnpj: {
          label: "CNPJ",
          mask: ["##.###.###/####-##"],
        },
        address: {
          label: "Endereço",
          type: "textarea",
        },
        phone: {
          label: "Telefone de contato",
          mask: ["(##) ####-####", "(##) #####-####"],
        },
        email: {
          label: "Email de contato",
          type: "email",
        },
      },
    },
  ],
  submitLabel: "Entrar",
  wizard: false,
  onSubmit: async (values: FormValues): Promise<boolean> => {
    return true;
  },
};
</script>
