import Module from "~~/models/module";
import type { FormValues } from "~~/models/dynamic-form";

const useModules = () => {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  let modules = useState<Module[] | null>("modules");
  let showAddModule = useState<Boolean>("showAddModule", () => false);

  let activeModule = computed(() => {
    const moduleId = route.query.module;
    if (moduleId) {
      return modules.value?.find((d) => d.id === moduleId);
    }
    return null;
  });

  const loadModules = async () => {
    modules.value = await $api.modules.list(route.params.courseId as string);
  };

  const hasModules = computed(() => {
    return modules.value !== null && modules.value.length > 0;
  });

  const openModule = (module: Module) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        module: module.id,
      },
    });
  };

  const createModule = async (data: FormValues) => {
    return await $api.modules.create(data);
  };

  const updateModule = async (id: string, data: FormValues) => {
    return await $api.modules.update(id, data);
  };

  const deleteModule = async (id: string) => {
    return await $api.modules.delete(id);
  };

  const closeModule = () => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        module: undefined,
      },
    });
  };

  return {
    modules,
    activeModule,
    showAddModule,
    hasModules,
    loadModules,
    openModule,
    closeModule,
    createModule,
    updateModule,
    deleteModule,
  };
};

export default useModules;
