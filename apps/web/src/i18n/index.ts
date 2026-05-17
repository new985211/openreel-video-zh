import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";
import { useSettingsStore } from "../stores/settings-store";

i18next.use(initReactI18next).init({
  resources: { en: { translation: en }, zh: { translation: zh } },
  lng: useSettingsStore.getState().language,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18next;
