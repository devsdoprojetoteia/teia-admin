<template>
  <section class="d-flex align-center"
    style="background-image: url('/img/background-about.png'); background-size: cover; min-height: calc(100vh - 80px);">
    <v-container class="py-10 text-center" style="max-width: 520px !important">
      <div class="bg-white py-8 px-6 px-sm-16 rounded-lg border">
        <NuxtLink to="/painel" class="text-decoration-none d-flex align-center justify-center mb-6">
          <img src="/img/logo-horizontal.png" alt="Projeto TEIA" class="logo" style="width: 140px;" />
        </NuxtLink>
        <slot></slot>
      </div>
    </v-container>
  </section>
</template>
