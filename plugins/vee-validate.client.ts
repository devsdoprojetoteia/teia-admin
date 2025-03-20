import { localize, setLocale } from "@vee-validate/i18n";
import pt_BR from "@vee-validate/i18n/dist/locale/pt_BR.json";
import AllRules from "@vee-validate/rules";
import { defineRule, configure } from "vee-validate";
import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize("pt_BR", {
      ...pt_BR,
      messages: {
        ...pt_BR.messages,
        confirmed: (field) => `O campo ${field} não confere.`,
      },
    }),
  });
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });

  setLocale("pt_BR");
});
