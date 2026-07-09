import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LanguageCode } from "@/i18n";

type LanguageState = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

/**
 * Active UI language. Persisted to localStorage. The actual i18next
 * change is performed by `useApplyLanguage` (so this store stays
 * free of side-effects and can be used in tests).
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ language: state.language }),
    },
  ),
);
