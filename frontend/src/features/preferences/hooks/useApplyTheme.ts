import { useEffect } from "react";
import { useThemeStore } from "../stores/useThemeStore";

const QUERY = "(prefers-color-scheme: dark)";

function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia(QUERY).matches);

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

/**
 * Syncs the theme store with the `dark` class on <html>.
 * Mount once near the root of the app.
 */
export function useApplyTheme() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const mql = window.matchMedia(QUERY);
    const onChange = () => applyTheme("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);
}
