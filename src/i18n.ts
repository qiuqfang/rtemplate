import i18n, { init, use } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en";
import zh from "../public/locales/zh";

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
  lng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
