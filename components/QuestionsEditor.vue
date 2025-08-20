<template>
  <div class="questions-editor mb-4">
    <div v-for="(item, index) in modelValue" :key="index" class="mb-4 rounded-lg pa-4 bg-white">
      <div class="d-flex align-center justify-space-between">
        <Text weight="bold" class="mb-2">{{ item.question }}</Text>
      </div>

      <div v-for="(option, index) in item.options" :key="index"
        class="d-flex align-center bg-grey-lighten-4 pa-2 rounded-lg mt-2">
        <Icon :icon="item.correctAnswer === index ? 'mdi-check' : 'mdi-close'"
          :color="item.correctAnswer === index ? 'success' : 'error'" size="20" class="mr-2" />
        <Text>{{ option }}</Text>
      </div>
      <div class="mt-4 d-flex align-center justify-end">
        <Button size="x-small" variant="tonal" class="mr-1" :disabled="index === 0"
          @click="reorderQuestion(index, 'up')">
          <Icon icon="mdi-chevron-up" />
        </Button>
        <Button size="x-small" variant="tonal" class="mr-1" :disabled="index === modelValue.length - 1"
          @click="reorderQuestion(index, 'down')">
          <Icon icon="mdi-chevron-down" />
        </Button>
        <Button @click="editQuestion(index)" size="x-small" variant="tonal" color="primary" class="mr-1">
          <Icon icon="mdi-pencil" />
        </Button>
        <Button @click="removeQuestion(index)" size="x-small" variant="tonal" color="error">
          <Icon icon="mdi-delete" />
        </Button>
      </div>
    </div>

    <Dialog v-model="showQuestionModal" :title="editingQuestion !== null ? 'Editar questão' : 'Adicionar questão'"
      @close="closeQuestionModal">
      <div>
        <DynamicInput name="question" :props="{
          label: 'Pergunta',
          value: [],
          type: 'textarea',
          autoGrow: true,
          rows: 1,
        }" v-model="form.question" :validate="true" />

        <v-radio-group v-model="form.correctAnswer" class="mt-4" v-if="form.options.length > 0">
          <div v-for="(option, index) in form.options" :key="index" class="d-flex align-center">
            <div style="width: 60px; margin-bottom: 22px;">
              <v-radio :value="index" />
            </div>
            <DynamicInput :name="'option-' + index" :props="{
              label: 'Resposta ' + (index + 1),
              value: option,
              type: 'textarea',
              autoGrow: true,
              rows: 1,
            }" v-model="form.options[index]" :validate="true" />
            <div class="mb-4">
              <Button @click="removeOption(index)" size="small" variant="text">
                <Icon icon="mdi-delete" />
              </Button>
            </div>
          </div>
        </v-radio-group>
        <Button @click="addOption()">Adicionar opção de resposta</Button>
        <br>
        <br>
        <Button @click="saveQuestion()" color="primary" block>Salvar questão</Button>

      </div>
    </Dialog>

    <Button @click="addQuestion()">Adicionar questão</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IQuestion } from '~/models/topic'
import DynamicInput from './DynamicInput.vue'

const emptyQuestion = {
  question: "",
  options: ["", ""],
  correctAnswer: null as number | null,
} as IQuestion

const form = ref(emptyQuestion)

const props = defineProps<{
  modelValue: IQuestion[]
}>()

const editingQuestion = ref(null as number | null)

const showQuestionModal = ref(false)

const emit = defineEmits(['update:modelValue'])


const { notifyError } = useNotify();

const { $api } = useNuxtApp()

const addQuestion = () => {
  showQuestionModal.value = true
  editingQuestion.value = null
  eraseForm();
}

const addOption = () => {
  form.value.options.push("")
  form.value.correctAnswer = null
}

const removeOption = (index: number) => {
  form.value.options.splice(index, 1)
  form.value.correctAnswer = null
}

const removeQuestion = (index: number) => {
  if (confirm('Tem certeza que deseja remover esta questão?')) {
    emit('update:modelValue', props.modelValue.filter((_, i) => i !== index))
  }
}

const saveQuestion = () => {
  if (form.value.question === '') {
    notifyError('Adicione uma pergunta')
    return
  }
  if (form.value.options.some(option => option === '')) {
    notifyError('Preencha todas as opções de resposta')
    return
  }
  if (form.value.options.length < 2) {
    notifyError('Adicione pelo menos 2 opções de resposta')
    return
  }
  if (form.value.correctAnswer === null) {
    notifyError('Selecione a resposta correta')
    return
  }
  if (editingQuestion.value !== null) {
    const newQuestions = [...props.modelValue]
    newQuestions[editingQuestion.value] = form.value
    emit('update:modelValue', newQuestions)
  } else {
    emit('update:modelValue', [...props.modelValue, form.value])
  }
  showQuestionModal.value = false
  eraseForm();
}

const editQuestion = (index: number) => {
  editingQuestion.value = index
  showQuestionModal.value = true
  form.value = props.modelValue[index]
}

const closeQuestionModal = () => {
  editingQuestion.value = null
  showQuestionModal.value = false
  eraseForm();
}

const eraseForm = () => {
  form.value = JSON.parse(JSON.stringify(emptyQuestion))
}

const reorderQuestion = (index: number, direction: 'up' | 'down') => {
  const newQuestions = [...props.modelValue]
  const question = newQuestions[index]
  newQuestions.splice(index, 1)
  newQuestions.splice(index + (direction === 'up' ? -1 : 1), 0, question)
  emit('update:modelValue', newQuestions)
}

</script>
