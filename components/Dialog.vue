<template>
  <v-dialog :model-value="true" fullscreen persistent>
    <v-card class="py-4 fill-height" style="width: 100%">
      <v-container class="d-flex align-center justify-start">
        <Button icon @click="close" class="mr-4" size="small">
          <Icon icon="mdi-chevron-left" />
        </Button>
        <Text variant="h6" v-if="provider.name" class="mb-0" align="center">
          <strong>{{ title || provider.name }} </strong>
        </Text>
      </v-container>
      <v-container class="d-flex align-center flex-grow-1">
        <div class="w-100">
          <slot></slot>
        </div>
      </v-container>
      <v-container>
        <div class="text-center my-4">
          <Button size="small" @click="close">Fechar</Button>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const { provider } = useProvider();
const emit = defineEmits(["close"]);
const { title } = defineProps({
  title: {
    type: String,
  },
});

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
