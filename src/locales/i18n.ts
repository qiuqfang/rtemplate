import i18n, { init, use } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import zh from "./zh";

export const LOCALES = [
  { label: "English", key: "en", res: en },
  { label: "中文", key: "zh", res: zh },
];

const resources = LOCALES.reduce((pre, local) => {
  return { ...pre, [local.key]: { translation: local.res } };
}, {});

use(initReactI18next);

init({
  resources,
  lng: localStorage.lang ?? "zh",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.lang = lng;
});

export default i18n;
