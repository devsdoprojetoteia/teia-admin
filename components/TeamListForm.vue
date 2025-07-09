<template>
  <div class="mb-4">
    <div class="mb-2">
      <div v-if="label" class="caption">{{ label }}</div>
    </div>
    <div class="d-flex align-center" v-for="(member, index) in members" :key="'member-' + index">


      <div class="d-sm-flex align-center justify-space-between pl-2 py-1 mb-2 rounded bg-white w-100"
        :title="member.name" style="min-height: 48px;">
        <div class="mb-0 d-flex align-center">
          <div class="mr-3">
            <img :src="member.avatar.thumb" alt="avatar" class="rounded-circle mr-3"
              style="width:48px;height:48px;object-fit:cover;" v-if="member.avatar" />
            <div class="rounded-circle bg-grey-lighten-4 d-flex align-center justify-center"
              style="width:48px;height:48px;" v-else>
              <Icon icon="mdi-account" />
            </div>
          </div>
          <div>
            <div class="font-weight-bold">{{ member.name }}</div>
            <div class="text-caption">{{ member.role }}</div>
            <a :href="member.linkedin" target="_blank" class="text-primary text-caption">LinkedIn</a>
          </div>
        </div>
        <div class="ml-sm-4">
          <Button size="x-small" variant="tonal" class="mr-1" :disabled="index === 0"
            @click="reordermember(member, 'up')">
            <Icon icon="mdi-chevron-up" />
          </Button>
          <Button size="x-small" variant="tonal" :disabled="index === members.length - 1"
            @click="reordermember(member, 'down')">
            <Icon icon="mdi-chevron-down" />
          </Button>
          <Button @click="removemember(index)" size="small" variant="text">
            <Icon icon="mdi-delete" />
          </Button>
        </div>
      </div>
    </div>

    <Button @click="openForm" class="mb-2" size="small">
      <Icon icon="mdi-plus" />
      Adicionar
    </Button>
    <Dialog @close="closeForm" title="Adicionar membro" v-if="showForm">
      <DynamicForm :form="form" @submit="submit" />

    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import type { ITeam } from '~/models/course';
import type { FormProps } from '~/models/dynamic-form';

const { modelValue } = defineProps<{
  modelValue?: ITeam[];
  label?: string;
}>();

const showForm = ref(false);
const member = ref<ITeam>({
  avatar: null,
  name: "",
  role: "",
  linkedin: "",
});
const members = ref<ITeam[]>(modelValue || []) as Ref<ITeam[]>;

const emit = defineEmits(["close", "created", "updated", "update:modelValue"]);

const openForm = () => {
  showForm.value = true;
};

const form: FormProps = {
  steps: [
    {
      fields: {
        avatar: {
          label: "Avatar",
          value: member.value.avatar,
          type: "upload",
          uploadType: "image",
        },
        name: {
          label: "Nome",
          rules: "required",
          value: member.value.name,
        },
        role: {
          label: "Função/Cargo",
          rules: "required",
          value: member.value.role,
        },
        linkedin: {
          label: "LinkedIn",
          value: member.value.linkedin,
        },
      },
    },
  ],
};

const closeForm = () => {
  showForm.value = false;
};

const submit = (values: any) => {
  console.log(values);
  members.value = [...members.value, values as ITeam];
  emit("update:modelValue", members.value as ITeam[]);
  member.value = {
    avatar: null,
    name: "",
    role: "",
    linkedin: "",
  };
  closeForm();

};

const removemember = (index: number) => {
  members.value = members.value.filter((i: ITeam, iIndex: number) => iIndex !== index);
  emit("update:modelValue", members.value as ITeam[]);
};

const reordermember = (member: ITeam, direction: "up" | "down") => {
  const index = members.value.indexOf(member);
  if (direction === "up" && index > 0) {
    members.value = [...members.value.slice(0, index - 1), member, members.value[index - 1], ...members.value.slice(index + 1)];
  } else if (direction === "down" && index < members.value.length - 1) {
    members.value = [...members.value.slice(0, index), members.value[index + 1], member, ...members.value.slice(index + 2)];
  }
  emit("update:modelValue", members.value as ITeam[]);
};
</script>