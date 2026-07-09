import { lazy } from "react";
import type { RouteObject } from "react-router";
import { withLayout } from "@/layouts/withLayout";
import { RootErrorBoundary } from "@/layouts/RootErrorBoundary";
import { AuthGuard } from "@/features/auth";
import { ROUTES } from "@/config";

const DashboardHomePage = lazy(
  () => import("@/features/dashboard/pages/home/DashboardHomePage"),
);
const ProfilePage = lazy(
  () => import("@/features/dashboard/pages/profile/ProfilePage"),
);
const SettingsPage = lazy(
  () => import("@/features/dashboard/pages/settings/SettingsPage"),
);

/**
 * Authenticated dashboard routes. Mounted at "/dashboard" with the
 * dashboard layout (sidebar + header + <Outlet />). Bounces
 * unauthenticated users to /auth/login via <AuthGuard />.
 *
 * Note: the layout itself is NOT lazy-loaded here — `withLayout`
 * already wraps the registered `DashboardLayout` in <Suspense /> and
 * resolves it from the LAYOUTS map. Re-lazy-loading it would cause
 * the wrong module instance to render.
 */
export const dashboardRoutes: RouteObject[] = [
  {
    path: ROUTES.dashboard,
    element: withLayout("dashboard"),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, element: <DashboardHomePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
];
