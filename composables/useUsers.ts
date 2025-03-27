import User from "~~/models/user";
import type { FormValues } from "~~/models/dynamic-form";

const useUsers = () => {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  let users = useState<User[] | null>("users");
  let showAddUser = useState<Boolean>("showAddUser", () => false);

  let activeUser = computed(() => {
    const userId = route.query.user;
    if (userId) {
      return users.value?.find((d) => d.id === userId);
    }
    return null;
  });

  const loadUsers = async () => {
    users.value = await $api.users.list();
  };

  const hasUsers = computed(() => {
    return users.value !== null && users.value.length > 0;
  });

  const openUser = (user: User) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        user: user.id,
      },
    });
  };

  const createUser = async (data: FormValues) => {
    return await $api.users.create(data);
  };

  const updateUser = async (id: string, data: FormValues) => {
    return await $api.users.update(id, data);
  };

  const closeUser = () => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        user: undefined,
      },
    });
  };

  return {
    users,
    activeUser,
    showAddUser,
    hasUsers,
    loadUsers,
    openUser,
    closeUser,
    createUser,
    updateUser,
  };
};
export default useUsers;
