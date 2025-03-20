<template>
  <span>
    <Button @click="selectFiles" class="mr-1 mb-1">
      <Loading v-if="loading" :size="20" />
      <template v-else>
        <v-icon left>{{ icon }}</v-icon>
      </template>
    </Button>
    <input
      v-show="false"
      ref="inputRef"
      :accept="accept"
      type="file"
      @change="uploadFiles"
    />
  </span>
</template>
<script lang="ts" setup>
const loading = ref(false);
const { type, prefix } = defineProps<{
  type: "image" | "video" | "audio" | "file";
  prefix?: string;
}>();

const emit = defineEmits(["uploaded"]);

const { $api } = useNuxtApp();

const inputId = Math.random().toString(36).substring(2, 15);

const icon = computed(() => {
  switch (type) {
    case "image":
      return "mdi-image";
    case "video":
      return "mdi-video";
    case "audio":
      return "mdi-microphone";
    case "file":
      return "mdi-file";
    default:
      return "mdi-upload";
  }
});

const accept = computed(() => {
  switch (type) {
    case "image":
      return "image/*";
    case "video":
      return "video/*";
    case "audio":
      return "audio/*";
    default:
      return "*";
  }
});

const inputRef = ref(null);
const selectFiles = () => {
  console.log(inputRef);

  // click input
  inputRef.value!.click();
};

const uploadFiles = async (e: any) => {
  loading.value = true;
  const files = e.target.files || e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uploadedUrl = await $api.uploads.upload({
      file,
      prefix: prefix,
      type: type,
    });
    updateValue(uploadedUrl);
  }
  loading.value = false;
};

const updateValue = (url: string) => {
  emit("uploaded", url);
};
</script>
