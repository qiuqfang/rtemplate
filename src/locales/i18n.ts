import i18n, { init, use } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import zh from "./zh";

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  zh: {
    translation: {
      ...zh,
    },
  },
};

use(initReactI18next);

init({
  resources,
  lng: localStorage.lang ?? "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
