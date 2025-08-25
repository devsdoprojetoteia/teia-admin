import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/main.sass",
  ],

  build: {
    transpile: ["vuetify"],
  },

  modules: ["@pinia/nuxt"],
  plugins: [
    "~/plugins/masks.ts"
  ],

  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'false'
        }
      }
    }
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: "123",

    // Keys within public are also exposed client-side
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:3000",
      apiURL: process.env.API_URL || "http://localhost:3000",
      filesURL: process.env.FILES_URL,
      baseDomain: process.env.BASE_DOMAIN,
    },
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/teia-admin",
  },

  typescript: {
    shim: false,
  },

  compatibilityDate: "2025-03-20",
});
