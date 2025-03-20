<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { $api, $config } = useNuxtApp();
const { setProvider } = useProvider();

const { data: provider } = await useAsyncData(() =>
  $api.providers.getPublic("cultivar-digital")
);

if (provider && provider.value) {
  setProvider(provider.value!);
  useServerSeoMeta({
    titleTemplate: (pageTitle) => {
      return pageTitle
        ? `${pageTitle} - ${provider.value?.name}`
        : provider.value?.name || "";
    },
    title: () => provider.value?.description || "",
    description: () => provider?.value?.description,
    ogTitle: () => `${provider.value?.name}`,
    ogDescription: () => provider?.value?.description,
    ogImage: () => $config.public.filesURL + provider?.value?.logo || "",
    ogUrl: () => `https://${provider.value?.slug}.${$config.public.baseDomain}`,
    twitterTitle: () => `${provider.value?.name}`,
    twitterDescription: () => provider?.value?.description,
    twitterImage: () => $config.public.filesURL + provider?.value?.logo || "",
    twitterCard: () => "summary_large_image",
  });
}
</script>
