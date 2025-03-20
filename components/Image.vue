<template>
  <component
    :is="raw ? 'img' : 'v-img'"
    v-if="url"
    :src="url"
    :alt="imageAlt || imageTitle"
    :title="imageTitle || imageAlt"
  />
</template>
<script lang="ts" setup>
interface Image {
  src: string;
  title?: string;
  alt?: string;
}

const config = useRuntimeConfig();

const { image, title, alt, raw } = defineProps<{
  image: string | Image;
  title?: string;
  alt?: string;
  raw?: boolean;
}>();

const src = computed<string>(() => {
  if (typeof image === "string") {
    return image;
  }
  return image.src;
});

const url = computed<string | undefined>(() => {
  if (src.value.startsWith("/")) {
    return config.public.filesURL + src.value;
  }
  if (src.value.startsWith("http")) {
    return src.value;
  }
});

const imageAlt = computed<string | undefined>(() => {
  if (typeof image === "string") {
    return alt;
  }
  return image.alt;
});

const imageTitle = computed<string | undefined>(() => {
  if (typeof image === "string") {
    return title;
  }
  return image.title;
});
</script>
