import type Auth from "~~/models/auth";

export const useAuth = () => {
  const auth = useState<Auth | null>("auth", () => null);
  const authCookie = useCookie<Auth | null>("auth");

  const { $api } = useNuxtApp();

  const register = async (name: string, phone: string, password: string) => {
    const authResponse = await $api.auth.register(name, phone, password);
    return setAuth(authResponse);
  };

  const login = async (phone: string, password: string) => {
    const authResponse = await $api.auth.login(phone, password);
    return setAuth(authResponse);
  };

  const forgotPassword = async (phone: string) => {
    return await $api.auth.forgotPassword(phone);
  };

  const recoverPassword = async (
    phone: string,
    code: string,
    password: string
  ) => {
    return await $api.auth.recoverPassword(phone, code, password);
  };

  const setAuth = (authInfo: Auth | null): Auth | null => {
    auth.value = authInfo;
    authCookie.value = authInfo;
    return auth.value;
  };

  const logout = async () => {
    setAuth(null);
  };

  const isAuthenticated = computed(() => {
    return !!auth.value;
  });

  const isProvider = computed(() => {
    return auth.value?.user.role === "provider";
  });

  const isCustomer = computed(() => {
    return auth.value?.user.role === "customer";
  });

  const user = computed(() => {
    return auth.value?.user;
  });

  const token = computed(() => {
    return auth.value?.token;
  });

  const loadAuth = () => {
    if (!auth.value && authCookie.value) {
      setAuth(authCookie.value);
    }
  };

  return {
    auth,
    user,
    token,
    loadAuth,
    register,
    login,
    logout,
    forgotPassword,
    recoverPassword,
    isAuthenticated,
    isProvider,
    isCustomer,
  };
};
