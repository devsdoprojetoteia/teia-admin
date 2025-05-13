import { defineNuxtPlugin } from "#app";
import AuthModule from "~~/repository/modules/auth";
import UploadsModule from "~~/repository/modules/uploads";
import type Auth from "~~/models/auth";
import UsersModule from "~/repository/modules/users";
import CoursesModule from "~/repository/modules/courses";
import ModulesModule from "~/repository/modules/modules";
import TopicsModule from "~/repository/modules/topics";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  uploads: UploadsModule;
  users: UsersModule;
  courses: CoursesModule;
  auth: AuthModule;
  modules: ModulesModule;
  topics: TopicsModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const headers = {
    // "Content-Type": "application/json",
  };

  const apiFetcher = $fetch.create({
    baseURL: nuxtApp.$config.public.apiURL as string,
    headers,
    onRequest: (config) => {
      const authCookie = useCookie<Auth | null>("auth");

      const token = authCookie.value?.token;
      if (token) {
        if (config.options.headers instanceof Headers) {
          config.options.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    },
  });

  const modules: IApiInstance = {
    uploads: new UploadsModule(apiFetcher),
    users: new UsersModule(apiFetcher),
    courses: new CoursesModule(apiFetcher),
    auth: new AuthModule(apiFetcher),
    modules: new ModulesModule(apiFetcher),
    topics: new TopicsModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
