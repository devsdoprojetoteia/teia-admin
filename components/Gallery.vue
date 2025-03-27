<template>
  <div class="d-flex align-center justify-center">
    <!-- {{ fullscreenImageUrls }} -->
    <Row>
      <Col cols="3" v-for="(image, index) of images">
        <Image
          :image="image"
          @click="open(index)"
          aspect-ratio="1"
          contain
          style="border: 1px solid #272727"
          class="rounded-lg"
        />
      </Col>
    </Row>
    <vue-easy-lightbox
      :visible="show"
      :imgs="fullscreenImageUrls"
      :index="indexRef"
      @hide="hide"
    ></vue-easy-lightbox>
  </div>
</template>

<script lang="ts" setup>
interface Image {
  src: string;
  title?: string;
  alt?: string;
}

const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;

const { images } = defineProps({
  images: {
    type: Array<Image | string>,
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

const fullscreenImageUrls = computed(() => {
  return images.map((image) => imageUrl(image));
});

const imageUrl = (image: Image | string) => {
  if (typeof image === "string") {
    return filesURL + image;
  }

  return filesURL + image.src;
};
</script>
