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
