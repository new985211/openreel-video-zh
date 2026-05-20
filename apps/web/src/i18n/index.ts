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

// Zustand persist middleware rehydrates asynchronously.
// Sync i18n language once the persisted settings are loaded.
if (useSettingsStore.persist?.onFinishHydration) {
  useSettingsStore.persist.onFinishHydration(() => {
    const storedLang = useSettingsStore.getState().language;
    if (storedLang !== i18next.language) {
      i18next.changeLanguage(storedLang);
    }
  });
}

export default i18next;
