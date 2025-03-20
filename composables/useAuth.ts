import Auth from "~~/models/auth";

export const useAuth = () => {
  const auth = useState<Auth | null>("auth", () => null);
  const authCookie = useCookie<Auth | null>("auth");

  const { $api } = useNuxtApp();

  const authenticateWithFirebaseToken = async (token: string) => {
    const authResponse = await $api.auth.authenticateWithFirebaseToken(token);
    return setAuth(authResponse);
  };

  const setAuth = (authInfo: Auth | null): Auth | null => {
    auth.value = authInfo;
    authCookie.value = authInfo;
    return auth.value;
  };

  const logout = async () => {
    setAuth(null);
    useRouter().replace({ path: "/" });
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
    authenticateWithFirebaseToken,
    logout,
    isAuthenticated,
    isProvider,
    isCustomer,
  };
};
