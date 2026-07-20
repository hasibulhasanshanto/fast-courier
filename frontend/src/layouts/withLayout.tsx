import { Suspense } from 'react'
import PublicLayout from './PublicLayout'
import AuthLayout from './AuthLayout'
import DashboardLayout from './DashboardLayout'

/**
 * Map of layout name → layout component. Resolved locally to avoid a
 * circular import through the `layouts/index.ts` barrel (which re-exports
 * this function for the public API).
 */
const LAYOUTS = {
  public: PublicLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
} as const

export type LayoutName = keyof typeof LAYOUTS

import RouteLoading from './RouteLoading'
import { Toaster } from '@/components/ui/sonner'

/**
 * Wraps a route in its chosen layout, plus a `Suspense` fallback so that
 * lazy‑loaded children get a graceful loading state.
 *
 * Kept in `src/layouts/` so feature modules can import it without pulling
 * in the router (avoids a circular import).
 */
export function withLayout(layout: LayoutName) {
  const Layout = LAYOUTS[layout]
  return (
    <Suspense fallback={<RouteLoading />}>
      <Layout />
      <Toaster />
    </Suspense>
  )
}
