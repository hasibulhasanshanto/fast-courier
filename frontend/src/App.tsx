import type { ReactNode } from "react";
import { useApplyTheme, useApplyLanguage } from "@/features/preferences";

/**
 * AppProviders mounts the side-effect hooks that keep the document
 * (theme on <html>, language on i18next + <html lang>) in sync with
 * the persisted preferences stores. Render it once, near the root.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  useApplyTheme();
  useApplyLanguage();
  return <>{children}</>;
}

export default AppProviders;
