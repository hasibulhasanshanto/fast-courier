/**
 * Layout barrel. Components and helpers live in their own files:
 *   - PublicLayout.tsx, AuthLayout.tsx, DashboardLayout.tsx
 *   - withLayout.tsx (the factory + LayoutName type)
 *
 * Anything that needs to consume the LAYOUTS map should import directly
 * from `withLayout.tsx` to avoid a circular import (the LAYOUTS map is
 * defined there, not here).
 */
export { withLayout, type LayoutName } from "./withLayout";
export { default as PublicLayout } from "./PublicLayout";
export { default as AuthLayout } from "./AuthLayout";
export { default as DashboardLayout } from "./DashboardLayout";
