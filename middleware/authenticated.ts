export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { user, loadAuth } = useAuth();
  loadAuth();
  console.log("user", user);
  if (!user.value) return navigateTo({ name: "entrar" });
});
