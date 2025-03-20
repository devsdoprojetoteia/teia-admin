import Customer from "../models/customer";
import CustomerSummary from "../models/customer-summary";
const useCustomer = () => {
  let customer = useState<Customer | null>("customer");
  let customerSummary = useState<CustomerSummary | null>("customerSummary");
  const { $api } = useNuxtApp();

  const setCustomer = (c: Customer | null) => {
    customer.value = c;
  };

  const setCustomerSummary = (cs: CustomerSummary | null) => {
    customerSummary.value = cs;
  };

  const clearCustomer = () => {
    setCustomer(null);
    setCustomerSummary(null);
  };

  const loadCustomer = async (id: string) => {
    const customer = await $api.customers.get(id);
    setCustomer(customer);
    loadSummary();
  };

  const loadSummary = async () => {
    if (customer.value) {
      const summary = await $api.customers.summary(customer.value.id!);
      setCustomerSummary(summary);
    }
  };

  return {
    customer,
    setCustomer,
    customerSummary,
    setCustomerSummary,
    clearCustomer,
    loadCustomer,
    loadSummary,
  };
};
export default useCustomer;
