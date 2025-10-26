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

  modules: [
    "@pinia/nuxt",
    "@vite-pwa/nuxt"
  ],
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

  pwa: {
    strategies: "injectManifest",
    srcDir: "service-worker",
    filename: "sw.ts",
    registerType: "autoUpdate",
    manifest: {
      "lang": "pt-BR",
      "dir": "ltr",
      "name": "Portal TEIA",
      "short_name": "teia.ipe.org.br",
      "description": "O TEIA é uma tecnologia social em edução que leva cursos acessíveis às comunidades com baixa conexão à internet.",
      "start_url": "/",
      "scope": "/",
      "display": "standalone",
      "display_override": [
        "window-controls-overlay"
      ],
      "orientation": "portrait-primary",
      "theme_color": "#00592d",
      "background_color": "#fafafa",
      "categories": [
        "educational"
      ],
      "icons": [
        {
          "src": "icon/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icon/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icon/icon-maskable-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "edge_side_panel": {
        "preferred_width": 496
      }
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      maximumFileSizeToCacheInBytes: 4200000, // ~4MiB
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600, // 1h
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
});
