<template>
  <div class="content-editor">


    <div v-for="(item, index) in modelValue" :key="index" class="content-item mb-4">
      <div v-if="item.type === 'text'" class="bg-white">
        <client-only>
          <QuillEditor v-model:content="item.content" :options="editorOptions" contentType="html"
            @update:content="onEditorChange($event, index)" class="h-100" />
        </client-only>
      </div>
      <div v-else-if="item.type === 'image'" class="image-upload pa-2 border rounded">
        <input type="file" accept="image/*" @change="handleImageUpload($event, index)" />
        <img v-if="item.content" :src="item.content" class="mt-2" style="max-width: 100%; max-height: 200px;" />
      </div>
      <div v-else-if="item.type === 'video'" class="video-upload pa-2 border rounded">
        <input type="file" accept="video/*" @change="handleVideoUpload($event, index)" />
        <video v-if="item.content" :src="item.content" controls class="mt-2"
          style="max-width: 100%; max-height: 200px;" />
      </div>
      <div v-else-if="item.type === 'audio'" class="audio-upload pa-2 border rounded">
        <input type="file" accept="audio/*" @change="handleAudioUpload($event, index)" />
        <audio v-if="item.content" :src="item.content" controls class="mt-2" />
      </div>
      <div v-else-if="item.type === 'document'" class="document-upload pa-2 border rounded">
        <input type="file" @change="handleDocumentUpload($event, index)" />
        <div v-if="item.content" class="mt-2">
          <a :href="item.content" target="_blank">Ver documento</a>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2 pt-1">
        <div class="d-flex">
          <Button color="error" size="small" @click="removeContent(index)" variant="tonal">
            <Icon icon="mdi-delete" />
            Remover {{ getContentTypeLabel(item.type) }}
          </Button>
        </div>
      </div>
    </div>
    <div class=" mb-4">

      <Button v-for="type in contentTypes" :key="type.value" size="small"
        :color="selectedType === type.value ? 'primary' : undefined" class="mr-2 mb-2" @click="addContent(type.value)">
        <Icon :icon="type.icon" class="mr-2" />
        {{ type.label }}
      </Button>

    </div>
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

const emit = defineEmits(['update:modelValue'])

const contentTypes = [
  { value: 'text', label: 'Texto', icon: 'mdi-format-text' },
  { value: 'image', label: 'Imagem', icon: 'mdi-image' },
  { value: 'video', label: 'Vídeo', icon: 'mdi-video' },
  { value: 'audio', label: 'Áudio', icon: 'mdi-music' },
  { value: 'document', label: 'Documento', icon: 'mdi-file-document' },
]

const selectedType = ref('text')

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

const addContent = (type: string) => {
  const newContent = [...props.modelValue]
  newContent.push({
    type: type as IContentItem['type'],
    content: '',
    order: newContent.length
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

const handleImageUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // Here you would typically upload the file to your server
    // and get back a URL. For now, we'll use a data URL
    const reader = new FileReader()
    reader.onload = (e) => {
      const newContent = [...props.modelValue]
      newContent[index].content = e.target?.result as string
      emit('update:modelValue', newContent)
    }
    reader.readAsDataURL(file)
  }
}

const handleVideoUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newContent = [...props.modelValue]
      newContent[index].content = e.target?.result as string
      emit('update:modelValue', newContent)
    }
    reader.readAsDataURL(file)
  }
}

const handleAudioUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newContent = [...props.modelValue]
      newContent[index].content = e.target?.result as string
      emit('update:modelValue', newContent)
    }
    reader.readAsDataURL(file)
  }
}

const handleDocumentUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newContent = [...props.modelValue]
      newContent[index].content = e.target?.result as string
      emit('update:modelValue', newContent)
    }
    reader.readAsDataURL(file)
  }
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
