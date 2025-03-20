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
          .$patch("/v1/demands/" + this.demand._id, form)
          .then((demand) => {
            this.$notifier.success("Atualizado!");
            this.$emit("input", demand);
          });
      } else {
        this.$axios
          .$post("/v1/demands", { ...form, customer: this.customer._id })
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
