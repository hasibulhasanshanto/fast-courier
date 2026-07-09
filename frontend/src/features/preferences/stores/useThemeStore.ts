import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

/**
 * UI theme preference. Persisted to localStorage.
 * Note: the `dark` class on <html> is applied by `useApplyTheme`.
 * The very first paint is also handled by an inline script in
 * `index.html` to avoid a flash of light theme.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
