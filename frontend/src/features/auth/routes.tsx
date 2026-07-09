import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";
import { withLayout } from "@/layouts/withLayout";
import { RootErrorBoundary } from "@/layouts/RootErrorBoundary";
import { GuestGuard } from "./routes/AuthGuard";

const Login = lazy(() => import("@/features/auth/pages/Login"));
const Register = lazy(() => import("@/features/auth/pages/Register"));

/**
 * Guest-only auth routes. Mounted at "/auth" with the auth layout.
 * Authenticated users are bounced to the dashboard by <GuestGuard />.
 *
 * The bare "/auth" URL redirects to "/auth/login" so the URL the user
 * actually lands on matches the auth feature's primary entry point.
 */
export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: withLayout("auth"),
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      {
        element: <GuestGuard />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
];
