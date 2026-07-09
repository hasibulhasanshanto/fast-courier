import { lazy } from "react";
import type { RouteObject } from "react-router";
import { withLayout } from "@/layouts/withLayout";
import { RootErrorBoundary } from "@/layouts/RootErrorBoundary";
import { AuthGuard } from "@/features/auth";
import { ROUTES } from "@/config";

const UsersListPage = lazy(
  () => import("@/features/users/pages/list/UsersListPage"),
);
const UserDetailPage = lazy(
  () => import("@/features/users/pages/detail/UserDetailPage"),
);
const UserCreatePage = lazy(
  () => import("@/features/users/pages/create/UserCreatePage"),
);
const UserEditPage = lazy(
  () => import("@/features/users/pages/edit/UserEditPage"),
);

/**
 * Users routes — mirrors `postsRoutes`:
 *   - Mounted under the dashboard layout so the sidebar / header chrome
 *     is shared with the rest of the authenticated app.
 *   - Guarded by `<AuthGuard />`.
 *   - Pages are lazy-loaded into per-route chunks.
 */
export const usersRoutes: RouteObject[] = [
  {
    path: ROUTES.users,
    element: withLayout("dashboard"),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, element: <UsersListPage /> },
          { path: "new", element: <UserCreatePage /> },
          { path: ":userId", element: <UserDetailPage /> },
          { path: ":userId/edit", element: <UserEditPage /> },
        ],
      },
    ],
  },
];
