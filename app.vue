<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { $api, $config } = useNuxtApp();

useHead({
  htmlAttrs: {
    lang: "pt-BR",
  },
  title: "Portal TEIA",
  meta: [
    {
      name: "description",
      content:
        "O TEIA é uma tecnologia social em edução que leva cursos acessíveis às comunidades com baixa conexão à internet.",
    },
    { name: "theme-color", content: "#00592d" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
