import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { ROUTES } from "@/config";

/**
 * Gates child routes behind an authenticated session.
 * If the user is not authenticated, redirects to /auth/login while
 * preserving the original destination in router state.
 */
export function AuthGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

/**
 * Inverse of AuthGuard — used to bounce already-authenticated users
 * away from /login or /register and into the dashboard.
 */
export function GuestGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
}
