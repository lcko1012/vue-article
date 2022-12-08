import { createI18n } from "vue-i18n";
import { localize } from "@vee-validate/i18n";
import { configure } from "vee-validate";

import EnMessages from "@/i18n/en/validator";
import JaMessages from "@/i18n/ja/validator";
import en from "./en";
import ja from "./ja";

export const SUPPORT_LOCALES = ["en", "ja"];

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "ja",
  messages: {
    en,
    ja,
  },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
    ja: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
  },
});

configure({
  generateMessage: localize({
    en: EnMessages,
    ja: JaMessages,
  }),
});
