<template>
  <div>
    <div v-if="customer">
      <div>
        <v-container class="d-flex justify-space-between align-center py-8">
          <div>
            <div class="d-flex justify-start align-center">
              <Button
                v-if="isProvider"
                class="mr-4"
                fab
                size="small"
                to="/atendimento"
                elevation="0"
              >
                <Icon icon="mdi-chevron-left" />
              </Button>
              <div>
                <Text variant="h5" class="mb-0">{{ customer.name }}</Text>

                <Text
                  type="p"
                  variant="caption"
                  emphasis="low"
                  v-if="user"
                  class="mb-0"
                >
                  {{ user.name }}
                </Text>
              </div>
            </div>
          </div>
          <div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <Button icon v-bind="props">
                  <Icon icon="mdi-dots-vertical" />
                </Button>
              </template>
              <v-list>
                <v-list-item @click="editCustomer = true">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-container>
        <v-container class="px-0 px-md-4 py-0">
          <v-tabs color="primary">
            <v-tab :to="'/' + customer.id + '/demandas'">
              Demandas
              <Badge
                v-if="customerSummary && customerSummary.pendingDemands"
                color="error"
                size="small"
                :content="customerSummary.pendingDemands"
              />
            </v-tab>
            <v-tab :to="'/' + customer.id + '/propostas'">
              Orçamentos
              <Badge
                v-if="customerSummary && customerSummary.pendingProposals"
                size="small"
                color="error"
                :content="customerSummary.pendingProposals"
              />
            </v-tab>
            <v-tab :to="'/' + customer.id + '/faturas'">
              Faturas
              <Badge
                v-if="customerSummary && customerSummary.pendingInvoices"
                size="small"
                color="error"
                :content="customerSummary.pendingInvoices"
              />
            </v-tab>
          </v-tabs>
        </v-container>
        <CustomerForm
          v-if="editCustomer"
          :value="customer"
          @input="customerUpdated"
          @close="close"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Customer from "~~/models/customer";
const route = useRoute();

const { customer, customerSummary, setCustomer, loadCustomer } = useCustomer();

const { user, auth, isProvider } = useAuth();

const editCustomer = ref(false);

onMounted(() => {
  const customerId = route.params.cliente;
  if (customerId && !customer.value) {
    loadCustomer(customerId as string);
  }
});

const close = () => (editCustomer.value = false);
const customerUpdated = (customer: Customer) => {
  setCustomer(customer);
  close();
};
</script>
