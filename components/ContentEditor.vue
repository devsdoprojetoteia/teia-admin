<template>
  <div class="content-editor">


    <div v-for="(item, index) in modelValue" :key="index" class="content-item mb-4">
      <div v-if="item.type === 'text'" class="bg-white">
        <client-only>
          <QuillEditor v-model:content="item.content" :options="editorOptions" contentType="html"
            @update:content="onEditorChange($event, index)" class="h-100" />
        </client-only>
      </div>
      <div v-else-if="item.type === 'image'" class="image-upload">
        <img v-if="item.content" :src="getFileUrl(item.content)" style="max-width: 100%;" />
      </div>
      <div v-else-if="item.type === 'video'" class="video-upload">
        <v-responsive :aspect-ratio="16 / 9">
          <video v-if="item.content" :src="getFileUrl(item.content)" controls style="width:100%; height:100%;" />
        </v-responsive>
      </div>
      <div v-else-if="item.type === 'audio'" class="audio-upload">
        <audio v-if="item.content" :src="getFileUrl(item.content)" controls style="width:100%;" />
      </div>
      <div v-else-if="item.type === 'document'" class="document-upload">
        <div v-if="item.content" class="border rounded p-2 border-primary  bg-grey-lighten-5">
          <div class="d-flex align-center pa-3">
            <div class="px-2">
              <Icon icon="mdi-download" size="24" class="mr-2" color="primary" />
            </div>
            <div class="d-flex flex-column">
              <a :href="getFileUrl(item.content)" target="_blank" class="text-decoration-none text-primary">
                {{ getFileName(item.content) }}
              </a>
              <span class="text-caption text-medium-emphasis">
                Baixar arquivo
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2 pt-1">
        <div class="d-flex">
          <Button color="error" size="x-small" @click="removeContent(index)" variant="tonal" class="mr-2">
            <Icon icon="mdi-delete" />
            Remover {{ getContentTypeLabel(item.type) }}
          </Button>
        </div>
        <div class="d-flex">
          <Button size="x-small" variant="tonal" class="mr-1" :disabled="index === 0" @click="moveContent(index, 'up')">
            <Icon icon="mdi-chevron-up" />
          </Button>
          <Button size="x-small" variant="tonal" :disabled="index === modelValue.length - 1"
            @click="moveContent(index, 'down')">
            <Icon icon="mdi-chevron-down" />
          </Button>
        </div>
      </div>
    </div>
    <div class=" mb-4">
      <Button v-for="type in contentTypes" :key="type.value" size="small" variant="tonal" class="mr-2 mb-2"
        @click="handleContentTypeClick(type.value as ContentType)"
        :disabled="type.value !== 'text' && loadingStates[type.value as ContentType]">
        <template v-if="type.value !== 'text' && loadingStates[type.value as ContentType]">
          <v-progress-circular color="white" indeterminate size="20"></v-progress-circular>
          <span class="ml-2">Enviando...</span>
        </template>
        <template v-else>
          <Icon :icon="type.icon" class="mr-2" />
          {{ type.label }}
        </template>
      </Button>

    </div>

    <!-- Hidden file inputs -->
    <input v-show="false" ref="imageInput" type="file" accept="image/*" @change="(e) => handleFileUpload(e, 'image')" />
    <input v-show="false" ref="videoInput" type="file" accept="video/*" @change="(e) => handleFileUpload(e, 'video')" />
    <input v-show="false" ref="audioInput" type="file" accept="audio/*" @change="(e) => handleFileUpload(e, 'audio')" />
    <input v-show="false" ref="documentInput" type="file" @change="(e) => handleFileUpload(e, 'document')" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IContentItem } from '~/models/topic'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps<{
  modelValue: IContentItem[]
}>()

const config = useRuntimeConfig();
const filesURL = config.public.filesURL;



const emit = defineEmits(['update:modelValue'])


const { notifyError } = useNotify();

const { $api } = useNuxtApp()

const contentTypes = [
  { value: 'text', label: 'Texto', icon: 'mdi-format-text' },
  { value: 'image', label: 'Imagem', icon: 'mdi-image' },
  { value: 'video', label: 'Vídeo', icon: 'mdi-video' },
  { value: 'audio', label: 'Áudio', icon: 'mdi-music' },
  { value: 'document', label: 'Documento', icon: 'mdi-file-document' },
]

const selectedType = ref('text')

type ContentType = 'image' | 'video' | 'audio' | 'document'
const loadingStates = ref<Record<ContentType, boolean>>({
  image: false,
  video: false,
  audio: false,
  document: false
})

const imageInput = ref<HTMLInputElement | null>(null)
const videoInput = ref<HTMLInputElement | null>(null)
const audioInput = ref<HTMLInputElement | null>(null)
const documentInput = ref<HTMLInputElement | null>(null)

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
      ['clean']
    ]
  }
}

const getContentTypeLabel = (type: string) => {
  return contentTypes.find(t => t.value === type)?.label || type
}

const updateContent = () => {
  emit('update:modelValue', [...props.modelValue])
}

const onEditorChange = (content: string, index: number) => {
  const newContent = [...props.modelValue]
  newContent[index].content = content
  emit('update:modelValue', newContent)
}

const handleContentTypeClick = (type: string) => {
  if (type === 'text') {
    addContent(type)
    return
  }

  // Trigger file input click based on type
  switch (type) {
    case 'image':
      imageInput.value?.click()
      break
    case 'video':
      videoInput.value?.click()
      break
    case 'audio':
      audioInput.value?.click()
      break
    case 'document':
      documentInput.value?.click()
      break
  }
}

const handleFileUpload = async (event: Event, type: ContentType) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  loadingStates.value[type] = true

  try {
    const uploadedUrl = await $api.uploads.upload({
      file,
      type: type as 'image' | 'video' | 'audio' | 'file',
      prefix: 'content'
    })

    const newContent = [...props.modelValue]
    newContent.push({
      type: type as IContentItem['type'],
      content: uploadedUrl,
      order: newContent.length,
      id: ''
    })
    emit('update:modelValue', newContent)
  } catch (error) {
    notifyError('Erro ao fazer upload do arquivo. Tente novamente.')
  } finally {
    loadingStates.value[type] = false
      // Reset file input
      ; (event.target as HTMLInputElement).value = ''
  }
}

const addContent = (type: string) => {
  const newContent = [...props.modelValue]
  newContent.push({
    type: type as IContentItem['type'],
    content: '',
    order: newContent.length,
    id: ''
  })
  emit('update:modelValue', newContent)
}

const removeContent = (index: number) => {
  const newContent = [...props.modelValue]
  newContent.splice(index, 1)
  // Update order numbers
  newContent.forEach((item, idx) => {
    item.order = idx
  })
  emit('update:modelValue', newContent)
}

const getFileUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url
  }
  return filesURL + url
}

const getFileName = (url: string) => {
  const fileName = url.split('/').pop() || ''
  return decodeURIComponent(fileName)
}

const getFileSize = (url: string) => {
  // This is a placeholder. In a real implementation, you would need to get the file size from the server
  return 'Clique para baixar'
}

const isPDF = (url: string) => {
  return url.toLowerCase().endsWith('.pdf')
}

const moveContent = (index: number, direction: 'up' | 'down') => {
  const newContent = [...props.modelValue]
  const newIndex = direction === 'up' ? index - 1 : index + 1

  // Swap items
  const temp = newContent[index]
  newContent[index] = newContent[newIndex]
  newContent[newIndex] = temp

  // Update order numbers
  newContent.forEach((item, idx) => {
    item.order = idx
  })

  emit('update:modelValue', newContent)
}
</script>

<style>
.content-editor {
  .text-editor {
    min-height: 200px;
  }

  .ql-editor {
    min-height: 150px;
  }
}
</style>
