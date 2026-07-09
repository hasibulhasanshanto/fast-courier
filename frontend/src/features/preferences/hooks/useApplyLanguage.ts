import { useEffect } from "react";
import i18n from "@/i18n";
import { useLanguageStore } from "../stores/useLanguageStore";

/**
 * Syncs the language store with i18next, the `<html lang>` attribute,
 * and a `.font-bangla` class on <html> (consumed by index.css).
 * Mount once near the root of the app.
 */
export function useApplyLanguage() {
  const language = useLanguageStore((s) => s.language);

  useEffect(() => {
    void i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("font-bangla", language === "bn");
  }, [language]);
}
