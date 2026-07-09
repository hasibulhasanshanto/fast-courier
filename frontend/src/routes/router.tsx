import { createBrowserRouter } from "react-router";
import { publicRoutes } from "@/features/public";
import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard";
import { postsRoutes } from "@/features/posts";
import { usersRoutes } from "@/features/users";
import NotFound from "@/layouts/NotFound";

// Router built directly from feature route arrays. No extra constants.
export const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...postsRoutes,
  ...usersRoutes,
  // Catch‑all 404 route.
  { path: "*", element: <NotFound /> },
]);
