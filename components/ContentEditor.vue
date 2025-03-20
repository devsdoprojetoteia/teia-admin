<template>
  <div>
    <template v-for="(block, index) in blocks">
      <div v-if="block.type === 'text'" :key="'text-' + index" class="mb-6">
        <TextEditor
          v-if="editable"
          v-model="block.content"
          @input="emitCalcStats"
          :label="label"
        />
        <div v-else v-html="block.content" />
      </div>
      <div
        v-else-if="block.type === 'video'"
        :key="'video-' + index"
        class="mb-6 text-center"
      >
        <video :src="filesURL + block.content" controls style="max-width: 100%">
          Seu navegador não consegue carregar este vídeo.
        </video>
        <v-textarea
          v-if="
            editable && block.caption != null && block.caption !== undefined
          "
          v-model="block.caption"
          rows="1"
          auto-grow
          label="Legenda do vídeo"
          hide-details="auto"
        />
        <div v-else-if="block.caption">
          <i
            ><small>{{ block.caption }}</small></i
          >
        </div>
      </div>
      <div
        v-else-if="block.type === 'audio'"
        :key="'audio-' + index"
        class="mb-6"
      >
        <audio :src="filesURL + block.content" controls style="max-width: 100%">
          Seu navegador não consegue carregar este áudio.
        </audio>
        <v-textarea
          v-if="
            editable && block.caption != null && block.caption !== undefined
          "
          v-model="block.caption"
          rows="1"
          auto-grow
          label="Legenda do áudio"
          hide-details="auto"
        />
        <div v-else-if="block.caption">
          <i
            ><small>{{ block.caption }}</small></i
          >
        </div>
      </div>
      <div
        v-else-if="block.type === 'file'"
        :key="'file-' + index"
        class="mb-6 text-center"
      >
        <v-btn
          v-if="block.content"
          :href="filesURL + block.content"
          target="_blank"
          color="primary"
          block
          large
        >
          <v-icon left>mdi-attachment</v-icon>
          Baixar Arquivo
        </v-btn>
        <v-textarea
          v-if="
            editable && block.caption != null && block.caption !== undefined
          "
          v-model="block.caption"
          rows="1"
          auto-grow
          label="Legenda do arquivo"
          hide-details="auto"
        />
        <div v-else-if="block.caption">
          <i
            ><small>{{ block.caption }}</small></i
          >
        </div>
      </div>
      <!-- <div
        v-if="editable"
        :key="'remove-' + index"
        class="text-center mb-10 mt-n3"
      >
        <v-btn dark x-small @click="blocks.splice(index, 1)">
          <v-icon left x-small>mdi-delete</v-icon>
          Remover {{ blockTypes[block.type] }}
        </v-btn>
        <v-btn
          v-if="
            block.type !== 'text' &&
            block.caption !== null &&
            block.caption !== undefined
          "
          dark
          x-small
          @click="block.caption = undefined"
        >
          <v-icon left x-small>mdi-delete</v-icon>
          Remover legenda
        </v-btn>
        <v-btn
          v-if="
            block.type !== 'text' &&
            (block.caption === null || block.caption === undefined)
          "
          dark
          x-small
          @click="block.caption = ''"
        >
          <v-icon left x-small>mdi-closed-caption-outline</v-icon>
          Adicionar legenda
        </v-btn>
      </div> -->
    </template>
    <div class="mb-6" v-if="images && images.length">
      <Gallery :images="images" />
    </div>
    <div v-if="editable" class="mb-6">
      <Upload
        v-for="uploadType in uploadTypes"
        :type="uploadType"
        :prefix="prefix"
        @uploaded="
          (item) =>
            blocks.push({
              type: uploadType,
              content: item,
            })
        "
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
interface ContentEditorProps {
  modelValue?: any[];
  editable?: boolean;
  labels?: Record<string, { icon: string; label: string }>;
  prefix?: string;
  label?: string;
}

const uploadTypes = ["image", "video", "audio", "file"] as const;

const props = withDefaults(defineProps<ContentEditorProps>(), {
  editable: true,
});

const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
  (event: "calcStats", value: void): void;
}>();

const { $config } = useNuxtApp();
const filesURL = $config.public.filesURL;

const blockTypes = {
  image: "Imagem",
  video: "Vídeo",
  audio: "Áudio",
  file: "Arquivo",
} as Record<string, string>;

const blocks = ref(props.modelValue ? [...props.modelValue] : []);

const images = computed(() =>
  blocks.value
    .filter((block) => block.type === "image")
    .map((block) => block.content)
);

const addText = () => {
  blocks.value.push({
    type: "text",
    content: "",
  });
};

onMounted(() => {
  if (blocks.value.length === 0) addText();
});

const emitInput = () => {
  emit("update:modelValue", blocks.value);
};

const emitCalcStats = () => {
  emit("calcStats");
};

// watch blocks
watch(
  blocks,
  () => {
    console.log("alterou");

    emitInput();
    emitCalcStats();
  },
  { deep: true }
);
</script>
