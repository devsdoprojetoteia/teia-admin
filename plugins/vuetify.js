import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const themes = {
    dark: {
      dark: true,
      colors: {
        primary: "#A2248F",
        accent: "#FF5C00",
        secondary: "#2b2b2b",
        default: "#d8d8d8",
        success: "#009D6B",
        // background: "#fff",
        anchor: "#009D6B",
      },
    },
    light: {
      dark: false,
      colors: {
        primary: "#A2248F",
        accent: "#FF5C00",
        secondary: "#2b2b2b",
        default: "#d8d8d8",
        success: "#009D6B",
        background: "#fff",
        anchor: "#A2248F",
      },
    },
  };

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes,
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
