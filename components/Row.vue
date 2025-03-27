<template>
  <v-row>
    <slot></slot>
  </v-row>
</template>

<script lang="ts" setup>
interface ImgObj {
  src: string;
  title?: string;
  alt?: string;
}

const { images } = defineProps({
  images: {
    type: Array<ImgObj | string>,
    default: null,
  },
});

const show = ref(false);
const indexRef = ref(0);

const open = (index: number) => {
  indexRef.value = index;
  show.value = true;
};

const hide = () => (show.value = false);
</script>
