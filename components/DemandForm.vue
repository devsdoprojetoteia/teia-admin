<template>
  <Dialog @close="close" :title="title">
    <DynamicForm :form="form" v-if="!notification" />
    <Notification v-bind="notification" v-if="notification" />
  </Dialog>
</template>

<script lang="ts" setup>
/* placeholder */
import type { FormProps, FormValues } from "~/models/dynamic-form";
import Demand from "~/models/demand";
import type { NotificationProps } from "~~/models/notification";

const { createDemand, updateDemand } = useDemands();

const { demand } = defineProps<{
  demand?: Demand | null;
}>();

const notification: Ref<NotificationProps | null> = ref(null);

const title = computed(() => {
  return demand ? "Editar demanda" : "Cadastrar demanda";
});

const emit = defineEmits(["close"]);

const form: FormProps = {
  steps: [
    {
      title: "Qual a prioride dessa demanda?",
      fields: {
        priority: {
          label: "Prioridade",
          type: "select",
          items: Demand.priorities,
          rules: "required",
          itemTitle: "title",
          itemValue: "value",
          default: 2,
        },
      },
    },
    {
      fields: {
        type: {
          label: "Tipo de demanda",
          type: "select",
          items: Demand.types,
          rules: "required",
        },
        title: {
          label: "Título da demanda",
          type: "textarea",
          rules: "required",
          rows: 1,
          autoGrow: true,
          maxRows: 3,
        },
        body: {
          label: "Descrição da demanda",
          type: "editor",
          readonly: true,
          prefix: "demandas",
        },
      },
    },
  ],
  submitLabel: "Salvar demanda",
  wizard: !demand,
  onSubmit: async (values: FormValues) => {
    const { notifySuccess, notifyError } = useNotify();
    if (!demand) {
      try {
        await createDemand(values);
        notification.value = {
          title: "Sua solicitação foi enviada!",
          subtitle: "Em breve entraremos em contato.",

          onContinue: close,
        };
      } catch (error) {
        notifyError(errorMessage(error));
      }
    } else {
      try {
        await updateDemand(demand.id!, values);
        notification.value = {
          title: "Sua solicitação foi atualizada!",
          onContinue: close,
        };
      } catch (error) {
        notifyError(errorMessage(error));
      }
    }
  },
};

const close = () => {
  emit("close");
};
</script>
<!-- <script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    demand: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      demandTypes,
      demandStatus,
      demandPriorities,
      dialog: false,
      form: {
        title: "",
        body: null,
        points: 0,
        price: null,
        type: null,
        priority: null,
        progress: 0,
        status: "backlog",
        paid: false,
        billable: null,
        estimated: null,
      },
    };
  },
  created() {
    if (this.demand) {
      Object.keys(this.form).forEach((key) => {
        if (this.demand[key] !== undefined && this.demand[key] !== null) {
          this.form[key] = this.demand[key];
        }
      });
    }
  },
  methods: {
    save() {
      const form = { ...this.form };
      if (this.demand) {
        this.$axios
          .$patch("/api/demands/" + this.demand._id, form)
          .then((demand) => {
            this.$notifier.success("Atualizado!");
            this.$emit("input", demand);
          });
      } else {
        this.$axios
          .$post("/api/demands", { ...form, customer: this.customer._id })
          .then((demand) => {
            this.$notifier.success("Salvo!");
            this.$emit("input", demand);
          });
      }
    },
    close() {
      this.$emit("close");
    },
    remove(demand) {
      this.$emit("remove", demand);
    },
  },
};
</script> -->
