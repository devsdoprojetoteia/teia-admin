<template>
  <div>
    <CustomerHeader />
    <v-container v-if="customer">
      <Button
        color="success"
        @click="showAddDemand = true"
        block
        class="mb-8 mt-4"
      >
        <Icon start icon="mdi-plus" /> Adicionar demanda
      </Button>
      <v-row no-gutters class="mx-n1">
        <v-col
          v-for="status in Demand.statuses"
          :key="status.value"
          cols="4"
          class="px-1"
        >
          <Button
            block
            :color="showStatus.value === status.value ? 'primary' : ''"
            class="text-caption"
            style="padding: 24px 8px"
            @click="showStatus = status"
          >
            {{ status.title }}
          </Button>
        </v-col>
      </v-row>
      <div class="pt-4">
        <div>
          <div v-if="demands">
            <div v-if="!hasDemands">
              <Alert message="Nenhuma demanda aqui" />
            </div>
            <template v-for="demand in demands">
              <v-card
                v-if="demand.status === showStatus.value"
                class="mb-4 pa-4"
                elevation="0"
                @click="openDemand(demand)"
              >
                <Text>{{ demand.title }}</Text>
                <div>
                  <div class="mb-4">
                    <Estimate :item="demand" />
                  </div>
                  <div class="d-flex justify-space-between align-start">
                    <div>
                      <Chip
                        v-if="demand.type"
                        outlined
                        size="small"
                        class="text--secondary"
                      >
                        {{ demand.typeLabel }}
                      </Chip>
                      <Chip
                        v-if="demand.approved && demand.status === 'backlog'"
                        outlined
                        size="small"
                        color="success"
                      >
                        <Icon start size="small" icon="mdi-low" />
                        Aprovada
                      </Chip>
                    </div>
                    <Chip
                      v-if="demand.priority"
                      outlined
                      size="small"
                      :color="demand.priorityColor"
                      class="justify-center"
                      style="min-width: 60px"
                    >
                      {{ demand.priorityLabel }}
                    </Chip>
                  </div>
                </div>
              </v-card>
            </template>
          </div>
          <Loading v-else />
        </div>
      </div>
      <DemandForm
        v-if="showAddDemand"
        @created="demandCreated"
        @close="showAddDemand = false"
      />
      <DemandInfo
        v-if="activeDemand"
        :demand="activeDemand"
        @updated="demandUpdated"
        @close="closeDemand"
      />
      {{ activeDemand }}
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import Demand from "~~/models/demand";

definePageMeta({
  layout: "provider",
  middleware: ["authenticated"],
});

const { customer, loadSummary } = useCustomer();

const {
  demands,
  loadDemands,
  showAddDemand,
  hasDemands,
  openDemand,
  closeDemand,
  activeDemand,
} = useDemands();

const showStatus = ref(Demand.statuses[0]);

// load demands on mounted
onMounted(async () => {
  await loadDemands();
});

const demandCreated = async (demand: Demand) => {
  showAddDemand.value = false;
  await loadDemands();
  loadSummary();
  openDemand(demand);
};

const demandUpdated = async (demand: Demand) => {
  await loadDemands();
  loadSummary();
  openDemand(demand);
};
</script>
<!-- <script>
import demandTypes, {
  demandTypeLabel,
  demandTypeIcon,
} from "@/data/demandTypes";
import demandStatus, { demandStatusLabel } from "@/data/demandStatus";
import demandPriorities, {
  demandPriorityLabel,
  demandPriorityColor,
} from "~~/utils/demandPriorities";

export default {
  layout: "customer",
  data() {
    return {
      demandTypes,
      demandTypeLabel,
      demandTypeIcon,
      demandPriorityLabel,
      demandPriorityColor,
      demandStatus,
      demandStatusLabel,
      demandPriorities,
      demands: null,
      showAddDemand: false,
      activeDemand: null,
      showStatus: demandStatus[0],
      filters: {},
    };
  },
  computed: {
    hasDemandsInProgress() {
      return this.demands.find((d) => d.status === "in-progress");
    },
    hasPendingDemands() {
      return this.demands.find((d) => d.status === "backlog" && !d.estimated);
    },
    hasDemand() {
      return this.demands.find((d) => this.showStatus.value === d.status);
    },
    demand() {
      if (this.$route.query.demanda && this.demands) {
        return this.demands.find((d) => d._id === this.$route.query.demanda);
      }
      return null;
    },
  },
  mounted() {
    this.loadDemands();
  },
  methods: {
    isActive(demand) {
      return this.activeDemand && this.activeDemand._id === demand._id;
    },
    async loadDemands() {
      const params = { ...this.filters, customer: this.customer._id };
      this.demands = await this.$axios.$get("/v1/demands", {
        params,
      });
      if (this.hasDemandsInProgress && !this.hasPendingDemands) {
        this.showStatus = demandStatus[1];
      }
    },
    openDemand(demand) {
      this.$router.push(
        "/" + this.customer._id + "/demandas?demanda=" + demand._id
      );
    },
    async demandCreated(demand) {
      this.showAddDemand = false;
      await this.loadDemands();
      this.loadSummary();
      this.openDemand(demand);
    },
    async demandUpdated(demand) {
      await this.loadDemands();
      this.loadSummary();
    },
    async removeDemand() {
      await this.$axios.$delete(`/v1/demands/${this.activeDemand._id}`);
      this.closeDemand();
      this.loadDemands();
      this.loadSummary();
    },
    closeDemand() {
      this.$router.push("/" + this.customer._id + "/demandas");
    },
    loadSummary() {
      this.$store.dispatch("loadCustomerSummary");
    },
  },
};
</script> -->
