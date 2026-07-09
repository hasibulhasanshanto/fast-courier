import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import bn from "./bn.json";

export const SUPPORTED_LANGUAGES = ["en", "bn"] as const;
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "language-store";

function detectInitialLanguage(): LanguageCode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { language?: string } };
      const lang = parsed?.state?.language;
      if (lang === "en" || lang === "bn") return lang;
    }
  } catch {
    /* ignore */
  }
  return "en";
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bn: { translation: bn },
  },
  lng: detectInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
