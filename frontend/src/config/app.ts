/**
 * Global app metadata. Reads from Vite env when present.
 */
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME ?? "Fast Courier",
  description:
    "A production-grade React starter with React Router, Zustand, and react-hook-form.",
  version: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
} as const;
