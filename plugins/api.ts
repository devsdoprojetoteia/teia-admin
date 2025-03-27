import { defineNuxtPlugin } from "#app";
import AuthModule from "~~/repository/modules/auth";
import UploadsModule from "~~/repository/modules/uploads";
import ProvidersModule from "~~/repository/modules/providers";
import CustomersModule from "~~/repository/modules/customers";
import DemandsModule from "~~/repository/modules/demands";
import type Auth from "~~/models/auth";
import UsersModule from "~/repository/modules/users";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  uploads: UploadsModule;
  providers: ProvidersModule;
  customers: CustomersModule;
  demands: DemandsModule;
  users: UsersModule;
  auth: AuthModule;
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
    providers: new ProvidersModule(apiFetcher),
    customers: new CustomersModule(apiFetcher),
    demands: new DemandsModule(apiFetcher),
    users: new UsersModule(apiFetcher),
    auth: new AuthModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
