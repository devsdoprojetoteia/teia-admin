import Demand from "~~/models/demand";
import { FormValues } from "~~/models/dynamic-form";

const useDemands = () => {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  let demands = useState<Demand[] | null>("demands");
  let showAddDemand = useState<Boolean>("showAddDemand", () => false);

  let activeDemand = computed(() => {
    const demandId = route.query.demanda;
    if (demandId) {
      return demands.value?.find((d) => d.id === demandId);
    }
    return null;
  });

  const loadDemands = async () => {
    demands.value = await $api.demands.list();
  };

  const hasDemands = computed(() => {
    return demands.value !== null && demands.value.length > 0;
  });

  const openDemand = (demand: Demand) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        demanda: demand.id,
      },
    });
  };

  const createDemand = async (data: FormValues) => {
    return await $api.demands.create(data);
  };

  const updateDemand = async (id: string, data: FormValues) => {
    return await $api.demands.update(id, data);
  };

  const closeDemand = () => {
    
    router.push({
      path: route.path,
      query: {
        ...route.query,
        demanda: undefined,
      },
    });

  };

  return {
    demands,
    activeDemand,
    showAddDemand,
    hasDemands,
    loadDemands,
    openDemand,
    closeDemand,
    createDemand,
    updateDemand,
  };
};
export default useDemands;
