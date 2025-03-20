export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { user, loadAuth } = useAuth();
  loadAuth();
  if (!user.value) return navigateTo({ name: "entrar" });
});
