<template>
  <section class="d-flex align-center">
    <v-container class="py-10 text-center" style="max-width: 376px !important">
      <Icon class="mb-4" size="100" icon="mdi-face-agent" />
      <Text variant="h5" class="mb-9">Central de atendimento</Text>
      <div>
        <slot></slot>
      </div>
    </v-container>
  </section>
</template>
